import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard, Wrench, FileText, Shield, Download, BarChart3,
  Plus, Clock, CheckCircle2, AlertCircle, ChevronRight, Activity
} from 'lucide-react';

const tabs = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'service', label: 'Service Requests', icon: Wrench },
  { id: 'downloads', label: 'Downloads', icon: Download },
  { id: 'warranties', label: 'Warranty Claims', icon: Shield },
];

const statusStyles = {
  open: { bg: 'rgba(0, 168, 232, 0.1)', text: '#0088CC', label: 'Open' },
  in_progress: { bg: 'rgba(255, 165, 0, 0.1)', text: '#C05621', label: 'In Progress' },
  resolved: { bg: 'rgba(0, 163, 123, 0.1)', text: 'var(--surgical-teal)', label: 'Resolved' },
  closed: { bg: 'rgba(0,0,0,0.06)', text: 'var(--slate-text)', label: 'Closed' },
};

const priorityColors = {
  Critical: '#E53E3E',
  High: '#C05621',
  Medium: '#D69E2E',
  Low: 'var(--surgical-teal)',
};

const mockRequests = [
  { id: 'SR-2026-001', type: 'Preventive Maintenance', equipment: 'IntelliVue MX750 — ICU Bed 3', priority: 'Medium', status: 'in_progress', date: '2026-06-10', engineer: 'John Dlamini' },
  { id: 'SR-2026-002', type: 'Equipment Repair', equipment: 'Draeger Evita 800 — Theatre 2', priority: 'Critical', status: 'open', date: '2026-06-12', engineer: 'Pending Assignment' },
  { id: 'SR-2026-003', type: 'Calibration', equipment: 'LIFEPAK 20e — Emergency Unit', priority: 'Low', status: 'resolved', date: '2026-06-08', engineer: 'Sarah Ndlovu' },
];

const mockDownloads = [
  { name: 'IntelliVue MX750 User Manual', category: 'Technical Document', size: '12.4 MB', date: '2026-05-15' },
  { name: 'Maquet Magnus Installation Guide', category: 'Installation Guide', size: '8.2 MB', date: '2026-04-20' },
  { name: 'Service Level Agreement 2026', category: 'Compliance Document', size: '1.1 MB', date: '2026-01-01' },
];

export default function ClientPortal() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [newReq, setNewReq] = useState({ request_type: '', equipment_name: '', description: '', priority: 'Medium' });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitRequest = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    await base44.entities.ServiceRequest.create({ ...newReq, status: 'open' });
    setSubmitting(false);
    setSubmitted(true);
    setShowNewRequest(false);
    setNewReq({ request_type: '', equipment_name: '', description: '', priority: 'Medium' });
  };

  const fleetStats = [
    { label: 'Active Equipment', value: '47', icon: Activity, color: 'var(--medihub-blue)' },
    { label: 'Open Tickets', value: '3', icon: AlertCircle, color: '#C05621' },
    { label: 'Upcoming Services', value: '8', icon: Clock, color: '#D69E2E' },
    { label: 'Resolved This Month', value: '12', icon: CheckCircle2, color: 'var(--surgical-teal)' },
  ];

  return (
    <div className="min-h-screen" style={{ background: 'var(--clinical-mist)' }}>
      {/* Header */}
      <div style={{ background: 'var(--midnight-navy)' }} className="px-6 lg:px-10 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <Link to="/" className="flex items-center gap-2 mb-1">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'var(--medihub-blue)' }}>
                <svg viewBox="0 0 32 32" fill="none" className="w-4 h-4"><path d="M16 4v24M4 16h24" stroke="white" strokeWidth="3.5" strokeLinecap="round"/></svg>
              </div>
              <span className="font-heading font-bold text-white text-sm">MedTech</span>
            </Link>
            <h1 className="font-heading font-black text-white text-xl">Client Portal</h1>
            <p className="text-white/50 text-sm font-body">Welcome back — Charlotte Maxeke Hospital</p>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <div className="text-right mr-2">
              <p className="text-white text-sm font-heading font-semibold">Dr. Sarah Mokoena</p>
              <p className="text-white/50 text-xs font-body">Head of Critical Care</p>
            </div>
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: 'var(--medihub-blue)' }}>SM</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b" style={{ borderColor: 'var(--light-border)' }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex gap-1">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-5 py-4 text-sm font-heading font-medium border-b-2 transition-all duration-200 ${activeTab === tab.id ? 'border-medihub-blue text-medihub-blue' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
                style={{ borderBottomColor: activeTab === tab.id ? 'var(--medihub-blue)' : 'transparent', color: activeTab === tab.id ? 'var(--medihub-blue)' : undefined }}>
                <Icon size={15} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {fleetStats.map((stat, i) => {
                const Icon = stat.icon;
                return (
                  <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                    className="bg-white rounded-2xl p-5 border" style={{ borderColor: 'var(--light-border)' }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${stat.color}15` }}>
                        <Icon size={18} style={{ color: stat.color }} />
                      </div>
                    </div>
                    <p className="font-heading font-black text-3xl" style={{ color: 'var(--midnight-navy)' }}>{stat.value}</p>
                    <p className="font-body text-sm mt-1" style={{ color: 'var(--slate-text)' }}>{stat.label}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="bg-white rounded-2xl border p-6" style={{ borderColor: 'var(--light-border)' }}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-heading font-bold text-lg" style={{ color: 'var(--midnight-navy)' }}>Recent Service Requests</h2>
                <button onClick={() => setActiveTab('service')} className="text-sm font-heading font-semibold flex items-center gap-1" style={{ color: 'var(--medihub-blue)' }}>
                  View All <ChevronRight size={14} />
                </button>
              </div>
              <div className="space-y-3">
                {mockRequests.slice(0, 3).map(req => {
                  const s = statusStyles[req.status];
                  return (
                    <div key={req.id} className="flex items-center gap-4 p-4 rounded-xl" style={{ background: 'var(--clinical-mist)' }}>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs font-semibold" style={{ color: 'var(--medihub-blue)', fontFamily: 'var(--font-mono)' }}>{req.id}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full font-heading font-semibold" style={{ background: s.bg, color: s.text }}>{s.label}</span>
                          <span className="text-xs font-heading font-semibold" style={{ color: priorityColors[req.priority] }}>● {req.priority}</span>
                        </div>
                        <p className="font-heading font-semibold text-sm" style={{ color: 'var(--midnight-navy)' }}>{req.type} — {req.equipment}</p>
                        <p className="font-body text-xs" style={{ color: 'var(--slate-text)' }}>Engineer: {req.engineer} · {req.date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Service Requests */}
        {activeTab === 'service' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading font-bold text-2xl" style={{ color: 'var(--midnight-navy)' }}>Service Requests</h2>
              <button onClick={() => setShowNewRequest(true)} className="btn-primary" style={{ minHeight: '44px', padding: '0 20px', fontSize: '14px' }}>
                <Plus size={16} /> New Request
              </button>
            </div>

            {submitted && (
              <div className="mb-4 p-4 rounded-xl flex items-center gap-3" style={{ background: 'rgba(0,163,123,0.1)' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--surgical-teal)' }} />
                <p className="font-body text-sm" style={{ color: 'var(--surgical-teal)' }}>Your service request has been submitted and assigned a ticket number.</p>
              </div>
            )}

            {showNewRequest && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl border p-6 mb-6" style={{ borderColor: 'var(--medihub-blue)', borderWidth: '2px' }}>
                <h3 className="font-heading font-bold text-lg mb-5" style={{ color: 'var(--midnight-navy)' }}>New Service Request</h3>
                <form onSubmit={handleSubmitRequest} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-heading font-semibold mb-1.5" style={{ color: 'var(--midnight-navy)' }}>Request Type</label>
                      <select value={newReq.request_type} onChange={e => setNewReq(p => ({ ...p, request_type: e.target.value }))} required className="w-full px-4 py-3 rounded-xl border font-body text-sm focus:outline-none" style={{ borderColor: 'var(--light-border)', minHeight: '48px' }}>
                        <option value="">Select type...</option>
                        {['Preventive Maintenance', 'Equipment Repair', 'Calibration', 'Installation', 'Technical Support', 'Emergency Service'].map(t => <option key={t}>{t}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-heading font-semibold mb-1.5" style={{ color: 'var(--midnight-navy)' }}>Priority</label>
                      <select value={newReq.priority} onChange={e => setNewReq(p => ({ ...p, priority: e.target.value }))} className="w-full px-4 py-3 rounded-xl border font-body text-sm focus:outline-none" style={{ borderColor: 'var(--light-border)', minHeight: '48px' }}>
                        {['Low', 'Medium', 'High', 'Critical'].map(p => <option key={p}>{p}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-heading font-semibold mb-1.5" style={{ color: 'var(--midnight-navy)' }}>Equipment</label>
                    <input type="text" placeholder="Equipment name, model, location..." value={newReq.equipment_name} onChange={e => setNewReq(p => ({ ...p, equipment_name: e.target.value }))} required className="w-full px-4 py-3 rounded-xl border font-body text-sm focus:outline-none" style={{ borderColor: 'var(--light-border)', minHeight: '48px' }} />
                  </div>
                  <div>
                    <label className="block text-sm font-heading font-semibold mb-1.5" style={{ color: 'var(--midnight-navy)' }}>Description</label>
                    <textarea rows={3} placeholder="Describe the issue or service required..." value={newReq.description} onChange={e => setNewReq(p => ({ ...p, description: e.target.value }))} required className="w-full px-4 py-3 rounded-xl border font-body text-sm focus:outline-none resize-none" style={{ borderColor: 'var(--light-border)' }} />
                  </div>
                  <div className="flex gap-3">
                    <button type="submit" disabled={submitting} className="btn-primary" style={{ minHeight: '44px', fontSize: '14px' }}>
                      {submitting ? 'Submitting...' : 'Submit Request'}
                    </button>
                    <button type="button" onClick={() => setShowNewRequest(false)} className="btn-outline" style={{ minHeight: '44px', fontSize: '14px' }}>Cancel</button>
                  </div>
                </form>
              </motion.div>
            )}

            <div className="space-y-3">
              {mockRequests.map(req => {
                const s = statusStyles[req.status];
                return (
                  <div key={req.id} className="bg-white rounded-2xl border p-5" style={{ borderColor: 'var(--light-border)' }}>
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono text-sm font-bold" style={{ color: 'var(--medihub-blue)', fontFamily: 'var(--font-mono)' }}>{req.id}</span>
                          <span className="text-xs px-2.5 py-1 rounded-full font-heading font-semibold" style={{ background: s.bg, color: s.text }}>{s.label}</span>
                          <span className="text-xs font-heading font-bold" style={{ color: priorityColors[req.priority] }}>● {req.priority} Priority</span>
                        </div>
                        <p className="font-heading font-bold" style={{ color: 'var(--midnight-navy)' }}>{req.type}</p>
                        <p className="font-body text-sm mt-1" style={{ color: 'var(--slate-text)' }}>{req.equipment}</p>
                        <p className="font-body text-xs mt-2" style={{ color: 'var(--slate-text)' }}>Submitted: {req.date} · Assigned to: {req.engineer}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Downloads */}
        {activeTab === 'downloads' && (
          <div>
            <h2 className="font-heading font-bold text-2xl mb-6" style={{ color: 'var(--midnight-navy)' }}>Document Library</h2>
            <div className="space-y-3">
              {mockDownloads.map(doc => (
                <div key={doc.name} className="bg-white rounded-2xl border p-5 flex items-center justify-between" style={{ borderColor: 'var(--light-border)' }}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--clinical-mist)' }}>
                      <FileText size={18} style={{ color: 'var(--medihub-blue)' }} />
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-sm" style={{ color: 'var(--midnight-navy)' }}>{doc.name}</p>
                      <p className="font-body text-xs mt-0.5" style={{ color: 'var(--slate-text)' }}>{doc.category} · {doc.size} · Updated {doc.date}</p>
                    </div>
                  </div>
                  <button className="flex items-center gap-1.5 text-sm font-heading font-semibold" style={{ color: 'var(--medihub-blue)' }}>
                    <Download size={14} /> Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Warranties */}
        {activeTab === 'warranties' && (
          <div>
            <h2 className="font-heading font-bold text-2xl mb-6" style={{ color: 'var(--midnight-navy)' }}>Warranty Claims</h2>
            <div className="bg-white rounded-2xl border p-10 text-center" style={{ borderColor: 'var(--light-border)' }}>
              <Shield size={40} className="mx-auto mb-4" style={{ color: 'var(--clinical-mist)' }} />
              <p className="font-heading font-bold text-lg mb-2" style={{ color: 'var(--midnight-navy)' }}>No Active Warranty Claims</p>
              <p className="font-body text-sm mb-6" style={{ color: 'var(--slate-text)' }}>All your equipment warranties are active and in good standing.</p>
              <button onClick={() => setActiveTab('service')} className="btn-primary" style={{ minHeight: '44px', padding: '0 24px', fontSize: '14px' }}>
                <Plus size={16} /> Submit Warranty Claim
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}