import { motion } from 'framer-motion';

const partners = [
  'Groote Schuur Hospital', 'Charlotte Maxeke Hospital', 'Netcare Group',
  'Life Healthcare', 'MediClinic', 'Wits Donald Gordon',
  'Steve Biko Academic', 'NHLS', 'Discovery Health', 'SANBS'
];

export default function TrustedBy() {
  return (
    <section className="py-10 border-b" style={{ background: 'var(--clinical-mist)', borderColor: 'var(--light-border)' }}>
      <div className="section-container">
        <p className="text-center text-xs font-heading uppercase tracking-widest mb-6" style={{ color: 'var(--slate-text)' }}>
          Trusted by the world's leading healthcare institutions
        </p>
        <div className="overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10" style={{ background: 'linear-gradient(90deg, var(--clinical-mist), transparent)' }} />
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10" style={{ background: 'linear-gradient(270deg, var(--clinical-mist), transparent)' }} />
          <motion.div
            animate={{ x: ['0%', '-50%'] }}
            transition={{ repeat: Infinity, duration: 30, ease: 'linear' }}
            className="flex items-center gap-12 whitespace-nowrap"
          >
            {[...partners, ...partners].map((name, i) => (
              <div key={i} className="flex items-center gap-3 flex-shrink-0">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'var(--medihub-blue)', opacity: 0.15 }}>
                  <span className="font-heading font-black text-xs" style={{ color: 'var(--medihub-blue)', opacity: 1 }}>M</span>
                </div>
                <span className="text-sm font-heading font-medium" style={{ color: 'var(--slate-text)' }}>{name}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}