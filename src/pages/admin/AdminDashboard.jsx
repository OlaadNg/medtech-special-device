import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';
import { Package, FileText, Calendar, MessageSquare, Briefcase, Users, Download, Stethoscope, TrendingUp, ArrowRight } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, color, path }) => (
  <Link to={path} className="bg-slate-800 border border-slate-700 rounded-2xl p-5 flex items-center gap-4 hover:border-slate-600 transition-all group">
    <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${color}22` }}>
      <Icon size={22} style={{ color }} />
    </div>
    <div className="flex-1 min-w-0">
      <p className="text-slate-400 text-xs font-medium uppercase tracking-wide">{label}</p>
      <p className="text-white font-bold text-2xl mt-0.5">{value ?? '—'}</p>
    </div>
    <ArrowRight size={16} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
  </Link>
);

export default function AdminDashboard() {
  const [counts, setCounts] = useState({});
  const [recentQuotes, setRecentQuotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [products, news, events, quotes, cases, jobs, downloads, serviceReqs] = await Promise.all([
        base44.entities.Product.list().catch(() => []),
        base44.entities.NewsArticle.list().catch(() => []),
        base44.entities.Event.list().catch(() => []),
        base44.entities.QuoteRequest.list().catch(() => []),
        base44.entities.CaseStudy.list().catch(() => []),
        base44.entities.JobListing.list().catch(() => []),
        base44.entities.Download.list().catch(() => []),
        base44.entities.ServiceRequest.list().catch(() => []),
      ]);
      setCounts({
        products: products.length,
        news: news.length,
        events: events.length,
        quotes: quotes.length,
        cases: cases.length,
        jobs: jobs.length,
        downloads: downloads.length,
        serviceReqs: serviceReqs.length,
      });
      setRecentQuotes(quotes.sort((a, b) => new Date(b.created_date) - new Date(a.created_date)).slice(0, 5));
      setLoading(false);
    }
    load();
  }, []);

  const stats = [
    { icon: Package, label: 'Products', value: counts.products, color: '#3B82F6', path: '/admin/products' },
    { icon: FileText, label: 'News Articles', value: counts.news, color: '#10B981', path: '/admin/news' },
    { icon: Calendar, label: 'Events', value: counts.events, color: '#F59E0B', path: '/admin/events' },
    { icon: MessageSquare, label: 'Quote Requests', value: counts.quotes, color: '#EF4444', path: '/admin/quotes' },
    { icon: Briefcase, label: 'Case Studies', value: counts.cases, color: '#8B5CF6', path: '/admin/case-studies' },
    { icon: Users, label: 'Job Listings', value: counts.jobs, color: '#EC4899', path: '/admin/jobs' },
    { icon: Download, label: 'Downloads', value: counts.downloads, color: '#06B6D4', path: '/admin/downloads' },
    { icon: Stethoscope, label: 'Service Requests', value: counts.serviceReqs, color: '#F97316', path: '/admin/service-requests' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-white font-bold text-2xl">Welcome back 👋</h2>
        <p className="text-slate-400 text-sm mt-1">Here's an overview of your MedTech content and activity.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array(8).fill(0).map((_, i) => (
            <div key={i} className="bg-slate-800 rounded-2xl p-5 h-24 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {stats.map(s => <StatCard key={s.label} {...s} />)}
        </div>
      )}

      {/* Recent Quote Requests */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700">
          <h3 className="text-white font-semibold flex items-center gap-2"><TrendingUp size={16} className="text-blue-400" /> Recent Quote Requests</h3>
          <Link to="/admin/quotes" className="text-blue-400 text-xs hover:underline">View all</Link>
        </div>
        {recentQuotes.length === 0 ? (
          <p className="text-slate-500 text-sm p-6">No quote requests yet.</p>
        ) : (
          <div className="divide-y divide-slate-700">
            {recentQuotes.map(q => (
              <div key={q.id} className="px-6 py-3 flex items-center justify-between gap-4">
                <div>
                  <p className="text-white text-sm font-medium">{q.first_name} {q.last_name}</p>
                  <p className="text-slate-400 text-xs">{q.organization} · {q.email}</p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  q.status === 'new' ? 'bg-blue-500/20 text-blue-400' :
                  q.status === 'quoted' ? 'bg-green-500/20 text-green-400' :
                  q.status === 'in_review' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-slate-600/40 text-slate-400'
                }`}>{q.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}