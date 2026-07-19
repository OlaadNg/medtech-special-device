import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Star, Zap } from 'lucide-react';

const featured = [
  {
    id: 1,
    name: 'IntelliVue MX750 Patient Monitor',
    sku: 'PHL-MX750-ADV',
    category: 'Patient Monitors',
    manufacturer: 'Philips',
    image: 'https://images.unsplash.com/photo-1576669801820-a9ab287ac2d1?w=500&q=80&auto=format&fit=crop',
    description: 'High-acuity patient monitoring with advanced waveform analysis, networked EMR integration, and alarm management.',
    badge: 'Best Seller',
    badgeColor: '#005BAA',
  },
  {
    id: 2,
    name: 'Maquet Magnus Operating Table',
    sku: 'MQT-MAGNUS-1150',
    category: 'Theatre Equipment',
    manufacturer: 'Getinge',
    image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=500&q=80&auto=format&fit=crop',
    description: 'Carbon-fibre operating table with full imaging compatibility, precise positioning, and 360° surgeon ergonomics.',
    badge: 'New Arrival',
    badgeColor: '#00A37B',
  },
  {
    id: 3,
    name: 'Mindray BeneVision N22 Monitor',
    sku: 'MDR-BN22-ICU',
    category: 'ICU Equipment',
    manufacturer: 'Mindray',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=500&q=80&auto=format&fit=crop',
    description: 'Comprehensive critical care monitor with 22" display, 12 lead ECG, and full haemodynamic monitoring suite.',
    badge: 'Featured',
    badgeColor: '#00A8E8',
  },
  {
    id: 4,
    name: 'GE Logiq E10 Ultrasound System',
    sku: 'GE-LOGIQ-E10-S',
    category: 'Radiology Equipment',
    manufacturer: 'GE Healthcare',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&q=80&auto=format&fit=crop',
    description: 'Premium shared-service ultrasound with AI-assisted imaging, Radiology Reimagined interface, and cSound architecture.',
    badge: 'Top Rated',
    badgeColor: '#6B46C1',
  },
  {
    id: 5,
    name: 'Draeger Evita 800 Ventilator',
    sku: 'DRG-EVITA-800',
    category: 'ICU Equipment',
    manufacturer: 'Dräger',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=500&q=80&auto=format&fit=crop',
    description: 'High-end ICU ventilator with integrated lung mechanics, advanced closed-loop ventilation, and neonatal to adult modes.',
    badge: 'ICU Specialist',
    badgeColor: '#C05621',
  },
  {
    id: 6,
    name: 'Siemens ACUSON Sequoia',
    sku: 'SIE-ACU-SEQ-22',
    category: 'Radiology Equipment',
    manufacturer: 'Siemens Healthineers',
    image: 'https://images.unsplash.com/photo-1628348070889-cb656235b4eb?w=500&q=80&auto=format&fit=crop',
    description: 'Revolutionary ultrasound with BioAcoustic Imaging, delivering unprecedented image quality in challenging patients.',
    badge: 'Innovation Award',
    badgeColor: '#702459',
  },
];

export default function FeaturedProducts() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-24 bg-white">
      <div className="section-container">
        <div ref={ref} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <span className="section-label mb-4">Featured Products</span>
            <h2 className="font-heading font-black text-4xl lg:text-5xl mt-4" style={{ color: 'var(--midnight-navy)' }}>
              Precision Technology<br />For Every Department
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3, duration: 0.6 }}>
            <Link to="/products" className="btn-outline">
              View Full Catalogue <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="product-card group relative bg-white rounded-2xl border card-hover overflow-hidden"
              style={{ borderColor: 'var(--light-border)' }}
            >
              {/* Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="text-white text-xs font-heading font-semibold px-3 py-1 rounded-full" style={{ background: product.badgeColor }}>
                  {product.badge}
                </span>
              </div>

              {/* Image */}
              <div className="relative h-52 overflow-hidden" style={{ background: 'var(--clinical-mist)' }}>
                <img
                  src={product.image}
                  alt={`${product.name} - ${product.description.split('.')[0]}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Blueprint overlay */}
                <div className="blueprint-overlay absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0, 91, 170, 0.85)' }}>
                  <Link to={`/products/${product.id}`} className="text-white font-heading font-semibold text-sm flex items-center gap-2 border border-white/40 px-4 py-2 rounded-xl hover:bg-white/10 transition-colors">
                    View Details <ArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-body uppercase tracking-wider" style={{ color: 'var(--surgical-teal)', fontSize: '11px' }}>
                    {product.category}
                  </span>
                  <span className="sku-text">{product.sku}</span>
                </div>
                <h3 className="font-heading font-bold mb-2 leading-snug group-hover:text-medihub-blue transition-colors" style={{ color: 'var(--midnight-navy)', fontSize: '15px' }}>
                  {product.name}
                </h3>
                <p className="font-body text-xs leading-relaxed mb-4" style={{ color: 'var(--slate-text)', fontSize: '13px' }}>
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-body" style={{ color: 'var(--slate-text)' }}>
                    by <span className="font-semibold">{product.manufacturer}</span>
                  </span>
                  <Link to="/quote" className="flex items-center gap-1.5 text-xs font-heading font-semibold transition-colors hover:opacity-80" style={{ color: 'var(--medihub-blue)' }}>
                    <Zap size={12} />
                    Quick Quote
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}