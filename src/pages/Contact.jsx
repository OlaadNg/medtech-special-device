import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import PageHero from '../components/shared/PageHero';

const offices = [
  {
    city: 'Johannesburg (HQ)',
    address: '123 Healthcare Drive, Sandton, Johannesburg, 2196',
    phone: '+27 11 234 5678',
    email: 'jhb@medihub.co.za',
    hours: 'Mon–Fri: 08:00–17:00',
    isHQ: true,
  },
  {
    city: 'Cape Town',
    address: '45 Medical Quarter, Century City, Cape Town, 7441',
    phone: '+27 21 567 8901',
    email: 'cpt@medihub.co.za',
    hours: 'Mon–Fri: 08:00–17:00',
  },
  {
    city: 'Durban',
    address: '78 Health Hub, Umhlanga Ridge, Durban, 4320',
    phone: '+27 31 456 7890',
    email: 'dbn@medihub.co.za',
    hours: 'Mon–Fri: 08:00–17:00',
  },
  {
    city: 'Pretoria',
    address: '22 MedPark Boulevard, Centurion, Pretoria, 0157',
    phone: '+27 12 345 6789',
    email: 'pta@medihub.co.za',
    hours: 'Mon–Fri: 08:00–17:00',
  },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', organization: '', subject: '', message: '' });
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
              <p className="font-body mb-8" style={{ color: 'var(--slate-text)' }}>We typically respond within 2 business hours. For urgent technical support, call our 24/7 helpdesk.</p>

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
                      { key: 'phone', label: 'Phone Number', type: 'tel', placeholder: '+27 11 000 0000' },
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
                <h3 className="font-heading font-bold text-white mb-1 text-lg">24/7 Emergency Support</h3>
                <p className="text-white/60 text-sm font-body mb-4">For critical equipment failures and emergencies</p>
                <a href="tel:+27800123456" className="flex items-center gap-3 text-white font-heading font-bold text-xl hover:opacity-80 transition-opacity">
                  <Phone size={22} style={{ color: 'var(--vital-green)' }} />
                  0800 123 456
                </a>
                <p className="text-white/40 text-xs mt-2 font-body">Toll-free · Available 24 hours, 365 days</p>
              </div>

              <div className="p-6 rounded-2xl border" style={{ borderColor: 'var(--light-border)' }}>
                <h3 className="font-heading font-bold mb-4" style={{ color: 'var(--midnight-navy)' }}>Quick Contact</h3>
                <div className="space-y-4">
                  <a href="tel:+27112345678" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--clinical-mist)' }}>
                      <Phone size={16} style={{ color: 'var(--medihub-blue)' }} />
                    </div>
                    <div>
                      <p className="text-xs font-body" style={{ color: 'var(--slate-text)' }}>Sales & Enquiries</p>
                      <p className="font-heading font-semibold text-sm group-hover:text-medihub-blue transition-colors" style={{ color: 'var(--midnight-navy)' }}>+27 11 234 5678</p>
                    </div>
                  </a>
                  <a href="mailto:info@medihub.co.za" className="flex items-center gap-3 group">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--clinical-mist)' }}>
                      <Mail size={16} style={{ color: 'var(--medihub-blue)' }} />
                    </div>
                    <div>
                      <p className="text-xs font-body" style={{ color: 'var(--slate-text)' }}>Email Us</p>
                      <p className="font-heading font-semibold text-sm group-hover:text-medihub-blue transition-colors" style={{ color: 'var(--midnight-navy)' }}>info@medihub.co.za</p>
                    </div>
                  </a>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'var(--clinical-mist)' }}>
                      <Clock size={16} style={{ color: 'var(--medihub-blue)' }} />
                    </div>
                    <div>
                      <p className="text-xs font-body" style={{ color: 'var(--slate-text)' }}>Office Hours</p>
                      <p className="font-heading font-semibold text-sm" style={{ color: 'var(--midnight-navy)' }}>Mon–Fri: 08:00–17:00</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office locations */}
      <section className="py-16" style={{ background: 'var(--clinical-mist)' }}>
        <div className="section-container">
          <h2 className="font-heading font-black text-3xl mb-10 text-center" style={{ color: 'var(--midnight-navy)' }}>Our Offices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {offices.map((office) => (
              <div key={office.city} className="bg-white rounded-2xl p-5 border card-hover" style={{ borderColor: office.isHQ ? 'var(--medihub-blue)' : 'var(--light-border)', borderWidth: office.isHQ ? '2px' : '1px' }}>
                {office.isHQ && <span className="text-xs font-mono font-semibold mb-3 block" style={{ color: 'var(--medihub-blue)', fontFamily: 'var(--font-mono)' }}>HQ — HEAD OFFICE</span>}
                <h3 className="font-heading font-bold mb-4" style={{ color: 'var(--midnight-navy)' }}>{office.city}</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2.5"><MapPin size={14} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--medihub-blue)' }} /><span className="font-body" style={{ color: 'var(--slate-text)' }}>{office.address}</span></div>
                  <a href={`tel:${office.phone.replace(/\s/g,'')}`} className="flex items-center gap-2.5 hover:text-medihub-blue transition-colors"><Phone size={14} style={{ color: 'var(--medihub-blue)' }} /><span className="font-body">{office.phone}</span></a>
                  <a href={`mailto:${office.email}`} className="flex items-center gap-2.5 hover:text-medihub-blue transition-colors"><Mail size={14} style={{ color: 'var(--medihub-blue)' }} /><span className="font-body">{office.email}</span></a>
                  <div className="flex items-center gap-2.5"><Clock size={14} style={{ color: 'var(--medihub-blue)' }} /><span className="font-body">{office.hours}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}