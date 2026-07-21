import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown, Phone, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Home', path: '/' },
  {
    label: 'About', path: '/about',
    children: [
      { label: 'Our Story', path: '/about' },
      { label: 'Leadership Team', path: '/about#team' },
      { label: 'Certifications', path: '/about#certifications' },
    ]
  },
  {
    label: 'Products', path: '/products',
    children: [
      { label: 'All Products', path: '/products' },
      { label: 'Theatre Equipment', path: '/products?category=Theatre+Equipment' },
      { label: 'ICU Equipment', path: '/products?category=ICU+Equipment' },
      { label: 'Diagnostic Equipment', path: '/products?category=Diagnostic+Equipment' },
      { label: 'Cardiology Equipment', path: '/products?category=Cardiology+Equipment' },
      { label: 'Digital Health Systems', path: '/products?category=Digital+Health+Systems' },
    ]
  },
  {
    label: 'Solutions', path: '/solutions',
    children: [
      { label: 'Hospital Solutions', path: '/solutions#hospitals' },
      { label: 'Government Health', path: '/solutions#government' },
      { label: 'Private Clinics', path: '/solutions#clinics' },
      { label: 'Africa Operations', path: '/africa' },
    ]
  },
  {
    label: 'Services', path: '/services',
    children: [
      { label: 'Clinical Engineering', path: '/services#clinical' },
      { label: 'Technical Support', path: '/services#support' },
      { label: 'Training Services', path: '/services#training' },
      { label: 'Healthcare Consulting', path: '/services#consulting' },
    ]
  },
  { label: 'Industries', path: '/industries' },
  { label: 'Partners', path: '/partners' },
  {
    label: 'Resources', path: '/news',
    children: [
      { label: 'News & Insights', path: '/news' },
      { label: 'Case Studies', path: '/case-studies' },
      { label: 'Events', path: '/events' },
      { label: 'Download Centre', path: '/downloads' },
      { label: 'FAQ', path: '/faq' },
    ]
  },
  { label: 'Careers', path: '/careers' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const isHomePage = location.pathname === '/';
  const isTransparent = isHomePage && !scrolled;

  return (
    <>
      {/* Top info bar */}
      <div className={`hidden lg:block text-xs transition-all duration-300 ${isTransparent ? 'bg-midnight-navy/80' : 'bg-medihub-blue'} text-white/80`}>
        <div className="section-container flex justify-between items-center py-2">
          <span className="font-body">Wholesale Surgical Device Liquidator — 160,000+ Items, Ships Same Day</span>
          <div className="flex items-center gap-6">
            <span className="text-white/70">Contact us by email only</span>
            <a href="mailto:info@medtechspecialdevice.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <Mail size={12} />
              <span>info@medtechspecialdevice.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className={`sticky top-0 z-50 transition-all duration-400 ${isTransparent ? 'nav-ghost' : 'nav-solid'}`}>
        <div className="section-container flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <div className={`rounded-lg px-2.5 py-1.5 transition-colors ${isTransparent ? 'bg-white' : ''}`}>
              <img
                src="https://media.base44.com/images/public/6a2dc1968bf71040c439ca75/b30f0019a_MedTechLogoACCEPTED.png"
                alt="MedTech Special Device"
                className="h-9 w-auto"
              />
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden xl:flex items-center gap-1">
            {navLinks.slice(0, 8).map((link) => (
              <div
                key={link.path}
                className="relative"
                onMouseEnter={() => link.children && setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={link.path}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-heading font-medium transition-all duration-200 whitespace-nowrap ${
                    isTransparent
                      ? 'text-white/90 hover:text-white hover:bg-white/10'
                      : 'text-slate-700 hover:bg-blue-50'
                  } ${location.pathname === link.path ? (isTransparent ? 'text-white' : '') : ''}`}
                  style={{ 
                    color: location.pathname === link.path && !isTransparent ? 'var(--medihub-blue)' : undefined,
                    fontSize: '13px'
                  }}
                >
                  {link.label}
                  {link.children && <ChevronDown size={12} className={`transition-transform ${activeDropdown === link.label ? 'rotate-180' : ''}`} />}
                </Link>

                {/* Dropdown */}
                <AnimatePresence>
                  {link.children && activeDropdown === link.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 glass-card-light rounded-xl shadow-2xl py-2 min-w-[200px] border"
                      style={{ borderColor: 'var(--light-border)' }}
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="block px-4 py-2.5 text-sm font-body text-slate-700 hover:bg-blue-50/60 transition-colors"
                    style={{ color: 'var(--midnight-navy)' }}
                          style={{ fontSize: '13.5px' }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/client-portal" className={`text-sm font-heading font-semibold transition-colors ${isTransparent ? 'text-white/80 hover:text-white' : 'text-slate-600 hover:text-medihub-blue'}`} style={{ fontSize: '13px' }}>
              Client Portal
            </Link>
            <Link to="/quote" className="btn-primary text-sm" style={{ minHeight: '40px', padding: '0 20px', fontSize: '13px' }}>
              Get a Quote
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`xl:hidden p-2 rounded-lg transition-colors ${isTransparent ? 'text-white hover:bg-white/10' : 'text-slate-700 hover:bg-slate-100'}`}
            style={{ minHeight: '48px', minWidth: '48px' }}
            aria-label="Toggle navigation menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="xl:hidden bg-white border-t shadow-xl overflow-hidden"
              style={{ borderColor: 'var(--light-border)' }}
            >
              <div className="section-container py-4 space-y-1">
                {navLinks.map((link) => (
                  <div key={link.path}>
                    <Link
                      to={link.path}
                      className="block px-4 py-3 rounded-lg text-slate-700 hover:text-medihub-blue hover:bg-blue-50 font-heading font-medium transition-colors"
                      style={{ fontSize: '15px', color: location.pathname === link.path ? 'var(--medihub-blue)' : undefined }}
                    >
                      {link.label}
                    </Link>
                    {link.children && (
                      <div className="ml-4 mt-1 space-y-1">
                        {link.children.map((child) => (
                          <Link
                            key={child.path}
                            to={child.path}
                            className="block px-4 py-2 text-sm text-slate-500 hover:text-medihub-blue hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="pt-4 flex flex-col gap-3 border-t" style={{ borderColor: 'var(--light-border)' }}>
                  <Link to="/client-portal" className="btn-outline w-full text-center">Client Portal</Link>
                  <Link to="/quote" className="btn-primary w-full text-center">Get a Quote</Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
}