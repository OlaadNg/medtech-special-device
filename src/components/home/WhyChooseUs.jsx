import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Award, Globe, Clock, Wrench, Users, CheckCircle2, TrendingUp } from 'lucide-react';

const reasons = [
  {
    icon: Shield,
    title: 'Certified & Compliant',
    description: 'All products meet South African regulatory requirements, with ISO 13485 quality management and SABS/SAHPRA compliance.',
    metric: 'ISO 13485 Certified',
  },
  {
    icon: Award,
    title: 'Industry Expertise',
    description: 'Over 35 years serving African healthcare. Our team brings deep clinical and technical knowledge across all care divisions.',
    metric: '35+ Years Experience',
  },
  {
    icon: Globe,
    title: 'Pan-African Network',
    description: 'Active operations in 15+ African countries with established distribution networks, regional offices, and local service teams.',
    metric: '15+ Countries',
  },
  {
    icon: Clock,
    title: '24/7 Technical Support',
    description: 'Round-the-clock remote and onsite support from factory-trained engineers. Critical equipment failures addressed within 4 hours.',
    metric: '<4hr Response Time',
  },
  {
    icon: Wrench,
    title: 'Factory-Trained Engineers',
    description: '150+ clinical engineers with manufacturer-specific training and certifications covering all major equipment categories.',
    metric: '150+ Engineers',
  },
  {
    icon: Users,
    title: 'End-to-End Partnership',
    description: 'From initial needs assessment through procurement, installation, training, and ongoing maintenance — we are your long-term partner.',
    metric: 'Full Lifecycle Support',
  },
  {
    icon: CheckCircle2,
    title: 'Global Manufacturer Partnerships',
    description: 'Authorised distributor for 100+ leading global medical equipment manufacturers, ensuring genuine products with full warranty.',
    metric: '100+ Global Partners',
  },
  {
    icon: TrendingUp,
    title: 'Innovation-Led Approach',
    description: 'Continuously introducing the latest medical technologies — from AI diagnostics and robotics to connected health platforms.',
    metric: 'Future-Ready Technology',
  },
];

export default function WhyChooseUs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="py-24 bg-white">
      <div className="section-container">
        <div ref={ref} className="max-w-3xl mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <span className="section-label mb-4">Why MediHub</span>
            <h2 className="font-heading font-black text-4xl lg:text-5xl mt-4 mb-5" style={{ color: 'var(--midnight-navy)' }}>
              Africa's Most Trusted<br />Medical Technology Partner
            </h2>
            <p className="font-body text-lg" style={{ color: 'var(--slate-text)' }}>
              We go beyond supply — we build long-term partnerships with healthcare institutions to ensure technology performs at its highest level, every day.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="group p-6 rounded-2xl border card-hover cursor-default"
                style={{ borderColor: 'var(--light-border)' }}
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{ background: 'var(--clinical-mist)' }}>
                  <Icon size={22} style={{ color: 'var(--medihub-blue)' }} />
                </div>
                <h3 className="font-heading font-bold text-base mb-2" style={{ color: 'var(--midnight-navy)' }}>{reason.title}</h3>
                <p className="font-body text-sm leading-relaxed mb-4" style={{ color: 'var(--slate-text)', fontSize: '13.5px' }}>
                  {reason.description}
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-semibold"
                  style={{ background: 'var(--clinical-mist)', color: 'var(--surgical-teal)', fontFamily: 'var(--font-mono)' }}>
                  <CheckCircle2 size={11} />
                  {reason.metric}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}