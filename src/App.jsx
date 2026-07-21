import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

// Layout
import Layout from './components/layout/Layout';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Services from './pages/Services';
import Solutions from './pages/Solutions';
import Industries from './pages/Industries';
import Partners from './pages/Partners';
import Careers from './pages/Careers';
import News from './pages/News';
import Africa from './pages/Africa';
import Downloads from './pages/Downloads';
import FAQ from './pages/FAQ';
import Contact from './pages/Contact';
import Quote from './pages/Quote';
import ClientPortal from './pages/ClientPortal';
import Events from './pages/Events';
import CaseStudies from './pages/CaseStudies';
import ProductDetail from './pages/ProductDetail';
import Compare from './pages/Compare';
import NewsArticle from './pages/NewsArticle';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import CookiePolicy from './pages/CookiePolicy';
import PoPIACompliance from './pages/PoPIACompliance';

// Admin
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminGenericList from './pages/admin/AdminGenericList';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center" style={{ background: 'var(--clinical-mist)' }}>
        <div className="flex flex-col items-center gap-4">
          <img
            src="https://media.base44.com/images/public/6a2dc1968bf71040c439ca75/b30f0019a_MedTechLogoACCEPTED.png"
            alt="MedTech Special Device"
            className="h-10 w-auto"
          />
          <div className="w-8 h-8 border-4 border-slate-200 rounded-full animate-spin" style={{ borderTopColor: 'var(--medihub-blue)' }}></div>
        </div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />
        <Route path="/services" element={<Services />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/industries" element={<Industries />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/news" element={<News />} />
        <Route path="/africa" element={<Africa />} />
        <Route path="/downloads" element={<Downloads />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/quote" element={<Quote />} />
        <Route path="/events" element={<Events />} />
        <Route path="/case-studies" element={<CaseStudies />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/news/:id" element={<NewsArticle />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/popia-compliance" element={<PoPIACompliance />} />
      </Route>
      <Route path="/client-portal" element={<ClientPortal />} />

      {/* Admin Panel */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="news" element={<AdminGenericList entityName="NewsArticle" title="News Articles" displayField="title" secondaryField="category" badgeField="status" />} />
        <Route path="events" element={<AdminGenericList entityName="Event" title="Events" displayField="title" secondaryField="event_type" badgeField="status" />} />
        <Route path="case-studies" element={<AdminGenericList entityName="CaseStudy" title="Case Studies" displayField="title" secondaryField="client_name" badgeField="status" />} />
        <Route path="quotes" element={<AdminGenericList entityName="QuoteRequest" title="Quote Requests" displayField="first_name" secondaryField="organization" badgeField="status" />} />
        <Route path="service-requests" element={<AdminGenericList entityName="ServiceRequest" title="Service Requests" displayField="equipment_name" secondaryField="request_type" badgeField="status" />} />
        <Route path="downloads" element={<AdminGenericList entityName="Download" title="Downloads" displayField="title" secondaryField="category" badgeField="category" />} />
        <Route path="jobs" element={<AdminGenericList entityName="JobListing" title="Job Listings" displayField="title" secondaryField="department" badgeField="status" />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App