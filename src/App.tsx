import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CompareProvider } from './context/CompareContext';
import ErrorBoundary from './components/ui/ErrorBoundary';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-8 h-8 border-2 border-gold-500/30 border-t-gold-500 rounded-full animate-spin" />
    </div>
  );
}

// Client layout
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/ui/WhatsAppButton';
import CompareBar from './components/ui/CompareBar';

// Admin layout + guard
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';

// Lazy-loaded client pages
const HomePage           = lazy(() => import('./pages/HomePage'));
const PropertiesPage     = lazy(() => import('./pages/PropertiesPage'));
const PropertyDetailPage = lazy(() => import('./pages/PropertyDetailPage'));
const AboutPage          = lazy(() => import('./pages/AboutPage'));
const ContactPage        = lazy(() => import('./pages/ContactPage'));
const FavoritesPage      = lazy(() => import('./pages/FavoritesPage'));
const SwipePage          = lazy(() => import('./pages/SwipePage'));

// Lazy-loaded admin pages
const LoginPage           = lazy(() => import('./pages/admin/LoginPage'));
const DashboardPage       = lazy(() => import('./pages/admin/DashboardPage'));
const AdminPropertiesPage = lazy(() => import('./pages/admin/AdminPropertiesPage'));
const PropertyFormPage    = lazy(() => import('./pages/admin/PropertyFormPage'));
const InquiriesPage       = lazy(() => import('./pages/admin/InquiriesPage'));

function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton variant="floating" />
      <CompareBar />
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <CompareProvider>
        <AuthProvider>
          <BrowserRouter>
            <ScrollToTop />
            <Suspense fallback={<PageLoader />}>
              <Routes>

                {/* ─── CLIENTE ──────────────────────────────────────── */}
                <Route path="/" element={<ClientLayout><HomePage /></ClientLayout>} />
                <Route path="/propiedades" element={<ClientLayout><PropertiesPage /></ClientLayout>} />
                <Route path="/propiedad/:id" element={<ClientLayout><PropertyDetailPage /></ClientLayout>} />
                <Route path="/nosotros" element={<ClientLayout><AboutPage /></ClientLayout>} />
                <Route path="/contacto" element={<ClientLayout><ContactPage /></ClientLayout>} />
                <Route path="/favoritos" element={<ClientLayout><FavoritesPage /></ClientLayout>} />
            <Route path="/explorar"  element={<ClientLayout><SwipePage /></ClientLayout>} />

                {/* ─── ADMIN ────────────────────────────────────────── */}
                <Route path="/admin/login" element={<LoginPage />} />
                <Route path="/admin" element={
                  <ProtectedRoute><AdminLayout /></ProtectedRoute>
                }>
                  <Route index element={<DashboardPage />} />
                  <Route path="propiedades" element={<AdminPropertiesPage />} />
                  <Route path="propiedades/:id" element={<PropertyFormPage />} />
                  <Route path="nueva" element={<PropertyFormPage />} />
                  <Route path="consultas" element={<InquiriesPage />} />
                </Route>

                {/* 404 */}
                <Route path="*" element={
                  <ClientLayout>
                    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
                      <p className="font-display text-7xl font-bold gradient-text">404</p>
                      <p className="text-navy-400">Página no encontrada</p>
                      <a href="/" className="btn-outline">Volver al inicio</a>
                    </div>
                  </ClientLayout>
                } />

              </Routes>
            </Suspense>
          </BrowserRouter>
        </AuthProvider>
      </CompareProvider>
    </ErrorBoundary>
  );
}
