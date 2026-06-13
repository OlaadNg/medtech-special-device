import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

const articles = [
  {
    id: 1,
    category: 'Medical Innovations',
    title: 'AI-Powered Diagnostics Revolutionising Early Disease Detection in Sub-Saharan Africa',
    excerpt: 'New deep learning algorithms are enabling rapid, accurate diagnostics in resource-constrained healthcare settings, improving outcomes for millions.',
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&q=80&auto=format&fit=crop',
    date: 'June 10, 2026',
    readTime: '5 min read',
  },
  {
    id: 2,
    category: 'Industry Reports',
    title: "South Africa's NHI Implementation: What It Means for Medical Equipment Procurement",
    excerpt: 'Analysis of the National Health Insurance Act and its implications for private and public sector medical technology procurement.',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80&auto=format&fit=crop',
    date: 'June 5, 2026',
    readTime: '8 min read',
  },
  {
    id: 3,
    category: 'Company News',
    title: 'MediHub Expands Operations Into East Africa With New Nairobi Regional Office',
    excerpt: 'MediHub strengthens its pan-African footprint by establishing a full-service clinical engineering and distribution hub in Nairobi, Kenya.',
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&q=80&auto=format&fit=crop',
    date: 'May 28, 2026',
    readTime: '3 min read',
  },
];

const categoryColors = {
  'Medical Innovations': { bg: 'rgba(0,163,123,0.1)', text: 'var(--surgical-teal)' },
  'Industry Reports': { bg: 'rgba(0,91,170,0.1)', text: 'var(--medihub-blue)' },
  'Company News': { bg: 'rgba(0,168,232,0.1)', text: '#0088CC' },
};

export default function NewsPreview() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-24 bg-white">
      <div className="section-container">
        <div ref={ref} className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <span className="section-label mb-4">News &amp; Insights</span>
            <h2 className="font-heading font-black text-4xl lg:text-5xl mt-4" style={{ color: 'var(--midnight-navy)' }}>
              Stay Ahead of<br />Healthcare Innovation
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}>
            <Link to="/news" className="btn-outline">View All Articles <ArrowRight size={16} /></Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {articles.map((article, i) => {
            const catStyle = categoryColors[article.category] || { bg: 'var(--clinical-mist)', text: 'var(--slate-text)' };
            return (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group rounded-2xl border card-hover overflow-hidden bg-white"
                style={{ borderColor: 'var(--light-border)' }}
              >
                <Link to={`/news/${article.id}`}>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute bottom-4 left-4">
                      <span className="text-xs font-heading font-semibold px-3 py-1.5 rounded-full" style={{ background: catStyle.bg, color: catStyle.text, backdropFilter: 'blur(8px)', background: 'rgba(255,255,255,0.85)' }}>
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading font-bold text-base leading-snug mb-3 group-hover:text-medihub-blue transition-colors" style={{ color: 'var(--midnight-navy)' }}>
                      {article.title}
                    </h3>
                    <p className="font-body text-sm leading-relaxed mb-4" style={{ color: 'var(--slate-text)', fontSize: '13.5px' }}>
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs font-body" style={{ color: 'var(--slate-text)' }}>
                      <span className="flex items-center gap-1.5"><Calendar size={12} /> {article.date}</span>
                      <span className="flex items-center gap-1.5"><Clock size={12} /> {article.readTime}</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}