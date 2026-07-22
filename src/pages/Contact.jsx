import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import PageHero from '../components/shared/PageHero';

const warehouses = [
  { flag: '🇨🇳', name: 'China Warehouse', label: 'Asia-Pacific Distribution' },
  { flag: '🇺🇸', name: 'US Warehouse', label: 'North America Distribution' },
  { flag: '🇿🇦', name: 'South Africa Warehouse', label: 'Africa Distribution Hub' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', organization: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.message.trim()) e.message = 'Message is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    if (!validate()) return;
    setStatus('loading');
    await new Promise(r => setTimeout(r, 1200));
    setStatus('success');
  };

  const f = (k, v) => { setForm(prev => ({ ...prev, [k]: v })); if (errors[k]) setErrors(prev => ({ ...prev, [k]: undefined })); };

  return (
    <div>
      <PageHero
        label="Contact Us"
        title="Get in Touch With Our Healthcare Solutions Team"
        subtitle="Our specialist team is ready to answer your enquiries, provide product demonstrations, or develop a customised solution for your facility."
        image="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80"
      />

      <section className="py-24 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact form */}
            <div className="lg:col-span-2">
              <h2 className="font-heading font-black text-3xl mb-2" style={{ color: 'var(--midnight-navy)' }}>Send Us a Message</h2>
              <p className="font-body mb-8" style={{ color: 'var(--slate-text)' }}>We typically respond within 2 business hours. Contact us by email only.</p>

              {status === 'success' ? (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-20 rounded-3xl border text-center" style={{ borderColor: 'var(--light-border)' }}>
                  <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5" style={{ background: 'var(--surgical-teal)' }}>
                    <CheckCircle2 size={32} className="text-white" />
                  </div>
                  <h3 className="font-heading font-black text-2xl mb-2" style={{ color: 'var(--midnight-navy)' }}>Message Sent Successfully</h3>
                  <p className="font-body" style={{ color: 'var(--slate-text)' }}>Our team will be in touch within 2 business hours.</p>
                  <button onClick={() => setStatus('idle')} className="mt-6 btn-outline">Send Another Message</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                      { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Dr. Jane Smith' },
                      { key: 'email', label: 'Email Address', type: 'email', placeholder: 'jane@hospital.co.za' },
                      { key: 'organization', label: 'Organisation', type: 'text', placeholder: 'Hospital / Clinic Name' },
                    ].map(field => (
                      <div key={field.key}>
                        <label className="block text-sm font-heading font-semibold mb-2" style={{ color: 'var(--midnight-navy)' }}>{field.label}</label>
                        <input
                          type={field.type}
                          placeholder={field.placeholder}
                          value={form[field.key]}
                          onChange={e => f(field.key, e.target.value)}
                          className="w-full px-4 py-3 rounded-xl border font-body text-sm focus:outline-none focus:border-medihub-blue transition-colors"
                          style={{ borderColor: errors[field.key] ? '#E53E3E' : 'var(--light-border)', minHeight: '48px', fontSize: '14px' }}
                        />
                        {errors[field.key] && <p className="text-xs mt-1 flex items-center gap-1" style={{ color: '#E53E3E' }}><AlertCircle size={12} />{errors[field.key]}</p>}
                      </div>
                    ))}
                  </div>

                  <div>
                    <label className="block text-sm font-heading font-semibold mb-2" style={{ color: 'var(--midnight-navy)' }}>Subject</label>
                    <select
                      value={form.subject}
                      onChange={e => f('subject', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border font-body text-sm focus:outline-none focus:border-medihub-blue transition-colors"
                      style={{ borderColor: 'var(--light-border)', minHeight: '48px', fontSize: '14px', color: form.subject ? 'var(--midnight-navy)' : 'var(--slate-text)' }}
                    >
                      <option value="">Select enquiry type...</option>
                      {['Product Enquiry', 'Request a Quote', 'Technical Support', 'Clinical Engineering Services', 'Training Services', 'Partnership / Distribution', 'General Enquiry'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-heading font-semibold mb-2" style={{ color: 'var(--midnight-navy)' }}>Message <span style={{ color: '#E53E3E' }}>*</span></label>
                    <textarea
                      rows={5}
                      placeholder="Tell us about your requirements, the products you need, or questions about our services..."
                      value={form.message}
                      onChange={e => f('message', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border font-body text-sm focus:outline-none focus:border-medihub-blue transition-colors resize-none"
                      style={{ borderColor: errors.message ? '#E53E3E' : 'var(--light-border)', fontSize: '14px' }}
                    />
                    {errors.message && <p className="text-xs mt-1 flex items-center gap-1" style={{ color: '#E53E3E' }}><AlertCircle size={12} />{errors.message}</p>}
                  </div>

                  <button type="submit" disabled={status === 'loading'} className="btn-primary" style={{ minHeight: '52px', padding: '0 36px', opacity: status === 'loading' ? 0.7 : 1 }}>
                    {status === 'loading' ? (
                      <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>
                    ) : (
                      <><Send size={16} /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </div>

            {/* Contact info sidebar */}
            <div className="space-y-5">
              <div className="p-6 rounded-2xl" style={{ background: 'var(--midnight-navy)' }}>
                <h3 className="font-heading font-bold text-white mb-1 text-lg">Contact Us</h3>
                <p className="text-white/60 text-sm font-body mb-4">Contact us by email only</p>
                <a href="mailto:info@medtechspecialdevice.com" className="flex items-center gap-3 text-white font-heading font-semibold text-base hover:opacity-80 transition-opacity break-all">
                  <Mail size={20} style={{ color: 'var(--vital-green)', flexShrink: 0 }} />
                  info@medtechspecialdevice.com
                </a>
              </div>

              <div className="p-6 rounded-2xl border" style={{ borderColor: 'var(--light-border)' }}>
                <h3 className="font-heading font-bold mb-4" style={{ color: 'var(--midnight-navy)' }}>Our Warehouses</h3>
                <div className="space-y-4">
                  {warehouses.map(w => (
                    <div key={w.name} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 text-xl" style={{ background: 'var(--clinical-mist)' }}>
                        {w.flag}
                      </div>
                      <div>
                        <p className="font-heading font-semibold text-sm" style={{ color: 'var(--midnight-navy)' }}>{w.name}</p>
                        <p className="text-xs font-body" style={{ color: 'var(--slate-text)' }}>{w.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warehouse locations */}
      <section className="py-16" style={{ background: 'var(--clinical-mist)' }}>
        <div className="section-container">
          <h2 className="font-heading font-black text-3xl mb-10 text-center" style={{ color: 'var(--midnight-navy)' }}>Our Warehouses</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {warehouses.map((w) => (
              <div key={w.name} className="bg-white rounded-2xl p-6 border card-hover text-center" style={{ borderColor: 'var(--light-border)' }}>
                <div className="text-5xl mb-4">{w.flag}</div>
                <h3 className="font-heading font-bold text-lg mb-1" style={{ color: 'var(--midnight-navy)' }}>{w.name}</h3>
                <p className="font-body text-sm" style={{ color: 'var(--slate-text)' }}>{w.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl" style={{ background: 'var(--midnight-navy)' }}>
              <Mail size={18} style={{ color: 'var(--vital-green)' }} />
              <div className="text-left">
                <p className="text-white/60 text-xs font-body">Contact us by email only</p>
                <a href="mailto:info@medtechspecialdevice.com" className="text-white font-heading font-semibold text-sm hover:opacity-80 transition-opacity">
                  info@medtechspecialdevice.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}