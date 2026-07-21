import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Scale } from 'lucide-react';

export default function CompareBar({ items, onRemove, onClear }) {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {items.length > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t shadow-2xl"
          style={{ borderColor: 'var(--light-border)' }}
        >
          <div className="section-container py-4 flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-2 flex-shrink-0">
              <Scale size={18} style={{ color: 'var(--medihub-blue)' }} />
              <span className="font-heading font-semibold text-sm" style={{ color: 'var(--midnight-navy)' }}>
                Compare ({items.length}/4)
              </span>
            </div>

            <div className="flex-1 flex flex-wrap gap-2 w-full sm:w-auto">
              {items.map(product => (
                <div
                  key={product.id}
                  className="flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-full border"
                  style={{ borderColor: 'var(--light-border)', background: 'var(--clinical-mist)' }}
                >
                  <span className="font-body text-xs truncate max-w-[140px]" style={{ color: 'var(--midnight-navy)' }}>
                    {product.name}
                  </span>
                  <button onClick={() => onRemove(product.id)} aria-label={`Remove ${product.name} from comparison`}>
                    <X size={13} style={{ color: 'var(--slate-text)' }} />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <button onClick={onClear} className="font-body text-sm" style={{ color: 'var(--slate-text)' }}>
                Clear
              </button>
              <button
                disabled={items.length < 2}
                onClick={() => navigate(`/compare?ids=${items.map(p => p.id).join(',')}`)}
                className="btn-primary text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                style={{ minHeight: '44px', padding: '0 20px', fontSize: '13px' }}
              >
                Compare Now
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}