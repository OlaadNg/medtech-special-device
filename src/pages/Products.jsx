import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List, SlidersHorizontal, ArrowRight, Zap, X } from 'lucide-react';
import PageHero from '../components/shared/PageHero';

const categories = [
  'All Categories',
  'Theatre Equipment',
  'ICU Equipment',
  'Emergency Equipment',
  'Orthopaedic Devices',
  'Diagnostic Equipment',
  'Cardiology Equipment',
  'Laboratory Equipment',
  'Radiology Equipment',
  'Digital Health Systems',
  'CSSD Equipment',
  'Oncology Equipment',
  'General Ward Equipment',
  'Maternal & Infant Care',
  'Anaesthesia Systems',
];

const allProducts = [
  { id: 1, name: 'IntelliVue MX750 Patient Monitor', sku: 'PHL-MX750', category: 'Diagnostic Equipment', manufacturer: 'Philips', image: 'https://images.unsplash.com/photo-1576669801820-a9ab287ac2d1?w=400&q=80', description: 'High-acuity patient monitoring with advanced waveform analysis and networked EMR integration.', isNew: false, isFeatured: true },
  { id: 2, name: 'Maquet Magnus Operating Table', sku: 'MQT-MAGNUS-1150', category: 'Theatre Equipment', manufacturer: 'Getinge', image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=400&q=80', description: 'Carbon-fibre operating table with full imaging compatibility and 360° surgeon ergonomics.', isNew: true, isFeatured: true },
  { id: 3, name: 'BeneVision N22 ICU Monitor', sku: 'MDR-BN22-ICU', category: 'ICU Equipment', manufacturer: 'Mindray', image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&q=80', description: 'Comprehensive critical care monitor with 22" display and full haemodynamic monitoring.', isNew: false, isFeatured: true },
  { id: 4, name: 'GE Logiq E10 Ultrasound', sku: 'GE-LOGIQ-E10', category: 'Radiology Equipment', manufacturer: 'GE Healthcare', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80', description: 'Premium shared-service ultrasound with AI-assisted imaging and cSound architecture.', isNew: true, isFeatured: false },
  { id: 5, name: 'Draeger Evita 800 Ventilator', sku: 'DRG-EVITA-800', category: 'ICU Equipment', manufacturer: 'Dräger', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80', description: 'High-end ICU ventilator with integrated lung mechanics and advanced closed-loop ventilation.', isNew: false, isFeatured: true },
  { id: 6, name: 'Siemens ACUSON Sequoia', sku: 'SIE-ACU-SEQ', category: 'Radiology Equipment', manufacturer: 'Siemens Healthineers', image: 'https://images.unsplash.com/photo-1628348070889-cb656235b4eb?w=400&q=80', description: 'Revolutionary ultrasound with BioAcoustic Imaging for unprecedented image quality.', isNew: false, isFeatured: false },
  { id: 7, name: 'Stryker 3202 LED Surgical Light', sku: 'STR-3202-LED', category: 'Theatre Equipment', manufacturer: 'Stryker', image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&q=80', description: 'High-output LED surgical ceiling light with integrated camera system and shadow-free illumination.', isNew: false, isFeatured: false },
  { id: 8, name: 'Defibrillator LIFEPAK 20e', sku: 'STC-LP20E', category: 'Emergency Equipment', manufacturer: 'Stryker', image: 'https://images.unsplash.com/photo-1571772996211-2f02974562f3?w=400&q=80', description: 'Professional defibrillator/monitor with CPR feedback and protocol-driven therapy guidance.', isNew: false, isFeatured: false },
  { id: 9, name: 'ICU Hospital Bed Eleganza 5', sku: 'HRD-ELEG5-ICU', category: 'ICU Equipment', manufacturer: 'Stiegelmeyer', image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&q=80', description: 'Advanced ICU bed with integrated scales, auto-lateral tilt therapy, and nurse control panels.', isNew: true, isFeatured: false },
  { id: 10, name: 'Biomet Vanguard Knee System', sku: 'ZIM-VNG-KNEE', category: 'Orthopaedic Devices', manufacturer: 'Zimmer Biomet', image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=400&q=80', description: 'Complete primary knee replacement system with MyKnee patient-specific cutting guides.', isNew: false, isFeatured: false },
  { id: 11, name: 'Abbott Architect c8000', sku: 'ABT-ARCH-C8000', category: 'Laboratory Equipment', manufacturer: 'Abbott', image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=400&q=80', description: 'High-throughput clinical chemistry analyser for large-volume hospital laboratories.', isNew: false, isFeatured: false },
  { id: 12, name: 'Siemens Healthineers ECG 12-Lead', sku: 'SIE-ECG-12L', category: 'Cardiology Equipment', manufacturer: 'Siemens Healthineers', image: 'https://images.unsplash.com/photo-1628348070889-cb656235b4eb?w=400&q=80', description: 'Resting ECG system with Aris AI interpretation and EMR connectivity for cardiology departments.', isNew: true, isFeatured: false },
];

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