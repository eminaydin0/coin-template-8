import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  CreditCard,
  Home,
  ChevronRight,
  ShoppingCart,
  Tag
} from 'lucide-react';
import { getOrders } from '../services/api';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/LoadingSpinner';
import SEOHead from '../components/SEOHead';
import CommonBackground from '../components/CommonBackground';
import CallToActionSection from '../components/CallToActionSection';

interface Order {
  id: string;
  orderId: string;
  status: {
    text: string;
    color: string;
  };
  price: string;
  date: string;
}

// Get status info helper
const getStatusInfo = (statusText: string) => {
  switch (statusText) {
    case 'Ödeme Bekleniyor':
      return {
        text: 'Ödeme Bekleniyor',
        color: '#facc15',
        bgColor: 'rgba(234, 179, 8, 0.15)',
        borderColor: 'rgba(234, 179, 8, 0.3)',
        icon: Clock
      };
    case 'Tamamlandı':
      return {
        text: 'Tamamlandı',
        color: '#4ade80',
        bgColor: 'rgba(34, 197, 94, 0.15)',
        borderColor: 'rgba(34, 197, 94, 0.3)',
        icon: CheckCircle
      };
    case 'İptal Edildi':
      return {
        text: 'İptal Edildi',
        color: '#f87171',
        bgColor: 'rgba(239, 68, 68, 0.15)',
        borderColor: 'rgba(239, 68, 68, 0.3)',
        icon: XCircle
      };
    default:
      return {
        text: statusText,
        color: '#9ca3af',
        bgColor: 'rgba(107, 114, 128, 0.15)',
        borderColor: 'rgba(107, 114, 128, 0.3)',
        icon: Clock
      };
  }
};

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  // Component mount olduğunda çalışacak
  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated) {
        setOrders([]);
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const response = await getOrders();
        setOrders(response.data || []);
      } catch (error) {
        console.error('Orders fetch error:', error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated]);

  // Storage event'ini dinle (login/logout için)
  useEffect(() => {
    const handleStorageChange = () => {
      // Storage değiştiğinde component'i yeniden render et
      window.location.reload();
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  if (!isAuthenticated) {
    return (
      <>
        <SEOHead />
        <div className="min-h-screen pt-20 relative overflow-hidden">
          <CommonBackground />
          
          <div className="w-full relative z-10">
            {/* Header */}
            <section className="relative py-10 mb-6 border-b" style={{ borderColor: 'rgba(251, 191, 36, 0.3)' }}>
              <div className="px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div className="flex items-center justify-center sm:justify-start gap-2 text-sm">
                    <Link 
                      to="/" 
                      className="flex items-center gap-1.5 text-gray-400 hover:text-amber-400 transition-colors"
                    >
                      <Home className="h-4 w-4" />
                      <span>Ana Sayfa</span>
                    </Link>
                    <ChevronRight className="h-4 w-4 text-gray-600" />
                    <span className="text-gray-300 font-medium">Siparişlerim</span>
                  </div>

                  <div className="flex items-center justify-center sm:justify-end gap-2">
                    <ShoppingCart className="w-4 h-4 text-amber-400" />
                    <span
                      className="text-xs font-bold px-3 py-1.5 rounded-full"
                      style={{
                        background: 'rgba(251, 191, 36, 0.2)',
                        border: '1px solid rgba(251, 191, 36, 0.4)',
                        color: 'rgba(251, 191, 36, 0.95)',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      SİPARİŞLERİM
                    </span>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-white">
                  Siparişlerim
                </h1>
              </div>
            </section>

            {/* Empty State */}
            <section className="relative py-8">
              <div className="px-4 sm:px-6 lg:px-8">
                <div 
                  className="text-center py-20 rounded-xl border"
                  style={{
                    background: 'rgba(0, 0, 0, 0.7)',
                    border: '1px solid rgba(75, 85, 99, 0.2)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <ShoppingCart className="h-16 w-16 text-amber-300/50 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Siparişlerinizi görüntülemek için giriş yapın
                  </h3>
                  <p className="text-gray-400 text-base mb-8">
                    Hesabınıza giriş yaparak siparişlerinizi takip edebilirsiniz.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link to="/giris-yap">
                      <motion.button
                        className="font-bold text-black py-3 px-6 rounded-xl transition-all duration-300 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 shadow-[0_0_30px_rgba(251,191,36,0.5)] hover:shadow-[0_0_50px_rgba(251,191,36,0.7)]"
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        GİRİŞ YAP
                      </motion.button>
                    </Link>
                    
                    <Link to="/kayit-ol">
                      <motion.button
                        className="px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all"
                        style={{
                          background: 'rgba(75, 85, 99, 0.3)',
                          border: '1px solid rgba(75, 85, 99, 0.4)',
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        KAYIT OL
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <SEOHead />
        <div className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden">
          <CommonBackground />
          <LoadingSpinner 
            size="xl" 
            text="SİPARİŞLER YÜKLENİYOR..." 
            variant="gaming" 
          />
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead />
      <div className="min-h-screen pt-20 relative overflow-hidden gaming-scrollbar">
        <CommonBackground />
        
        <div className="w-full relative z-10">
          {/* Header - Compact */}
          <section className="relative py-10 mb-6 border-b" style={{ borderColor: 'rgba(251, 191, 36, 0.3)' }}>
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                {/* Left: Breadcrumb */}
                <div className="flex items-center justify-center sm:justify-start gap-2 text-sm">
                  <Link 
                    to="/" 
                    className="flex items-center gap-1.5 text-gray-400 hover:text-amber-400 transition-colors"
                  >
                    <Home className="h-4 w-4" />
                    <span>Ana Sayfa</span>
                  </Link>
                  <ChevronRight className="h-4 w-4 text-gray-600" />
                  <span className="text-gray-300 font-medium">Siparişlerim</span>
                </div>

                {/* Right: Badge */}
                <div className="flex items-center justify-center sm:justify-end gap-2">
                  <ShoppingCart className="w-4 h-4 text-amber-400" />
                  <span
                    className="text-xs font-bold px-3 py-1.5 rounded-full"
                    style={{
                      background: 'rgba(251, 191, 36, 0.2)',
                      border: '1px solid rgba(251, 191, 36, 0.4)',
                      color: 'rgba(251, 191, 36, 0.95)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    {orders.length} SİPARİŞ
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-black text-white">
                Siparişlerim
              </h1>
            </div>
          </section>

          {/* Orders List or Empty State */}
          <section className="relative py-8">
            <div className="px-4 sm:px-6 lg:px-8">
              {orders.length === 0 ? (
                <div 
                  className="text-center py-20 rounded-xl border"
                  style={{
                    background: 'rgba(0, 0, 0, 0.7)',
                    border: '1px solid rgba(75, 85, 99, 0.2)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <ShoppingCart className="h-16 w-16 text-amber-300/50 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Henüz siparişiniz yok
                  </h3>
                  <p className="text-gray-400 text-base mb-8">
                    İlk siparişinizi vermek için ürünlerimizi keşfedin ve sepetinize ekleyin.
                  </p>
                  
                  <Link to="/oyunlar">
                    <motion.button
                      className="font-bold text-black py-3 px-6 rounded-xl transition-all duration-300 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 shadow-[0_0_30px_rgba(251,191,36,0.5)] hover:shadow-[0_0_50px_rgba(251,191,36,0.7)] inline-flex items-center gap-2"
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Package className="h-5 w-5" />
                      <span>ÜRÜNLERİ KEŞFET</span>
                    </motion.button>
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => {
                    const statusInfo = getStatusInfo(order.status.text);
                    const StatusIcon = statusInfo.icon;
                    
                    return (
                      <OrderCard 
                        key={order.id} 
                        order={order} 
                        statusInfo={statusInfo} 
                        StatusIcon={StatusIcon}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </section>

          {/* Call to Action Section */}
          <CallToActionSection />
        </div>
      </div>
    </>
  );
};

// Order Card Component
interface StatusInfo {
  text: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: React.ComponentType<{ className?: string }>;
}

const OrderCard = ({ 
  order, 
  statusInfo, 
  StatusIcon 
}: { 
  order: Order; 
  statusInfo: StatusInfo; 
  StatusIcon: React.ComponentType<{ className?: string }>;
}) => {
  return (
    <div className="relative rounded-xl border overflow-hidden transition-all duration-200 hover:border-amber-400/40" 
      style={{
        background: 'rgba(0, 0, 0, 0.7)',
        border: '1px solid rgba(75, 85, 99, 0.2)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="p-6">
        {/* Header Row */}
        <div className="flex items-center justify-between gap-4 mb-5">
          {/* Left: Order Info */}
          <div className="flex items-center gap-4 flex-1 min-w-0">
            {/* Order Icon */}
            <div 
              className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: 'rgba(251, 191, 36, 0.15)',
                border: '1px solid rgba(251, 191, 36, 0.25)',
              }}
            >
              <Package className="h-7 w-7 text-amber-400" />
            </div>
            
            {/* Order Details */}
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-bold text-xl mb-1.5">
                Sipariş #{order.orderId}
              </h3>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <Calendar className="h-4 w-4 flex-shrink-0" />
                <span>{order.date}</span>
              </div>
            </div>
          </div>

          {/* Right: Status Badge */}
          <div 
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold flex-shrink-0"
            style={{
              background: statusInfo.bgColor,
              border: `1px solid ${statusInfo.borderColor}`,
            }}
          >
            <StatusIcon className="h-4 w-4" style={{ color: statusInfo.color }} />
            <span style={{ color: statusInfo.color }}>{statusInfo.text}</span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px mb-5" style={{ background: 'rgba(75, 85, 99, 0.2)' }}></div>

        {/* Bottom Row: Price and Payment */}
        <div className="flex items-center justify-between gap-4">
          {/* Price */}
          <div className="flex-1">
            <div 
              className="rounded-lg p-4 border"
              style={{
                background: 'rgba(251, 191, 36, 0.1)',
                border: '1px solid rgba(251, 191, 36, 0.2)',
              }}
            >
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-gray-400 text-xs font-semibold uppercase tracking-wide">Toplam</span>
                <span className="text-white font-black text-xl">{order.price}</span>
              </div>
            </div>
          </div>

          {/* Payment Info */}
          <div className="flex items-center gap-2 px-4 py-3 rounded-lg" 
            style={{
              background: 'rgba(75, 85, 99, 0.2)',
              border: '1px solid rgba(75, 85, 99, 0.3)',
            }}
          >
            <CreditCard className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <span className="text-gray-300 text-sm font-medium whitespace-nowrap">Banka Transferi</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
