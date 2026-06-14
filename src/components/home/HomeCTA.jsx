import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight, Phone } from 'lucide-react';

export default function HomeCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="py-24 relative overflow-hidden" style={{ background: 'var(--medihub-blue)' }}>
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full border-2 border-white" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full border-2 border-white" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-white" />
      </div>

      <div className="section-container relative z-10 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="text-xs font-heading uppercase tracking-widest text-white/60 mb-4 block">Ready to Transform Your Facility?</span>
          <h2 className="font-heading font-black text-white mb-6" style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)', letterSpacing: '-0.02em' }}>
            Partner With MedTech Special Device
          </h2>
          <p className="text-white/75 font-body text-lg mb-10 max-w-xl mx-auto">
            Let our healthcare solutions experts design a tailored technology roadmap for your facility — from consultation through implementation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-secondary text-base" style={{ minHeight: '52px', padding: '0 36px' }}>
              Request Consultation
            </Link>
            <Link to="/quote" className="inline-flex items-center justify-center gap-2 font-heading font-semibold rounded-lg transition-all duration-300 bg-white text-medihub-blue hover:bg-blue-50 text-base" style={{ minHeight: '52px', padding: '0 36px' }}>
              Get Quotation <ArrowRight size={18} />
            </Link>
          </div>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-white/60 text-sm font-body">
            <div className="flex items-center gap-2">
              <Phone size={15} />
              <span>Emergency Support: <a href="tel:+27800123456" className="text-white font-semibold hover:underline">0800 123 456</a></span>
            </div>
            <span className="hidden sm:block">•</span>
            <span>Available 24 hours, 7 days a week</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}