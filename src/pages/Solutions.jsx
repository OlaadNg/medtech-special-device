import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Building2, Heart, Globe, BookOpen, Shield, Microscope, ArrowRight, CheckCircle2 } from 'lucide-react';
import PageHero from '../components/shared/PageHero';

const sectors = [
  {
    id: 'hospitals',
    icon: Building2,
    title: 'Public & Academic Hospitals',
    color: '#005BAA',
    image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=900&q=80&auto=format&fit=crop',
    challenge: 'Large-scale public hospitals require durable, high-throughput equipment across multiple departments — balancing budget constraints with clinical quality.',
    solutions: ['Complete theatre suite equipment supply', 'ICU and high care technology', 'Diagnostic imaging systems', 'Laboratory and pathology solutions', 'Clinical engineering and maintenance', 'Staff training programmes', 'Government tender compliance', 'PFMA-compliant procurement support'],
    outcomes: [{ value: '200+', label: 'Public Hospitals Served' }, { value: '98%', label: 'Equipment Uptime SLA' }, { value: '4hr', label: 'Emergency Response' }],
  },
  {
    id: 'clinics',
    icon: Heart,
    title: 'Private Clinics & Hospitals',
    color: '#00A37B',
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=900&q=80&auto=format&fit=crop',
    challenge: 'Private healthcare demands the latest technology, premium patient experience, and fast deployment with minimal disruption to operations.',
    solutions: ['Premium diagnostic equipment', 'Turnkey theatre solutions', 'Patient monitoring ecosystems', 'Digital health and EMR integration', 'Wellness and aesthetics technology', 'Rapid deployment services', 'Staff training and certification', '24/7 dedicated support account'],
    outcomes: [{ value: '300+', label: 'Private Facilities' }, { value: '48hr', label: 'Rapid Deployment' }, { value: '100%', label: 'Genuine Manufacturer Stock' }],
  },
  {
    id: 'government',
    icon: Shield,
    title: 'Government Health Departments',
    color: '#00A8E8',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&q=80&auto=format&fit=crop',
    challenge: 'Government procurement requires transparent processes, BBBEE compliance, bulk pricing, and scalable delivery across multiple provinces.',
    solutions: ['PFMA-compliant procurement', 'B-BBEE Level 2 supplier', 'Provincial bulk equipment supply', 'NHI readiness assessment', 'Provincial depot management', 'Fleet health monitoring', 'Technical training academies', 'National tender framework participation'],
    outcomes: [{ value: 'B-BBEE', label: 'Level 2 Status' }, { value: '15+', label: 'Provincial Departments' }, { value: '10K+', label: 'Units Delivered' }],
  },
  {
    id: 'academic',
    icon: BookOpen,
    title: 'Academic & Research Institutions',
    color: '#6B46C1',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=900&q=80&auto=format&fit=crop',
    challenge: 'Universities and research centres need advanced, research-grade equipment with full validation support, IQ/OQ/PQ documentation, and laboratory integration.',
    solutions: ['Research-grade laboratory equipment', 'Simulation and training labs', 'IQ/OQ/PQ validation services', 'Grant procurement assistance', 'Academic pricing programmes', 'Research collaboration support', 'Equipment demonstration facilities', 'Postgraduate training partnerships'],
    outcomes: [{ value: '25+', label: 'Universities Served' }, { value: 'Full', label: 'Validation Support' }, { value: 'Grant', label: 'Procurement Assistance' }],
  },
  {
    id: 'ngo',
    icon: Globe,
    title: 'NGOs & Humanitarian Health',
    color: '#C05621',
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=900&q=80&auto=format&fit=crop',
    challenge: 'NGOs operating in resource-constrained environments need rugged, portable, low-power equipment with local language support and remote service capabilities.',
    solutions: ['Solar-powered medical equipment', 'Portable diagnostic devices', 'Point-of-care testing solutions', 'Rugged field equipment', 'Low-maintenance technology', 'Multi-language training materials', 'Humanitarian pricing programmes', 'Remote technical support'],
    outcomes: [{ value: '50+', label: 'NGO Programmes' }, { value: '12', label: 'African Countries' }, { value: 'Special', label: 'Humanitarian Pricing' }],
  },
  {
    id: 'specialist',
    icon: Microscope,
    title: 'Specialist Practices',
    color: '#D53F8C',
    image: 'https://images.unsplash.com/photo-1628348070889-cb656235b4eb?w=900&q=80&auto=format&fit=crop',
    challenge: 'Specialist practices require highly specialised, department-specific technology with manufacturer application support and clinical workflow integration.',
    solutions: ['Specialty-specific product ranges', 'Application specialist support', 'Clinical workflow integration', 'Financing and rental options', 'Demonstration and trial equipment', 'Specialist clinical training', 'Manufacturer application support', 'Practice setup consulting'],
    outcomes: [{ value: '400+', label: 'Specialist Practices' }, { value: '20+', label: 'Specialties Served' }, { value: 'Full', label: 'Application Support' }],
  },
];

export default function Solutions() {
  const [activeTab, setActiveTab] = useState('hospitals');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const active = sectors.find(s => s.id === activeTab);

  return (
    <div>
      <PageHero
        label="Our Solutions"
        title="Tailored Healthcare Technology for Every Setting"
        subtitle="Every healthcare environment is unique. MedTech designs sector-specific solutions for healthcare providers worldwide, addressing your exact clinical, operational, and financial requirements."
        image="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80"
      />

      {/* Sector selector */}
      <section className="py-6 bg-white border-b sticky top-0 z-40" style={{ borderColor: 'var(--light-border)' }}>
        <div className="section-container">
          <div className="flex flex-wrap gap-2">
            {sectors.map(sector => {
              const Icon = sector.icon;
              return (
                <button
                  key={sector.id}
                  onClick={() => setActiveTab(sector.id)}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-heading font-medium transition-all duration-200"
                  style={{
                    background: activeTab === sector.id ? sector.color : 'var(--clinical-mist)',
                    color: activeTab === sector.id ? 'white' : 'var(--slate-text)',
                    minHeight: '44px',
                  }}
                >
                  <Icon size={14} />
                  {sector.title.split(' ')[0]}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Active solution */}
      <section className="py-24 bg-white">
        <div className="section-container">
          {active && (
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
              <div>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: active.color }}>
                  <active.icon size={26} className="text-white" />
                </div>
                <h2 className="font-heading font-black text-3xl lg:text-4xl mb-5" style={{ color: 'var(--midnight-navy)' }}>{active.title}</h2>
                <p className="font-body text-lg leading-relaxed mb-8" style={{ color: 'var(--slate-text)' }}>{active.challenge}</p>

                <h3 className="font-heading font-semibold mb-4" style={{ color: 'var(--midnight-navy)' }}>Our Solutions Include:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {active.solutions.map(item => (
                    <div key={item} className="flex items-start gap-2.5">
                      <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" style={{ color: active.color }} />
                      <span className="font-body text-sm" style={{ color: 'var(--midnight-navy)', fontSize: '13.5px' }}>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-8 p-5 rounded-2xl mb-8" style={{ background: 'var(--clinical-mist)' }}>
                  {active.outcomes.map(o => (
                    <div key={o.label}>
                      <div className="font-heading font-black text-2xl" style={{ color: active.color }}>{o.value}</div>
                      <div className="font-body text-xs" style={{ color: 'var(--slate-text)' }}>{o.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <Link to="/contact" className="btn-primary" style={{ background: active.color }}>
                    Get a Custom Solution <ArrowRight size={16} />
                  </Link>
                  <Link to="/quote" className="btn-outline" style={{ color: active.color, borderColor: active.color }}>
                    Request Quote
                  </Link>
                </div>
              </div>

              <div>
                <img src={active.image} alt={`MedTech ${active.title} healthcare technology solutions`} className="rounded-3xl shadow-xl w-full object-cover" style={{ height: '500px' }} />
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* All sectors grid */}
      <section ref={ref} className="py-24" style={{ background: 'var(--clinical-mist)' }}>
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="text-center mb-14">
            <span className="section-label mb-4">All Sectors</span>
            <h2 className="font-heading font-black text-4xl mt-4" style={{ color: 'var(--midnight-navy)' }}>Every Healthcare Setting, Covered</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {sectors.map((sector, i) => {
              const Icon = sector.icon;
              return (
                <motion.button
                  key={sector.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => { setActiveTab(sector.id); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                  className="text-left group bg-white p-6 rounded-2xl border card-hover"
                  style={{ borderColor: 'var(--light-border)' }}
                >
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110" style={{ background: sector.color }}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="font-heading font-bold mb-2" style={{ color: 'var(--midnight-navy)' }}>{sector.title}</h3>
                  <p className="font-body text-sm leading-relaxed mb-4" style={{ color: 'var(--slate-text)', fontSize: '13.5px' }}>{sector.challenge}</p>
                  <span className="flex items-center gap-1 text-sm font-heading font-semibold group-hover:gap-2 transition-all" style={{ color: sector.color }}>
                    Learn More <ArrowRight size={14} />
                  </span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}