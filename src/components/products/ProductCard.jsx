import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export default function ProductCard({ product, index, view }) {
  const image = product.thumbnail || product.images?.[0] || 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04 }}
      className={`product-card group bg-white rounded-2xl border card-hover overflow-hidden ${view === 'list' ? 'flex' : ''}`}
      style={{ borderColor: 'var(--light-border)' }}
    >
      <div className={`relative overflow-hidden ${view === 'list' ? 'w-48 flex-shrink-0' : 'h-44'}`} style={{ background: 'var(--clinical-mist)' }}>
        {product.is_new && (
          <div className="absolute top-3 left-3 z-10">
            <span className="text-xs font-heading font-semibold px-2.5 py-1 rounded-full text-white" style={{ background: 'var(--surgical-teal)' }}>New</span>
          </div>
        )}
        <img src={image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="blueprint-overlay absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0, 91, 170, 0.88)' }}>
          <Link to={`/products/${product.id}`} className="text-white text-sm font-heading font-semibold border border-white/40 px-4 py-2 rounded-xl hover:bg-white/10">
            View Details
          </Link>
        </div>
      </div>
      <div className="p-5 flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-body" style={{ color: 'var(--surgical-teal)', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{product.category}</span>
          <span className="sku-text">{product.sku}</span>
        </div>
        <h3 className="font-heading font-bold mb-2 leading-snug" style={{ color: 'var(--midnight-navy)', fontSize: '14px' }}>{product.name}</h3>
        <p className="font-body text-xs leading-relaxed mb-4" style={{ color: 'var(--slate-text)', fontSize: '13px' }}>{product.short_description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs font-body" style={{ color: 'var(--slate-text)' }}>by <span className="font-semibold">{product.manufacturer || 'N/A'}</span></span>
          <Link to="/quote" className="flex items-center gap-1 text-xs font-heading font-semibold" style={{ color: 'var(--medihub-blue)' }}>
            <Zap size={11} /> Quote
          </Link>
        </div>
      </div>
    </motion.div>
  );
}