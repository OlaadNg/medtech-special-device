import { useState, useEffect } from 'react';
import { Mail, Inbox, Send, Archive, Trash2, Star, Search, Reply, Forward, Edit3, ChevronLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Webmail() {
  const [activeFolder, setActiveFolder] = useState('inbox');
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams] = useState(() => new URLSearchParams(window.location.search));
  const [mobileListOpen, setMobileListOpen] = useState(true);

  const folders = [
    { id: 'inbox', label: 'Inbox', icon: Inbox, count: 3 },
    { id: 'starred', label: 'Starred', icon: Star, count: 2 },
    { id: 'sent', label: 'Sent', icon: Send, count: 1 },
    { id: 'archive', label: 'Archive', icon: Archive, count: 0 },
    { id: 'trash', label: 'Trash', icon: Trash2, count: 0 },
  ];

  const emails = [
    { id: 'e1', folder: 'inbox', star: true, from: 'Procurement — Chris Hani Baragwanath Hospital', fromEmail: 'procurement@chbh.org.za', subject: 'RE: Central Venous Catheter Kit bulk order', preview: 'Hi, Please send a formal quotation for 200 units of the Optimed CVC Kit for ICU expansion...', date: '2026-08-12', time: '11:42' },
    { id: 'e2', folder: 'inbox', star: false, from: 'Dr. Naidoo — Netcare Milpark', fromEmail: 'n.naidoo@netcare.co.za', subject: 'Peptide SNAP-8 availability', preview: 'Could you confirm stock availability and lead time for Peptide SNAP-8 (50 vials) priced...', date: '2026-08-12', time: '09:15' },
    { id: 'e3', folder: 'inbox', star: true, from: 'MedTech Support', fromEmail: 'support@medtechspecialdevice.com', subject: 'Service Request MT-00482271 update', preview: 'Your preventive maintenance service request has been assigned to Engineer T. Mokoena and is scheduled...', date: '2026-08-11', time: '16:03' },
  ];

  const filteredEmails = emails.filter(e => {
    if (activeFolder === 'starred') return e.star;
    if (activeFolder === 'inbox') return true;
    return e.folder === activeFolder;
  }).filter(e => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return e.subject.toLowerCase().includes(q) || e.from.toLowerCase().includes(q) || e.preview.toLowerCase().includes(q);
  });

  const openEmail = filteredEmails.length > 0 ? selectedEmail ?? filteredEmails[0] : null;

  const open = (id) => {
    setSelectedEmail(id);
    setMobileListOpen(false);
  };

  if (searchParams.get('embedded') === 'true') {
    // Embedded mode — show compact mailbox only
    return <MailboxShell folders={folders} activeFolder={activeFolder} setActiveFolder={setActiveFolder} filteredEmails={filteredEmails} openEmail={open} openEmailId={openEmail} searchQuery={searchQuery} setSearchQuery={setSearchQuery} emails={emails} mobileListOpen={mobileListOpen} setMobileListOpen={setMobileListOpen} embedded />;
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--clinical-mist)' }}>
      {/* Top bar */}
      <header className="sticky top-0 z-10 bg-white border-b" style={{ borderColor: 'var(--light-border)' }}>
        <div className="px-4 lg:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'var(--medihub-blue)' }}>
              <Mail size={18} className="text-white" />
            </div>
            <div>
              <p className="font-heading font-bold text-sm" style={{ color: 'var(--midnight-navy)' }}>MedTech Webmail</p>
              <p className="text-xs" style={{ color: 'var(--slate-text)' }}>inbox@medtechspecialdevice.com</p>
            </div>
          </div>
          <a href="/" className="text-sm font-heading font-semibold hover:opacity-70 transition-opacity" style={{ color: 'var(--medihub-blue)' }}>
            ← Back to site
          </a>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-2 lg:px-6 py-4 lg:py-6">
        <MailboxShell folders={folders} activeFolder={activeFolder} setActiveFolder={setActiveFolder} filteredEmails={filteredEmails} openEmail={open} openEmailId={openEmail} searchQuery={searchQuery} setSearchQuery={setSearchQuery} emails={emails} mobileListOpen={mobileListOpen} setMobileListOpen={setMobileListOpen} />
      </div>
    </div>
  );
}

function MailboxShell({ folders, activeFolder, setActiveFolder, filteredEmails, openEmail, openEmailId, searchQuery, setSearchQuery, emails, mobileListOpen, setMobileListOpen, embedded }) {
  const current = emails.find(e => e.id === openEmailId);

  // On mobile, show only the selected view
  const showList = embedded || mobileListOpen;
  const showDetail = !embedded && !mobileListOpen && current;

  return (
    <div className={`grid gap-3 ${embedded ? '' : 'lg:grid-cols-[220px_1fr_1.4fr]'} h-[calc(100vh-${embedded ? '60px' : '120px'})]`}>
      {/* Sidebar */}
      <aside className={`bg-white rounded-2xl border p-3 overflow-y-auto ${embedded || showList ? 'block' : 'hidden'} lg:block`} style={{ borderColor: 'var(--light-border)', height: embedded ? 'auto' : undefined }}>
        <button className="w-full btn-primary mb-4" style={{ minHeight: '40px', padding: '0 16px', fontSize: '14px' }}>
          <Edit3 size={14} /> Compose
        </button>
        <nav className="space-y-1">
          {folders.map(f => {
            const Icon = f.icon;
            const active = activeFolder === f.id;
            return (
              <button key={f.id} onClick={() => { setActiveFolder(f.id); setMobileListOpen(true); }} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-medium transition-colors ${active ? 'text-white' : ''}`} style={{ background: active ? 'var(--medihub-blue)' : 'transparent', color: active ? 'white' : 'var(--slate-text)' }}>
                <Icon size={16} />
                <span className="flex-1 text-left">{f.label}</span>
                {f.count > 0 && (
                  <span className={`text-[10px] font-heading font-bold px-1.5 py-0.5 rounded-full ${active ? 'bg-white/20 text-white' : ''}`} style={{ background: active ? 'rgba(255,255,255,0.2)' : 'var(--clinical-mist)', color: active ? 'white' : 'var(--slate-text)' }}>
                    {f.count}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Email list */}
      <section className={`bg-white rounded-2xl border flex flex-col overflow-hidden ${showList ? 'block' : 'hidden'} lg:flex`} style={{ borderColor: 'var(--light-border)' }}>
        <div className="p-3 border-b" style={{ borderColor: 'var(--light-border)' }}>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--slate-text)' }} />
            <input
              type="text"
              placeholder="Search mail..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl border text-sm font-body focus:outline-none focus:border-medihub-blue transition-colors"
              style={{ borderColor: 'var(--light-border)', fontSize: '13px', minHeight: '38px' }}
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {filteredEmails.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-16 text-center">
              <Inbox size={36} style={{ color: 'var(--light-border)' }} />
              <p className="mt-3 text-sm font-body" style={{ color: 'var(--slate-text)' }}>No messages here.</p>
            </div>
          ) : filteredEmails.map(e => {
            const isSel = e.id === openEmailId;
            return (
              <button key={e.id} onClick={() => openEmail(e.id)} className="w-full text-left p-3 border-b hover:bg-slate-50 transition-colors" style={{ borderColor: 'var(--light-border)', background: isSel ? 'var(--clinical-mist)' : 'transparent' }}>
                <div className="flex items-start gap-2">
                  {e.star && <Star size={12} className="mt-1 flex-shrink-0 fill-amber-400 text-amber-400" />}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <p className="font-heading font-semibold text-sm truncate" style={{ color: 'var(--midnight-navy)' }}>{e.from}</p>
                      <span className="text-[10px] font-mono flex-shrink-0" style={{ color: 'var(--slate-text)', fontFamily: 'var(--font-mono)' }}>{e.time}</span>
                    </div>
                    <p className="text-xs font-medium truncate" style={{ color: 'var(--midnight-navy)' }}>{e.subject}</p>
                    <p className="text-xs mt-0.5 line-clamp-1" style={{ color: 'var(--slate-text)' }}>{e.preview}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Detail pane */}
      {!embedded && (
        <section className={`bg-white rounded-2xl border flex flex-col overflow-hidden ${showDetail ? 'flex' : 'hidden'} lg:flex`} style={{ borderColor: 'var(--light-border)' }}>
          {current ? (
            <>
              <div className="p-4 border-b" style={{ borderColor: 'var(--light-border)' }}>
                <button onClick={() => setMobileListOpen(true)} className="lg:hidden mb-2 inline-flex items-center gap-1 text-xs font-heading font-semibold" style={{ color: 'var(--medihub-blue)' }}>
                  <ChevronLeft size={14} /> Inbox
                </button>
                <h1 className="font-heading font-bold text-lg mb-2" style={{ color: 'var(--midnight-navy)' }}>{current.subject}</h1>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-heading font-bold text-sm flex-shrink-0" style={{ background: 'var(--medihub-blue)' }}>
                    {current.from.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-heading font-semibold text-sm truncate" style={{ color: 'var(--midnight-navy)' }}>{current.from}</p>
                    <p className="text-xs truncate font-mono" style={{ color: 'var(--slate-text)', fontFamily: 'var(--font-mono)' }}>{current.fromEmail}</p>
                  </div>
                  <span className="text-[10px] font-mono flex-shrink-0" style={{ color: 'var(--slate-text)', fontFamily: 'var(--font-mono)' }}>{current.date} · {current.time}</span>
                </div>
                <div className="flex items-center gap-1 mt-3 pt-3 border-t" style={{ borderColor: 'var(--light-border)' }}>
                  <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-heading font-semibold transition-colors hover:bg-slate-50" style={{ color: 'var(--medihub-blue)' }}>
                    <Reply size={12} /> Reply
                  </button>
                  <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-heading font-semibold transition-colors hover:bg-slate-50" style={{ color: 'var(--slate-text)' }}>
                    <Forward size={12} /> Forward
                  </button>
                  <button className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-heading font-semibold transition-colors hover:bg-slate-50" style={{ color: 'var(--slate-text)' }}>
                    <Archive size={12} /> Archive
                  </button>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="prose max-w-none">
                  <p className="text-sm font-body leading-relaxed mb-3" style={{ color: 'var(--midnight-navy)' }}>Hi,</p>
                  <p className="text-sm font-body leading-relaxed mb-3" style={{ color: 'var(--slate-text)' }}>{current.preview}</p>
                  <p className="text-sm font-body leading-relaxed mb-3" style={{ color: 'var(--slate-text)' }}>Kindly confirm pricing and stock availability at your earliest convenience. We are ready to proceed once we receive the formal quotation.</p>
                  <p className="text-sm font-body leading-relaxed" style={{ color: 'var(--slate-text)' }}>Warm regards,<br />{current.from}</p>
                </motion.div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full py-16 text-center">
              <Mail size={36} style={{ color: 'var(--light-border)' }} />
              <p className="mt-3 text-sm font-body" style={{ color: 'var(--slate-text)' }}>Select a message to read.</p>
            </div>
          )}
        </section>
      )}
    </div>
  );
}