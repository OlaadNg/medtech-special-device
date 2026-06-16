import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Zap, CheckCircle2, Award, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import { allProducts } from '../lib/productsData';

export default function ProductDetail() {
  const { id } = useParams();
  const product = allProducts.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--clinical-mist)' }}>
        <div className="text-center">
          <h2 className="font-heading font-black text-2xl mb-3" style={{ color: 'var(--midnight-navy)' }}>Product Not Found</h2>
          <Link to="/products" className="btn-primary">Back to Products</Link>
        </div>
      </div>
    );
  }

  const related = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-white border-b py-4" style={{ borderColor: 'var(--light-border)' }}>
        <div className="section-container flex items-center gap-2 text-sm font-body" style={{ color: 'var(--slate-text)' }}>
          <Link to="/products" className="flex items-center gap-1.5 hover:text-medihub-blue transition-colors">
            <ArrowLeft size={14} /> Products
          </Link>
          <span>/</span>
          <span style={{ color: 'var(--surgical-teal)' }}>{product.category}</span>
          <span>/</span>
          <span style={{ color: 'var(--midnight-navy)' }}>{product.name}</span>
        </div>
      </div>

      {/* Main content */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            {/* Image */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div className="rounded-3xl overflow-hidden shadow-xl" style={{ background: 'var(--clinical-mist)' }}>
                <img src={product.image} alt={product.name} className="w-full object-cover" style={{ height: '420px' }} />
              </div>
              {/* Certifications */}
              <div className="mt-5 flex flex-wrap gap-2">
                {product.certifications.map(cert => (
                  <span key={cert} className="flex items-center gap-1.5 text-xs font-heading font-semibold px-3 py-1.5 rounded-full" style={{ background: 'rgba(0,163,123,0.1)', color: 'var(--surgical-teal)' }}>
                    <Award size={12} /> {cert}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Details */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs font-heading font-semibold px-3 py-1.5 rounded-full" style={{ background: 'rgba(0,91,170,0.1)', color: 'var(--medihub-blue)' }}>{product.category}</span>
                {product.isNew && <span className="text-xs font-heading font-semibold px-3 py-1.5 rounded-full text-white" style={{ background: 'var(--surgical-teal)' }}>New Arrival</span>}
              </div>

              <h1 className="font-heading font-black text-3xl lg:text-4xl mb-2" style={{ color: 'var(--midnight-navy)', letterSpacing: '-0.02em' }}>{product.name}</h1>
              <p className="font-mono text-sm mb-2" style={{ color: 'var(--slate-text)', fontFamily: 'var(--font-mono)' }}>SKU: {product.sku}</p>
              <p className="font-body text-sm mb-6 flex items-center gap-1.5" style={{ color: 'var(--slate-text)' }}>
                <Globe size={13} /> by <strong>{product.manufacturer}</strong> · {product.country}
              </p>

              <p className="font-body text-base leading-relaxed mb-8" style={{ color: 'var(--slate-text)' }}>{product.fullDescription}</p>

              {/* Features */}
              <div className="mb-8">
                <h3 className="font-heading font-bold text-sm uppercase tracking-wide mb-4" style={{ color: 'var(--medihub-blue)' }}>Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--surgical-teal)' }} />
                      <span className="font-body text-sm" style={{ color: 'var(--slate-text)' }}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              <div className="mb-8 p-5 rounded-2xl" style={{ background: 'var(--clinical-mist)' }}>
                <h3 className="font-heading font-bold text-sm uppercase tracking-wide mb-4" style={{ color: 'var(--midnight-navy)' }}>Technical Specifications</h3>
                <div className="space-y-2">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="flex items-center justify-between py-1.5 border-b last:border-0" style={{ borderColor: 'var(--light-border)' }}>
                      <span className="font-body text-sm" style={{ color: 'var(--slate-text)' }}>{spec.label}</span>
                      <span className="font-heading font-semibold text-sm" style={{ color: 'var(--midnight-navy)' }}>{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/quote" className="btn-primary flex-1 text-center justify-center">
                  <Zap size={16} /> Request a Quote
                </Link>
                <Link to="/contact" className="btn-outline flex-1 text-center justify-center">
                  Talk to an Expert <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="py-16" style={{ background: 'var(--clinical-mist)' }}>
          <div className="section-container">
            <h2 className="font-heading font-black text-2xl mb-8" style={{ color: 'var(--midnight-navy)' }}>Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-2xl border card-hover overflow-hidden" style={{ borderColor: 'var(--light-border)' }}>
                  <Link to={`/products/${p.id}`}>
                    <div className="h-40 overflow-hidden" style={{ background: 'var(--clinical-mist)' }}>
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-body uppercase tracking-wider mb-1" style={{ color: 'var(--surgical-teal)', fontSize: '11px' }}>{p.category}</p>
                      <h3 className="font-heading font-bold text-sm mb-1 hover:text-medihub-blue transition-colors" style={{ color: 'var(--midnight-navy)' }}>{p.name}</h3>
                      <p className="text-xs font-body" style={{ color: 'var(--slate-text)' }}>by {p.manufacturer}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}