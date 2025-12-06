import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WebsiteProvider } from './context/WebsiteContext';
import { CheckoutProvider } from './context/CheckoutContext';
import ScrollToTop from './components/ScrollToTop';
import { Toaster } from 'react-hot-toast';
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from './components/Header';
import Footer from './components/Footer';
import SEOHead from './components/SEOHead';
import SearchModal from './components/SearchModal';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryDetailPage from './pages/CategoryDetailPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import ContactPage from './pages/ContactPage';
import OrdersPage from './pages/OrdersPage';
import BankAccountsPage from './pages/BankAccountsPage';
import ContractPage from './pages/ContractPage';
import BulkPurchasePage from './pages/BulkPurchasePage';
import ReturnsPage from './pages/ReturnsPage';
import LiveSupportPage from './pages/LiveSupportPage';
import RehberPage from './pages/RehberPage';
import ProfilePage from './pages/ProfilePages';
import './App.css';

function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }, []);

  const openSearch = () => {
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
  };

  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <WebsiteProvider>
            <CheckoutProvider>
              <div className="App">
                <ScrollToTop />
                <SEOHead />
                <Header onOpenSearch={openSearch} />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/giris-yap" element={<LoginPage />} />
                <Route path="/kayit-ol" element={<RegisterPage />} />
                <Route path="/oyunlar" element={<CategoriesPage />} />
                <Route path="/oyunlar/:slug" element={<CategoryDetailPage />} />
                <Route path="/epin/:slug" element={<ProductDetailPage />} />
                <Route path="/sepet" element={<CartPage />} />
                <Route path="/rehber" element={<RehberPage />} />
                <Route path="/iletisim" element={<ContactPage />} />
                <Route path="/siparislerim" element={<OrdersPage />} />
                <Route path="/banka-hesaplari" element={<BankAccountsPage />} />
                <Route path="/sozlesme/:slug" element={<ContractPage />} />
                <Route path="/toplu-satin-alim" element={<BulkPurchasePage />} />
                <Route path="/geri-iade" element={<ReturnsPage />} />
                <Route path="/canli-destek" element={<LiveSupportPage />} />
                <Route path="/profil" element={<ProfilePage />} />
              </Routes>
              <Footer />
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 3000,
                  style: {
                    background: 'linear-gradient(135deg, rgba(24, 24, 27, 0.98), rgba(0, 0, 0, 0.95))',
                    color: '#ffffff',
                    border: '1px solid rgba(239, 68, 68, 0.2)',
                    borderRadius: '16px',
                    fontSize: '13px',
                    fontWeight: '600',
                    fontFamily: '"Space Grotesk", sans-serif',
                    textTransform: 'none',
                    letterSpacing: '0.3px',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(239, 68, 68, 0.1)',
                    backdropFilter: 'blur(24px)',
                    position: 'relative',
                    overflow: 'hidden',
                    padding: '12px 16px',
                    minWidth: '280px',
                    maxWidth: '400px',
                  },
                  success: {
                    iconTheme: {
                      primary: '#10b981',
                      secondary: '#ffffff',
                    },
                    style: {
                      border: '1px solid rgba(16, 185, 129, 0.3)',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(16, 185, 129, 0.1)',
                      background: 'linear-gradient(135deg, rgba(24, 24, 27, 0.98), rgba(0, 0, 0, 0.95))',
                    },
                  },
                  error: {
                    iconTheme: {
                      primary: '#ef4444',
                      secondary: '#ffffff',
                    },
                    style: {
                      border: '1px solid rgba(239, 68, 68, 0.3)',
                      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(239, 68, 68, 0.1)',
                      background: 'linear-gradient(135deg, rgba(24, 24, 27, 0.98), rgba(0, 0, 0, 0.95))',
                    },
                  },
                }}
              />
              
              {/* Search Modal */}
              <SearchModal
                isOpen={isSearchOpen}
                onClose={closeSearch}
                homepageItems={[]} // SearchModal kendi yükleyecek
              />
              </div>
            </CheckoutProvider>
          </WebsiteProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
