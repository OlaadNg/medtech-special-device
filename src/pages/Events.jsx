import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Monitor, ArrowRight, Users } from 'lucide-react';
import PageHero from '../components/shared/PageHero';

const events = [
  {
    id: 1,
    title: 'Africa Health Exhibition 2026',
    type: 'Exhibition',
    date: 'September 15–17, 2026',
    location: 'Gallagher Convention Centre, Johannesburg',
    isVirtual: false,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=80',
    description: "South Africa's premier healthcare exhibition — 500+ exhibitors, 15,000+ healthcare professionals, and MediHub showcasing our complete product range with live demos.",
    isFeatured: true,
    attendees: '15,000+',
    status: 'upcoming',
  },
  {
    id: 2,
    title: 'AI in Diagnostics Webinar Series',
    type: 'Webinar',
    date: 'July 8, 2026',
    location: 'Online',
    isVirtual: true,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=700&q=80',
    description: 'Explore how artificial intelligence is transforming diagnostics in African hospitals with MediHub clinical experts and global manufacturer specialists.',
    isFeatured: false,
    attendees: '500+',
    status: 'upcoming',
  },
  {
    id: 3,
    title: 'ICU Equipment Maintenance Workshop',
    type: 'Workshop',
    date: 'July 22–23, 2026',
    location: 'MediHub Training Centre, Cape Town',
    isVirtual: false,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=700&q=80',
    description: 'Hands-on training for biomedical engineers covering ICU ventilator maintenance, patient monitor calibration, and compliance testing.',
    isFeatured: false,
    attendees: '40 seats',
    status: 'upcoming',
  },
  {
    id: 4,
    title: 'MediHub Healthcare Leadership Summit 2026',
    type: 'Conference',
    date: 'October 5–6, 2026',
    location: 'Cape Town International Convention Centre',
    isVirtual: false,
    image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=700&q=80',
    description: 'Annual gathering of African healthcare leaders, technology innovators, and policy makers focused on transforming African healthcare infrastructure.',
    isFeatured: true,
    attendees: '800+',
    status: 'upcoming',
  },
];

const typeColors = {
  Exhibition: '#005BAA',
  Webinar: '#00A37B',
  Workshop: '#6B46C1',
  Conference: '#C05621',
  Training: '#D53F8C',
};

export default function Events() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div>
      <PageHero
        label="Events"
        title="Healthcare Technology Events Across Africa"
        subtitle="Join MediHub at leading healthcare conferences, exhibitions, workshops, and webinars — connect with our team and discover the latest medical technology innovations."
        image="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1920&q=80"
      />

      <section ref={ref} className="py-20" style={{ background: 'var(--clinical-mist)' }}>
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 25 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className={`bg-white rounded-2xl border card-hover overflow-hidden ${event.isFeatured ? 'ring-2' : ''}`}
                style={{ borderColor: 'var(--light-border)', ringColor: typeColors[event.type] }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="text-xs font-heading font-semibold px-3 py-1.5 rounded-full text-white" style={{ background: typeColors[event.type] }}>
                      {event.type}
                    </span>
                    {event.isVirtual && (
                      <span className="text-xs font-heading font-semibold px-3 py-1.5 rounded-full bg-white" style={{ color: 'var(--medihub-blue)' }}>
                        Virtual
                      </span>
                    )}
                  </div>
                  {event.isFeatured && (
                    <div className="absolute top-4 right-4">
                      <span className="text-xs font-heading font-semibold px-3 py-1.5 rounded-full bg-white" style={{ color: typeColors[event.type] }}>
                        ⭐ Featured
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-bold text-xl mb-3" style={{ color: 'var(--midnight-navy)' }}>{event.title}</h3>
                  <p className="font-body text-sm leading-relaxed mb-5" style={{ color: 'var(--slate-text)' }}>{event.description}</p>
                  <div className="space-y-2 mb-5">
                    <div className="flex items-center gap-2 text-sm font-body" style={{ color: 'var(--slate-text)' }}>
                      <Calendar size={14} style={{ color: typeColors[event.type] }} />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-body" style={{ color: 'var(--slate-text)' }}>
                      {event.isVirtual ? <Monitor size={14} style={{ color: typeColors[event.type] }} /> : <MapPin size={14} style={{ color: typeColors[event.type] }} />}
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-body" style={{ color: 'var(--slate-text)' }}>
                      <Users size={14} style={{ color: typeColors[event.type] }} />
                      <span>{event.attendees} expected attendees</span>
                    </div>
                  </div>
                  <a href="mailto:events@medihub.co.za" className="btn-primary text-sm" style={{ background: typeColors[event.type], minHeight: '44px', padding: '0 20px', fontSize: '13px' }}>
                    Register Now <ArrowRight size={14} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}