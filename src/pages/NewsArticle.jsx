import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Tag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const articles = [
  {
    id: 1,
    category: 'Medical Innovations',
    title: 'AI-Powered Diagnostics Revolutionising Early Disease Detection Worldwide',
    excerpt: 'New deep learning algorithms are enabling rapid, accurate diagnostics in resource-constrained healthcare settings globally, improving outcomes for millions.',
    body: `Artificial intelligence is rapidly transforming the landscape of medical diagnostics, offering unprecedented speed and accuracy in detecting diseases that traditionally require specialist evaluation. New deep learning algorithms, trained on millions of clinical images and patient records, are now achieving diagnostic accuracy that matches or exceeds experienced clinicians in several key areas.

**Key Developments in AI Diagnostics**

Recent studies have demonstrated that AI-powered chest X-ray analysis can detect early-stage tuberculosis, pneumonia, and lung cancer with sensitivity rates exceeding 95%. This is particularly significant for healthcare systems worldwide where radiologist shortages create diagnostic bottlenecks.

In pathology, AI image analysis is enabling rapid cancer cell identification in biopsy samples, reducing turnaround times from days to hours. Companies like PathAI and Ibex Medical Analytics are deploying these tools in hospital laboratories globally, with measurable impacts on patient outcomes.

**Impact on Resource-Constrained Settings**

Perhaps the most transformative application is in remote and underserved healthcare facilities. AI diagnostic tools, deployed on tablet devices or via telemedicine platforms, are enabling community health workers to perform complex screening tasks previously requiring specialist equipment.

MedTech has integrated AI diagnostic modules into its Digital Health Systems offering, enabling healthcare facilities worldwide to access cutting-edge diagnostic support regardless of their specialist staffing levels.

**The Road Ahead**

The next generation of AI diagnostics will incorporate multi-modal data — combining imaging, laboratory results, vital signs, and electronic health records — to provide comprehensive clinical decision support. Regulatory approvals are accelerating, with the FDA and CE marking processes now including specific pathways for AI medical devices.`,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&q=80',
    date: 'June 10, 2026',
    readTime: '5 min',
    author: 'Dr. Aisha Mohammed',
    authorTitle: 'Head of Clinical Solutions, MedTech',
    tags: ['AI', 'Diagnostics', 'Digital Health', 'Innovation'],
    featured: true,
  },
  {
    id: 2,
    category: 'Industry Reports',
    title: 'Global Healthcare Reform: What It Means for Medical Equipment Procurement',
    excerpt: 'Analysis of international healthcare policy trends and their implications for private and public sector medical technology procurement.',
    body: `Healthcare systems worldwide are undergoing significant reform, driven by demographic shifts, technological advancement, and the lessons learned from the COVID-19 pandemic. These reforms have profound implications for medical equipment procurement strategies at both institutional and national levels.

**Universal Health Coverage Drives Procurement Scale**

As more countries commit to Universal Health Coverage (UHC) targets, procurement volumes for essential medical equipment are increasing dramatically. WHO estimates that achieving UHC for the global population will require a $371 billion annual investment in healthcare systems, a significant portion of which will flow into medical technology.

**Public-Private Partnership Models**

Traditional procurement models are giving way to innovative public-private partnerships that bundle equipment supply with long-term service, maintenance, and training. These models, sometimes called Healthcare Technology Management (HTM) contracts, provide healthcare facilities with guaranteed uptime and performance rather than simply capital equipment.

**Supply Chain Resilience Post-Pandemic**

The COVID-19 pandemic exposed critical vulnerabilities in global medical supply chains. Procurement policies now increasingly favour suppliers with multi-region manufacturing and distribution capabilities, robust inventory management, and the ability to rapidly scale supply in emergency situations.

MedTech's multi-warehouse model — with facilities in China, the United States, and South Africa — positions us as a resilient global supplier meeting these new procurement standards.

**Sustainability in Medical Procurement**

Environmental sustainability is increasingly a tender criterion in public procurement. Medical device manufacturers and distributors are being asked to demonstrate circular economy practices, reduced packaging, and carbon-neutral logistics. MedTech is actively investing in sustainable supply chain practices to meet these evolving requirements.`,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1200&q=80',
    date: 'June 5, 2026',
    readTime: '8 min',
    author: 'Nokuthula Zulu',
    authorTitle: 'Chief Operating Officer, MedTech',
    tags: ['Policy', 'Procurement', 'Healthcare Reform', 'Global Markets'],
  },
  {
    id: 3,
    category: 'Company News',
    title: 'MedTech Expands Global Operations With New International Distribution Hub',
    excerpt: 'MedTech strengthens its worldwide footprint by establishing a full-service clinical engineering and distribution hub to serve international markets.',
    body: `MedTech Special Device is pleased to announce the expansion of its global operations with the establishment of a new international distribution and clinical engineering hub, designed to better serve our growing customer base across multiple continents.

**Strategic Expansion**

The new facility will serve as a regional hub for product storage, technical training, and clinical engineering support. Equipped with a state-of-the-art demonstration theatre and biomedical engineering workshop, it will enable our teams to provide hands-on product demonstrations, training programmes, and rapid technical support to healthcare facilities in the region.

**Full-Service Capabilities**

The hub will offer the complete MedTech service portfolio, including equipment installation and commissioning, preventive maintenance programmes, calibration and compliance testing, clinical application training, and 24/7 technical support.

**Same-Day Shipping Maintained**

Despite the expansion, our commitment to same-day shipping for orders placed by 5:00 PM CST remains unchanged. The new hub enhances our logistics capacity, ensuring faster delivery times to international customers.

**Growing Global Footprint**

With warehouses already operating in China, the United States, and South Africa, this expansion further strengthens MedTech's ability to deliver 160,000+ items from 150+ manufacturers to healthcare facilities anywhere in the world, with the speed, reliability, and support they expect.`,
    image: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1200&q=80',
    date: 'May 28, 2026',
    readTime: '3 min',
    author: 'Marketing Team',
    authorTitle: 'MedTech Communications',
    tags: ['Company News', 'Expansion', 'Global Operations'],
  },
  {
    id: 4,
    category: 'Healthcare News',
    title: 'Robotic Surgery Goes Global: MedTech Partners With Intuitive Surgical for da Vinci Distribution',
    excerpt: 'A landmark partnership brings the da Vinci surgical system to hospitals worldwide, with 12 systems already placed across multiple countries.',
    body: `MedTech Special Device has entered into a landmark distribution partnership with Intuitive Surgical, the global leader in robotic-assisted surgery, to distribute the da Vinci Surgical System to hospitals worldwide through MedTech's international network.

**A Milestone for Robotic Surgery Access**

The da Vinci Surgical System is the world's most widely used robotic surgery platform, with over 7,000 systems installed globally and more than 10 million procedures performed. Until recently, access to robotic surgery has been concentrated in high-income countries. This partnership is designed to change that.

**12 Systems Already Placed**

Since the partnership was announced, MedTech has already facilitated the placement of 12 da Vinci systems in hospitals across multiple countries, with another 18 in advanced procurement stages. Each placement includes a comprehensive training programme for surgical teams and biomedical engineering staff.

**Comprehensive Training and Support**

MedTech's clinical engineering division has been certified by Intuitive Surgical to provide full technical support for da Vinci systems, including installation, preventive maintenance, and emergency repair. Our team of trained biomedical engineers ensures that robotic surgery programmes achieve maximum uptime and clinical utilisation.

**The Future of Surgery**

Robotic surgery offers significant clinical advantages including reduced blood loss, shorter hospital stays, faster patient recovery, and improved surgical precision. As the technology becomes more accessible internationally, MedTech is committed to ensuring that hospitals worldwide can offer their patients the full benefits of robotic-assisted procedures.`,
    image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=1200&q=80',
    date: 'May 15, 2026',
    readTime: '6 min',
    author: 'Dr. Marcus van der Berg',
    authorTitle: 'Chief Executive Officer, MedTech',
    tags: ['Robotic Surgery', 'Partnership', 'Innovation', 'Surgical Technology'],
  },
  {
    id: 5,
    category: 'Case Studies',
    title: "How Charlotte Maxeke Hospital Reduced ICU Equipment Downtime by 94% With MedTech's Fleet Management Programme",
    excerpt: 'A 12-month case study on how proactive maintenance and real-time fleet monitoring transformed critical care equipment reliability.',
    body: `Charlotte Maxeke Academic Hospital in Johannesburg is one of southern Africa's largest and most complex teaching hospitals, with a 150-bed ICU serving critically ill patients from across the region. For years, the hospital's biomedical engineering team was overwhelmed by reactive maintenance demands — equipment breakdowns frequently impacted patient care and created enormous pressure on a small technical team.

**The Challenge**

An audit of ICU equipment performance revealed that unplanned equipment downtime was occurring at a rate of 3.2 incidents per device per year. With 120 ICU devices in active use, this translated to over 380 unplanned breakdown events annually. Mean time to repair averaged 7.4 hours, with critical equipment like ventilators and patient monitors occasionally out of service for 24-48 hours pending parts availability.

**The MedTech Solution**

MedTech implemented its comprehensive Fleet Management Programme across all 120 ICU devices, encompassing real-time IoT condition monitoring, quarterly planned preventive maintenance (PPM) visits, factory-trained engineer assignment, and strategic spare parts pre-positioning at the hospital.

A dedicated MedTech biomedical engineer was assigned to the hospital full-time, working alongside the hospital's own biomedical team. Real-time dashboards gave clinical management complete visibility into equipment status, maintenance schedules, and performance trends.

**The Results**

After 12 months, the transformation in equipment reliability was dramatic: unplanned downtime incidents decreased by 94%, from 380 to just 23 events annually. Mean time to repair dropped from 7.4 hours to 1.2 hours. PPM compliance reached 99%, ensuring all equipment was maintained to manufacturer specifications.

The hospital's biomedical team, freed from reactive maintenance demands, was able to focus on equipment audits, staff training, and capital planning — transforming from a reactive to a strategic function.

**Client Testimony**

"MedTech transformed how we manage our critical care equipment. The proactive approach has measurably improved our equipment uptime and taken enormous pressure off our biomedical team." — Dr. Sarah Mokoena, Head of Critical Care`,
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=1200&q=80',
    date: 'May 5, 2026',
    readTime: '10 min',
    author: 'Riaan Pretorius',
    authorTitle: 'Chief Technical Officer, MedTech',
    tags: ['Case Study', 'ICU', 'Fleet Management', 'Clinical Engineering'],
  },
  {
    id: 6,
    category: 'Industry Reports',
    title: 'Global Medical Equipment Market Report 2026: Growth, Trends, and Opportunities',
    excerpt: 'Comprehensive analysis of the worldwide medical equipment market, projected to reach $612 billion by 2030, with key growth drivers in digital health and AI.',
    body: `The global medical equipment market is experiencing robust growth, driven by demographic trends, technological innovation, and expanding healthcare infrastructure worldwide. This report provides a comprehensive analysis of market dynamics, key growth drivers, and strategic opportunities for healthcare technology companies.

**Market Overview**

The global medical devices market was valued at $495 billion in 2025 and is projected to reach $612 billion by 2030, representing a CAGR of 4.4%. The fastest-growing segments are digital health solutions, AI-powered diagnostic devices, and minimally invasive surgical technologies.

**Key Growth Drivers**

*Ageing Global Population:* By 2030, the global population aged 65 and over will exceed 1 billion, driving increased demand for chronic disease management equipment, mobility aids, and intensive care technology.

*Digital Health Acceleration:* The COVID-19 pandemic permanently accelerated the adoption of telemedicine, remote patient monitoring, and hospital information systems. The global digital health market is expected to reach $660 billion by 2028.

*Emerging Market Expansion:* Healthcare infrastructure investment in emerging markets — particularly across Asia, Latin America, and Africa — is driving significant equipment procurement. Government healthcare programmes and international development funding are channelling billions into medical technology.

*AI and Robotics Integration:* AI-powered imaging analysis, robotic surgery, and automated laboratory systems are becoming standard offerings, commanding premium pricing and creating high-value service opportunities.

**Competitive Landscape**

The market remains dominated by large multinationals — Medtronic, Philips, GE Healthcare, Siemens Healthineers, Abbott — but significant opportunities exist for specialist distributors and regional players who combine product access with deep technical service capabilities.

**Strategic Recommendations**

Healthcare technology companies seeking to capture growth in the expanding global market should focus on building full-service capabilities (not just product distribution), investing in digital health platforms, and developing partnerships that provide long-term value to healthcare systems rather than transactional equipment supply.`,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80',
    date: 'April 20, 2026',
    readTime: '12 min',
    author: 'Research Team',
    authorTitle: 'MedTech Market Intelligence',
    tags: ['Market Report', 'Industry Analysis', 'Global Markets', 'Digital Health'],
  },
];

const catColors = {
  'Medical Innovations': { bg: 'rgba(0,163,123,0.12)', text: 'var(--surgical-teal)' },
  'Industry Reports': { bg: 'rgba(0,91,170,0.1)', text: 'var(--medihub-blue)' },
  'Company News': { bg: 'rgba(0,168,232,0.1)', text: '#0088CC' },
  'Healthcare News': { bg: 'rgba(107,70,193,0.1)', text: '#6B46C1' },
  'Case Studies': { bg: 'rgba(192,86,33,0.1)', text: '#C05621' },
};

function renderBody(body) {
  return body.split('\n\n').map((para, i) => {
    if (para.startsWith('**') && para.endsWith('**')) {
      return <h3 key={i} className="font-heading font-bold text-xl mt-8 mb-3" style={{ color: 'var(--midnight-navy)' }}>{para.replace(/\*\*/g, '')}</h3>;
    }
    if (para.startsWith('*') && para.includes(':*')) {
      const [boldPart, ...rest] = para.split(':*');
      return <p key={i} className="font-body leading-relaxed mb-4" style={{ color: 'var(--slate-text)' }}><strong style={{ color: 'var(--midnight-navy)' }}>{boldPart.replace('*', '')}:</strong>{rest.join(':')}</p>;
    }
    return <p key={i} className="font-body leading-relaxed mb-4" style={{ color: 'var(--slate-text)' }}>{para}</p>;
  });
}

export default function NewsArticle() {
  const { id } = useParams();
  const article = articles.find(a => a.id === parseInt(id));

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--clinical-mist)' }}>
        <div className="text-center">
          <h2 className="font-heading font-black text-2xl mb-3" style={{ color: 'var(--midnight-navy)' }}>Article Not Found</h2>
          <Link to="/news" className="btn-primary">Back to News</Link>
        </div>
      </div>
    );
  }

  const cs = catColors[article.category] || { bg: 'var(--clinical-mist)', text: 'var(--slate-text)' };
  const related = articles.filter(a => a.category === article.category && a.id !== article.id).slice(0, 3);

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-white border-b py-4" style={{ borderColor: 'var(--light-border)' }}>
        <div className="section-container flex items-center gap-2 text-sm font-body" style={{ color: 'var(--slate-text)' }}>
          <Link to="/news" className="flex items-center gap-1.5 hover:text-medihub-blue transition-colors">
            <ArrowLeft size={14} /> News & Insights
          </Link>
          <span>/</span>
          <span style={{ color: 'var(--midnight-navy)' }} className="truncate max-w-xs">{article.title}</span>
        </div>
      </div>

      {/* Hero image */}
      <div className="w-full h-72 lg:h-96 overflow-hidden">
        <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
      </div>

      {/* Article content */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              {/* Category & Meta */}
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className="text-xs font-heading font-semibold px-3 py-1.5 rounded-full" style={cs}>{article.category}</span>
                <span className="flex items-center gap-1.5 text-sm font-body" style={{ color: 'var(--slate-text)' }}><Calendar size={13} />{article.date}</span>
                <span className="flex items-center gap-1.5 text-sm font-body" style={{ color: 'var(--slate-text)' }}><Clock size={13} />{article.readTime} read</span>
              </div>

              {/* Title */}
              <h1 className="font-heading font-black mb-5" style={{ color: 'var(--midnight-navy)', fontSize: 'clamp(1.7rem, 3vw, 2.5rem)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                {article.title}
              </h1>

              {/* Author */}
              <div className="flex items-center gap-3 pb-8 mb-8 border-b" style={{ borderColor: 'var(--light-border)' }}>
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-heading font-bold" style={{ background: 'var(--medihub-blue)' }}>
                  {article.author.charAt(0)}
                </div>
                <div>
                  <p className="font-heading font-semibold text-sm" style={{ color: 'var(--midnight-navy)' }}>{article.author}</p>
                  <p className="font-body text-xs" style={{ color: 'var(--slate-text)' }}>{article.authorTitle}</p>
                </div>
              </div>

              {/* Excerpt */}
              <p className="font-body text-lg leading-relaxed mb-8 font-medium" style={{ color: 'var(--midnight-navy)', borderLeft: '3px solid var(--medihub-blue)', paddingLeft: '1rem' }}>
                {article.excerpt}
              </p>

              {/* Body */}
              <div className="prose-content text-base">
                {renderBody(article.body)}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t" style={{ borderColor: 'var(--light-border)' }}>
                <Tag size={14} style={{ color: 'var(--slate-text)' }} className="mt-0.5" />
                {article.tags.map(tag => (
                  <span key={tag} className="text-xs font-heading font-medium px-3 py-1.5 rounded-full" style={{ background: 'var(--clinical-mist)', color: 'var(--slate-text)' }}>{tag}</span>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-10 p-8 rounded-2xl text-center" style={{ background: 'var(--midnight-navy)' }}>
                <h3 className="font-heading font-black text-xl text-white mb-3">Want to learn more about our products and solutions?</h3>
                <p className="text-white/70 font-body mb-6 text-sm">Contact our team of healthcare solutions experts today.</p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link to="/contact" className="btn-primary">Talk to an Expert <ArrowRight size={15} /></Link>
                  <Link to="/quote" className="btn-secondary">Get a Quote</Link>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {related.length > 0 && (
        <section className="py-16" style={{ background: 'var(--clinical-mist)' }}>
          <div className="section-container">
            <h2 className="font-heading font-black text-2xl mb-8" style={{ color: 'var(--midnight-navy)' }}>Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((a, i) => {
                const acs = catColors[a.category] || {};
                return (
                  <motion.div key={a.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                    className="bg-white rounded-2xl border card-hover overflow-hidden" style={{ borderColor: 'var(--light-border)' }}>
                    <Link to={`/news/${a.id}`}>
                      <div className="h-40 overflow-hidden">
                        <img src={a.image} alt={a.title} className="w-full h-full object-cover" />
                      </div>
                      <div className="p-4">
                        <span className="inline-block text-xs font-heading font-semibold px-2.5 py-1 rounded-full mb-2" style={acs}>{a.category}</span>
                        <h3 className="font-heading font-bold text-sm leading-snug hover:text-medihub-blue transition-colors" style={{ color: 'var(--midnight-navy)' }}>{a.title}</h3>
                        <p className="text-xs font-body mt-2" style={{ color: 'var(--slate-text)' }}>{a.date} · {a.readTime} read</p>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}