import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import PageHero from '../components/shared/PageHero';

const faqs = [
  { id: 1, category: 'Products', question: 'Are all MedTech products genuine and from original manufacturers?', answer: 'Absolutely. MedTech is an authorised distributor and service agent for all 100+ manufacturers we represent. All products are genuine, come with full manufacturer warranty, and are supported by factory-trained engineers. We do not supply grey-market or counterfeit equipment.' },
  { id: 2, category: 'Products', question: 'Can I request a product demonstration before purchasing?', answer: 'Yes. We have demonstration facilities in all our major offices and can arrange onsite demonstrations for most product categories. For large capital equipment, we can often arrange visits to reference sites where our equipment is installed. Contact your regional sales team to arrange a demo.' },
  { id: 3, category: 'Products', question: 'Do you supply products not listed on your website?', answer: 'Our website showcases a selection of our range. With 100+ manufacturer partnerships, we can source virtually any medical device not listed. Contact our sales team with your requirements and we will source and quote within 48 hours.' },
  { id: 4, category: 'Warranty & Service', question: 'What warranty do MedTech products carry?', answer: 'All products carry the original manufacturer warranty, typically 12-24 months depending on the product category. MediHub also offers extended warranty contracts and service agreements that cover the full lifecycle of your equipment. Our warranty claims are processed within 5 business days.' },
  { id: 5, category: 'Warranty & Service', question: 'What is your service response time for equipment breakdowns?', answer: 'We operate a tiered support model: Tier 1 (telephone support) is immediate, Tier 2 (remote diagnostics) within 2 hours, Tier 3 (onsite response) within 4 hours for critical equipment, and same-day for standard equipment. We have engineers based across South Africa and in regional African offices.' },
  { id: 6, category: 'Warranty & Service', question: 'Do you provide planned preventive maintenance services?', answer: 'Yes. Our Planned Preventive Maintenance (PPM) programmes are customised to each facility and equipment type. We follow manufacturer-recommended schedules and all PPM services are documented with compliance certificates. PPM can be included in annual service contracts.' },
  { id: 7, category: 'Ordering & Procurement', question: 'Can government institutions procure from MediHub on approved frameworks?', answer: 'Yes. MediHub is registered on multiple government procurement frameworks including National Treasury frameworks, Provincial Department of Health preferred supplier lists, and cooperative procurement contracts. We hold B-BBEE Level 2 status and are fully PFMA compliant.' },
  { id: 8, category: 'Ordering & Procurement', question: 'What payment terms do you offer?', answer: 'For approved accounts, we offer 30-day payment terms. For government institutions, we align to PFMA 30-day payment requirements. We also offer instalment payment plans for smaller clinics and provide assistance with financing applications through our banking partners for large capital equipment.' },
  { id: 9, category: 'Ordering & Procurement', question: 'How long does delivery take?', answer: 'Stock items are delivered within 5-10 business days within South Africa. For imported equipment, lead times are typically 6-12 weeks from order confirmation. We maintain local stock on fast-moving items to minimise lead times. Emergency stock is available for critical care equipment.' },
  { id: 10, category: 'Technical Support', question: 'Do you offer training when we purchase equipment?', answer: 'All equipment purchases include initial operator training for clinical staff and technical training for biomedical engineers. Advanced training, refresher courses, and manufacturer-specific certification programmes are available through our Training Services division.' },
  { id: 11, category: 'Technical Support', question: 'Can you support equipment not originally purchased from MediHub?', answer: 'In many cases, yes. For manufacturers where we hold authorised service agent status, we can provide maintenance, calibration, and support for equipment not originally supplied by us. Contact our technical team with equipment details to confirm coverage.' },
  { id: 12, category: 'Technical Support', question: 'Do you have spare parts availability for critical equipment?', answer: 'We maintain a strategic spare parts inventory for critical care equipment categories. Our parts management system ensures rapid availability, and we have relationships with all major manufacturer parts depots for next-day international sourcing when required.' },
];

const categories = ['All', 'Products', 'Warranty & Service', 'Ordering & Procurement', 'Technical Support'];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const filtered = faqs.filter(f => {
    const matchCat = activeCategory === 'All' || f.category === activeCategory;
    const matchSearch = !search || f.question.toLowerCase().includes(search.toLowerCase()) || f.answer.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div>
      <PageHero
        label="FAQ"
        title="Frequently Asked Questions"
        subtitle="Find answers to common questions about our products, services, warranty, and procurement processes."
        image="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80"
      />

      <section className="py-12 bg-white border-b" style={{ borderColor: 'var(--light-border)' }}>
        <div className="section-container">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className="px-4 py-2 rounded-full text-sm font-heading font-medium transition-all" style={{ background: activeCategory === cat ? 'var(--medihub-blue)' : 'var(--clinical-mist)', color: activeCategory === cat ? 'white' : 'var(--slate-text)', minHeight: '40px' }}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--slate-text)' }} />
              <input type="text" placeholder="Search questions..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 pr-4 py-2.5 rounded-xl border font-body text-sm focus:outline-none w-56" style={{ borderColor: 'var(--light-border)', minHeight: '44px' }} />
            </div>
          </div>
        </div>
      </section>

      <section ref={ref} className="py-16" style={{ background: 'var(--clinical-mist)' }}>
        <div className="section-container max-w-3xl mx-auto">
          <div className="space-y-3">
            {filtered.map((faq, i) => (
              <motion.div key={faq.id} initial={{ opacity: 0, y: 15 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.04 }}
                className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: expanded === faq.id ? 'var(--medihub-blue)' : 'var(--light-border)', borderWidth: expanded === faq.id ? '2px' : '1px' }}>
                <button onClick={() => setExpanded(expanded === faq.id ? null : faq.id)} className="w-full p-6 text-left flex items-center justify-between gap-4" style={{ minHeight: '72px' }}>
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-heading font-semibold px-2.5 py-1 rounded-full flex-shrink-0 mt-0.5" style={{ background: 'var(--clinical-mist)', color: 'var(--medihub-blue)', fontSize: '11px' }}>{faq.category}</span>
                    <span className="font-heading font-semibold text-base" style={{ color: 'var(--midnight-navy)' }}>{faq.question}</span>
                  </div>
                  <div className="flex-shrink-0">
                    {expanded === faq.id ? <ChevronUp size={18} style={{ color: 'var(--medihub-blue)' }} /> : <ChevronDown size={18} style={{ color: 'var(--slate-text)' }} />}
                  </div>
                </button>
                <AnimatePresence>
                  {expanded === faq.id && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                      <div className="px-6 pb-6 border-t" style={{ borderColor: 'var(--light-border)' }}>
                        <p className="font-body text-base leading-relaxed mt-4" style={{ color: 'var(--slate-text)' }}>{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 text-center p-8 rounded-3xl" style={{ background: 'var(--midnight-navy)' }}>
            <h3 className="font-heading font-bold text-white text-xl mb-2">Still Have Questions?</h3>
            <p className="text-white/60 font-body text-sm mb-5">Our team is available to answer any specific queries about our products, services, or procurement processes.</p>
            <a href="/contact" className="btn-primary">Contact Our Team</a>
          </div>
        </div>
      </section>
    </div>
  );
}