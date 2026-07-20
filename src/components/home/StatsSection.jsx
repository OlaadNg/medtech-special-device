import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useCountUp } from '../../hooks/useCountUp';

const stats = [
  { value: 13, suffix: '+', label: 'Years of Excellence', description: 'Serving the surgical device community since 2013' },
  { value: 500, suffix: '+', label: 'Healthcare Facilities', description: 'Hospitals, clinics, and health centres' },
  { value: 10000, suffix: '+', label: 'Products Installed', description: 'Shipped worldwide internationally' },
  { value: 15, suffix: '+', label: 'Countries Served', description: 'Active distribution network worldwide' },
  { value: 100, suffix: '+', label: 'Global Partners', description: 'World-leading equipment manufacturers' },
  { value: 150, suffix: '+', label: 'Certified Engineers', description: 'Factory-trained clinical engineers' },
];

function StatItem({ stat, inView }) {
  const count = useCountUp(stat.value, inView, 2000);
  return (
    <div className="text-center">
      <div className="font-heading font-black mb-2" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', letterSpacing: '-0.03em', background: 'linear-gradient(135deg, white, rgba(255,255,255,0.7))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
        {count.toLocaleString()}{stat.suffix}
      </div>
      <div className="font-heading font-semibold text-lg mb-1" style={{ color: 'rgba(255,255,255,0.9)' }}>{stat.label}</div>
      <div className="font-body text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{stat.description}</div>
    </div>
  );
}

export default function StatsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden" style={{ background: 'var(--midnight-navy)' }}>
      {/* Decorative */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full" style={{ background: 'var(--medihub-blue)', filter: 'blur(100px)' }} />
        <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full" style={{ background: 'var(--surgical-teal)', filter: 'blur(100px)' }} />
      </div>
      
      {/* Pulse lines */}
      <div className="absolute left-1/4 top-0 bottom-0 w-px opacity-10" style={{ background: 'linear-gradient(180deg, transparent, white, transparent)' }} />
      <div className="absolute right-1/4 top-0 bottom-0 w-px opacity-10" style={{ background: 'linear-gradient(180deg, transparent, white, transparent)' }} />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-heading uppercase tracking-widest" style={{ color: 'var(--vital-green)' }}>
            — Our Impact —
          </span>
          <h2 className="font-heading font-black text-4xl lg:text-5xl text-white mt-4" style={{ letterSpacing: '-0.02em' }}>
            The Numbers That Define Us
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8 lg:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <StatItem stat={stat} inView={inView} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}