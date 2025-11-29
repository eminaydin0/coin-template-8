import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  User,
  LogOut,
  Menu,
  X,
  Gamepad2,
  History,
  Zap,
  HelpCircle,
  MessageCircle,
  Search,
  ChevronDown,
  Keyboard,
  Settings,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWebsite } from '../context/WebsiteContext';
import { useCheckout } from '../context/CheckoutContext';

interface HeaderProps {
  onOpenSearch: () => void;
  hideHeader?: boolean;
}

const navLinks = [
  { href: '/', label: 'Ana Sayfa', icon: Gamepad2 },
  { href: '/oyunlar', label: 'Oyunlar', icon: Zap },
  { href: '/nasilyapilir', label: 'Nasıl Yapılır', icon: HelpCircle },
  { href: '/iletisim', label: 'İletişim', icon: MessageCircle },
];

/**
 * CLEAN MODERN HEADER
 * - Minimal, geometric design
 * - Subtle animations
 * - Clean typography
 * - Modern spacing and layout
 */
const Header = ({ onOpenSearch, hideHeader = false }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const { getItemCount } = useCart();
  const { isCheckoutModalOpen } = useCheckout();
  const navigate = useNavigate();
  const location = useLocation();
  const { getInfoValue } = useWebsite();

  const userMenuRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => (path === '/' ? location.pathname === '/' : location.pathname.startsWith(path));

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen((s) => !s);
  const toggleUserMenu = () => setIsUserMenuOpen((s) => !s);

  // Dış tıklama ile kullanıcı menüsü kapanır
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!isUserMenuOpen) return;
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) setIsUserMenuOpen(false);
    };
    window.addEventListener('mousedown', onClick);
    return () => window.removeEventListener('mousedown', onClick);
  }, [isUserMenuOpen]);

  // Ctrl/⌘+K ile arama
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isK = e.key.toLowerCase() === 'k';
      if ((e.ctrlKey || e.metaKey) && isK) {
        e.preventDefault();
        onOpenSearch();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onOpenSearch]);

  // Scroll olduğunda kompakt moda geç
  useEffect(() => {
    const onScroll = () => {
      setIsCompact(window.scrollY > 50);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (hideHeader || isCheckoutModalOpen) return null;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed top-0 left-0 right-0 z-50"
      role="banner"
    >
      {/* Clean Background */}
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl border-b border-gray-800/30" />

      {/* Main Header */}
      <div className={`relative transition-all duration-300 ${isCompact ? 'py-3' : 'py-4'}`}>
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group" aria-label="Ana sayfa">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <Gamepad2 className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-white tracking-tight">
                {getInfoValue('TITLE')}
              </h1>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  to={href}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(href)
                      ? 'text-white bg-amber-500/20'
                      : 'text-gray-300 hover:text-amber-300 hover:bg-amber-500/10'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                  {isActive(href) && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500 rounded-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              ))}

              {isAuthenticated && (
                <Link
                  to="/siparislerim"
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive('/siparislerim')
                      ? 'text-white bg-amber-500/20'
                      : 'text-gray-300 hover:text-amber-300 hover:bg-amber-500/10'
                  }`}
                >
                  <History className="h-4 w-4" />
                  <span>Siparişlerim</span>
                  {isActive('/siparislerim') && (
                    <motion.div
                      layoutId="activeIndicatorOrders"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500 rounded-full"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              )}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              {/* Search Button */}
              <button
                onClick={onOpenSearch}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-amber-300 hover:bg-amber-500/10 transition-colors"
                aria-label="Oyun ara"
              >
                <Search className="h-4 w-4" />
                <span className="hidden lg:inline">Ara</span>
              </button>

              {isAuthenticated ? (
                <>
                  {/* Cart Button */}
                  <Link
                    to="/sepet"
                    className="relative flex items-center justify-center w-10 h-10 rounded-lg text-gray-300 hover:text-amber-300 hover:bg-amber-500/10 transition-colors"
                    aria-label="Sepet"
                  >
                    <ShoppingCart className="h-5 w-5" />
                    {getItemCount() > 0 && (
                      <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-semibold text-white bg-yellow-500 rounded-full">
                        {getItemCount() > 99 ? '99+' : getItemCount()}
                      </span>
                    )}
                  </Link>

                  {/* User Menu */}
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={toggleUserMenu}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-amber-300 hover:bg-amber-500/10 transition-colors"
                      aria-expanded={isUserMenuOpen}
                      aria-haspopup="menu"
                    >
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <span className="hidden lg:inline max-w-[100px] truncate">
                        {user?.firstName || 'Kullanıcı'}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    <AnimatePresence>
                      {isUserMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-2 w-72 bg-black/95 rounded-xl shadow-lg border border-gray-800/50 overflow-hidden z-50 backdrop-blur-xl"
                          role="menu"
                        >
                          {/* User Header */}
                          <div className="px-4 py-4 border-b border-gray-800">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center">
                                <User className="h-6 w-6 text-white" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <h3 className="text-sm font-semibold text-white truncate">
                                  {user?.firstName} {user?.lastName}
                                </h3>
                                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                              </div>
                            </div>
                          </div>

                          {/* Menu Items */}
                          <div className="p-2">
                            <Link
                              to="/profil"
                              onClick={() => setIsUserMenuOpen(false)}
                              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-gray-300 hover:text-amber-300 hover:bg-amber-500/10 transition-colors"
                            >
                              <Settings className="h-4 w-4 text-gray-400" />
                              <span>Profil Ayarları</span>
                            </Link>
                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <LogOut className="h-4 w-4" />
                              <span>Çıkış Yap</span>
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/giris-yap"
                    className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-amber-300 hover:bg-amber-500/10 transition-colors"
                  >
                    Giriş Yap
                  </Link>
                  <Link
                    to="/kayit-ol"
                    className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 transition-all shadow-sm hover:shadow-md"
                  >
                    Kayıt Ol
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Actions */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={onOpenSearch}
                className="p-2 rounded-lg text-gray-300 hover:text-amber-300 hover:bg-amber-500/10 transition-colors"
                aria-label="Ara"
              >
                <Search className="h-5 w-5" />
              </button>

              {isAuthenticated && (
                <Link
                  to="/sepet"
                  className="relative p-2 rounded-lg text-gray-300 hover:text-amber-300 hover:bg-amber-500/10 transition-colors"
                  aria-label="Sepet"
                >
                  <ShoppingCart className="h-5 w-5" />
                  {getItemCount() > 0 && (
                    <span className="absolute top-0 right-0 flex items-center justify-center min-w-[18px] h-[18px] px-1 text-[10px] font-semibold text-white bg-yellow-500 rounded-full">
                      {getItemCount() > 99 ? '99+' : getItemCount()}
                    </span>
                  )}
                </Link>
              )}

              <button
                onClick={toggleMenu}
                className="p-2 rounded-lg text-gray-300 hover:text-amber-300 hover:bg-amber-500/10 transition-colors"
                aria-label="Menü"
                aria-expanded={isMenuOpen}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
              className="md:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-black/95 shadow-xl border-l border-gray-800/50 backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()}
              aria-label="Mobile"
            >
              <div className="flex flex-col h-full">
                {/* Mobile Header */}
                <div className="px-6 py-4 border-b border-gray-800">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-white">Menü</h2>
                    <button
                      onClick={() => setIsMenuOpen(false)}
                      className="p-2 rounded-lg text-gray-400 hover:text-amber-300 hover:bg-amber-500/10"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* Mobile Content */}
                <div className="flex-1 overflow-y-auto px-4 py-4">
                  {/* Search */}
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenSearch();
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left text-gray-300 hover:text-amber-300 hover:bg-amber-500/10 transition-colors mb-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center">
                      <Search className="h-5 w-5 text-gray-300" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white">Oyun Ara</div>
                      <div className="text-xs text-gray-400">Ctrl+K</div>
                    </div>
                    <Keyboard className="h-4 w-4 text-gray-500" />
                  </button>

                  {/* Navigation Links */}
                  <div className="space-y-1 mb-4">
                    {navLinks.map(({ href, label, icon: Icon }) => (
                      <Link
                        key={href}
                        to={href}
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                          isActive(href)
                            ? 'text-amber-300 bg-amber-500/20'
                            : 'text-gray-300 hover:text-amber-300 hover:bg-amber-500/10'
                        }`}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{label}</span>
                      </Link>
                    ))}

                    {isAuthenticated && (
                      <Link
                        to="/siparislerim"
                        onClick={() => setIsMenuOpen(false)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                          isActive('/siparislerim')
                            ? 'text-amber-300 bg-amber-500/20'
                            : 'text-gray-300 hover:text-amber-300 hover:bg-amber-500/10'
                        }`}
                      >
                        <History className="h-5 w-5" />
                        <span>Siparişlerim</span>
                      </Link>
                    )}

                    {isAuthenticated && (
                      <Link
                        to="/sepet"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:text-amber-300 hover:bg-amber-500/10 transition-colors"
                      >
                        <ShoppingCart className="h-5 w-5" />
                        <span>Sepet</span>
                        {getItemCount() > 0 && (
                          <span className="ml-auto flex items-center justify-center min-w-[20px] h-5 px-1.5 text-xs font-semibold text-white bg-yellow-500 rounded-full">
                            {getItemCount() > 99 ? '99+' : getItemCount()}
                          </span>
                        )}
                      </Link>
                    )}
                  </div>

                  {/* User Section */}
                  {isAuthenticated ? (
                    <div className="pt-4 border-t border-gray-800 space-y-1">
                      <div className="px-4 py-3 mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center">
                            <User className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-semibold text-white truncate">
                              {user?.firstName} {user?.lastName}
                            </div>
                            <div className="text-xs text-gray-400 truncate">{user?.email}</div>
                          </div>
                        </div>
                      </div>
                      <Link
                        to="/profil"
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-gray-300 hover:text-amber-300 hover:bg-amber-500/10 transition-colors"
                      >
                        <Settings className="h-5 w-5" />
                        <span>Profil Ayarları</span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium text-red-400 hover:bg-red-500/20 transition-colors"
                      >
                        <LogOut className="h-5 w-5" />
                        <span>Çıkış Yap</span>
                      </button>
                    </div>
                  ) : (
                    <div className="pt-4 border-t border-gray-800 space-y-2">
                      <Link
                        to="/giris-yap"
                        onClick={() => setIsMenuOpen(false)}
                        className="block w-full px-4 py-3 rounded-lg text-sm font-medium text-center text-gray-300 hover:text-amber-300 hover:bg-amber-500/10 transition-colors"
                      >
                        Giriş Yap
                      </Link>
                      <Link
                        to="/kayit-ol"
                        onClick={() => setIsMenuOpen(false)}
                        className="block w-full px-4 py-3 rounded-lg text-sm font-semibold text-center text-white bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 transition-all"
                      >
                        Kayıt Ol
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
