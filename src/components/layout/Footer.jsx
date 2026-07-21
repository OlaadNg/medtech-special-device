import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Youtube, ArrowRight, Send } from 'lucide-react';
import { useState } from 'react';

const footerLinks = {
  'Care Divisions': [
    { label: 'Theatre Solutions', path: '/solutions#theatre' },
    { label: 'ICU & High Care', path: '/solutions#icu' },
    { label: 'Emergency & Trauma', path: '/solutions#emergency' },
    { label: 'Maternal & Infant Care', path: '/solutions#maternal' },
    { label: 'Orthopaedic Solutions', path: '/solutions#orthopaedic' },
    { label: 'Digital Healthcare', path: '/solutions#digital' },
  ],
  'Products': [
    { label: 'Patient Monitors', path: '/products?category=Diagnostic+Equipment' },
    { label: 'Ventilators', path: '/products?category=ICU+Equipment' },
    { label: 'ECG Machines', path: '/products?category=Cardiology+Equipment' },
    { label: 'Operating Tables', path: '/products?category=Theatre+Equipment' },
    { label: 'Ultrasound Systems', path: '/products?category=Radiology+Equipment' },
    { label: 'Digital Health Systems', path: '/products?category=Digital+Health+Systems' },
  ],
  'Services': [
    { label: 'Clinical Engineering', path: '/services#clinical' },
    { label: 'Technical Support', path: '/services#support' },
    { label: 'Healthcare Consulting', path: '/services#consulting' },
    { label: 'Training Services', path: '/services#training' },
    { label: 'Equipment Maintenance', path: '/services' },
    { label: 'Emergency Response', path: '/contact' },
  ],
  'Company': [
    { label: 'About MedTech', path: '/about' },
    { label: 'Leadership Team', path: '/about#team' },
    { label: 'Partners', path: '/partners' },
    { label: 'Careers', path: '/careers' },
    { label: 'News & Insights', path: '/news' },
    { label: 'Africa Operations', path: '/africa' },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer style={{ background: 'var(--midnight-navy)' }}>
      {/* CTA Band */}
      <div style={{ background: 'var(--medihub-blue)' }}>
        <div className="section-container py-12 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-heading font-bold text-white text-2xl lg:text-3xl">Ready to Order Surgical Devices at Discounted Prices?</h3>
            <p className="text-white/70 mt-2 font-body">160,000+ items from 150+ manufacturers. No contracts, no minimum orders. Same-day shipping.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link to="/contact" className="btn-secondary">Request Consultation</Link>
            <Link to="/quote" className="inline-flex items-center justify-center gap-2 font-heading font-semibold rounded-lg transition-all duration-300 bg-white text-medihub-blue hover:bg-blue-50" style={{ minHeight: '48px', padding: '0 28px' }}>
              Get Quotation <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="section-container py-16">
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-block bg-white rounded-lg px-3 py-2 mb-6">
              <img
                src="https://media.base44.com/images/public/6a2dc1968bf71040c439ca75/b30f0019a_MedTechLogoACCEPTED.png"
                alt="MedTech Special Device"
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-white/60 font-body text-sm leading-relaxed mb-6">
              Wholesale liquidator of disposable surgical devices and sutures from top brands. Serving the surgical device community since 2000 — no contracts, no minimum orders.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 text-white/60">
                <MapPin size={15} className="mt-0.5 flex-shrink-0 text-sky-400" />
                <span>🇨🇳 China Warehouse &nbsp;|&nbsp; 🇺🇸 US Warehouse<br />🇿🇦 South Africa Warehouse</span>
              </div>
              <div className="flex items-center gap-3 text-white/60">
                <Mail size={15} className="flex-shrink-0 text-sky-400" />
                <span>Contact us by email only</span>
              </div>
              <a href="mailto:info@medtechspecialdevice.com" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors">
                <Mail size={15} className="flex-shrink-0 text-sky-400" />
                <span>info@medtechspecialdevice.com</span>
              </a>
            </div>
            <div className="flex items-center gap-3 mt-6">
              {[
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Youtube, href: '#', label: 'YouTube' },
              ].map(({ icon: Icon, href, label }) => (
                <a key={label} href={href} aria-label={label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--medihub-blue)'; e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-heading font-semibold text-white text-sm uppercase tracking-widest mb-5">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-white/55 hover:text-white text-sm font-body transition-colors hover:translate-x-1 inline-block transform">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-16 pt-10 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-md">
              <h4 className="font-heading font-semibold text-white mb-2">Stay Ahead of Healthcare Innovation</h4>
              <p className="text-white/50 text-sm font-body">Get the latest medical technology news, product launches, and industry insights delivered to your inbox.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-3 w-full lg:w-auto min-w-[380px]">
              {subscribed ? (
                <div className="flex items-center gap-2 text-vital-green text-sm font-semibold">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5"><path d="M20 6L9 17l-5-5"/></svg>
                  Thank you for subscribing!
                </div>
              ) : (
                <>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 rounded-lg bg-white/8 border text-white placeholder-white/35 focus:outline-none focus:border-sky-400 text-sm font-body transition-colors"
                    style={{ background: 'rgba(255,255,255,0.07)', borderColor: 'rgba(255,255,255,0.15)', minHeight: '48px' }}
                  />
                  <button type="submit" className="btn-primary flex-shrink-0" style={{ minHeight: '48px', padding: '0 20px' }}>
                    <Send size={16} />
                    Subscribe
                  </button>
                </>
              )}
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <p className="text-white/40 text-xs font-body">© {new Date().getFullYear()} MedTech Special Device. All rights reserved.</p>
          <div className="flex items-center gap-6 text-xs">
            {[
              { label: 'Privacy Policy', path: '/privacy-policy' },
              { label: 'Terms & Conditions', path: '/terms-and-conditions' },
              { label: 'Cookie Policy', path: '/cookie-policy' },
              { label: 'POPIA Compliance', path: '/popia-compliance' },
            ].map(item => (
              <Link key={item.label} to={item.path} className="text-white/40 hover:text-white/70 transition-colors">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}