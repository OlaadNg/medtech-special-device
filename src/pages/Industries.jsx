import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Building2, Heart, Shield, BookOpen, Globe, Stethoscope, Users, ArrowRight } from 'lucide-react';
import PageHero from '../components/shared/PageHero';

const industries = [
  {
    icon: Shield,
    title: 'Public Healthcare',
    color: '#005BAA',
    image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=700&q=80',
    stats: ['200+ Public Hospitals', '15 Provinces', 'PFMA Compliant', 'B-BBEE Level 2'],
    description: 'We are South Africa\'s most experienced supplier to public healthcare institutions. From national referral hospitals to district-level clinics, we understand the complexities of government procurement, budget constraints, and the NHI landscape.',
  },
  {
    icon: Heart,
    title: 'Private Healthcare',
    color: '#00A37B',
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=700&q=80',
    stats: ['300+ Private Facilities', 'Premium Brands', '48hr Deployment', 'Dedicated Account'],
    description: 'Private healthcare groups demand the latest technology and premium service. We partner with Netcare, Life Healthcare, Mediclinic, and hundreds of independent practices to deliver state-of-the-art medical technology with minimal disruption.',
  },
  {
    icon: Shield,
    title: 'Military Healthcare',
    color: '#2D3748',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=700&q=80',
    stats: ['SANDF Partner', 'Rugged Equipment', 'Mobile Units', 'Secure Supply Chain'],
    description: 'We supply specialised medical equipment to SANDF medical units and military healthcare facilities, including field hospital equipment, rugged portable devices, and mobile surgical units for deployment scenarios.',
  },
  {
    icon: BookOpen,
    title: 'Academic Healthcare',
    color: '#6B46C1',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=700&q=80',
    stats: ['25+ Universities', 'Research-Grade', 'IQ/OQ/PQ Support', 'Academic Pricing'],
    description: 'Academic hospitals and medical schools require research-grade, validated equipment with full documentation support. We provide IQ/OQ/PQ validation, academic pricing programmes, and partnerships with postgraduate training facilities.',
  },
  {
    icon: Stethoscope,
    title: 'Specialist Care',
    color: '#D53F8C',
    image: 'https://images.unsplash.com/photo-1628348070889-cb656235b4eb?w=700&q=80',
    stats: ['400+ Specialists', '20+ Specialties', 'Application Support', 'Demo Equipment'],
    description: 'Cardiology, oncology, orthopaedics, neurology, radiology — every specialty requires precision technology and expert application support. Our specialist divisions provide deep clinical and technical expertise for each discipline.',
  },
  {
    icon: Globe,
    title: 'Primary Healthcare',
    color: '#C05621',
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=700&q=80',
    stats: ['POC Solutions', 'Solar Compatible', 'Rugged Design', 'Simple Training'],
    description: 'Primary healthcare in Africa faces unique challenges — power instability, limited technical staff, and remote locations. We offer point-of-care solutions, solar-compatible equipment, and simplified training for frontline healthcare settings.',
  },
];

export default function Industries() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div>
      <PageHero
        label="Industries We Serve"
        title="Specialised Solutions for Every Healthcare Sector"
        subtitle="From national referral hospitals to remote primary care clinics — MedTech understands the unique demands of every healthcare environment."
        image="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80"
      />

      <section ref={ref} className="py-24 bg-white">
        <div className="section-container">
          <div className="space-y-20">
            {industries.map((ind, i) => {
              const Icon = ind.icon;
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={ind.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-14 items-center ${!isEven ? 'lg:[&>*:first-child]:order-2' : ''}`}
                >
                  <div>
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6" style={{ background: ind.color }}>
                      <Icon size={26} className="text-white" />
                    </div>
                    <h2 className="font-heading font-black text-3xl mb-4" style={{ color: 'var(--midnight-navy)' }}>{ind.title}</h2>
                    <p className="font-body text-lg leading-relaxed mb-6" style={{ color: 'var(--slate-text)' }}>{ind.description}</p>
                    <div className="flex flex-wrap gap-3 mb-8">
                      {ind.stats.map(stat => (
                        <span key={stat} className="px-4 py-2 rounded-full text-sm font-heading font-semibold" style={{ background: `${ind.color}12`, color: ind.color }}>
                          {stat}
                        </span>
                      ))}
                    </div>
                    <Link to="/solutions" className="btn-outline flex items-center gap-2 w-fit" style={{ color: ind.color, borderColor: ind.color }}>
                      Explore Solutions <ArrowRight size={16} />
                    </Link>
                  </div>
                  <div>
                    <img src={ind.image} alt={`MedTech ${ind.title} medical solutions and equipment`} className="rounded-3xl shadow-xl w-full object-cover" style={{ height: '400px' }} />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}