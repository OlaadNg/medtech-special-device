import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const divisions = [
  {
    id: 'surgical',
    title: 'Surgical Disposables',
    description: 'Sterile gloves, gowns, masks, drapes, sutures, scalpel blades, and instruments for every surgical procedure.',
    image: 'https://media.base44.com/images/public/6a2dc1968bf71040c439ca75/6db4fe34e_generated_image.png',
    color: '#005BAA',
    count: '10 Products',
    category: 'Surgical Instruments & Disposables',
  },
  {
    id: 'diagnostic',
    title: 'Diagnostic Devices',
    description: 'Thermometers, blood pressure cuffs, stethoscopes, pulse oximeters, and nebulizers for everyday clinical care.',
    image: 'https://media.base44.com/images/public/6a2dc1968bf71040c439ca75/c4f2c182e_generated_image.png',
    color: '#00A37B',
    count: '5 Products',
    category: 'Diagnostic Equipment',
  },
];

export default function CareDivisions() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-24" style={{ background: 'var(--clinical-mist)' }}>
      <div className="section-container">
        <div ref={ref} className="text-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <span className="section-label mb-4">Care Divisions</span>
            <h2 className="font-heading font-black text-4xl lg:text-5xl mt-4 mb-5" style={{ color: 'var(--midnight-navy)' }}>
              Trusted Supplies<br />For Everyday Care
            </h2>
            <p className="max-w-2xl mx-auto font-body text-lg" style={{ color: 'var(--slate-text)' }}>
              From the operating theatre to the consulting room — MedTech delivers reliable surgical disposables and diagnostic devices for healthcare facilities worldwide.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {divisions.map((div, i) => (
            <motion.div
              key={div.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Link to={`/products?category=${encodeURIComponent(div.category)}`} className="group block">
                <div className="relative overflow-hidden rounded-2xl card-hover" style={{ background: 'white' }}>
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={div.image}
                      alt={`${div.title} medical supplies`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="text-xs font-mono text-white/70 font-medium" style={{ fontFamily: 'var(--font-mono)' }}>{div.count}</span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: div.color }} />
                  </div>

                  <div className="p-6">
                    <h3 className="font-heading font-bold text-lg mb-2 group-hover:text-medihub-blue transition-colors" style={{ color: 'var(--midnight-navy)' }}>
                      {div.title}
                    </h3>
                    <p className="font-body text-sm leading-relaxed mb-4" style={{ color: 'var(--slate-text)' }}>
                      {div.description}
                    </p>
                    <div className="flex items-center gap-1 text-sm font-heading font-semibold transition-colors group-hover:gap-2" style={{ color: div.color }}>
                      Learn More <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}