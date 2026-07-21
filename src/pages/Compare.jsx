import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import PageHero from '../components/shared/PageHero';
import { Zap, ArrowLeft } from 'lucide-react';

export default function Compare() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const ids = (urlParams.get('ids') || '').split(',').filter(Boolean);
    if (ids.length === 0) {
      setLoading(false);
      return;
    }
    Promise.all(ids.map(id => base44.entities.Product.get(id).catch(() => null))).then(results => {
      setProducts(results.filter(Boolean));
      setLoading(false);
    });
  }, []);

  const specLabels = [...new Set(products.flatMap(p => (p.specifications || []).map(s => s.label)))];

  if (loading) {
    return (
      <div className="text-center py-32">
        <div className="w-8 h-8 border-4 border-slate-200 rounded-full animate-spin mx-auto" style={{ borderTopColor: 'var(--medihub-blue)' }}></div>
      </div>
    );
  }

  if (products.length < 2) {
    return (
      <div>
        <PageHero label="Product Comparison" title="Compare Products" subtitle="Select at least two products to compare their specifications side-by-side." />
        <div className="section-container py-20 text-center">
          <p className="font-body mb-6" style={{ color: 'var(--slate-text)' }}>No products selected for comparison, or only one was found.</p>
          <Link to="/products" className="btn-primary inline-flex">
            <ArrowLeft size={16} /> Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHero label="Product Comparison" title="Compare Specifications Side-by-Side" subtitle="Review the details of your selected products to make the best buying decision." />

      <section className="py-16" style={{ background: 'var(--clinical-mist)' }}>
        <div className="section-container">
          <Link to="/products" className="inline-flex items-center gap-2 font-heading font-semibold text-sm mb-8" style={{ color: 'var(--medihub-blue)' }}>
            <ArrowLeft size={15} /> Back to Products
          </Link>

          <div className="overflow-x-auto bg-white rounded-2xl border" style={{ borderColor: 'var(--light-border)' }}>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-5 text-left w-48 sticky left-0 bg-white border-b" style={{ borderColor: 'var(--light-border)' }}></th>
                  {products.map(product => (
                    <th key={product.id} className="p-5 text-left border-b min-w-[240px]" style={{ borderColor: 'var(--light-border)' }}>
                      <div className="h-32 mb-3 rounded-xl overflow-hidden" style={{ background: 'var(--clinical-mist)' }}>
                        <img
                          src={product.thumbnail || product.images?.[0] || 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&q=80'}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-heading font-bold text-sm mb-1" style={{ color: 'var(--midnight-navy)' }}>{product.name}</h3>
                      <p className="sku-text mb-3">{product.sku}</p>
                      <Link to="/quote" className="inline-flex items-center gap-1 text-xs font-heading font-semibold" style={{ color: 'var(--medihub-blue)' }}>
                        <Zap size={11} /> Request Quote
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-5 font-heading font-semibold text-sm sticky left-0 bg-white border-b" style={{ color: 'var(--midnight-navy)', borderColor: 'var(--light-border)' }}>Category</td>
                  {products.map(product => (
                    <td key={product.id} className="p-5 font-body text-sm border-b" style={{ color: 'var(--slate-text)', borderColor: 'var(--light-border)' }}>{product.category || '—'}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-5 font-heading font-semibold text-sm sticky left-0 bg-white border-b" style={{ color: 'var(--midnight-navy)', borderColor: 'var(--light-border)' }}>Manufacturer</td>
                  {products.map(product => (
                    <td key={product.id} className="p-5 font-body text-sm border-b" style={{ color: 'var(--slate-text)', borderColor: 'var(--light-border)' }}>{product.manufacturer || '—'}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-5 font-heading font-semibold text-sm sticky left-0 bg-white border-b" style={{ color: 'var(--midnight-navy)', borderColor: 'var(--light-border)' }}>Country of Origin</td>
                  {products.map(product => (
                    <td key={product.id} className="p-5 font-body text-sm border-b" style={{ color: 'var(--slate-text)', borderColor: 'var(--light-border)' }}>{product.country_of_origin || '—'}</td>
                  ))}
                </tr>
                <tr>
                  <td className="p-5 font-heading font-semibold text-sm sticky left-0 bg-white border-b" style={{ color: 'var(--midnight-navy)', borderColor: 'var(--light-border)' }}>Description</td>
                  {products.map(product => (
                    <td key={product.id} className="p-5 font-body text-sm border-b" style={{ color: 'var(--slate-text)', borderColor: 'var(--light-border)' }}>{product.short_description || '—'}</td>
                  ))}
                </tr>
                {specLabels.map(label => (
                  <tr key={label}>
                    <td className="p-5 font-heading font-semibold text-sm sticky left-0 bg-white border-b" style={{ color: 'var(--midnight-navy)', borderColor: 'var(--light-border)' }}>{label}</td>
                    {products.map(product => {
                      const spec = (product.specifications || []).find(s => s.label === label);
                      return (
                        <td key={product.id} className="p-5 font-body text-sm border-b" style={{ color: 'var(--slate-text)', borderColor: 'var(--light-border)' }}>{spec?.value || '—'}</td>
                      );
                    })}
                  </tr>
                ))}
                <tr>
                  <td className="p-5 font-heading font-semibold text-sm sticky left-0 bg-white" style={{ color: 'var(--midnight-navy)' }}>Certifications</td>
                  {products.map(product => (
                    <td key={product.id} className="p-5 font-body text-sm" style={{ color: 'var(--slate-text)' }}>
                      {(product.certifications || []).join(', ') || '—'}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}