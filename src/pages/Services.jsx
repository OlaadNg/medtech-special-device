import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Wrench, HeadphonesIcon, GraduationCap, Building2, CheckCircle2, ArrowRight, Clock, AlertCircle, BarChart3, Shield } from 'lucide-react';
import PageHero from '../components/shared/PageHero';

const services = [
  {
    id: 'clinical',
    icon: Wrench,
    title: 'Clinical Engineering',
    color: '#005BAA',
    summary: 'Comprehensive lifecycle management for all medical equipment — from incoming inspection through planned maintenance and end-of-life.',
    offerings: [
      'Equipment Installation & Commissioning',
      'Planned Preventive Maintenance (PPM)',
      'Calibration & Safety Testing',
      'Equipment Repairs & Modifications',
      'Compliance & SABS Testing',
      'Equipment Replacement Planning',
      'Asset Management & Tracking',
      'Incoming Inspection Services',
    ],
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=800&q=80&auto=format&fit=crop',
    metric1: { value: '150+', label: 'Certified Engineers' },
    metric2: { value: '98%', label: 'First-Time Fix Rate' },
  },
  {
    id: 'support',
    icon: HeadphonesIcon,
    title: 'Technical Support',
    color: '#00A37B',
    summary: '24/7 multi-tier support from telephone triage through remote diagnostics to emergency onsite response — ensuring critical equipment is always operational.',
    offerings: [
      '24/7 Technical Helpdesk',
      'Remote Diagnostic Support',
      'Same-Day Onsite Response',
      'Emergency 4-Hour SLA',
      'Spare Parts Management',
      'Warranty Management',
      'Software Updates & Upgrades',
      'Network & Connectivity Support',
    ],
    image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80&auto=format&fit=crop',
    metric1: { value: '4hr', label: 'Critical Response' },
    metric2: { value: '24/7', label: 'Support Coverage' },
  },
  {
    id: 'consulting',
    icon: Building2,
    title: 'Healthcare Consulting',
    color: '#00A8E8',
    summary: 'Strategic advisory services to help healthcare institutions plan, procure, and implement the right technology solutions for their specific environment.',
    offerings: [
      'Hospital Planning & Design Support',
      'Equipment Needs Assessment',
      'Technology Roadmap Development',
      'Procurement Strategy Advisory',
      'Facility Setup Coordination',
      'Health Technology Assessment (HTA)',
      'Regulatory Compliance Advisory',
      'Total Cost of Ownership Analysis',
    ],
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80&auto=format&fit=crop',
    metric1: { value: '200+', label: 'Projects Delivered' },
    metric2: { value: '35+', label: 'Years Experience' },
  },
  {
    id: 'training',
    icon: GraduationCap,
    title: 'Training Services',
    color: '#6B46C1',
    summary: 'Comprehensive training programmes for clinical staff, biomedical engineers, and technical teams — ensuring safe and effective use of all MedTech-supplied equipment.',
    offerings: [
      'Clinical User Training (Nurses & Doctors)',
      'Biomedical Engineer Technical Training',
      'Manufacturer-Certified Training',
      'Online Learning Platform Access',
      'Competency Assessment & Certification',
      'Refresher & Advanced Courses',
      'New Staff Onboarding Programmes',
      'International Manufacturer Training',
    ],
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&q=80&auto=format&fit=crop',
    metric1: { value: '5000+', label: 'Staff Trained Annually' },
    metric2: { value: '40+', label: 'Training Programmes' },
  },
];

const supportTiers = [
  { level: 'Tier 1', name: 'Remote Support', time: 'Immediate', icon: HeadphonesIcon, desc: 'Telephone and video-assisted troubleshooting with trained technical staff.' },
  { level: 'Tier 2', name: 'Remote Diagnostics', time: 'Within 2 hours', icon: BarChart3, desc: 'Advanced remote access diagnostics, software issue resolution, and configuration support.' },
  { level: 'Tier 3', name: 'Onsite Response', time: '4-hour SLA', icon: Wrench, desc: 'Factory-trained engineer dispatched to site for hands-on repair and maintenance.' },
  { level: 'Tier 4', name: 'Critical Emergency', time: 'Immediate Dispatch', icon: AlertCircle, desc: 'Emergency response for life-critical equipment failures in ICU, theatre, and emergency units.' },
];

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const supportRef = useRef(null);
  const supportInView = useInView(supportRef, { once: true, margin: '-80px' });

  return (
    <div>
      <PageHero
        label="Our Services"
        title="Complete Lifecycle Support for Your Medical Equipment"
        subtitle="From installation and training to 24/7 maintenance and emergency response — MedTech supports your technology through its entire lifecycle."
        image="https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=1920&q=80"
      />

      {/* Services */}
      {services.map((service, i) => {
        const Icon = service.icon;
        const isEven = i % 2 === 0;
        return (
          <section key={service.id} id={service.id} className={`py-24 ${isEven ? 'bg-white' : ''}`} style={{ background: isEven ? 'white' : 'var(--clinical-mist)' }}>
            <div className="section-container">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}>
                <div className={isEven ? '' : 'lg:order-2'}>
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: service.color }}>
                    <Icon size={26} className="text-white" />
                  </div>
                  <h2 className="font-heading font-black text-3xl lg:text-4xl mb-5" style={{ color: 'var(--midnight-navy)' }}>{service.title}</h2>
                  <p className="font-body text-lg leading-relaxed mb-8" style={{ color: 'var(--slate-text)' }}>{service.summary}</p>
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {service.offerings.map(item => (
                      <div key={item} className="flex items-start gap-2">
                        <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" style={{ color: service.color }} />
                        <span className="font-body text-sm" style={{ color: 'var(--midnight-navy)', fontSize: '13.5px' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-6 mb-8">
                    {[service.metric1, service.metric2].map(m => (
                      <div key={m.label}>
                        <div className="font-heading font-black text-2xl" style={{ color: service.color }}>{m.value}</div>
                        <div className="font-body text-xs" style={{ color: 'var(--slate-text)' }}>{m.label}</div>
                      </div>
                    ))}
                  </div>
                  <Link to="/contact" className="btn-primary" style={{ background: service.color }}>
                    Enquire About {service.title} <ArrowRight size={16} />
                  </Link>
                </div>
                <div className={isEven ? '' : 'lg:order-1'}>
                  <img src={service.image} alt={`MedTech ${service.title} professionals in a hospital environment`} className="rounded-3xl shadow-xl w-full object-cover" style={{ height: '440px' }} />
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* Support tiers */}
      <section ref={supportRef} className="py-24" style={{ background: 'var(--midnight-navy)' }}>
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={supportInView ? { opacity: 1, y: 0 } : {}} className="text-center mb-14">
            <span className="text-xs font-heading uppercase tracking-widest text-white/50 mb-4 block">Support Structure</span>
            <h2 className="font-heading font-black text-4xl text-white">Tiered Support for Every Situation</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {supportTiers.map((tier, i) => {
              const Icon = tier.icon;
              return (
                <motion.div key={tier.level} initial={{ opacity: 0, y: 30 }} animate={supportInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1 }}
                  className="glass-card rounded-2xl p-6">
                  <div className="text-xs font-mono font-semibold mb-4 text-white/40" style={{ fontFamily: 'var(--font-mono)' }}>{tier.level}</div>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(0,168,232,0.2)' }}>
                    <Icon size={22} style={{ color: '#00A8E8' }} />
                  </div>
                  <h3 className="font-heading font-bold text-white mb-1">{tier.name}</h3>
                  <div className="flex items-center gap-1.5 mb-3">
                    <Clock size={12} style={{ color: 'var(--vital-green)' }} />
                    <span className="text-xs font-mono" style={{ color: 'var(--vital-green)', fontFamily: 'var(--font-mono)' }}>{tier.time}</span>
                  </div>
                  <p className="text-white/55 text-sm font-body">{tier.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}