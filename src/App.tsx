import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Client layout
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import WhatsAppButton from './components/ui/WhatsAppButton';

// Admin layout + guard
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/admin/ProtectedRoute';

// Client pages
import HomePage from './pages/HomePage';

// Admin pages
import LoginPage from './pages/admin/LoginPage';
import DashboardPage from './pages/admin/DashboardPage';
import AdminPropertiesPage from './pages/admin/AdminPropertiesPage';
import PropertyFormPage from './pages/admin/PropertyFormPage';
import InquiriesPage from './pages/admin/InquiriesPage';

function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton variant="floating" />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* ─── CLIENT ROUTES ──────────────────────────────── */}
          <Route path="/" element={
            <ClientLayout><HomePage /></ClientLayout>
          } />

          {/* TODO: add more client routes here */}
          {/* <Route path="/propiedades" element={<ClientLayout><PropertiesPage /></ClientLayout>} /> */}

          {/* ─── ADMIN ROUTES ───────────────────────────────── */}
          <Route path="/admin/login" element={<LoginPage />} />

          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
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
      </BrowserRouter>
    </AuthProvider>
  );
}
