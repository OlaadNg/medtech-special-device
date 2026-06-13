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
    { label: 'About MediHub', path: '/about' },
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
            <h3 className="font-heading font-bold text-white text-2xl lg:text-3xl">Partner With Africa's Trusted Medical Technology Provider</h3>
            <p className="text-white/70 mt-2 font-body">Join 500+ healthcare facilities that trust MediHub for their medical technology needs.</p>
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
            <Link to="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--medihub-blue)' }}>
                <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
                  <path d="M16 4v24M4 16h24" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
                  <circle cx="16" cy="16" r="6" stroke="white" strokeWidth="2" fill="none" opacity="0.6"/>
                </svg>
              </div>
              <div>
                <span className="font-heading font-black text-xl text-white">MediHub</span>
                <div className="text-white/40 font-body" style={{ fontSize: '10px', letterSpacing: '0.12em' }}>HEALTHCARE SOLUTIONS</div>
              </div>
            </Link>
            <p className="text-white/60 font-body text-sm leading-relaxed mb-6">
              South Africa's leading medical equipment, healthcare technology, and hospital solutions provider. Delivering world-class medical technology across Africa since 1989.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3 text-white/60">
                <MapPin size={15} className="mt-0.5 flex-shrink-0 text-sky-400" />
                <span>123 Healthcare Drive, Sandton<br />Johannesburg, 2196, South Africa</span>
              </div>
              <a href="tel:+27112345678" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors">
                <Phone size={15} className="flex-shrink-0 text-sky-400" />
                <span>+27 11 234 5678</span>
              </a>
              <a href="mailto:info@medihub.co.za" className="flex items-center gap-3 text-white/60 hover:text-white transition-colors">
                <Mail size={15} className="flex-shrink-0 text-sky-400" />
                <span>info@medihub.co.za</span>
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
          <p className="text-white/40 text-xs font-body">© {new Date().getFullYear()} MediHub Healthcare Solutions (Pty) Ltd. All rights reserved. Reg. No. 1989/012345/07</p>
          <div className="flex items-center gap-6 text-xs">
            {['Privacy Policy', 'Terms & Conditions', 'Cookie Policy', 'POPIA Compliance'].map(item => (
              <Link key={item} to={`/${item.toLowerCase().replace(/\s+/g, '-').replace(/&/g, 'and')}`} className="text-white/40 hover:text-white/70 transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}