import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
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
                    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-4 px-4 text-center">
                      <p className="font-display text-8xl font-bold gradient-text select-none">404</p>
                      <h1 className="text-white text-2xl font-display font-bold">Página no encontrada</h1>
                      <p className="text-navy-400 max-w-sm">
                        La página que buscas no existe o fue movida. Explora nuestras propiedades o vuelve al inicio.
                      </p>
                      <div className="flex flex-wrap gap-3 justify-center mt-2">
                        <Link to="/" className="btn-primary">Volver al inicio</Link>
                        <Link to="/propiedades" className="btn-outline">Ver propiedades</Link>
                      </div>
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
