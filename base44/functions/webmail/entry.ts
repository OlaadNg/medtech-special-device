import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';
import { secrets } from 'base44:runtime';
import { ImapFlow } from 'npm:imapflow@1.0.160';
import nodemailer from 'npm:nodemailer@6.9.14';

const imapConfig = () => ({
  host: secrets.get('IMAP_HOST'),
  port: Number(secrets.get('IMAP_PORT') || 993),
  secure: Number(secrets.get('IMAP_PORT') || 993) === 993,
  auth: {
    user: secrets.get('MAIL_USERNAME'),
    pass: secrets.get('MAIL_PASSWORD'),
  },
  logger: false,
  emitLogs: false,
  socketTimeout: 15000,
  greetingTimeout: 15000,
  connectionTimeout: 15000,
});

const smtpConfig = () => ({
  host: secrets.get('SMTP_HOST'),
  port: Number(secrets.get('SMTP_PORT') || 465),
  secure: Number(secrets.get('SMTP_PORT') || 465) === 465,
  auth: {
    user: secrets.get('MAIL_USERNAME'),
    pass: secrets.get('MAIL_PASSWORD'),
  },
});

const folderMap = {
  inbox: 'INBOX',
  sent: 'Sent',
  drafts: 'Drafts',
  trash: 'Trash',
  archive: 'Archive',
  starred: 'INBOX',
};

function decodeHeader(value) {
  if (!value) return '';
  try {
    const dec = (s) => {
      const m = /\=\?([^?]+)\?([BQ])\?([^?]*)\?\=/i.exec(s);
      if (!m) return s;
      const charset = m[1].toLowerCase();
      const enc = m[2].toUpperCase();
      let raw;
      if (enc === 'B') raw = atob(m[3]);
      else raw = m[3].replace(/_/g, ' ').replace(/\=([0-9A-F]{2})/gi, (_, h) => String.fromCharCode(parseInt(h, 16)));
      try {
        if (charset === 'utf-8' || charset === 'utf8') return new TextDecoder('utf-8').decode(Uint8Array.from(raw, c => c.charCodeAt(0)));
        return raw;
      } catch { return raw; }
    };
    return value.split(/\s+/).map(dec).join('');
  } catch { return value; }
}

function parseAddresses(headerVal) {
  if (!headerVal) return [];
  // simple regex parser for "Name <email>" entries
  const out = [];
  const re = /([^<,]*?)\s*<([^>]+)>|([^\s,]+@[^,\s]+)/g;
  let m;
  while ((m = re.exec(headerVal)) !== null) {
    out.push({ name: decodeHeader((m[1] || '').trim()), email: (m[2] || m[3] || '').trim() });
  }
  return out;
}

function textPart(structure) {
  // Returns best plain-text body from message structure
  if (!structure) return '';
  if (structure.text) return structure.text;
  if (structure.html) return stripHtml(structure.html);
  if (Array.isArray(structure)) {
    for (const p of structure) {
      const t = textPart(p);
      if (t) return t;
    }
  }
  return '';
}

function stripHtml(html) {
  return (html || '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

async function listMessages(folder, limit = 30) {
  const client = new ImapFlow(imapConfig());
  await client.connect();
  try {
    const mailbox = folderMap[folder] || 'INBOX';
    let lock;
    try {
      lock = await client.getMailboxLock(mailbox);
    } catch (e) {
      // Some servers use different Sent name; try alternatives
      const alt = { sent: ['Sent', 'Sent Items', 'Sent Mail', '"Sent Messages"'], drafts: ['Drafts', '"Drafts"'], trash: ['Trash', 'Deleted', '"Deleted Items"'], archive: ['Archive', 'Archived'] }[folder];
      if (!alt) throw e;
      let opened = false;
      for (const name of alt) {
        try { lock = await client.getMailboxLock(name); opened = true; break; } catch {}
      }
      if (!opened) throw e;
    }

    const status = client.mailbox ? { exists: client.mailbox.exists } : { exists: 0 };
    const total = status.exists || 0;
    if (total === 0) return { messages: [], total: 0 };

    const start = Math.max(1, total - limit + 1);
    const range = `${start}:${total}`;

    let fetched = [];
    for await (const msg of client.fetch(range, {
      envelope: true,
      internalDate: true,
      flags: true,
      bodyStructure: true,
      headers: true,
    })) {
      const env = msg.env || {};
      const subject = decodeHeader(env.subject || '(no subject)');
      let from = env.from ? env.from.map(a => a.name ? `${decodeHeader(a.name)} <${a.address}>` : a.address).join(', ') : '';
      let to = env.to ? env.to.map(a => a.address).join(', ') : '';
      let fromEmail = env.from && env.from[0] ? env.from[0].address : '';
      let fromName = env.from && env.from[0] ? decodeHeader(env.from[0].name || '') : '';
      const flagged = Array.isArray(msg.flags) && msg.flags.includes('\\Flagged');
      const seen = Array.isArray(msg.flags) && msg.flags.includes('\\Seen');
      fetched.push({
        id: String(msg.uid),
        uid: msg.uid,
        folder,
        subject,
        from,
        fromEmail,
        fromName,
        to,
        date: env.date ? new Date(env.date).toISOString() : (msg.internalDate ? msg.internalDate.toISOString() : new Date().toISOString()),
        time: env.date ? new Date(env.date).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : '',
        starred: flagged,
        read: seen,
      });
    }
    // newest first
    fetched.sort((a, b) => new Date(b.date) - new Date(a.date));
    if (folder === 'starred') fetched = fetched.filter(m => m.starred);
    return { messages: fetched, total };
  } finally {
    await client.logout().catch(() => {});
  }
}

async function getMessage(folder, uid) {
  const client = new ImapFlow(imapConfig());
  await client.connect();
  try {
    const mailbox = folderMap[folder] || 'INBOX';
    let lock;
    try {
      lock = await client.getMailboxLock(mailbox);
    } catch (e) {
      const alt = { sent: ['Sent', 'Sent Items', 'Sent Mail'], drafts: ['Drafts'], trash: ['Trash', 'Deleted'], archive: ['Archive'] }[folder];
      if (!alt) throw e;
      let opened = false;
      for (const name of alt) { try { lock = await client.getMailboxLock(name); opened = true; break; } catch {} }
      if (!opened) throw e;
    }
    let msg = null;
    for await (const m of client.fetch(String(uid), { envelope: true, internalDate: true, flags: true, source: true, bodyStructure: true })) {
      msg = m;
      break;
    }
    if (!msg) return null;
    const env = msg.env || {};
    const subject = decodeHeader(env.subject || '(no subject)');
    const fromList = (env.from || []).map(a => ({ name: decodeHeader(a.name || ''), email: a.address }));
    const toList = (env.to || []).map(a => ({ name: decodeHeader(a.name || ''), email: a.address }));
    const ccList = (env.cc || []).map(a => ({ name: decodeHeader(a.name || ''), email: a.address }));

    let bodyText = '';
    let bodyHtml = '';
    try {
      const sourceBytes = new Uint8Array(await new Response(msg.source).arrayBuffer());
      const decoder = new TextDecoder('utf-8');
      const raw = decoder.decode(sourceBytes);
      // crude parser: split headers and body
      const sepIdx = raw.indexOf('\r\n\r\n') >= 0 ? raw.indexOf('\r\n\r\n') : raw.indexOf('\n\n');
      const headerBlock = sepIdx >= 0 ? raw.slice(0, sepIdx) : '';
      const body = sepIdx >= 0 ? raw.slice(sepIdx + 4) : raw;
      const ctMatch = /Content-Type:\s*([^;\r\n]+)/i.exec(headerBlock);
      const ctype = ctMatch ? ctMatch[1].trim().toLowerCase() : 'text/plain';
      if (ctype.includes('multipart')) {
        // Extract text and html parts very crudely
        const boundary = /boundary="?([^";\r\n]+)"?/i.exec(headerBlock);
        if (boundary) {
          const parts = body.split('--' + boundary[1]);
          for (const p of parts) {
            const ph = /Content-Type:\s*([^\r\n]+)/i.exec(p);
            if (!ph) continue;
            if (ph[1].toLowerCase().includes('text/plain') && !bodyText) {
              const bsep = p.indexOf('\r\n\r\n') >= 0 ? p.indexOf('\r\n\r\n') : p.indexOf('\n\n');
              bodyText = p.slice(bsep + 2).replace(/=\r\n/g, '').replace(/\r\n/g, '\n').trim();
            } else if (ph[1].toLowerCase().includes('text/html')) {
              const bsep = p.indexOf('\r\n\r\n') >= 0 ? p.indexOf('\r\n\r\n') : p.indexOf('\n\n');
              bodyHtml = p.slice(bsep + 2).replace(/=\r\n/g, '').trim();
            }
          }
        }
      } else if (ctype.includes('text/html')) {
        bodyHtml = body;
      } else {
        bodyText = body.replace(/=\r\n/g, '').replace(/\r\n/g, '\n');
      }
    } catch {}

    if (!bodyText && bodyHtml) bodyText = stripHtml(bodyHtml);

    return {
      id: String(msg.uid),
      uid: msg.uid,
      folder,
      subject,
      fromList,
      toList,
      ccList,
      date: env.date ? new Date(env.date).toISOString() : (msg.internalDate ? msg.internalDate.toISOString() : new Date().toISOString()),
      body: bodyText || '(no readable body)',
      html: bodyHtml || '',
      from: fromList.map(a => a.name ? `${a.name} <${a.email}>` : a.email).join(', '),
      fromEmail: fromList[0]?.email || '',
      fromName: fromList[0]?.name || '',
      starred: Array.isArray(msg.flags) && msg.flags.includes('\\Flagged'),
      read: Array.isArray(msg.flags) && msg.flags.includes('\\Seen'),
      folderName: mailbox,
      attachmentCount: 0,
      hasAttachments: false,
    };
  } finally {
    await client.logout().catch(() => {});
  }
}

async function sendMessage({ to, subject, body, html, cc, bcc }) {
  const transporter = nodemailer.createTransport(smtpConfig());
  const info = await transporter.sendMail({
    from: secrets.get('MAIL_USERNAME'),
    to: (Array.isArray(to) ? to.join(',') : to),
    cc: cc || undefined,
    bcc: bcc || undefined,
    subject: subject || '(no subject)',
    text: body || '',
    html: html || undefined,
  });
  return { messageId: info.messageId, response: info.response };
}

async function listFolders() {
  const client = new ImapFlow(imapConfig());
  await client.connect();
  try {
    const mailboxes = await client.list();
    return { folders: (mailboxes || []).map(m => ({ path: m.path, name: m.name, special: m.special, flags: m.flags })) };
  } finally {
    await client.logout().catch(() => {});
  }
}

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const action = body.action || 'list';

    if (action === 'list') {
      const folder = body.folder || 'inbox';
      const limit = Math.min(Number(body.limit) || 30, 60);
      const result = await listMessages(folder, limit);
      return Response.json(result);
    }
    if (action === 'get') {
      const { folder, uid } = body;
      if (uid == null) return Response.json({ error: 'uid required' }, { status: 400 });
      const msg = await getMessage(folder || 'inbox', String(uid));
      if (!msg) return Response.json({ error: 'Not found' }, { status: 404 });
      return Response.json({ message: msg });
    }
    if (action === 'send') {
      const { to, subject, body: text, html, cc, bcc } = body;
      if (!to) return Response.json({ error: 'to is required' }, { status: 400 });
      const result = await sendMessage({ to, subject, body: text, html, cc, bcc });
      return Response.json({ ok: true, ...result });
    }
    if (action === 'folders') {
      const result = await listFolders();
      return Response.json(result);
    }
    if (action === 'probe') {
      const host = secrets.get('IMAP_HOST');
      const notes = [];
      const t0 = Date.now();
      try {
        const r = await fetch(`https://${host}/`, { method: 'GET', signal: AbortSignal.timeout(8000) }).catch(e => e);
        notes.push(`https:${r.status || r.message} in ${Date.now() - t0}ms`);
      } catch (e) { notes.push(`https:fail ${e.message}`); }
      return Response.json({ host, notes });
    }
    return Response.json({ error: 'Unknown action' }, { status: 400 });
  } catch (error) {
    return Response.json({ error: error.message || 'Server error', stack: error.stack?.split('\n').slice(0, 5).join(' | ') }, { status: 500 });
  }
}