import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Clock, Briefcase, ChevronDown, ChevronUp, ArrowRight, Users, TrendingUp, Heart, Award } from 'lucide-react';
import PageHero from '../components/shared/PageHero';

const jobs = [
  { id: 1, title: 'Senior Clinical Engineer', department: 'Clinical Engineering', location: 'Johannesburg', type: 'Full-time', closing: '2026-07-31', description: 'Lead biomedical engineering services for a portfolio of major hospital accounts. Factory-trained on Philips and Siemens equipment.', requirements: ['BSc/BEng Biomedical Engineering or equivalent', 'Minimum 5 years clinical engineering experience', 'Factory training from major manufacturer', 'Valid driver\'s licence', 'Knowledge of SHEQ systems'] },
  { id: 2, title: 'ICU / Critical Care Solutions Specialist', department: 'Sales', location: 'Cape Town', type: 'Full-time', closing: '2026-07-15', description: 'Drive sales of ICU and critical care equipment to hospitals and clinics in the Western Cape. Clinical background advantageous.', requirements: ['3+ years medical device sales experience', 'Clinical background (ICU nursing/paramedic) preferred', 'Strong presentation and negotiation skills', 'Existing hospital network'] },
  { id: 3, title: 'Digital Health Implementation Consultant', department: 'Digital Healthcare', location: 'Johannesburg', type: 'Full-time', closing: '2026-07-20', description: 'Manage implementation of EMR and hospital information systems across South African health facilities.', requirements: ['IT degree or Health Informatics qualification', '3+ years HIS/EMR implementation experience', 'Experience with Cerner or similar systems', 'Healthcare industry knowledge'] },
  { id: 4, title: 'Africa Operations Manager — East Africa', department: 'Operations', location: 'Nairobi, Kenya', type: 'Full-time', closing: '2026-08-15', description: 'Establish and grow MedTech operations in East Africa, managing distribution partners and clinical engineering teams across Kenya, Uganda, and Tanzania.', requirements: ['10+ years in African healthcare industry', 'Proven business development in East Africa', 'Fluent in Swahili and English', 'Medical device industry experience'] },
  { id: 5, title: 'Graduate — Biomedical Engineering Programme', department: 'Clinical Engineering', location: 'Johannesburg / Cape Town', type: 'Graduate Programme', closing: '2026-07-01', description: '24-month structured graduate programme with rotations across clinical engineering, sales, and operations. Full factory training provided.', requirements: ['Recent BEng Biomedical Engineering graduate', 'Minimum 65% aggregate', 'South African citizen', 'Driver\'s licence'] },
  { id: 6, title: 'Theatre Solutions Clinical Trainer', department: 'Sales', location: 'Pretoria', type: 'Full-time', closing: '2026-07-30', description: 'Provide clinical and technical training to theatre staff across hospital clients. Specialise in surgical lights, tables, and laparoscopic equipment.', requirements: ['Registered Nurse (Theatre) or equivalent', '3+ years scrub nurse experience', 'Medical device training experience preferred', 'Excellent communication skills'] },
];

const benefits = [
  { icon: TrendingUp, title: 'Career Growth', desc: 'Structured career pathways, manufacturer training, and leadership development programmes.' },
  { icon: Heart, title: 'Healthcare Cover', desc: 'Comprehensive medical aid for you and your family, plus life assurance and disability cover.' },
  { icon: Award, title: 'Performance Rewards', desc: 'Competitive salaries, performance bonuses, and recognition programmes for outstanding contribution.' },
  { icon: Users, title: 'Collaborative Culture', desc: 'Work with a diverse, expert team united by a shared commitment to improving African healthcare.' },
];

export default function Careers() {
  const [expanded, setExpanded] = useState(null);
  const [filter, setFilter] = useState('All');
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const departments = ['All', ...Array.from(new Set(jobs.map(j => j.department)))];
  const filtered = filter === 'All' ? jobs : jobs.filter(j => j.department === filter);

  return (
    <div>
      <PageHero
        label="Careers at MedTech"
        title="Shape the Future of African Healthcare"
        subtitle="Join a team of 600+ passionate professionals dedicated to advancing healthcare technology internationally. We invest in people who care about making a difference."
        image="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1920&q=80"
      />

      {/* Culture */}
      <section className="py-20 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="section-label mb-4">Life at MedTech</span>
              <h2 className="font-heading font-black text-3xl lg:text-4xl mt-4 mb-5" style={{ color: 'var(--midnight-navy)' }}>Where Expertise Meets Impact</h2>
              <p className="font-body text-lg leading-relaxed mb-8" style={{ color: 'var(--slate-text)' }}>
                At MedTech, every team member contributes directly to the quality of healthcare worldwide. Whether you are a clinical engineer maintaining life-saving equipment or a sales specialist connecting hospitals with the technology they need — your work matters.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {benefits.map(b => {
                  const Icon = b.icon;
                  return (
                    <div key={b.title} className="p-4 rounded-2xl border" style={{ borderColor: 'var(--light-border)' }}>
                      <Icon size={20} className="mb-3" style={{ color: 'var(--medihub-blue)' }} />
                      <h4 className="font-heading font-bold text-sm mb-1" style={{ color: 'var(--midnight-navy)' }}>{b.title}</h4>
                      <p className="font-body text-xs leading-relaxed" style={{ color: 'var(--slate-text)' }}>{b.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <img src="https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&q=80&auto=format&fit=crop" alt="MedTech team collaborating in a modern workspace" className="rounded-3xl shadow-xl w-full object-cover" style={{ height: '460px' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Job listings */}
      <section ref={ref} className="py-20" style={{ background: 'var(--clinical-mist)' }}>
        <div className="section-container">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-10">
            <div>
              <span className="section-label mb-2">Open Positions</span>
              <h2 className="font-heading font-black text-3xl mt-2" style={{ color: 'var(--midnight-navy)' }}>{filtered.length} Roles Available</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {departments.map(d => (
                <button key={d} onClick={() => setFilter(d)} className="px-4 py-2 rounded-full text-sm font-heading font-medium transition-all" style={{ background: filter === d ? 'var(--medihub-blue)' : 'white', color: filter === d ? 'white' : 'var(--slate-text)', minHeight: '40px', border: '1px solid var(--light-border)' }}>
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filtered.map((job, i) => (
              <motion.div key={job.id} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.07 }}
                className="bg-white rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--light-border)' }}>
                <button onClick={() => setExpanded(expanded === job.id ? null : job.id)} className="w-full p-6 text-left flex items-start justify-between gap-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="text-xs font-heading font-semibold px-3 py-1 rounded-full" style={{ background: 'var(--clinical-mist)', color: 'var(--medihub-blue)' }}>{job.department}</span>
                      <span className="text-xs font-body" style={{ color: 'var(--slate-text)' }}>{job.type}</span>
                    </div>
                    <h3 className="font-heading font-bold text-lg" style={{ color: 'var(--midnight-navy)' }}>{job.title}</h3>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm font-body" style={{ color: 'var(--slate-text)' }}>
                      <span className="flex items-center gap-1.5"><MapPin size={13} /> {job.location}</span>
                      <span className="flex items-center gap-1.5"><Briefcase size={13} /> {job.type}</span>
                      <span className="flex items-center gap-1.5"><Clock size={13} /> Closes {job.closing}</span>
                    </div>
                  </div>
                  {expanded === job.id ? <ChevronUp size={20} style={{ color: 'var(--slate-text)', flexShrink: 0, marginTop: 4 }} /> : <ChevronDown size={20} style={{ color: 'var(--slate-text)', flexShrink: 0, marginTop: 4 }} />}
                </button>

                {expanded === job.id && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="px-6 pb-6 border-t" style={{ borderColor: 'var(--light-border)' }}>
                    <p className="font-body text-base leading-relaxed my-4" style={{ color: 'var(--slate-text)' }}>{job.description}</p>
                    <h4 className="font-heading font-semibold mb-3" style={{ color: 'var(--midnight-navy)' }}>Requirements:</h4>
                    <ul className="space-y-2 mb-6">
                      {job.requirements.map(r => (
                        <li key={r} className="flex items-start gap-2 font-body text-sm" style={{ color: 'var(--slate-text)' }}>
                          <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: 'var(--medihub-blue)' }} />
                          {r}
                        </li>
                      ))}
                    </ul>
                    <a href={`mailto:info@medtechspecialdevice.com?subject=Application: ${job.title}`} className="btn-primary" style={{ minHeight: '48px', padding: '0 24px', fontSize: '14px' }}>
                      Apply for This Role <ArrowRight size={15} />
                    </a>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}