import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Zap, CheckCircle2, Award, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

const allProducts = [
  { id: 1, name: 'IntelliVue MX750 Patient Monitor', sku: 'PHL-MX750', category: 'Diagnostic Equipment', manufacturer: 'Philips', country: 'Netherlands', image: 'https://images.unsplash.com/photo-1576669801820-a9ab287ac2d1?w=900&q=80', description: 'High-acuity patient monitoring with advanced waveform analysis and networked EMR integration.', fullDescription: 'The IntelliVue MX750 is a high-acuity patient monitor designed for critical care environments. It delivers advanced waveform analysis, comprehensive alarm management, and seamless networked EMR integration. Featuring a large high-resolution display, the MX750 supports a wide range of measurements including ECG, SpO2, NIBP, IBP, temperature, and respiratory parameters.', features: ['12.1" high-resolution touchscreen display', 'Advanced arrhythmia detection and analysis', 'Integrated 12-lead resting ECG', 'Bi-directional EMR data exchange', 'Smart Alarm Management System', 'Real-time trending and predictive alerts', 'WiFi and wired LAN connectivity', 'Modular expandability'], specs: [{ label: 'Display', value: '12.1" touchscreen' }, { label: 'Parameters', value: 'ECG, SpO2, NIBP, IBP, Temp, EtCO2' }, { label: 'Battery', value: '8 hours' }, { label: 'Weight', value: '6.2 kg' }, { label: 'Certifications', value: 'CE, FDA, ISO 13485' }], certifications: ['CE Mark', 'FDA 510(k)', 'ISO 13485'], isNew: false, isFeatured: true },
  { id: 2, name: 'Maquet Magnus Operating Table', sku: 'MQT-MAGNUS-1150', category: 'Theatre Equipment', manufacturer: 'Getinge', country: 'Sweden', image: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=900&q=80', description: 'Carbon-fibre operating table with full imaging compatibility and 360° surgeon ergonomics.', fullDescription: 'The Maquet Magnus is a state-of-the-art operating table engineered for the modern surgical suite. Its carbon-fibre tabletop offers full X-ray and fluoroscopy transparency, while the precision electro-hydraulic positioning system provides 360° flexibility for every surgical discipline. The table is compatible with all major C-arm and O-arm imaging systems.', features: ['Carbon-fibre X-ray transparent tabletop', 'Electro-hydraulic 6-axis positioning', 'Maximum patient load: 360 kg', 'Lateral tilt ±30°, Trendelenburg ±35°', 'Integrated lateral positioning aids', 'Removable and exchangeable table sections', 'Compatible with all major C-arm systems', 'Stainless steel column for easy cleaning'], specs: [{ label: 'Max Load', value: '360 kg' }, { label: 'Table Height', value: '620–1020 mm' }, { label: 'Table Length', value: '2000 mm' }, { label: 'Lateral Tilt', value: '±30°' }, { label: 'Certifications', value: 'CE, ISO 13485, MDD' }], certifications: ['CE Mark', 'ISO 13485'], isNew: true, isFeatured: true },
  { id: 3, name: 'BeneVision N22 ICU Monitor', sku: 'MDR-BN22-ICU', category: 'ICU Equipment', manufacturer: 'Mindray', country: 'China', image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=900&q=80', description: 'Comprehensive critical care monitor with 22" display and full haemodynamic monitoring.', fullDescription: 'The BeneVision N22 is Mindray\'s flagship bedside monitor for intensive care. With a 22" Full-HD touchscreen and a comprehensive suite of haemodynamic parameters, it provides clinicians with a complete physiological picture. The integrated BeneLink connectivity solution enables seamless integration with ventilators, infusion systems, and hospital information systems.', features: ['22" Full-HD touchscreen display', 'Advanced haemodynamic monitoring (PiCCO, FloTrac)', '12-lead ECG with ST/arrhythmia analysis', 'Integrated patient data management', 'BeneLink connectivity for device integration', 'HL7 and DICOM support', 'Dedicated NICU neonatal mode', 'Smart discharge summary reports'], specs: [{ label: 'Display', value: '22" Full-HD touchscreen' }, { label: 'Parameters', value: 'ECG, SpO2, NIBP, IBP, Temp, EtCO2, PiCCO' }, { label: 'Battery', value: '4+ hours' }, { label: 'Weight', value: '11.5 kg' }, { label: 'Certifications', value: 'CE, FDA, NMPA' }], certifications: ['CE Mark', 'FDA 510(k)', 'NMPA'], isNew: false, isFeatured: true },
  { id: 4, name: 'GE Logiq E10 Ultrasound', sku: 'GE-LOGIQ-E10', category: 'Radiology Equipment', manufacturer: 'GE Healthcare', country: 'USA', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=80', description: 'Premium shared-service ultrasound with AI-assisted imaging and cSound architecture.', fullDescription: 'The LOGIQ E10 represents GE\'s most advanced ultrasound platform, powered by cSound architecture and AI-enhanced imaging. The Radiology Reimagined interface streamlines workflow, while Precision Imaging automatically optimises image quality. With shared-service versatility, the E10 serves radiology, cardiology, vascular, and point-of-care applications.', features: ['cSound architecture for superior image quality', 'AI-assisted Auto Optimization', 'Radiology Reimagined user interface', 'Shear Wave Elastography', 'Contrast Enhanced Ultrasound (CEUS)', '4D volume imaging', 'Integrated reporting tools', 'DICOM 3.0 connectivity'], specs: [{ label: 'Probes', value: 'Broadband probes 1–24 MHz' }, { label: 'Display', value: '23" touchscreen' }, { label: 'Modes', value: 'B, M, CFM, PW, CW, 3D/4D' }, { label: 'Weight', value: '115 kg' }, { label: 'Certifications', value: 'CE, FDA, ISO 13485' }], certifications: ['CE Mark', 'FDA 510(k)', 'ISO 13485'], isNew: true, isFeatured: false },
  { id: 5, name: 'Draeger Evita 800 Ventilator', sku: 'DRG-EVITA-800', category: 'ICU Equipment', manufacturer: 'Dräger', country: 'Germany', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=900&q=80', description: 'High-end ICU ventilator with integrated lung mechanics and advanced closed-loop ventilation.', fullDescription: 'The Evita 800 is Dräger\'s premium ICU ventilator, incorporating advanced lung-protective ventilation strategies and closed-loop ventilation modes. SmartCare/PS automated weaning significantly reduces weaning time, while integrated lung mechanics and graphics provide real-time insight into patient respiratory status.', features: ['SmartCare/PS automated weaning', 'Closed-loop ventilation (AutoFlow, SPN-CPAP/PS)', 'Advanced lung mechanics monitoring', 'NeoFlow neonatal option', 'CO2 monitoring integration', 'Built-in nebuliser', 'Neonatal to adult patient range (0.3–200 kg)', '15" touchscreen display'], specs: [{ label: 'Flow Range', value: '0–200 L/min' }, { label: 'Tidal Volume', value: '2–2000 mL' }, { label: 'PEEP Range', value: '0–50 hPa' }, { label: 'Display', value: '15" touchscreen' }, { label: 'Certifications', value: 'CE, FDA, ISO 13485' }], certifications: ['CE Mark', 'FDA 510(k)', 'ISO 13485'], isNew: false, isFeatured: true },
  { id: 6, name: 'Siemens ACUSON Sequoia', sku: 'SIE-ACU-SEQ', category: 'Radiology Equipment', manufacturer: 'Siemens Healthineers', country: 'Germany', image: 'https://images.unsplash.com/photo-1628348070889-cb656235b4eb?w=900&q=80', description: 'Revolutionary ultrasound with BioAcoustic Imaging for unprecedented image quality.', fullDescription: 'The ACUSON Sequoia redefines ultrasound imaging through BioAcoustic Imaging technology, delivering exceptional penetration and resolution even in the most challenging patients. The DirectConnect technology eliminates cables between the transducer and system, while acoustic intelligence automatically adjusts imaging parameters in real time.', features: ['BioAcoustic Imaging technology', 'DirectConnect wireless transducer interface', 'Acoustic Intelligence auto-optimization', 'eSieScan one-button auto-optimization', 'Advanced elastography suite', 'Contrast-enhanced ultrasound', 'Ergonomic floating console', 'AI-powered measurements'], specs: [{ label: 'Technology', value: 'BioAcoustic Imaging' }, { label: 'Display', value: '21.5" HD monitor' }, { label: 'Frequency Range', value: '1–24 MHz' }, { label: 'Weight', value: '110 kg' }, { label: 'Certifications', value: 'CE, FDA' }], certifications: ['CE Mark', 'FDA 510(k)'], isNew: false, isFeatured: false },
  { id: 7, name: 'Stryker 3202 LED Surgical Light', sku: 'STR-3202-LED', category: 'Theatre Equipment', manufacturer: 'Stryker', country: 'USA', image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=900&q=80', description: 'High-output LED surgical ceiling light with integrated camera system and shadow-free illumination.', fullDescription: 'The Stryker 3202 LED surgical light delivers exceptional illumination for complex surgical procedures. Its advanced LED array produces shadow-free, colour-corrected light that closely mimics daylight, reducing eye fatigue for the surgical team. The integrated HD camera system enables surgical recording and live streaming to OR integration systems.', features: ['180,000 lux maximum illumination', 'Shadow-free multi-LED array design', 'Colour temperature: 4,000–4,500 K', 'CRI > 96 for accurate tissue colour', 'Integrated HD surgical camera', 'Motion-sensing auto-focus', 'Sterile handle autoclavable at 134°C', 'Compatible with OR integration systems'], specs: [{ label: 'Illuminance', value: '180,000 lux' }, { label: 'Colour Temp', value: '4,000–4,500 K' }, { label: 'CRI', value: '>96' }, { label: 'LED Lifespan', value: '60,000+ hours' }, { label: 'Certifications', value: 'CE, UL, ISO 13485' }], certifications: ['CE Mark', 'UL Listed', 'ISO 13485'], isNew: false, isFeatured: false },
  { id: 8, name: 'Defibrillator LIFEPAK 20e', sku: 'STC-LP20E', category: 'Emergency Equipment', manufacturer: 'Stryker', country: 'USA', image: 'https://images.unsplash.com/photo-1571772996211-2f02974562f3?w=900&q=80', description: 'Professional defibrillator/monitor with CPR feedback and protocol-driven therapy guidance.', fullDescription: 'The LIFEPAK 20e is a professional-grade defibrillator and monitor trusted in emergency departments, ICUs, and crash carts worldwide. It features ADAPTIV biphasic technology for effective defibrillation, real-time CPR feedback through the CPR Dashboard, and protocol-driven therapy guidance to support resuscitation teams.', features: ['ADAPTIV biphasic defibrillation technology', 'CPR Dashboard with real-time feedback', 'CPRD automated CPR coaching', 'AED and manual modes', '3/12-lead ECG monitoring', 'External pacing capability', 'Portable lightweight design (5.7 kg)', 'Optional CO2, SpO2, NIBP monitoring'], specs: [{ label: 'Energy Range', value: '2–360 J (biphasic)' }, { label: 'ECG', value: '3 and 12-lead' }, { label: 'Weight', value: '5.7 kg' }, { label: 'Battery Life', value: '3 hours monitoring' }, { label: 'Certifications', value: 'CE, FDA, ISO 13485' }], certifications: ['CE Mark', 'FDA 510(k)', 'ISO 13485'], isNew: false, isFeatured: false },
];

export default function ProductDetail() {
  const { id } = useParams();
  const product = allProducts.find(p => p.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--clinical-mist)' }}>
        <div className="text-center">
          <h2 className="font-heading font-black text-2xl mb-3" style={{ color: 'var(--midnight-navy)' }}>Product Not Found</h2>
          <Link to="/products" className="btn-primary">Back to Products</Link>
        </div>
      </div>
    );
  }

  const related = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 3);

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-white border-b py-4" style={{ borderColor: 'var(--light-border)' }}>
        <div className="section-container flex items-center gap-2 text-sm font-body" style={{ color: 'var(--slate-text)' }}>
          <Link to="/products" className="flex items-center gap-1.5 hover:text-medihub-blue transition-colors">
            <ArrowLeft size={14} /> Products
          </Link>
          <span>/</span>
          <span style={{ color: 'var(--surgical-teal)' }}>{product.category}</span>
          <span>/</span>
          <span style={{ color: 'var(--midnight-navy)' }}>{product.name}</span>
        </div>
      </div>

      {/* Main content */}
      <section className="py-16 bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            {/* Image */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div className="rounded-3xl overflow-hidden shadow-xl" style={{ background: 'var(--clinical-mist)' }}>
                <img src={product.image} alt={product.name} className="w-full object-cover" style={{ height: '420px' }} />
              </div>
              {/* Certifications */}
              <div className="mt-5 flex flex-wrap gap-2">
                {product.certifications.map(cert => (
                  <span key={cert} className="flex items-center gap-1.5 text-xs font-heading font-semibold px-3 py-1.5 rounded-full" style={{ background: 'rgba(0,163,123,0.1)', color: 'var(--surgical-teal)' }}>
                    <Award size={12} /> {cert}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Details */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs font-heading font-semibold px-3 py-1.5 rounded-full" style={{ background: 'rgba(0,91,170,0.1)', color: 'var(--medihub-blue)' }}>{product.category}</span>
                {product.isNew && <span className="text-xs font-heading font-semibold px-3 py-1.5 rounded-full text-white" style={{ background: 'var(--surgical-teal)' }}>New Arrival</span>}
              </div>

              <h1 className="font-heading font-black text-3xl lg:text-4xl mb-2" style={{ color: 'var(--midnight-navy)', letterSpacing: '-0.02em' }}>{product.name}</h1>
              <p className="font-mono text-sm mb-2" style={{ color: 'var(--slate-text)', fontFamily: 'var(--font-mono)' }}>SKU: {product.sku}</p>
              <p className="font-body text-sm mb-6 flex items-center gap-1.5" style={{ color: 'var(--slate-text)' }}>
                <Globe size={13} /> by <strong>{product.manufacturer}</strong> · {product.country}
              </p>

              <p className="font-body text-base leading-relaxed mb-8" style={{ color: 'var(--slate-text)' }}>{product.fullDescription}</p>

              {/* Features */}
              <div className="mb-8">
                <h3 className="font-heading font-bold text-sm uppercase tracking-wide mb-4" style={{ color: 'var(--medihub-blue)' }}>Key Features</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle2 size={15} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--surgical-teal)' }} />
                      <span className="font-body text-sm" style={{ color: 'var(--slate-text)' }}>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specifications */}
              <div className="mb-8 p-5 rounded-2xl" style={{ background: 'var(--clinical-mist)' }}>
                <h3 className="font-heading font-bold text-sm uppercase tracking-wide mb-4" style={{ color: 'var(--midnight-navy)' }}>Technical Specifications</h3>
                <div className="space-y-2">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="flex items-center justify-between py-1.5 border-b last:border-0" style={{ borderColor: 'var(--light-border)' }}>
                      <span className="font-body text-sm" style={{ color: 'var(--slate-text)' }}>{spec.label}</span>
                      <span className="font-heading font-semibold text-sm" style={{ color: 'var(--midnight-navy)' }}>{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to="/quote" className="btn-primary flex-1 text-center justify-center">
                  <Zap size={16} /> Request a Quote
                </Link>
                <Link to="/contact" className="btn-outline flex-1 text-center justify-center">
                  Talk to an Expert <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="py-16" style={{ background: 'var(--clinical-mist)' }}>
          <div className="section-container">
            <h2 className="font-heading font-black text-2xl mb-8" style={{ color: 'var(--midnight-navy)' }}>Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {related.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-2xl border card-hover overflow-hidden" style={{ borderColor: 'var(--light-border)' }}>
                  <Link to={`/products/${p.id}`}>
                    <div className="h-40 overflow-hidden" style={{ background: 'var(--clinical-mist)' }}>
                      <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-4">
                      <p className="text-xs font-body uppercase tracking-wider mb-1" style={{ color: 'var(--surgical-teal)', fontSize: '11px' }}>{p.category}</p>
                      <h3 className="font-heading font-bold text-sm mb-1 hover:text-medihub-blue transition-colors" style={{ color: 'var(--midnight-navy)' }}>{p.name}</h3>
                      <p className="text-xs font-body" style={{ color: 'var(--slate-text)' }}>by {p.manufacturer}</p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}