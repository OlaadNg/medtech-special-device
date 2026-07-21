import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import PageHero from '../components/shared/PageHero';
import ProductFilters from '../components/products/ProductFilters';
import ProductCard from '../components/products/ProductCard';
import CompareBar from '../components/products/CompareBar';

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All Categories');
  const [selectedManufacturer, setSelectedManufacturer] = useState('All Manufacturers');
  const [view, setView] = useState('grid');
  const [compareItems, setCompareItems] = useState([]);

  const toggleCompare = (product) => {
    setCompareItems(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) return prev.filter(p => p.id !== product.id);
      if (prev.length >= 4) return prev;
      return [...prev, product];
    });
  };

  useEffect(() => {
    base44.entities.Product.filter({ status: 'active' }, '-created_date', 500).then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  const categories = useMemo(() => ['All Categories', ...new Set(products.map(p => p.category).filter(Boolean))], [products]);
  const manufacturers = useMemo(() => ['All Manufacturers', ...new Set(products.map(p => p.manufacturer).filter(Boolean))].sort(), [products]);

  const filtered = products.filter(p => {
    const matchCat = selectedCategory === 'All Categories' || p.category === selectedCategory;
    const matchManufacturer = selectedManufacturer === 'All Manufacturers' || p.manufacturer === selectedManufacturer;
    const q = search.toLowerCase();
    const matchSearch = !search
      || p.name?.toLowerCase().includes(q)
      || p.manufacturer?.toLowerCase().includes(q)
      || p.category?.toLowerCase().includes(q)
      || p.sku?.toLowerCase().includes(q);
    return matchCat && matchManufacturer && matchSearch;
  });

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setSearchParams(cat !== 'All Categories' ? { category: cat } : {});
  };

  return (
    <div>
      <PageHero
        label="Product Catalogue"
        title="World-Class Medical Equipment for Every Department"
        subtitle="Browse our comprehensive range of medical devices from global manufacturers — all backed by MedTech's clinical engineering support."
        image="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80"
      />

      <section className="py-12 bg-white border-b" style={{ borderColor: 'var(--light-border)' }}>
        <div className="section-container">
          <ProductFilters
            search={search}
            setSearch={setSearch}
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            manufacturers={manufacturers}
            selectedManufacturer={selectedManufacturer}
            setSelectedManufacturer={setSelectedManufacturer}
            view={view}
            setView={setView}
            resultCount={filtered.length}
          />
        </div>
      </section>

      <section className="py-12" style={{ background: 'var(--clinical-mist)' }}>
        <div className="section-container">
          {loading ? (
            <div className="text-center py-20">
              <div className="w-8 h-8 border-4 border-slate-200 rounded-full animate-spin mx-auto" style={{ borderTopColor: 'var(--medihub-blue)' }}></div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-heading font-bold text-xl mb-2" style={{ color: 'var(--midnight-navy)' }}>No products found</p>
              <p className="font-body" style={{ color: 'var(--slate-text)' }}>Try adjusting your search, category, or brand filter</p>
            </div>
          ) : (
            <div className={`grid gap-5 ${view === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
              {filtered.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={i}
                  view={view}
                  isComparing={compareItems.some(p => p.id === product.id)}
                  onToggleCompare={toggleCompare}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      <CompareBar
        items={compareItems}
        onRemove={(id) => setCompareItems(prev => prev.filter(p => p.id !== id))}
        onClear={() => setCompareItems([])}
      />
    </div>
  );
}