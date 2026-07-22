import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Zap } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function FeaturedProducts() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Product.filter({ is_featured: true, status: 'active' }, '-created_date', 6)
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  if (!loading && products.length === 0) return null;

  return (
    <section className="py-24 bg-white">
      <div className="section-container">
        <div ref={ref} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <span className="section-label mb-4">Featured Products</span>
            <h2 className="font-heading font-black text-4xl lg:text-5xl mt-4" style={{ color: 'var(--midnight-navy)' }}>
              Precision Supplies<br />For Every Procedure
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3, duration: 0.6 }}>
            <Link to="/products" className="btn-outline">
              View Full Catalogue <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => {
            const image = product.thumbnail || product.images?.[0] || 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80';
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="product-card group relative bg-white rounded-2xl border card-hover overflow-hidden"
                style={{ borderColor: 'var(--light-border)' }}
              >
                {product.is_new && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="text-white text-xs font-heading font-semibold px-3 py-1 rounded-full" style={{ background: 'var(--surgical-teal)' }}>
                      New Arrival
                    </span>
                  </div>
                )}

                <div className="relative h-52 overflow-hidden" style={{ background: 'var(--clinical-mist)' }}>
                  <img
                    src={image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="blueprint-overlay absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0, 91, 170, 0.85)' }}>
                    <Link to={`/products/${product.id}`} className="text-white font-heading font-semibold text-sm flex items-center gap-2 border border-white/40 px-4 py-2 rounded-xl hover:bg-white/10 transition-colors">
                      View Details <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>

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
                    {product.short_description}
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
            );
          })}
        </div>
      </div>
    </section>
  );
}