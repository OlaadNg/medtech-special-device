import { Search, Grid, List, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export default function ProductFilters({
  search, setSearch, categories, selectedCategory, onCategoryChange,
  manufacturers, selectedManufacturer, setSelectedManufacturer,
  view, setView, resultCount,
}) {
  return (
    <>
      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
        <div className="relative flex-1 max-w-xl w-full">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--slate-text)' }} />
          <input
            type="text"
            placeholder="Search products, manufacturers, categories..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-12 pr-10 py-3 rounded-xl border font-body text-sm focus:outline-none focus:border-medihub-blue transition-colors"
            style={{ borderColor: 'var(--light-border)', fontSize: '14px', minHeight: '48px' }}
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2">
              <X size={15} style={{ color: 'var(--slate-text)' }} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
          <Select value={selectedManufacturer} onValueChange={setSelectedManufacturer}>
            <SelectTrigger className="w-full lg:w-56" style={{ minHeight: '48px', borderColor: 'var(--light-border)' }}>
              <SelectValue placeholder="Brand / Manufacturer" />
            </SelectTrigger>
            <SelectContent>
              {manufacturers.map(m => (
                <SelectItem key={m} value={m}>{m}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <span className="text-sm font-body whitespace-nowrap" style={{ color: 'var(--slate-text)' }}>{resultCount} products</span>
          <div className="flex border rounded-xl overflow-hidden flex-shrink-0" style={{ borderColor: 'var(--light-border)' }}>
            <button onClick={() => setView('grid')} className={`p-3 transition-colors ${view === 'grid' ? 'bg-medihub-blue text-white' : 'bg-white text-slate-500 hover:bg-slate-50'}`} style={{ minHeight: '48px', minWidth: '48px' }}>
              <Grid size={16} />
            </button>
            <button onClick={() => setView('list')} className={`p-3 transition-colors ${view === 'list' ? 'bg-medihub-blue text-white' : 'bg-white text-slate-500 hover:bg-slate-50'}`} style={{ minHeight: '48px', minWidth: '48px' }}>
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-5">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => onCategoryChange(cat)}
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
    </>
  );
}