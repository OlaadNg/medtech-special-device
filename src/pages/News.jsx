import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, Search } from 'lucide-react';
import PageHero from '../components/shared/PageHero';

const articles = [
  { id: 1, category: 'Medical Innovations', title: 'AI-Powered Diagnostics Revolutionising Early Disease Detection in Sub-Saharan Africa', excerpt: 'New deep learning algorithms are enabling rapid, accurate diagnostics in resource-constrained healthcare settings, improving outcomes for millions across the continent.', image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=700&q=80', date: 'June 10, 2026', readTime: '5 min', author: 'Dr. Aisha Mohammed', featured: true },
  { id: 2, category: 'Industry Reports', title: "South Africa's NHI Implementation: What It Means for Medical Equipment Procurement", excerpt: 'Analysis of the National Health Insurance Act and its implications for private and public sector medical technology procurement over the next decade.', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&q=80', date: 'June 5, 2026', readTime: '8 min', author: 'Nokuthula Zulu' },
  { id: 3, category: 'Company News', title: 'MedTech Expands Operations Into East Africa With New Nairobi Regional Office', excerpt: 'MedTech strengthens its pan-African footprint by establishing a full-service clinical engineering and distribution hub in Nairobi, Kenya.', image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=700&q=80', date: 'May 28, 2026', readTime: '3 min', author: 'Marketing Team' },
  { id: 4, category: 'Healthcare News', title: 'Robotic Surgery Comes to Africa: MedTech Partners With Intuitive Surgical for da Vinci Distribution', excerpt: 'A landmark partnership brings the da Vinci surgical system to South African and East African hospitals, with 12 systems already placed.', image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=700&q=80', date: 'May 15, 2026', readTime: '6 min', author: 'Dr. Marcus van der Berg' },
  { id: 5, category: 'Case Studies', title: "How Charlotte Maxeke Hospital Reduced ICU Equipment Downtime by 94% With MedTech's Fleet Management Programme", excerpt: 'A 12-month case study on how proactive maintenance and real-time fleet monitoring transformed critical care equipment reliability.', image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=700&q=80', date: 'May 5, 2026', readTime: '10 min', author: 'Riaan Pretorius' },
  { id: 6, category: 'Industry Reports', title: 'Africa Medical Equipment Market Report 2026: Growth, Trends, and Opportunities', excerpt: 'Comprehensive analysis of the African medical equipment market, projected to reach $12.8 billion by 2030, with key growth drivers in digital health.', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&q=80', date: 'April 20, 2026', readTime: '12 min', author: 'Research Team' },
];

const categories = ['All', 'Healthcare News', 'Medical Innovations', 'Industry Reports', 'Case Studies', 'Company News'];
const catColors = {
  'Medical Innovations': { bg: 'rgba(0,163,123,0.12)', text: 'var(--surgical-teal)' },
  'Industry Reports': { bg: 'rgba(0,91,170,0.1)', text: 'var(--medihub-blue)' },
  'Company News': { bg: 'rgba(0,168,232,0.1)', text: '#0088CC' },
  'Healthcare News': { bg: 'rgba(107,70,193,0.1)', text: '#6B46C1' },
  'Case Studies': { bg: 'rgba(192,86,33,0.1)', text: '#C05621' },
};

export default function News() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const filtered = articles.filter(a => {
    const matchCat = activeCategory === 'All' || a.category === activeCategory;
    const matchSearch = !search || a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = articles.find(a => a.featured);
  const rest = filtered.filter(a => !a.featured || activeCategory !== 'All');

  return (
    <div>
      <PageHero
        label="News & Insights"
        title="The Pulse of African Healthcare Innovation"
        subtitle="Stay informed with the latest medical technology news, industry analysis, company updates, and healthcare innovation insights."
        image="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1920&q=80"
      />

      <section className="py-12 bg-white border-b" style={{ borderColor: 'var(--light-border)' }}>
        <div className="section-container">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button key={cat} onClick={() => setActiveCategory(cat)} className="px-4 py-2 rounded-full text-sm font-heading font-medium transition-all" style={{ background: activeCategory === cat ? 'var(--medihub-blue)' : 'var(--clinical-mist)', color: activeCategory === cat ? 'white' : 'var(--slate-text)', minHeight: '40px' }}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: 'var(--slate-text)' }} />
              <input type="text" placeholder="Search articles..." value={search} onChange={e => setSearch(e.target.value)} className="pl-10 pr-4 py-2.5 rounded-xl border font-body text-sm focus:outline-none focus:border-medihub-blue w-64 transition-colors" style={{ borderColor: 'var(--light-border)', minHeight: '44px' }} />
            </div>
          </div>
        </div>
      </section>

      <section ref={ref} className="py-16" style={{ background: 'var(--clinical-mist)' }}>
        <div className="section-container">
          {/* Featured article */}
          {featured && activeCategory === 'All' && !search && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} className="mb-10">
              <Link to={`/news/${featured.id}`} className="group block">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white rounded-3xl overflow-hidden border shadow-sm card-hover" style={{ borderColor: 'var(--light-border)' }}>
                  <div className="h-72 lg:h-auto overflow-hidden">
                    <img src={featured.image} alt={featured.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-10 flex flex-col justify-center">
                    <span className="inline-block text-xs font-heading font-semibold px-3 py-1.5 rounded-full mb-4" style={catColors[featured.category] || { bg: 'var(--clinical-mist)', color: 'var(--slate-text)' }}>
                      {featured.category}
                    </span>
                    <h2 className="font-heading font-black text-2xl mb-4 group-hover:text-medihub-blue transition-colors" style={{ color: 'var(--midnight-navy)' }}>{featured.title}</h2>
                    <p className="font-body leading-relaxed mb-6" style={{ color: 'var(--slate-text)' }}>{featured.excerpt}</p>
                    <div className="flex items-center gap-4 text-sm font-body mb-6" style={{ color: 'var(--slate-text)' }}>
                      <span className="flex items-center gap-1.5"><Calendar size={13} />{featured.date}</span>
                      <span className="flex items-center gap-1.5"><Clock size={13} />{featured.readTime} read</span>
                    </div>
                    <span className="flex items-center gap-2 font-heading font-semibold text-sm" style={{ color: 'var(--medihub-blue)' }}>Read Full Article <ArrowRight size={14} /></span>
                  </div>
                </div>
              </Link>
            </motion.div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {(activeCategory === 'All' && !search ? rest : filtered).map((article, i) => {
              const cs = catColors[article.category] || { bg: 'var(--clinical-mist)', text: 'var(--slate-text)' };
              return (
                <motion.div key={article.id} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.07 }}
                  className="group bg-white rounded-2xl border card-hover overflow-hidden" style={{ borderColor: 'var(--light-border)' }}>
                  <Link to={`/news/${article.id}`}>
                    <div className="h-44 overflow-hidden">
                      <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <div className="p-5">
                      <span className="inline-block text-xs font-heading font-semibold px-3 py-1 rounded-full mb-3" style={cs}>{article.category}</span>
                      <h3 className="font-heading font-bold text-base leading-snug mb-2 group-hover:text-medihub-blue transition-colors" style={{ color: 'var(--midnight-navy)' }}>{article.title}</h3>
                      <p className="font-body text-sm leading-relaxed mb-4" style={{ color: 'var(--slate-text)', fontSize: '13px' }}>{article.excerpt.substring(0, 100)}...</p>
                      <div className="flex items-center gap-3 text-xs font-body" style={{ color: 'var(--slate-text)' }}>
                        <span className="flex items-center gap-1"><Calendar size={11} />{article.date}</span>
                        <span className="flex items-center gap-1"><Clock size={11} />{article.readTime} read</span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}