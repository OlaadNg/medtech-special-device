import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ArrowRight } from 'lucide-react';

const divisions = [
  {
    id: 'theatre',
    title: 'Theatre Solutions',
    description: 'Complete operating theatre setups — from surgical lights and tables to anaesthesia systems and laparoscopic towers.',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=600&q=80&auto=format&fit=crop',
    color: '#005BAA',
    count: '48 Products',
  },
  {
    id: 'icu',
    title: 'ICU & High Care',
    description: 'Advanced intensive care solutions including ventilators, patient monitors, infusion systems, and bed management.',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=600&q=80&auto=format&fit=crop',
    color: '#00A37B',
    count: '62 Products',
  },
  {
    id: 'emergency',
    title: 'Emergency & Trauma',
    description: 'Rapid-response emergency equipment — defibrillators, crash carts, emergency ventilators, and trauma care essentials.',
    image: 'https://images.unsplash.com/photo-1571772996211-2f02974562f3?w=600&q=80&auto=format&fit=crop',
    color: '#E53E3E',
    count: '35 Products',
  },
  {
    id: 'orthopaedic',
    title: 'Orthopaedic Solutions',
    description: 'Precision orthopaedic implants, power tools, imaging, and rehabilitation equipment for musculoskeletal care.',
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&q=80&auto=format&fit=crop',
    color: '#744210',
    count: '41 Products',
  },
  {
    id: 'cssd',
    title: 'CSSD',
    description: 'Central Sterile Supply Department solutions — autoclaves, washer-disinfectors, sterile storage, and tracking systems.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&q=80&auto=format&fit=crop',
    color: '#2D3748',
    count: '27 Products',
  },
  {
    id: 'digital',
    title: 'Digital Healthcare',
    description: 'Hospital information systems, EMR platforms, telemedicine infrastructure, AI diagnostics, and IoT medical devices.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80&auto=format&fit=crop',
    color: '#00A8E8',
    count: '33 Products',
  },
  {
    id: 'maternal',
    title: 'Maternal & Infant Care',
    description: 'Neonatal incubators, foetal monitors, delivery systems, phototherapy units, and NICU equipment.',
    image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&q=80&auto=format&fit=crop',
    color: '#D53F8C',
    count: '29 Products',
  },
  {
    id: 'cardiology',
    title: 'Diagnostic Cardiology',
    description: 'ECG systems, holter monitors, stress test systems, echocardiography, and cardiac catheterisation lab equipment.',
    image: 'https://images.unsplash.com/photo-1628348070889-cb656235b4eb?w=600&q=80&auto=format&fit=crop',
    color: '#C05621',
    count: '38 Products',
  },
  {
    id: 'private',
    title: 'Private Practice',
    description: 'Complete practice solutions — examination equipment, point-of-care diagnostics, and consulting room technology.',
    image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=600&q=80&auto=format&fit=crop',
    color: '#285E61',
    count: '54 Products',
  },
  {
    id: 'laboratory',
    title: 'Laboratory Solutions',
    description: 'Clinical chemistry analysers, haematology systems, microbiology, immunoassay platforms, and POCT devices.',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=600&q=80&auto=format&fit=crop',
    color: '#6B46C1',
    count: '46 Products',
  },
  {
    id: 'radiology',
    title: 'Radiology Solutions',
    description: 'Digital X-ray, CT scanners, MRI systems, ultrasound, PACS, and RIS — full radiology department solutions.',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=80&auto=format&fit=crop',
    color: '#2C5282',
    count: '31 Products',
  },
  {
    id: 'oncology',
    title: 'Oncology Solutions',
    description: 'Radiotherapy planning systems, linear accelerators, brachytherapy, oncology pharmacy, and infusion systems.',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&q=80&auto=format&fit=crop',
    color: '#702459',
    count: '22 Products',
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
              Comprehensive Solutions<br />Across All Care Settings
            </h2>
            <p className="max-w-2xl mx-auto font-body text-lg" style={{ color: 'var(--slate-text)' }}>
              From emergency response to complex theatre environments — MediHub delivers complete, integrated solutions for every care division in your facility.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {divisions.map((div, i) => (
            <motion.div
              key={div.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.04 }}
            >
              <Link to={`/solutions#${div.id}`} className="group block">
                <div className="relative overflow-hidden rounded-2xl card-hover" style={{ background: 'white' }}>
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={div.image}
                      alt={`${div.title} medical equipment and solutions`}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <span className="text-xs font-mono text-white/70 font-medium" style={{ fontFamily: 'var(--font-mono)' }}>{div.count}</span>
                    </div>
                    {/* Color accent line */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5" style={{ background: div.color }} />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-heading font-bold text-base mb-2 group-hover:text-medihub-blue transition-colors" style={{ color: 'var(--midnight-navy)', fontSize: '15px' }}>
                      {div.title}
                    </h3>
                    <p className="font-body text-xs leading-relaxed mb-4" style={{ color: 'var(--slate-text)', fontSize: '13px' }}>
                      {div.description}
                    </p>
                    <div className="flex items-center gap-1 text-xs font-heading font-semibold transition-colors group-hover:gap-2" style={{ color: div.color }}>
                      Learn More <ArrowRight size={13} />
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