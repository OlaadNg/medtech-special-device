import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List, SlidersHorizontal, ArrowRight, Zap, X } from 'lucide-react';
import PageHero from '../components/shared/PageHero';
import { allProducts, categories } from '../lib/productsData';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All Categories');
  const [view, setView] = useState('grid');
  const [filterOpen, setFilterOpen] = useState(false);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  const filtered = allProducts.filter(p => {
    const matchCat = selectedCategory === 'All Categories' || p.category === selectedCategory;
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.manufacturer.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div>
      <PageHero
        label="Product Catalogue"
        title="World-Class Medical Equipment for Every Department"
        subtitle="Browse our comprehensive range of 10,000+ medical devices from 100+ global manufacturers — all backed by MedTech's clinical engineering support."
        image="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80"
      />

      <section className="py-12 bg-white border-b" style={{ borderColor: 'var(--light-border)' }}>
        <div className="section-container">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-xl">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--slate-text)' }} />
              <input
                type="text"
                placeholder="Search products, manufacturers, categories..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border font-body text-sm focus:outline-none focus:border-medihub-blue transition-colors"
                style={{ borderColor: 'var(--light-border)', fontSize: '14px', minHeight: '48px' }}
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2">
                  <X size={15} style={{ color: 'var(--slate-text)' }} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-sm font-body" style={{ color: 'var(--slate-text)' }}>{filtered.length} products</span>
              <div className="flex border rounded-xl overflow-hidden" style={{ borderColor: 'var(--light-border)' }}>
                <button onClick={() => setView('grid')} className={`p-3 transition-colors ${view === 'grid' ? 'bg-medihub-blue text-white' : 'bg-white text-slate-500 hover:bg-slate-50'}`} style={{ minHeight: '48px', minWidth: '48px' }}>
                  <Grid size={16} />
                </button>
                <button onClick={() => setView('list')} className={`p-3 transition-colors ${view === 'list' ? 'bg-medihub-blue text-white' : 'bg-white text-slate-500 hover:bg-slate-50'}`} style={{ minHeight: '48px', minWidth: '48px' }}>
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mt-5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => { setSelectedCategory(cat); setSearchParams(cat !== 'All Categories' ? { category: cat } : {}); }}
                className="px-4 py-2 rounded-full text-sm font-heading font-medium transition-all duration-200"
                style={{
                  minHeight: '40px',
                  background: selectedCategory === cat ? 'var(--medihub-blue)' : 'var(--clinical-mist)',
                  color: selectedCategory === cat ? 'white' : 'var(--slate-text)',
                  fontSize: '13px',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12" style={{ background: 'var(--clinical-mist)' }}>
        <div className="section-container">
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-heading font-bold text-xl mb-2" style={{ color: 'var(--midnight-navy)' }}>No products found</p>
              <p className="font-body" style={{ color: 'var(--slate-text)' }}>Try adjusting your search or category filter</p>
            </div>
          ) : (
            <div className={`grid gap-5 ${view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
              {filtered.map((product, i) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className={`product-card group bg-white rounded-2xl border card-hover overflow-hidden ${view === 'list' ? 'flex' : ''}`}
                  style={{ borderColor: 'var(--light-border)' }}
                >
                  <div className={`relative overflow-hidden ${view === 'list' ? 'w-48 flex-shrink-0' : 'h-44'}`} style={{ background: 'var(--clinical-mist)' }}>
                    {product.isNew && (
                      <div className="absolute top-3 left-3 z-10">
                        <span className="text-xs font-heading font-semibold px-2.5 py-1 rounded-full text-white" style={{ background: 'var(--surgical-teal)' }}>New</span>
                      </div>
                    )}
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
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
                    <p className="font-body text-xs leading-relaxed mb-4" style={{ color: 'var(--slate-text)', fontSize: '13px' }}>{product.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-body" style={{ color: 'var(--slate-text)' }}>by <span className="font-semibold">{product.manufacturer}</span></span>
                      <Link to="/quote" className="flex items-center gap-1 text-xs font-heading font-semibold" style={{ color: 'var(--medihub-blue)' }}>
                        <Zap size={11} /> Quote
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}