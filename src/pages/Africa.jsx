import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Globe, Users, Wrench, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageHero from '../components/shared/PageHero';

const countries = [
  { name: 'South Africa', role: 'Headquarters & Primary Operations', office: 'Johannesburg, Cape Town, Durban, Pretoria', status: 'full', flag: '🇿🇦' },
  { name: 'Kenya', role: 'East Africa Regional Hub', office: 'Nairobi', status: 'full', flag: '🇰🇪' },
  { name: 'Nigeria', role: 'West Africa Regional Office', office: 'Lagos, Abuja', status: 'full', flag: '🇳🇬' },
  { name: 'Tanzania', role: 'Distribution Partner', office: 'Dar es Salaam', status: 'partner', flag: '🇹🇿' },
  { name: 'Uganda', role: 'Distribution Partner', office: 'Kampala', status: 'partner', flag: '🇺🇬' },
  { name: 'Zambia', role: 'Southern Africa Operations', office: 'Lusaka', status: 'full', flag: '🇿🇲' },
  { name: 'Zimbabwe', role: 'Distribution Partner', office: 'Harare', status: 'partner', flag: '🇿🇼' },
  { name: 'Botswana', role: 'Distribution Partner', office: 'Gaborone', status: 'partner', flag: '🇧🇼' },
  { name: 'Mozambique', role: 'Distribution Partner', office: 'Maputo', status: 'partner', flag: '🇲🇿' },
  { name: 'Namibia', role: 'Distribution Partner', office: 'Windhoek', status: 'partner', flag: '🇳🇦' },
  { name: 'Ghana', role: 'West Africa Partner', office: 'Accra', status: 'partner', flag: '🇬🇭' },
  { name: 'Ethiopia', role: 'Distribution Partner', office: 'Addis Ababa', status: 'partner', flag: '🇪🇹' },
  { name: 'Rwanda', role: 'Distribution Partner', office: 'Kigali', status: 'partner', flag: '🇷🇼' },
  { name: 'Angola', role: 'Distribution Partner', office: 'Luanda', status: 'partner', flag: '🇦🇴' },
  { name: "Côte d'Ivoire", role: 'Distribution Partner', office: 'Abidjan', status: 'partner', flag: '🇨🇮' },
];

const projects = [
  { country: 'Kenya', project: 'Kenyatta National Hospital ICU Expansion', description: 'Complete ICU setup — 40 beds with Mindray BeneVision monitors, Dräger ventilators, and infusion systems.', year: '2025', value: 'R45M' },
  { country: 'Nigeria', project: 'Lagos University Teaching Hospital Digital Radiology', description: 'Full PACS implementation, 3x digital X-ray systems, and CT scanner for the radiology department.', year: '2025', value: 'R62M' },
  { country: 'Tanzania', project: 'Muhimbili National Hospital Theatre Upgrade', description: '6 new theatre suites with Maquet operating tables, Dräger anaesthesia, and integrated surgical lighting.', year: '2024', value: 'R38M' },
  { country: 'Zambia', project: 'University Teaching Hospital, Lusaka — ICU & Emergency', description: 'Complete equipment supply and clinical engineering setup for new ICU and trauma emergency unit.', year: '2024', value: 'R27M' },
];

const stats = [
  { value: '15+', label: 'Countries Active' },
  { value: '2,500+', label: 'Units Exported Annually' },
  { value: '8', label: 'African Offices' },
  { value: '45+', label: 'Export Clients' },
];

export default function Africa() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div>
      <PageHero
        label="Africa Operations"
        title="Delivering Healthcare Innovation Across the African Continent"
        subtitle="From Cape Town to Cairo — MedTech's pan-African distribution network, regional offices, and clinical engineering teams ensure world-class medical technology reaches every corner of Africa."
        image="https://images.unsplash.com/photo-1596797038530-2c107229654b?w=1920&q=80"
      />

      {/* Stats */}
      <section className="py-16" style={{ background: 'var(--medihub-blue)' }}>
        <div className="section-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="text-center">
                <p className="font-heading font-black text-white text-4xl mb-1">{s.value}</p>
                <p className="text-white/65 font-body text-sm">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Countries */}
      <section ref={ref} className="py-20 bg-white">
        <div className="section-container">
          <div className="text-center mb-12">
            <span className="section-label mb-4">Our Footprint</span>
            <h2 className="font-heading font-black text-4xl mt-4" style={{ color: 'var(--midnight-navy)' }}>Active Across 15 African Countries</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {countries.map((country, i) => (
              <motion.div key={country.name} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.04 }}
                className="flex items-center gap-4 p-4 rounded-2xl border card-hover" style={{ borderColor: country.status === 'full' ? 'var(--medihub-blue)' : 'var(--light-border)', borderWidth: country.status === 'full' ? '2px' : '1px' }}>
                <div className="text-3xl">{country.flag}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading font-bold text-sm" style={{ color: 'var(--midnight-navy)' }}>{country.name}</h3>
                    {country.status === 'full' && <span className="text-xs font-mono px-2 py-0.5 rounded-full" style={{ background: 'rgba(0,91,170,0.1)', color: 'var(--medihub-blue)', fontFamily: 'var(--font-mono)' }}>OFFICE</span>}
                  </div>
                  <p className="font-body text-xs" style={{ color: 'var(--slate-text)' }}>{country.role}</p>
                  <p className="font-body text-xs flex items-center gap-1 mt-0.5" style={{ color: 'var(--slate-text)' }}><MapPin size={10} />{country.office}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20" style={{ background: 'var(--clinical-mist)' }}>
        <div className="section-container">
          <div className="text-center mb-12">
            <span className="section-label mb-4">African Healthcare Projects</span>
            <h2 className="font-heading font-black text-4xl mt-4" style={{ color: 'var(--midnight-navy)' }}>Landmark Projects Across the Continent</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {projects.map((p, i) => (
              <motion.div key={p.project} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border card-hover" style={{ borderColor: 'var(--light-border)' }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Globe size={16} style={{ color: 'var(--medihub-blue)' }} />
                    <span className="font-heading font-bold text-sm" style={{ color: 'var(--medihub-blue)' }}>{p.country}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xs" style={{ color: 'var(--slate-text)', fontFamily: 'var(--font-mono)' }}>{p.year} · {p.value}</span>
                  </div>
                </div>
                <h3 className="font-heading font-bold text-base mb-2" style={{ color: 'var(--midnight-navy)' }}>{p.project}</h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--slate-text)' }}>{p.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Export CTA */}
      <section className="py-20 bg-white">
        <div className="section-container text-center max-w-2xl mx-auto">
          <h2 className="font-heading font-black text-3xl mb-4" style={{ color: 'var(--midnight-navy)' }}>Expand Healthcare in Your Country</h2>
          <p className="font-body text-lg mb-8" style={{ color: 'var(--slate-text)' }}>Looking for a reliable medical technology partner for your African country? Contact our Africa Operations team to discuss distribution, service support, or project requirements.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary">Contact Africa Operations <ArrowRight size={16} /></Link>
            <Link to="/partners" className="btn-outline">Become a Distribution Partner</Link>
          </div>
        </div>
      </section>
    </div>
  );
}