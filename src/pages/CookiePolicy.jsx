import PageHero from '../components/shared/PageHero';

const Section = ({ title, children }) => (
  <div className="mb-10">
    <h2 className="font-heading font-bold text-xl mb-4" style={{ color: 'var(--midnight-navy)' }}>{title}</h2>
    <div className="font-body text-base leading-relaxed space-y-3" style={{ color: 'var(--slate-text)' }}>{children}</div>
  </div>
);

const cookieTable = [
  { name: '_session', type: 'Essential', purpose: 'Maintains your login session and Client Portal access.', expiry: 'Session' },
  { name: '_csrf', type: 'Essential', purpose: 'Protects against cross-site request forgery attacks.', expiry: 'Session' },
  { name: '_prefs', type: 'Functional', purpose: 'Remembers your language and display preferences.', expiry: '1 year' },
  { name: '_ga', type: 'Analytics', purpose: 'Google Analytics — tracks anonymous usage statistics to improve the website.', expiry: '2 years' },
  { name: '_gid', type: 'Analytics', purpose: 'Google Analytics — distinguishes users for session-level analytics.', expiry: '24 hours' },
  { name: '_fbp', type: 'Marketing', purpose: 'Facebook Pixel — used to deliver relevant advertisements on Facebook.', expiry: '3 months' },
  { name: 'li_fat_id', type: 'Marketing', purpose: 'LinkedIn Insight Tag — measures conversion from LinkedIn ad campaigns.', expiry: '30 days' },
  { name: '_mh_consent', type: 'Essential', purpose: 'Stores your cookie consent preferences.', expiry: '1 year' },
];

const typeColors = {
  Essential: { bg: 'rgba(0,91,170,0.1)', text: '#005BAA' },
  Functional: { bg: 'rgba(0,163,123,0.1)', text: '#00A37B' },
  Analytics: { bg: 'rgba(107,70,193,0.1)', text: '#6B46C1' },
  Marketing: { bg: 'rgba(192,86,33,0.1)', text: '#C05621' },
};

export default function CookiePolicy() {
  return (
    <div>
      <PageHero
        label="Legal"
        title="Cookie Policy"
        subtitle="How MediHub uses cookies and similar technologies on its website."
      />
      <section className="py-16 bg-white">
        <div className="section-container max-w-4xl">
          <p className="text-sm font-body mb-10 pb-6 border-b" style={{ color: 'var(--slate-text)', borderColor: 'var(--light-border)' }}>
            <strong>Last Updated: 1 June 2026</strong> &nbsp;|&nbsp; MediHub Healthcare Solutions (Pty) Ltd, Reg. No. 1989/012345/07
          </p>

          <Section title="1. What Are Cookies?">
            <p>Cookies are small text files placed on your device when you visit a website. They are widely used to make websites work, function more efficiently, and to provide information to website owners. Cookies may be "session cookies" (which expire when you close your browser) or "persistent cookies" (which remain on your device for a set period or until you delete them).</p>
          </Section>

          <Section title="2. How MediHub Uses Cookies">
            <p>We use cookies on www.medihub.co.za and the MediHub Client Portal for the following purposes:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Essential Cookies:</strong> Required for the website and Client Portal to function correctly. These cannot be disabled.</li>
              <li><strong>Functional Cookies:</strong> Remember your preferences (e.g., language settings) to improve your experience.</li>
              <li><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website so we can improve its content and performance. Data is aggregated and anonymised.</li>
              <li><strong>Marketing Cookies:</strong> Enable us to show relevant MediHub advertisements on third-party platforms such as LinkedIn and Facebook, and to measure campaign effectiveness.</li>
            </ul>
          </Section>

          <Section title="3. Cookies We Use">
            <p>The following cookies may be set when you visit our website:</p>
            <div className="overflow-x-auto mt-4">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr style={{ background: 'var(--clinical-mist)' }}>
                    <th className="text-left py-3 px-4 font-heading font-semibold" style={{ color: 'var(--midnight-navy)', borderBottom: '2px solid var(--light-border)' }}>Cookie Name</th>
                    <th className="text-left py-3 px-4 font-heading font-semibold" style={{ color: 'var(--midnight-navy)', borderBottom: '2px solid var(--light-border)' }}>Type</th>
                    <th className="text-left py-3 px-4 font-heading font-semibold" style={{ color: 'var(--midnight-navy)', borderBottom: '2px solid var(--light-border)' }}>Purpose</th>
                    <th className="text-left py-3 px-4 font-heading font-semibold" style={{ color: 'var(--midnight-navy)', borderBottom: '2px solid var(--light-border)' }}>Expiry</th>
                  </tr>
                </thead>
                <tbody>
                  {cookieTable.map((row, i) => (
                    <tr key={row.name} style={{ background: i % 2 === 0 ? 'white' : 'rgba(244,247,250,0.5)', borderBottom: '1px solid var(--light-border)' }}>
                      <td className="py-3 px-4 font-mono text-xs" style={{ color: 'var(--midnight-navy)' }}>{row.name}</td>
                      <td className="py-3 px-4">
                        <span className="text-xs font-heading font-semibold px-2.5 py-1 rounded-full"
                          style={{ background: typeColors[row.type].bg, color: typeColors[row.type].text }}>
                          {row.type}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm" style={{ color: 'var(--slate-text)' }}>{row.purpose}</td>
                      <td className="py-3 px-4 text-sm" style={{ color: 'var(--slate-text)' }}>{row.expiry}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section title="4. Third-Party Cookies">
            <p>Some cookies are set by third-party services that appear on our pages. MediHub does not control these third-party cookies. The third parties involved include:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Google Analytics</strong> — Website usage analytics (Google LLC, USA). <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer" style={{ color: 'var(--medihub-blue)' }}>Google Privacy Policy</a></li>
              <li><strong>LinkedIn Insight Tag</strong> — B2B advertising and campaign analytics (LinkedIn Corporation, USA). <a href="https://www.linkedin.com/legal/privacy-policy" target="_blank" rel="noreferrer" style={{ color: 'var(--medihub-blue)' }}>LinkedIn Privacy Policy</a></li>
              <li><strong>Facebook Pixel</strong> — Social media advertising (Meta Platforms, USA). <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noreferrer" style={{ color: 'var(--medihub-blue)' }}>Meta Privacy Policy</a></li>
            </ul>
          </Section>

          <Section title="5. Your Cookie Choices">
            <p>When you first visit our website, you will be presented with a cookie consent banner. You may accept all cookies, reject non-essential cookies, or customise your preferences by category.</p>
            <p>You may also manage cookies at any time through your browser settings. Instructions for common browsers:</p>
            <ul className="list-disc ml-6 space-y-2">
              <li><strong>Google Chrome:</strong> Settings → Privacy and Security → Cookies and other site data</li>
              <li><strong>Mozilla Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data</li>
              <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
              <li><strong>Microsoft Edge:</strong> Settings → Privacy, Search, and Services → Cookies</li>
            </ul>
            <p>Please note that disabling certain cookies may affect the functionality of our website, including access to the Client Portal.</p>
          </Section>

          <Section title="6. Do Not Track">
            <p>Our website does not currently respond to "Do Not Track" (DNT) signals from browsers, as there is no universally accepted standard for DNT. We will update this policy if a standard is adopted.</p>
          </Section>

          <Section title="7. Updates to This Policy">
            <p>We may update this Cookie Policy from time to time. The "Last Updated" date above will reflect any revisions. Continued use of our website after any update constitutes your acceptance of the revised policy.</p>
          </Section>

          <Section title="8. Contact">
            <p>For questions about our use of cookies, contact:<br />
            <a href="mailto:privacy@medihub.co.za" style={{ color: 'var(--medihub-blue)' }}>privacy@medihub.co.za</a> &nbsp;|&nbsp; +27 11 234 5678</p>
          </Section>
        </div>
      </section>
    </div>
  );
}