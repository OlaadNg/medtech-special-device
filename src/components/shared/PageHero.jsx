import { motion } from 'framer-motion';

export default function PageHero({ label, title, subtitle, image, children }) {
  return (
    <section className="relative overflow-hidden" style={{ minHeight: '420px', background: 'var(--midnight-navy)' }}>
      {image && (
        <div className="absolute inset-0">
          <img src={image} alt="" className="w-full h-full object-cover opacity-25" aria-hidden="true" />
          <div className="absolute inset-0 hero-overlay opacity-80" />
        </div>
      )}

      {/* Pulse line */}
      <div className="absolute left-1/3 top-0 bottom-0 w-px opacity-10" style={{ background: 'linear-gradient(180deg, transparent, white, transparent)' }} />

      <div className="relative z-10 section-container py-24 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          {label && (
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8" style={{ background: 'var(--vital-green)' }} />
              <span className="text-sm font-heading font-semibold uppercase tracking-widest" style={{ color: 'var(--vital-green)' }}>
                {label}
              </span>
            </div>
          )}
          <h1 className="font-heading font-black text-white mb-5" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
            {title}
          </h1>
          {subtitle && (
            <p className="font-body text-lg text-white/70 leading-relaxed max-w-2xl" style={{ fontSize: '1.1rem' }}>
              {subtitle}
            </p>
          )}
          {children && <div className="mt-8">{children}</div>}
        </motion.div>
      </div>
    </section>
  );
}