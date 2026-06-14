import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, Search, Filter } from 'lucide-react';
import PageHero from '../components/shared/PageHero';

const downloads = [
  { id: 1, title: 'MedTech Product Catalogue 2026', category: 'Product Catalogue', description: 'Full catalogue of all MedTech products across all care divisions.', size: '24.6 MB', type: 'PDF', updated: '2026-01-15', downloads: 1247 },
  { id: 2, title: 'ICU Solutions Brochure', category: 'Brochure', description: 'Comprehensive guide to our ICU and critical care product range.', size: '8.2 MB', type: 'PDF', updated: '2026-03-10', downloads: 836 },
  { id: 3, title: 'Theatre Equipment Overview', category: 'Brochure', description: 'Complete theatre solutions including surgical lights, tables, and anaesthesia.', size: '6.1 MB', type: 'PDF', updated: '2026-02-20', downloads: 621 },
  { id: 4, title: 'ISO 13485:2016 Certificate', category: 'Certificate', description: 'MedTech quality management system certification for medical device distribution.', size: '1.1 MB', type: 'PDF', updated: '2025-11-01', downloads: 428 },
  { id: 5, title: 'Digital Healthcare White Paper 2026', category: 'White Paper', description: 'Analysis of digital health transformation trends in African healthcare.', size: '3.4 MB', type: 'PDF', updated: '2026-04-05', downloads: 512 },
  { id: 6, title: 'Service Level Agreement Template', category: 'Technical Document', description: 'Standard SLA template for clinical engineering service contracts.', size: '0.8 MB', type: 'PDF', updated: '2026-01-01', downloads: 319 },
  { id: 7, title: 'BBBEE Certificate Level 2', category: 'Certificate', description: 'Broad-Based Black Economic Empowerment verification certificate.', size: '0.6 MB', type: 'PDF', updated: '2025-08-15', downloads: 892 },
  { id: 8, title: 'Clinical Engineering Training Manual', category: 'Training Manual', description: 'Comprehensive training resource for biomedical engineering technicians.', size: '18.3 MB', type: 'PDF', updated: '2026-02-01', downloads: 267 },
  { id: 9, title: 'Africa Operations Overview', category: 'Brochure', description: 'Pan-African distribution network and regional office capabilities.', size: '4.2 MB', type: 'PDF', updated: '2026-03-25', downloads: 445 },
  { id: 10, title: 'SAHPRA Registration Certificate', category: 'Certificate', description: 'South African Health Products Regulatory Authority importer registration.', size: '0.9 MB', type: 'PDF', updated: '2025-12-01', downloads: 534 },
];

const categories = ['All', 'Product Catalogue', 'Brochure', 'White Paper', 'Certificate', 'Technical Document', 'Training Manual'];

export default function Downloads() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = downloads.filter(d => {
    const matchCat = activeCategory === 'All' || d.category === activeCategory;
    const matchSearch = !search || d.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const categoryColors = {
    'Product Catalogue': '#005BAA',
    'Brochure': '#00A37B',
    'White Paper': '#6B46C1',
    'Certificate': '#C05621',
    'Technical Document': '#00A8E8',
    'Training Manual': '#D53F8C',
  };

  return (
    <div>
      <PageHero
        label="Download Centre"
        title="Product Catalogues, Brochures & Technical Documents"
        subtitle="Access our complete library of product catalogues, technical brochures, white papers, certificates, and training materials."
        image="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80"
      />

      <section className="py-12 bg-white border-b" style={{ borderColor: 'var(--light-border)' }}>
        <div className="section-container">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className="px-4 py-2 rounded-full text-sm font-heading font-medium transition-all" style={{ background: activeCategory === cat ? 'var(--medihub-blue)' : 'var(--clinical-mist)', color: activeCategory === cat ? 'white' : 'var(--slate-text)', minHeight: '40px' }}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2" style={{ color: 'var(--slate-text)' }} />
              <input type="text" placeholder="Search documents..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 pr-4 py-2.5 rounded-xl border font-body text-sm focus:outline-none w-56" style={{ borderColor: 'var(--light-border)', minHeight: '44px' }} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12" style={{ background: 'var(--clinical-mist)' }}>
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((doc, i) => (
              <motion.div key={doc.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl border p-5 card-hover" style={{ borderColor: 'var(--light-border)' }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${categoryColors[doc.category] || '#005BAA'}15` }}>
                    <FileText size={22} style={{ color: categoryColors[doc.category] || '#005BAA' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-xs font-heading font-semibold" style={{ color: categoryColors[doc.category] || '#005BAA' }}>{doc.category}</span>
                    <h3 className="font-heading font-bold text-sm mt-1 mb-1 leading-snug" style={{ color: 'var(--midnight-navy)' }}>{doc.title}</h3>
                    <p className="font-body text-xs leading-relaxed mb-3" style={{ color: 'var(--slate-text)', fontSize: '12px' }}>{doc.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 text-xs font-mono" style={{ color: 'var(--slate-text)', fontFamily: 'var(--font-mono)' }}>
                        <span>{doc.type}</span>
                        <span>{doc.size}</span>
                        <span>{doc.downloads} downloads</span>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="flex items-center gap-2 w-full mt-4 py-2.5 rounded-xl border font-heading font-semibold text-sm transition-all hover:bg-medihub-blue hover:text-white hover:border-medihub-blue" style={{ borderColor: 'var(--light-border)', color: 'var(--medihub-blue)', minHeight: '44px' }}>
                  <Download size={14} /> Download Document
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}