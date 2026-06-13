import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import {
  ArrowRight, Play, ChevronRight, Shield, Award, Globe, Clock,
  Activity, Heart, Zap, Users, TrendingUp, Star, CheckCircle2,
  Microscope, Radio, Stethoscope, FlaskConical, Cpu, Baby,
  Thermometer, BarChart3, Building2, Syringe
} from 'lucide-react';
import HeroSection from '../components/home/HeroSection';
import TrustedBy from '../components/home/TrustedBy';
import CareDivisions from '../components/home/CareDivisions';
import StatsSection from '../components/home/StatsSection';
import WhyChooseUs from '../components/home/WhyChooseUs';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Testimonials from '../components/home/Testimonials';
import NewsPreview from '../components/home/NewsPreview';
import HomeCTA from '../components/home/HomeCTA';

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <TrustedBy />
      <CareDivisions />
      <FeaturedProducts />
      <StatsSection />
      <WhyChooseUs />
      <Testimonials />
      <NewsPreview />
      <HomeCTA />
    </div>
  );
}