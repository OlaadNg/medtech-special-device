import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Globe, Award, Handshake, ArrowRight, ExternalLink } from 'lucide-react';
import PageHero from '../components/shared/PageHero';
import { Link } from 'react-router-dom';

const partnerCategories = [
  {
    title: 'Global Manufacturer Partners',
    icon: Globe,
    color: '#005BAA',
    description: 'Authorised distributors and service agents for the world\'s most trusted medical equipment manufacturers.',
    partners: [
      { name: 'Philips Healthcare', specialty: 'Patient Monitoring, Imaging', country: 'Netherlands' },
      { name: 'GE Healthcare', specialty: 'Imaging, Diagnostics, Digital Health', country: 'USA' },
      { name: 'Siemens Healthineers', specialty: 'Imaging, Laboratory, Digital', country: 'Germany' },
      { name: 'Mindray', specialty: 'Patient Monitoring, Life Support', country: 'China' },
      { name: 'Dräger', specialty: 'Anaesthesia, Ventilation, Safety', country: 'Germany' },
      { name: 'Getinge (Maquet)', specialty: 'Theatre Equipment, Sterilisation', country: 'Sweden' },
      { name: 'Stryker', specialty: 'Orthopaedics, Emergency, Surgical', country: 'USA' },
      { name: 'Zimmer Biomet', specialty: 'Orthopaedic Implants', country: 'USA' },
      { name: 'Abbott', specialty: 'Laboratory, Diagnostics, Cardiac', country: 'USA' },
      { name: 'Fresenius Kabi', specialty: 'Infusion, ICU Nutrition', country: 'Germany' },
      { name: 'Smiths Medical', specialty: 'Infusion, Respiratory', country: 'USA' },
      { name: 'Nihon Kohden', specialty: 'Neurophysiology, Monitoring', country: 'Japan' },
    ],
  },
  {
    title: 'Technology Partners',
    icon: Award,
    color: '#00A37B',
    description: 'Technology ecosystem partners enabling digital health transformation across African healthcare.',
    partners: [
      { name: 'Oracle Health (Cerner)', specialty: 'Electronic Medical Records', country: 'USA' },
      { name: 'InterSystems', specialty: 'Health Information Systems', country: 'USA' },
      { name: 'Agfa HealthCare', specialty: 'PACS, RIS, Imaging IT', country: 'Belgium' },
      { name: 'Intelerad', specialty: 'Medical Imaging Informatics', country: 'Canada' },
      { name: 'Nuvolo', specialty: 'Connected Workplace, CMMS', country: 'USA' },
      { name: 'Azure (Microsoft)', specialty: 'Cloud Health Platform', country: 'USA' },
    ],
  },
  {
    title: 'Strategic African Partners',
    icon: Handshake,
    color: '#00A8E8',
    description: 'In-country distribution and service partners enabling our pan-African reach.',
    partners: [
      { name: 'East Africa Medical Supplies', specialty: 'Kenya, Uganda, Tanzania', country: 'Kenya' },
      { name: 'West Africa Healthcare Group', specialty: 'Nigeria, Ghana, Ivory Coast', country: 'Nigeria' },
      { name: 'North Africa Med Tech', specialty: 'Egypt, Morocco, Algeria', country: 'Egypt' },
      { name: 'Southern Africa Distributors', specialty: 'Zambia, Zimbabwe, Botswana', country: 'Zambia' },
    ],
  },
];

export default function Partners() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div>
      <PageHero
        label="Our Partners"
        title="Backed by the World's Most Trusted Manufacturers"
        subtitle="MediHub is the authorised distributor and service partner for 100+ leading global medical equipment manufacturers — ensuring genuine products, full warranty, and manufacturer support."
        image="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80"
      />

      {partnerCategories.map((cat, ci) => {
        const Icon = cat.icon;
        return (
          <section key={cat.title} ref={ci === 0 ? ref : null} className={`py-20 ${ci % 2 === 0 ? 'bg-white' : ''}`} style={{ background: ci % 2 !== 0 ? 'var(--clinical-mist)' : 'white' }}>
            <div className="section-container">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: cat.color }}>
                  <Icon size={22} className="text-white" />
                </div>
                <h2 className="font-heading font-black text-3xl" style={{ color: 'var(--midnight-navy)' }}>{cat.title}</h2>
              </div>
              <p className="font-body text-lg mb-10 max-w-2xl" style={{ color: 'var(--slate-text)' }}>{cat.description}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {cat.partners.map((partner, i) => (
                  <motion.div
                    key={partner.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.05 }}
                    className="bg-white rounded-2xl border p-5 card-hover"
                    style={{ borderColor: 'var(--light-border)' }}
                  >
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-heading font-black text-sm mb-4" style={{ background: cat.color }}>
                      {partner.name.charAt(0)}
                    </div>
                    <h3 className="font-heading font-bold text-sm mb-1" style={{ color: 'var(--midnight-navy)' }}>{partner.name}</h3>
                    <p className="font-body text-xs leading-relaxed mb-2" style={{ color: 'var(--slate-text)' }}>{partner.specialty}</p>
                    <span className="text-xs font-mono" style={{ color: 'var(--slate-text)', fontFamily: 'var(--font-mono)' }}>{partner.country}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      {/* Become a partner CTA */}
      <section className="py-20" style={{ background: 'var(--midnight-navy)' }}>
        <div className="section-container text-center max-w-2xl mx-auto">
          <h2 className="font-heading font-black text-3xl text-white mb-4">Become a MediHub Partner</h2>
          <p className="font-body text-white/60 mb-8">Join our network of African distribution and service partners. We provide full training, marketing support, and technical resources.</p>
          <Link to="/contact" className="btn-primary">
            Apply for Partnership <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}