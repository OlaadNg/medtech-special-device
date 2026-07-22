import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, ArrowRight, Upload } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import PageHero from '../components/shared/PageHero';

const productCategories = [
  'Theatre Equipment', 'ICU Equipment', 'Emergency Equipment',
  'Orthopaedic Devices', 'Diagnostic Equipment', 'Cardiology Equipment',
  'Laboratory Equipment', 'Radiology Equipment', 'Digital Health Systems',
  'CSSD Equipment', 'Oncology Equipment', 'General Ward Equipment',
];

const steps = ['Your Details', 'Product Requirements', 'Project Information'];

export default function Quote() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '',
    organization: '', job_title: '', organization_type: '',
    product_categories: [], products_interested: '',
    project_description: '', budget_range: '', province: '',
    country: 'South Africa', timeline: '', additional_notes: '',
  });

  const f = (k, v) => setForm(prev => ({ ...prev, [k]: v }));
  const toggleCat = (cat) => f('product_categories', form.product_categories.includes(cat) ? form.product_categories.filter(c => c !== cat) : [...form.product_categories, cat]);

  const validateStep = () => {
    const e = {};
    if (step === 0) {
      if (!form.first_name.trim()) e.first_name = 'Required';
      if (!form.last_name.trim()) e.last_name = 'Required';
      if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
      if (!form.organization.trim()) e.organization = 'Required';
      if (!form.organization_type) e.organization_type = 'Please select one';
    }
    if (step === 1) {
      if (form.product_categories.length === 0) e.product_categories = 'Select at least one category';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const nextStep = () => { if (validateStep()) setStep(s => s + 1); };
  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    setLoading(true);
    await base44.entities.QuoteRequest.create({
      ...form,
      products_interested: form.products_interested ? [form.products_interested] : [],
      status: 'new',
    });
    setSubmitted(true);
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--clinical-mist)' }}>
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-12 max-w-lg text-center shadow-xl border" style={{ borderColor: 'var(--light-border)' }}>
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'var(--surgical-teal)' }}>
            <CheckCircle2 size={40} className="text-white" />
          </div>
          <h2 className="font-heading font-black text-3xl mb-3" style={{ color: 'var(--midnight-navy)' }}>Quote Request Submitted!</h2>
          <p className="font-body mb-2" style={{ color: 'var(--slate-text)' }}>Thank you, {form.first_name}. Our specialist team has received your request and will prepare a customised quotation.</p>
          <p className="font-body text-sm mb-8" style={{ color: 'var(--slate-text)' }}>Expect to hear from us within <strong>2 business hours</strong>. A confirmation has been sent to <strong>{form.email}</strong>.</p>
          <div className="p-4 rounded-xl mb-6 text-left" style={{ background: 'var(--clinical-mist)' }}>
            <p className="text-xs font-mono mb-1" style={{ color: 'var(--slate-text)', fontFamily: 'var(--font-mono)' }}>REFERENCE NUMBER</p>
            <p className="font-heading font-black text-lg" style={{ color: 'var(--medihub-blue)' }}>MT-{Date.now().toString().slice(-8)}</p>
          </div>
          <a href="/" className="btn-primary">Return to Homepage</a>
        </motion.div>
      </div>
    );
  }

  return (
    <div>
      <PageHero
        label="Request a Quote"
        title="Get a Customised Medical Equipment Quotation"
        subtitle="Complete the form below and our specialist team will prepare a tailored quotation within 2 business hours."
        image="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80"
      />

      <section className="py-16" style={{ background: 'var(--clinical-mist)' }}>
        <div className="section-container max-w-3xl mx-auto">
          {/* Progress */}
          <div className="flex items-center gap-3 mb-10">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-heading font-bold transition-all duration-300 ${i <= step ? 'text-white' : 'text-slate-400'}`}
                  style={{ background: i < step ? 'var(--surgical-teal)' : i === step ? 'var(--medihub-blue)' : 'var(--light-border)' }}>
                  {i < step ? <CheckCircle2 size={14} /> : i + 1}
                </div>
                <span className={`text-sm font-heading font-medium ${i <= step ? '' : 'text-slate-400'}`} style={{ color: i === step ? 'var(--midnight-navy)' : undefined }}>
                  {s}
                </span>
                {i < steps.length - 1 && <div className="w-8 h-px mx-2" style={{ background: i < step ? 'var(--surgical-teal)' : 'var(--light-border)' }} />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <div className="bg-white rounded-3xl p-8 border shadow-sm" style={{ borderColor: 'var(--light-border)' }}>

              {/* Step 0: Contact Details */}
              {step === 0 && (
                <div className="space-y-5">
                  <h3 className="font-heading font-bold text-xl mb-6" style={{ color: 'var(--midnight-navy)' }}>Your Contact Details</h3>
                  <div className="grid grid-cols-2 gap-5">
                    {[{ k: 'first_name', label: 'First Name', placeholder: 'John' }, { k: 'last_name', label: 'Last Name', placeholder: 'Smith' }].map(field => (
                      <div key={field.k}>
                        <label className="block text-sm font-heading font-semibold mb-1.5" style={{ color: 'var(--midnight-navy)' }}>{field.label} <span style={{ color: '#E53E3E' }}>*</span></label>
                        <input type="text" placeholder={field.placeholder} value={form[field.k]} onChange={e => f(field.k, e.target.value)} className="w-full px-4 py-3 rounded-xl border font-body text-sm focus:outline-none focus:border-medihub-blue transition-colors" style={{ borderColor: errors[field.k] ? '#E53E3E' : 'var(--light-border)', minHeight: '48px' }} />
                        {errors[field.k] && <p className="text-xs mt-1 text-red-500">{errors[field.k]}</p>}
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-sm font-heading font-semibold mb-1.5" style={{ color: 'var(--midnight-navy)' }}>Email Address <span style={{ color: '#E53E3E' }}>*</span></label>
                    <input type="email" placeholder="john@hospital.co.za" value={form.email} onChange={e => f('email', e.target.value)} className="w-full px-4 py-3 rounded-xl border font-body text-sm focus:outline-none focus:border-medihub-blue transition-colors" style={{ borderColor: errors.email ? '#E53E3E' : 'var(--light-border)', minHeight: '48px' }} />
                    {errors.email && <p className="text-xs mt-1 text-red-500">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-heading font-semibold mb-1.5" style={{ color: 'var(--midnight-navy)' }}>Organisation <span style={{ color: '#E53E3E' }}>*</span></label>
                    <input type="text" placeholder="Hospital / Clinic / Department name" value={form.organization} onChange={e => f('organization', e.target.value)} className="w-full px-4 py-3 rounded-xl border font-body text-sm focus:outline-none focus:border-medihub-blue transition-colors" style={{ borderColor: errors.organization ? '#E53E3E' : 'var(--light-border)', minHeight: '48px' }} />
                  </div>
                  <div>
                    <label className="block text-sm font-heading font-semibold mb-1.5" style={{ color: 'var(--midnight-navy)' }}>Organisation Type <span style={{ color: '#E53E3E' }}>*</span></label>
                    <select value={form.organization_type} onChange={e => f('organization_type', e.target.value)} className="w-full px-4 py-3 rounded-xl border font-body text-sm focus:outline-none focus:border-medihub-blue transition-colors" style={{ borderColor: errors.organization_type ? '#E53E3E' : 'var(--light-border)', minHeight: '48px' }}>
                      <option value="">Select type...</option>
                      {['Public Hospital', 'Private Hospital', 'Clinic', 'Government Department', 'NGO', 'University', 'Research Institution', 'Distributor', 'Other'].map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>
              )}

              {/* Step 1: Products */}
              {step === 1 && (
                <div className="space-y-5">
                  <h3 className="font-heading font-bold text-xl mb-2" style={{ color: 'var(--midnight-navy)' }}>Product Requirements</h3>
                  <div>
                    <label className="block text-sm font-heading font-semibold mb-3" style={{ color: 'var(--midnight-navy)' }}>Product Categories Needed <span style={{ color: '#E53E3E' }}>*</span></label>
                    <div className="flex flex-wrap gap-2">
                      {productCategories.map(cat => (
                        <button type="button" key={cat} onClick={() => toggleCat(cat)}
                          className="px-4 py-2 rounded-full text-sm font-heading font-medium transition-all duration-200"
                          style={{ background: form.product_categories.includes(cat) ? 'var(--medihub-blue)' : 'var(--clinical-mist)', color: form.product_categories.includes(cat) ? 'white' : 'var(--slate-text)', minHeight: '40px' }}>
                          {cat}
                        </button>
                      ))}
                    </div>
                    {errors.product_categories && <p className="text-xs mt-2 text-red-500">{errors.product_categories}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-heading font-semibold mb-1.5" style={{ color: 'var(--midnight-navy)' }}>Specific Products or Models (optional)</label>
                    <textarea rows={3} placeholder="List any specific product models or brands you are interested in..." value={form.products_interested} onChange={e => f('products_interested', e.target.value)} className="w-full px-4 py-3 rounded-xl border font-body text-sm focus:outline-none focus:border-medihub-blue transition-colors resize-none" style={{ borderColor: 'var(--light-border)' }} />
                  </div>
                </div>
              )}

              {/* Step 2: Project Info */}
              {step === 2 && (
                <div className="space-y-5">
                  <h3 className="font-heading font-bold text-xl mb-2" style={{ color: 'var(--midnight-navy)' }}>Project Information</h3>
                  <div>
                    <label className="block text-sm font-heading font-semibold mb-1.5" style={{ color: 'var(--midnight-navy)' }}>Project Description</label>
                    <textarea rows={4} placeholder="Describe your project, department requirements, number of units needed, or any other relevant details..." value={form.project_description} onChange={e => f('project_description', e.target.value)} className="w-full px-4 py-3 rounded-xl border font-body text-sm focus:outline-none focus:border-medihub-blue transition-colors resize-none" style={{ borderColor: 'var(--light-border)' }} />
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-heading font-semibold mb-1.5" style={{ color: 'var(--midnight-navy)' }}>Budget Range</label>
                      <select value={form.budget_range} onChange={e => f('budget_range', e.target.value)} className="w-full px-4 py-3 rounded-xl border font-body text-sm focus:outline-none focus:border-medihub-blue transition-colors" style={{ borderColor: 'var(--light-border)', minHeight: '48px' }}>
                        <option value="">Select range...</option>
                        {['Under R500K', 'R500K - R2M', 'R2M - R10M', 'R10M - R50M', 'Over R50M', 'Not Specified'].map(b => <option key={b} value={b}>{b}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-heading font-semibold mb-1.5" style={{ color: 'var(--midnight-navy)' }}>Timeline</label>
                      <select value={form.timeline} onChange={e => f('timeline', e.target.value)} className="w-full px-4 py-3 rounded-xl border font-body text-sm focus:outline-none focus:border-medihub-blue transition-colors" style={{ borderColor: 'var(--light-border)', minHeight: '48px' }}>
                        <option value="">Select timeline...</option>
                        {['Immediate (0-3 months)', 'Short-term (3-6 months)', 'Medium-term (6-12 months)', 'Long-term (12+ months)', 'Planning Phase'].map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-heading font-semibold mb-1.5" style={{ color: 'var(--midnight-navy)' }}>Province / Region</label>
                    <select value={form.province} onChange={e => f('province', e.target.value)} className="w-full px-4 py-3 rounded-xl border font-body text-sm focus:outline-none focus:border-medihub-blue transition-colors" style={{ borderColor: 'var(--light-border)', minHeight: '48px' }}>
                      <option value="">Select province...</option>
                      {['Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Eastern Cape', 'Limpopo', 'Mpumalanga', 'North West', 'Free State', 'Northern Cape', 'Outside South Africa'].map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-heading font-semibold mb-1.5" style={{ color: 'var(--midnight-navy)' }}>Additional Notes</label>
                    <textarea rows={3} placeholder="Any other information that would help us prepare your quotation..." value={form.additional_notes} onChange={e => f('additional_notes', e.target.value)} className="w-full px-4 py-3 rounded-xl border font-body text-sm focus:outline-none focus:border-medihub-blue transition-colors resize-none" style={{ borderColor: 'var(--light-border)' }} />
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t" style={{ borderColor: 'var(--light-border)' }}>
                {step > 0 ? (
                  <button type="button" onClick={prevStep} className="btn-outline">Back</button>
                ) : <div />}

                {step < steps.length - 1 ? (
                  <button type="button" onClick={nextStep} className="btn-primary">
                    Continue <ArrowRight size={16} />
                  </button>
                ) : (
                  <button type="submit" disabled={loading} className="btn-primary" style={{ opacity: loading ? 0.7 : 1 }}>
                    {loading ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Submitting...</> : <>Submit Quote Request <ArrowRight size={16} /></>}
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}