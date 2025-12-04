import { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ShoppingCart, Zap, Gamepad2, Shield, Home, ChevronRight, Tag } from 'lucide-react';
import { getProductDetail } from '../services/api';
import { useCart } from '../context/CartContext';
import LoadingSpinner from '../components/LoadingSpinner';
import SEOHead from '../components/SEOHead';
import CommonBackground from '../components/CommonBackground';

interface ProductResponse {
  product: {
    id: string;
    name: string;
    slug: string;
    url?: string;
    detail?: string;
    price: string; // "₺1.325,00" formatında
  };
  category: {
    name: string;
    slug: string;
    url?: string;
  };
}

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  show: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: "easeOut" as const
    } 
  },
};

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [productData, setProductData] = useState<ProductResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);
  const { addItem } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;
      try {
        setLoading(true);
        const response = await getProductDetail(slug);
        setProductData(response.data);
      } catch (error) {
        console.error('Ürün detayı yüklenirken hata:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug, navigate]);

  const handleAddToCart = () => {
    if (productData) addItem(productData.product.id, 1);
  };

  const handleBuyNow = () => {
    if (productData) {
      addItem(productData.product.id, 1);
      navigate('/sepet');
    }
  };

  const { product, category } = productData || {} as ProductResponse;

  // TL fiyat metnini güvenli şekilde göster (stringi aynen koruyoruz; parse etmiyoruz ki API sözleşmesi bozulmasın)
  const displayPrice = useMemo(() => product?.price ?? '—', [product?.price]);

  if (loading) {
    return (
      <>
        <SEOHead />
        <div className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden">
          <CommonBackground />
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
            <LoadingSpinner size="xl" text="Ürün Yükleniyor..." variant="gaming" />
          </motion.div>
      </div>
      </>
    );
  }

  if (!productData) {
    return (
      <>
        <SEOHead />
        <div className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden">
          <CommonBackground />
          <motion.div 
            variants={fadeIn} 
            initial="hidden" 
            animate="show" 
            className="text-center p-8 rounded-xl border max-w-md mx-auto"
            style={{
              background: 'rgba(0, 0, 0, 0.7)',
              border: '1px solid rgba(75, 85, 99, 0.2)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <Gamepad2 className="w-16 h-16 text-purple-300/50 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-white mb-3">Ürün Bulunamadı</h2>
            <p className="text-gray-400 mb-6">Aradığınız ürün mevcut değil.</p>
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 px-6 py-3 font-bold text-black rounded-xl transition-all bg-gradient-to-r from-purple-400 via-purple-300 to-purple-400 shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:shadow-[0_0_50px_rgba(139,92,246,0.7)]"
            >
              <ArrowLeft className="h-4 w-4" />
              Ana sayfaya dön
            </Link>
          </motion.div>
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
        {/* Header Section - CategoriesPage Stili */}
        <div className="w-full mb-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="rounded-2xl backdrop-blur-xl bg-black/20 border border-white/10 p-6 shadow-2xl">
              {/* Breadcrumb */}
              <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs mb-4">
                <Link 
                  to="/" 
                  className="flex items-center gap-1 text-gray-400 hover:text-purple-300 transition-colors"
                >
                  <Home className="h-3.5 w-3.5" />
                  <span>Ana Sayfa</span>
                </Link>
                <ChevronRight className="h-3.5 w-3.5 text-gray-600" />
                <Link 
                  to="/oyunlar" 
                  className="text-gray-400 hover:text-purple-300 transition-colors"
                >
                  Kategoriler
                </Link>
                <ChevronRight className="h-3.5 w-3.5 text-gray-600" />
                <Link 
                  to={`/oyunlar/${category.slug}`}
                  className="text-gray-400 hover:text-purple-300 transition-colors"
                >
                  {category.name}
                </Link>
                <ChevronRight className="h-3.5 w-3.5 text-gray-600" />
                <span className="text-gray-300 font-medium line-clamp-1">{product.name}</span>
              </div>

              {/* Title Section */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{
                      background: 'rgba(139, 92, 246, 0.15)',
                      border: '1px solid rgba(168, 85, 247, 0.3)',
                    }}
                  >
                    <Tag className="h-4 w-4 text-purple-300" />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-white">
                    <span className="bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent">
                      {product.name}
                    </span>
                  </h1>
                </div>

                {/* Badge */}
                <div className="flex items-center gap-1.5">
                  <span
                    className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                    style={{
                      background: 'rgba(139, 92, 246, 0.15)',
                      border: '1px solid rgba(168, 85, 247, 0.3)',
                      color: 'rgba(168, 85, 247, 0.95)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    ÜRÜN DETAYI
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Section */}
        <section className="relative py-8">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Product Image */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-1"
              >
                <div 
                  className="relative rounded-xl border overflow-hidden"
                  style={{
                    background: 'rgba(0, 0, 0, 0.7)',
                    border: '1px solid rgba(75, 85, 99, 0.2)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <div className="aspect-video relative overflow-hidden">
                    <AnimatePresence initial={false}>
                      {!imgError && product.url ? (
                        <motion.img
                          key={product.url}
                          src={product.url}
                          alt={product.name}
                          className="h-full w-full object-cover"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          onError={() => setImgError(true)}
                        />
                      ) : (
                        <motion.div 
                          key="fallback" 
                          className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-purple-500/20 to-purple-600/10"
                          initial={{ opacity: 0 }} 
                          animate={{ opacity: 1 }}
                        >
                          <Gamepad2 className="w-16 h-16 text-purple-300/50 mb-3" />
                          <span className="text-gray-400 text-sm">Görsel bulunamadı</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 right-3 z-10">
                    <div 
                      className="px-3 py-1.5 rounded-lg text-xs font-bold text-white"
                      style={{
                        background: 'rgba(139, 92, 246, 0.25)',
                        border: '1px solid rgba(168, 85, 247, 0.4)',
                        backdropFilter: 'blur(8px)',
                      }}
                    >
                      {category.name?.toUpperCase()}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Price Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:col-span-1"
              >
                <div 
                  className="relative rounded-xl border p-6 h-full flex flex-col"
                  style={{
                    background: 'rgba(0, 0, 0, 0.7)',
                    border: '1px solid rgba(75, 85, 99, 0.2)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  {/* Price */}
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 text-purple-300/90 text-sm mb-2">
                      <div className="w-2 h-2 rounded-full bg-purple-400"></div>
                      <span>Anlık Fiyat</span>
                    </div>
                    <div className="text-4xl font-black text-white tracking-wider mb-4">
                      {displayPrice}
                    </div>
                    <div className="flex items-center justify-center gap-2 text-gray-400 text-xs">
                      <Shield className="w-4 h-4" />
                      <span>Güvenli Ödeme</span>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="mt-auto space-y-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleBuyNow}
                      className="w-full font-bold text-black py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r from-purple-400 via-purple-300 to-purple-400 shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:shadow-[0_0_50px_rgba(139,92,246,0.7)]"
                    >
                      <Zap className="h-5 w-5" />
                      <span>HEMEN SATIN AL</span>
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleAddToCart}
                      className="w-full px-6 py-4 rounded-lg text-white font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                      style={{
                        background: 'rgba(139, 92, 246, 0.2)',
                        border: '1px solid rgba(168, 85, 247, 0.3)',
                      }}
                    >
                      <ShoppingCart className="h-5 w-5" />
                      <span>SEPETE EKLE</span>
                    </motion.button>
                  </div>
                </div>
              </motion.div>
              </div>

              {/* Product Description */}
              {product.detail && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mt-8"
                >
                  <div 
                    className="rounded-xl border p-6"
                    style={{
                      background: 'rgba(0, 0, 0, 0.7)',
                      border: '1px solid rgba(75, 85, 99, 0.2)',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                      backdropFilter: 'blur(12px)',
                    }}
                  >
                    <h2 className="text-xl font-bold text-white mb-4">Ürün Açıklaması</h2>
                    <div 
                      className="text-gray-300 text-sm leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: product.detail }}
                    />
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
    </>
  );
};

export default ProductDetailPage;
