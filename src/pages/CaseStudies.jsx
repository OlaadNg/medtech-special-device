import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Quote, TrendingUp } from 'lucide-react';
import PageHero from '../components/shared/PageHero';

const caseStudies = [
  {
    id: 1,
    title: 'Charlotte Maxeke Hospital Reduces ICU Equipment Downtime by 94%',
    client: 'Charlotte Maxeke Academic Hospital',
    industry: 'Public Healthcare',
    location: 'Johannesburg, South Africa',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=700&q=80',
    challenge: 'Aging ICU equipment with frequent unplanned breakdowns was impacting patient care and consuming the biomedical engineering team with reactive maintenance.',
    solution: 'MediHub implemented a Planned Preventive Maintenance programme with real-time fleet monitoring across 120 ICU devices, factory-trained engineer assignment, and strategic spare parts pre-positioning.',
    metrics: [{ label: 'Equipment Downtime Reduction', value: '94%' }, { label: 'Mean Time to Repair', value: '1.2hr' }, { label: 'PPM Compliance Rate', value: '99%' }],
    testimonial: 'MediHub transformed how we manage our critical care equipment. The proactive approach has measurably improved our equipment uptime and taken enormous pressure off our biomedical team.',
    testimonialAuthor: 'Dr. Sarah Mokoena, Head of Critical Care',
  },
  {
    id: 2,
    title: "Kenyatta National Hospital's Complete ICU Transformation",
    client: 'Kenyatta National Hospital',
    industry: 'Public Healthcare',
    location: 'Nairobi, Kenya',
    image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=700&q=80',
    challenge: "Kenya's largest public hospital needed a complete upgrade of its 40-bed ICU to modern standards — on a government budget with strict procurement timelines.",
    solution: 'MediHub supplied and installed a complete 40-bed ICU solution — Mindray BeneVision monitoring system, Dräger Evita ventilators, infusion systems, and ICU beds — within budget and on schedule, with full staff training.',
    metrics: [{ label: 'ICU Beds Equipped', value: '40' }, { label: 'Project Duration', value: '4 months' }, { label: 'Budget Adherence', value: '100%' }],
    testimonial: "MediHub delivered a world-class ICU on an African public healthcare budget. Their project management, technical expertise, and training support were exceptional.",
    testimonialAuthor: 'Prof. James Ngugi, Medical Director',
  },
  {
    id: 3,
    title: 'Life Healthcare Netcare Digitisation Programme — 15 Hospitals',
    client: 'Life Healthcare Group',
    industry: 'Private Healthcare',
    location: 'South Africa',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=700&q=80',
    challenge: 'A leading private hospital group needed to implement a unified EMR and digital imaging system across 15 hospitals while maintaining operational continuity.',
    solution: 'Phased implementation of Cerner Millennium EMR, integrated PACS across all radiology departments, and telemedicine infrastructure — with full staff training and 24/7 IT support.',
    metrics: [{ label: 'Hospitals Connected', value: '15' }, { label: 'Staff Trained', value: '3,200+' }, { label: 'Go-Live Success', value: '100%' }],
    testimonial: 'The MediHub digital health team is the best in Africa. Their clinical expertise combined with technical capability delivered a seamless digitisation programme.',
    testimonialAuthor: 'Ms. Priya Nair, Group CIO, Life Healthcare',
  },
];

export default function CaseStudies() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div>
      <PageHero
        label="Case Studies"
        title="Real-World Healthcare Transformations Across Africa"
        subtitle="Explore how MediHub has partnered with hospitals, clinics, and government institutions to deliver measurable improvements in clinical outcomes and operational efficiency."
        image="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80"
      />

      <section ref={ref} className="py-20 bg-white">
        <div className="section-container">
          <div className="space-y-16">
            {caseStudies.map((study, i) => {
              const isEven = i % 2 === 0;
              return (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.15 }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-14 items-start ${!isEven ? 'lg:[&>*:first-child]:order-2' : ''}`}
                >
                  <div>
                    <img src={study.image} alt={`Case study: ${study.title}`} className="rounded-3xl shadow-xl w-full object-cover" style={{ height: '380px' }} />
                    {/* Testimonial */}
                    <div className="mt-5 p-6 rounded-2xl" style={{ background: 'var(--midnight-navy)' }}>
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3" style={{ background: 'var(--medihub-blue)' }}>
                        <Quote size={16} className="text-white" />
                      </div>
                      <p className="text-white/80 font-body italic leading-relaxed mb-3 text-sm">"{study.testimonial}"</p>
                      <p className="text-white font-heading font-semibold text-xs">{study.testimonialAuthor}</p>
                    </div>
                  </div>

                  <div className="flex flex-col justify-center">
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="text-xs font-heading font-semibold px-3 py-1.5 rounded-full" style={{ background: 'rgba(0,91,170,0.1)', color: 'var(--medihub-blue)' }}>{study.industry}</span>
                      <span className="text-xs font-heading font-semibold px-3 py-1.5 rounded-full" style={{ background: 'var(--clinical-mist)', color: 'var(--slate-text)' }}>{study.location}</span>
                    </div>
                    <h2 className="font-heading font-black text-2xl lg:text-3xl mb-3" style={{ color: 'var(--midnight-navy)' }}>{study.title}</h2>
                    <p className="text-sm font-body mb-6" style={{ color: 'var(--surgical-teal)', fontWeight: 600 }}>{study.client}</p>

                    <div className="mb-5">
                      <h4 className="font-heading font-bold text-sm mb-2 uppercase tracking-wide" style={{ color: 'var(--medihub-blue)' }}>The Challenge</h4>
                      <p className="font-body text-base leading-relaxed" style={{ color: 'var(--slate-text)' }}>{study.challenge}</p>
                    </div>

                    <div className="mb-7">
                      <h4 className="font-heading font-bold text-sm mb-2 uppercase tracking-wide" style={{ color: 'var(--surgical-teal)' }}>The Solution</h4>
                      <p className="font-body text-base leading-relaxed" style={{ color: 'var(--slate-text)' }}>{study.solution}</p>
                    </div>

                    {/* Metrics */}
                    <div className="grid grid-cols-3 gap-4 p-5 rounded-2xl" style={{ background: 'var(--clinical-mist)' }}>
                      {study.metrics.map(m => (
                        <div key={m.label} className="text-center">
                          <div className="font-heading font-black text-2xl mb-1" style={{ color: 'var(--medihub-blue)' }}>{m.value}</div>
                          <div className="font-body text-xs leading-tight" style={{ color: 'var(--slate-text)' }}>{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16" style={{ background: 'var(--clinical-mist)' }}>
        <div className="section-container text-center max-w-2xl mx-auto">
          <h2 className="font-heading font-black text-3xl mb-4" style={{ color: 'var(--midnight-navy)' }}>Ready to Write Your Success Story?</h2>
          <p className="font-body text-lg mb-8" style={{ color: 'var(--slate-text)' }}>Let's discuss how MediHub can help transform your healthcare facility with the right technology, delivered right.</p>
          <Link to="/contact" className="btn-primary">Talk to Our Team <ArrowRight size={16} /></Link>
        </div>
      </section>
    </div>
  );
}