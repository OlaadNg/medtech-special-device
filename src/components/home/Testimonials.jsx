import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    quote: "MediHub transformed our ICU capabilities. Their end-to-end approach — from equipment selection through installation and ongoing support — is unmatched in South Africa. We've seen measurable improvements in patient outcomes.",
    name: 'Dr. Sarah Mokoena',
    title: 'Head of Critical Care, Charlotte Maxeke Hospital',
    institution: 'Charlotte Maxeke Academic Hospital, Johannesburg',
    rating: 5,
  },
  {
    quote: "The clinical engineering team from MediHub is exceptional. Their 24/7 response capability and technical expertise ensure our theatre equipment is always available. In a high-pressure surgical environment, you cannot afford downtime.",
    name: 'Prof. Emmanuel Nkosi',
    title: 'Chief Surgeon, Groote Schuur Hospital',
    institution: 'Groote Schuur Academic Hospital, Cape Town',
    rating: 5,
  },
  {
    quote: "As a hospital administrator, I rely on suppliers who understand both the clinical and procurement landscape. MediHub delivers consistently high-quality equipment with full regulatory compliance and competitive pricing for public facilities.",
    name: 'Mr. Thabo Dlamini',
    title: 'CEO, KwaZulu-Natal Regional Health Authority',
    institution: 'KZN Department of Health',
    rating: 5,
  },
  {
    quote: "MediHub's digital health division helped us implement a fully integrated EMR and telemedicine platform across our three Mozambique clinics. The local language support and training was outstanding.",
    name: 'Dr. Amina Hassan',
    title: 'Medical Director, Africa Health Network',
    institution: 'Africa Health Network, Mozambique',
    rating: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const prev = () => setCurrent(prev => (prev - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent(prev => (prev + 1) % testimonials.length);

  return (
    <section ref={ref} className="py-24" style={{ background: 'var(--clinical-mist)' }}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="section-label mb-4">Testimonials</span>
          <h2 className="font-heading font-black text-4xl lg:text-5xl mt-4" style={{ color: 'var(--midnight-navy)' }}>
            Trusted By Healthcare Leaders<br />Across Africa
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl p-10 lg:p-14 shadow-lg border"
              style={{ borderColor: 'var(--light-border)' }}
            >
              {/* Quote mark */}
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-8" style={{ background: 'var(--medihub-blue)' }}>
                <Quote size={22} className="text-white" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                  <Star key={i} size={18} fill="#F6AD55" stroke="none" />
                ))}
              </div>

              <blockquote className="font-body text-xl lg:text-2xl leading-relaxed mb-8" style={{ color: 'var(--midnight-navy)', fontStyle: 'italic', fontSize: 'clamp(1.1rem, 2.5vw, 1.375rem)' }}>
                "{testimonials[current].quote}"
              </blockquote>

              <div className="flex items-center gap-4 pt-6 border-t" style={{ borderColor: 'var(--light-border)' }}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-white font-heading font-bold text-lg" style={{ background: 'var(--medihub-blue)' }}>
                  {testimonials[current].name.charAt(0)}
                </div>
                <div>
                  <div className="font-heading font-bold text-base" style={{ color: 'var(--midnight-navy)' }}>{testimonials[current].name}</div>
                  <div className="font-body text-sm" style={{ color: 'var(--slate-text)' }}>{testimonials[current].title}</div>
                  <div className="font-body text-xs mt-0.5" style={{ color: 'var(--surgical-teal)', fontStyle: 'normal' }}>{testimonials[current].institution}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className="rounded-full transition-all duration-200"
                  style={{
                    width: i === current ? '32px' : '8px',
                    height: '8px',
                    background: i === current ? 'var(--medihub-blue)' : 'var(--light-border)',
                  }}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>
            <div className="flex gap-3">
              <button onClick={prev} className="w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-200 hover:bg-medihub-blue hover:text-white hover:border-medihub-blue" style={{ borderColor: 'var(--light-border)', color: 'var(--slate-text)' }} aria-label="Previous testimonial">
                <ChevronLeft size={20} />
              </button>
              <button onClick={next} className="w-11 h-11 rounded-xl border flex items-center justify-center transition-all duration-200 hover:bg-medihub-blue hover:text-white hover:border-medihub-blue" style={{ borderColor: 'var(--light-border)', color: 'var(--slate-text)' }} aria-label="Next testimonial">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}