import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CheckCircle2, Award, Globe, Users, Target, Eye, Heart } from 'lucide-react';
import PageHero from '../components/shared/PageHero';

const timeline = [
  { year: '2000', title: 'MedTech Founded', desc: 'Established as a wholesale liquidator of disposable surgical devices and sutures from top global brands.' },
  { year: '2001', title: 'ISO 13485 Certification', desc: 'Achieved international quality management certification for medical device distribution.' },
  { year: '2003', title: 'International Expansion', desc: 'Opened distribution partnerships across multiple countries, serving clients worldwide.' },
  { year: '2006', title: 'Global Warehouse Network', desc: 'Established warehouses in China, United States, and South Africa for same-day worldwide shipping.' },
  { year: '2010', title: 'Premium Brand Launch', desc: 'Launched own premium brand of sutures, skin staplers, and exam gloves for lower-cost, higher-quality options.' },
  { year: '2015', title: 'Digital Health Division', desc: 'Established digital healthcare division focused on EMR, telemedicine, and health IT.' },
  { year: '2020', title: 'COVID-19 Emergency Response', desc: 'Supplied 2,000+ ventilators and critical care equipment to healthcare facilities worldwide during the pandemic.' },
  { year: '2023', title: '160,000+ Item Catalogue', desc: 'Reached milestone of 160,000+ items from 150+ manufacturers with same-day shipping capability.' },
  { year: '2026', title: 'AI Healthcare Technology', desc: 'Launched AI diagnostics and robotic surgery solutions for healthcare providers internationally.' },
];

const team = [
  {
    name: 'Dr. Marcus van der Berg',
    role: 'Chief Executive Officer',
    bio: '25+ years in healthcare technology. Former Director at WHO Africa Regional Office. Ph.D. Biomedical Engineering, UCT.',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80&auto=format&fit=crop',
    department: 'Executive',
  },
  {
    name: 'Ms. Nokuthula Zulu',
    role: 'Chief Operating Officer',
    bio: "MBA Wits Business School. Led MedTech's expansion into new markets. Healthcare supply chain specialist.",
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80&auto=format&fit=crop',
    department: 'Executive',
  },
  {
    name: 'Mr. Riaan Pretorius',
    role: 'Chief Technical Officer',
    bio: 'Biomedical Engineer with experience at leading global medical device companies. Leads our technical and engineering division.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80&auto=format&fit=crop',
    department: 'Technical',
  },
  {
    name: 'Dr. Aisha Mohammed',
    role: 'Head of Clinical Solutions',
    bio: 'MBChB UCT, MBA Harvard. Former ICU physician bringing deep clinical expertise to our solutions architecture.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80&auto=format&fit=crop',
    department: 'Clinical',
  },
  {
    name: 'Mr. Sipho Mahlangu',
    role: 'VP Africa Operations',
    bio: 'Heads pan-African expansion with 15 years experience in medical equipment distribution across Sub-Saharan Africa.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80&auto=format&fit=crop',
    department: 'Operations',
  },
  {
    name: 'Ms. Priya Naidoo',
    role: 'Head of Digital Healthcare',
    bio: 'Technology innovator specialising in health informatics, AI diagnostics, and connected medical device ecosystems.',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80&auto=format&fit=crop',
    department: 'Digital',
  },
];

const values = [
  { icon: Heart, title: 'Patient-First', desc: 'Every decision is evaluated through the lens of patient safety, clinical outcomes, and quality of care.' },
  { icon: Award, title: 'Excellence', desc: 'We hold ourselves to the highest standards in product quality, service delivery, and technical support.' },
  { icon: Target, title: 'Innovation', desc: 'Continuously exploring and adopting the latest medical technologies to advance African healthcare.' },
  { icon: Users, title: 'Partnership', desc: 'Long-term relationships built on trust, transparency, and mutual commitment to healthcare advancement.' },
  { icon: CheckCircle2, title: 'Integrity', desc: 'Ethical business practices, regulatory compliance, and honest dealings with every stakeholder.' },
  { icon: Globe, title: 'African Impact', desc: 'Committed to transforming healthcare access and quality across the African continent.' },
];

const certifications = [
  'ISO 13485:2016 — Medical Devices Quality Management',
  'SAHPRA Registered Importer & Distributor',
  'SABS Approved Supplier',
  'B-BBEE Level 2 Contributor',
  'CE Mark Authorised Representative',
  'FDA Registered Facility',
  'ISO 9001:2015 — Quality Management Systems',
  'Department of Health Preferred Supplier',
];

export default function About() {
  const timelineRef = useRef(null);
  const teamRef = useRef(null);
  const valuesRef = useRef(null);
  const timelineInView = useInView(timelineRef, { once: true, margin: '-80px' });
  const teamInView = useInView(teamRef, { once: true, margin: '-80px' });
  const valuesInView = useInView(valuesRef, { once: true, margin: '-80px' });

  return (
    <div>
      <PageHero
        label="About MedTech Special Device"
        title="Your Trusted Wholesale Surgical Device Partner Since 2000"
        subtitle="A proud member of the surgical device community since 2000 — supplying brand-name surgical disposables at discounted prices worldwide, with no contracts and no minimum orders."
        image="https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1920&q=90&auto=format&fit=crop"
      />

      {/* Company overview */}
      <section className="py-24 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-label mb-4">Our Story</span>
              <h2 className="font-heading font-black text-4xl lg:text-5xl mt-4 mb-6" style={{ color: 'var(--midnight-navy)' }}>
                Who We Are
              </h2>
              <p className="font-body text-lg leading-relaxed mb-5" style={{ color: 'var(--slate-text)' }}>
                MedTech Special Device is a wholesale liquidator of disposable surgical devices and sutures from top brands such as <strong>Arthrex, Bard, Medtronic, Stryker</strong>, and many more. A proud member of the surgical device community since 2000, we specialise in selling brand-name surgical devices at discounted prices — in quantities you decide. <strong>No contracts, no minimum orders.</strong>
              </p>
              <p className="font-body leading-relaxed mb-5" style={{ color: 'var(--slate-text)' }}>
                In order to better serve the medical community, in 2023, MedTech Special Device launched our own premium brand of sutures, skin staplers, and exam gloves. This enables us to provide lower-cost &amp; higher-quality surgical disposables while maintaining the speed and efficiency you've come to expect.
              </p>
              <p className="font-body leading-relaxed mb-5" style={{ color: 'var(--slate-text)' }}>
                When you call MedTech Special Device, you're not just speaking to an order taker — you are speaking to a Customer Service Representative who can help you find the products you use quickly and easily. No guesswork, no delays. We know your time is valuable.
              </p>
              <p className="font-body leading-relaxed mb-8" style={{ color: 'var(--slate-text)' }}>
                We stock over <strong>160,000 items</strong> from over <strong>150 leading manufacturers</strong>. Orders placed by <strong>5:00 PM CST ship the same day</strong> worldwide. Overnight international shipping is available.
              </p>

              {/* Contact & Warehouses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="p-5 rounded-2xl border" style={{ borderColor: 'var(--light-border)' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Target size={18} style={{ color: 'var(--medihub-blue)' }} />
                    <span className="font-heading font-bold text-sm" style={{ color: 'var(--midnight-navy)' }}>Contact Us</span>
                  </div>
                  <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--slate-text)' }}>
                    Contact us by <strong>email only</strong>.<br />
                    <a href="mailto:info@medtechspecialdevice.com" className="underline" style={{ color: 'var(--medihub-blue)' }}>info@medtechspecialdevice.com</a>
                  </p>
                </div>
                <div className="p-5 rounded-2xl border" style={{ borderColor: 'var(--light-border)' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Globe size={18} style={{ color: 'var(--medihub-blue)' }} />
                    <span className="font-heading font-bold text-sm" style={{ color: 'var(--midnight-navy)' }}>Our Warehouses</span>
                  </div>
                  <ul className="font-body text-sm space-y-1" style={{ color: 'var(--slate-text)' }}>
                    <li>🇨🇳 <strong>China</strong> — China Warehouse</li>
                    <li>🇺🇸 <strong>United States</strong> — US Warehouse</li>
                    <li>🇿🇦 <strong>South Africa</strong> — SA Warehouse</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1576669801820-a9ab287ac2d1?w=800&q=80&auto=format&fit=crop"
                alt="MedTech Special Device team working in a modern medical environment"
                className="rounded-3xl shadow-2xl w-full object-cover"
                style={{ height: '520px' }}
              />
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-5 shadow-xl border" style={{ borderColor: 'var(--light-border)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: 'var(--medihub-blue)' }}>
                    <Award size={22} className="text-white" />
                  </div>
                  <div>
                    <p className="font-heading font-black text-xl" style={{ color: 'var(--midnight-navy)' }}>25+ Years</p>
                    <p className="font-body text-sm" style={{ color: 'var(--slate-text)' }}>Global Excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section ref={valuesRef} className="py-24" style={{ background: 'var(--clinical-mist)' }}>
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={valuesInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
            <span className="section-label mb-4">Core Values</span>
            <h2 className="font-heading font-black text-4xl mt-4" style={{ color: 'var(--midnight-navy)' }}>The Principles That Guide Us</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((val, i) => {
              const Icon = val.icon;
              return (
                <motion.div key={val.title} initial={{ opacity: 0, y: 30 }} animate={valuesInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.08, duration: 0.5 }}
                  className="bg-white p-7 rounded-2xl border card-hover" style={{ borderColor: 'var(--light-border)' }}>
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5" style={{ background: 'var(--medihub-blue)' }}>
                    <Icon size={22} className="text-white" />
                  </div>
                  <h3 className="font-heading font-bold text-lg mb-2" style={{ color: 'var(--midnight-navy)' }}>{val.title}</h3>
                  <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--slate-text)' }}>{val.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section ref={timelineRef} className="py-24 bg-white">
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={timelineInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
            <span className="section-label mb-4">Company Timeline</span>
            <h2 className="font-heading font-black text-4xl mt-4" style={{ color: 'var(--midnight-navy)' }}>25 Years of Milestones</h2>
          </motion.div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-8 top-0 bottom-0 w-px" style={{ background: 'linear-gradient(180deg, var(--medihub-blue), var(--surgical-teal))' }} />
            <div className="space-y-8">
              {timeline.map((item, i) => (
                <motion.div key={item.year} initial={{ opacity: 0, x: -30 }} animate={timelineInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: i * 0.07, duration: 0.5 }}
                  className="flex gap-8 items-start pl-20 relative">
                  <div className="absolute left-4 w-8 h-8 rounded-full flex items-center justify-center border-2 border-medihub-blue bg-white" style={{ borderColor: 'var(--medihub-blue)' }}>
                    <div className="w-3 h-3 rounded-full" style={{ background: 'var(--medihub-blue)' }} />
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="font-mono text-sm font-semibold mb-1" style={{ color: 'var(--medihub-blue)', fontFamily: 'var(--font-mono)' }}>{item.year}</div>
                    <h4 className="font-heading font-bold mb-1" style={{ color: 'var(--midnight-navy)' }}>{item.title}</h4>
                    <p className="font-body text-sm" style={{ color: 'var(--slate-text)' }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section ref={teamRef} id="team" className="py-24" style={{ background: 'var(--clinical-mist)' }}>
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={teamInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="text-center mb-14">
            <span className="section-label mb-4">Leadership</span>
            <h2 className="font-heading font-black text-4xl mt-4" style={{ color: 'var(--midnight-navy)' }}>The Team Driving African Healthcare Forward</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {team.map((member, i) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 30 }} animate={teamInView ? { opacity: 1, y: 0 } : {}} transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl overflow-hidden border card-hover" style={{ borderColor: 'var(--light-border)' }}>
                <div className="h-56 overflow-hidden">
                  <img src={member.image} alt={`${member.name}, ${member.role} at MedTech`} className="w-full h-full object-cover object-top" />
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-bold text-lg mb-0.5" style={{ color: 'var(--midnight-navy)' }}>{member.name}</h3>
                  <p className="font-body text-sm font-semibold mb-3" style={{ color: 'var(--medihub-blue)' }}>{member.role}</p>
                  <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--slate-text)' }}>{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className="py-24 bg-white">
        <div className="section-container">
          <div className="text-center mb-12">
            <span className="section-label mb-4">Certifications &amp; Compliance</span>
            <h2 className="font-heading font-black text-4xl mt-4" style={{ color: 'var(--midnight-navy)' }}>Certified to the Highest Standards</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert, i) => (
              <div key={i} className="flex items-center gap-3 p-4 rounded-xl border" style={{ borderColor: 'var(--light-border)' }}>
                <CheckCircle2 size={18} style={{ color: 'var(--surgical-teal)', flexShrink: 0 }} />
                <span className="font-body text-sm" style={{ color: 'var(--midnight-navy)' }}>{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}