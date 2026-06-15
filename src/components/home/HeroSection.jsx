import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Play, ChevronDown } from 'lucide-react';

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=90&auto=format&fit=crop',
    label: 'Advanced ICU Solutions',
    headline: 'Redefining Healthcare Through',
    highlight: 'Innovative Medical Technology',
  },
  {
    image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1920&q=90&auto=format&fit=crop',
    label: 'Precision Theatre Equipment',
    headline: 'Equipping Hospitals Worldwide',
    highlight: 'With World-Class Technology',
  },
  {
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1920&q=90&auto=format&fit=crop',
    label: 'Digital Health Innovation',
    headline: 'Transforming Patient Care',
    highlight: 'Internationally',
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent(prev => (prev + 1) % heroSlides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const slide = heroSlides[current];

  return (
    <section className="relative w-full overflow-hidden" style={{ height: '100vh', minHeight: '700px' }}>
      {/* Background images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt="Advanced medical technology environment"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-overlay" />
        </motion.div>
      </AnimatePresence>

      {/* Pulse line decoration */}
      <div className="absolute left-24 top-0 bottom-0 w-px opacity-20" style={{ background: 'linear-gradient(180deg, transparent 0%, #00A8E8 30%, #00C896 70%, transparent 100%)' }} />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="section-container w-full">
          <div className="max-w-2xl">
            <motion.div
              key={`label-${current}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="h-px w-8" style={{ background: 'var(--vital-green)' }} />
              <span className="text-sm font-heading font-semibold uppercase tracking-widest" style={{ color: 'var(--vital-green)' }}>
                {slide.label}
              </span>
            </motion.div>

            <motion.h1
              key={`h1-${current}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.8 }}
              className="text-white font-heading font-black leading-tight mb-3"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.02em' }}
            >
              {slide.headline}
            </motion.h1>

            <motion.h1
              key={`h1b-${current}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="font-heading font-black leading-tight mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '-0.02em', color: '#00A8E8' }}
            >
              {slide.highlight}
            </motion.h1>

            <motion.p
              key={`p-${current}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.7 }}
              className="text-white/75 font-body leading-relaxed mb-8 max-w-xl"
              style={{ fontSize: '1.1rem' }}
            >
              We deliver world-class medical equipment, healthcare solutions, clinical engineering services, and digital healthcare technologies to providers worldwide.
            </motion.p>

            <motion.div
              key={`btns-${current}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/solutions" className="btn-primary text-base" style={{ minHeight: '52px', padding: '0 32px', fontSize: '15px' }}>
                Explore Solutions <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="btn-secondary text-base" style={{ minHeight: '52px', padding: '0 32px', fontSize: '15px' }}>
                Contact Sales
              </Link>
            </motion.div>

            {/* Quick stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.7 }}
              className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/15"
            >
              {[
                { value: '25+', label: 'Years Experience' },
                { value: '500+', label: 'Facilities Served' },
                { value: '15+', label: 'Countries Worldwide' },
                { value: '24/7', label: 'Technical Support' },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="font-heading font-black text-2xl text-white">{stat.value}</div>
                  <div className="text-white/55 text-xs font-body uppercase tracking-wider mt-0.5">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-12 right-10 z-10 flex flex-col gap-2">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-1 rounded-full transition-all duration-300 ${i === current ? 'h-8 opacity-100' : 'h-4 opacity-40'}`}
            style={{ background: i === current ? 'var(--vital-green)' : 'white' }}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/50"
      >
        <span className="text-xs font-body uppercase tracking-widest">Scroll</span>
        <ChevronDown size={20} />
      </motion.div>
    </section>
  );
}