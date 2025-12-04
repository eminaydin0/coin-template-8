import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Gamepad2, 
  ArrowLeft,
  ChevronRight,
  Home,
  Tag,
  ChevronLeft,
  MoreHorizontal
} from 'lucide-react';
// Varsayılan API servislerinizi ve component'lerinizi import edin
import { getCategoryDetail, getCategoryProducts } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';
import CallToActionSection from '../components/CallToActionSection';
import CommonBackground from '../components/CommonBackground'; 


// --- Interface'ler (Aynı Kaldı) ---

interface Product {
  id: string;
  name: string;
  price: string; 
  originalPrice?: string;
  slug: string;
  url?: string;
  isPopular?: boolean;
  rating?: number;
  description?: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  url?: string;
  description?: string;
}

// --- Ana Component ---

const CategoryDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Pagination Logic
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  // Reset page when products change
  useEffect(() => {
    setCurrentPage(1);
  }, [products]);

  // API Çağrıları (Aynı Kaldı)
  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      
      try {
        const [categoryResponse, productsResponse] = await Promise.all([
          getCategoryDetail(slug),
          getCategoryProducts(slug)
        ]);
        
        setCategory(categoryResponse.data);
        setProducts(productsResponse.data || []);
      } catch (error) {
        console.error('Kategori verileri yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  // Loading Ekranı
  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden">
        <CommonBackground />
        <LoadingSpinner 
          size="xl" 
          text="Veriler Yükleniyor..." 
          variant="gaming"
        />
      </div>
    );
  }

  // Kategori Bulunamadı Ekranı
  if (!category) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden">
        <CommonBackground />
        <div 
          className="text-center p-8 rounded-xl border relative z-10"
          style={{
            background: 'rgba(0, 0, 0, 0.7)',
            border: '1px solid rgba(75, 85, 99, 0.2)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <Gamepad2 className="h-12 w-12 text-purple-300/50 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-3">
            Kategori Bulunamadı
          </h2>
          <p className="text-gray-400 mb-6">Aradığınız kategori arayüzde mevcut değil.</p>
          <Link 
            to="/oyunlar" 
            className="group inline-flex items-center px-6 py-3 font-bold text-black rounded-xl transition-all bg-gradient-to-r from-purple-400 via-purple-300 to-purple-400 shadow-[0_0_30px_rgba(139,92,246,0.5)] hover:shadow-[0_0_50px_rgba(139,92,246,0.7)]"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            <span>Kategoriler Sayfasına Dön</span>
          </Link>
        </div>
      </div>
    );
  }

  // Ana İçerik Sayfası
  return (
    <div className="min-h-screen pt-20 relative overflow-hidden gaming-scrollbar">
      {/* Common Background */}
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
                <span className="text-gray-300 font-medium">{category.name}</span>
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
                      {category.name}
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
                    {products.length} ÜRÜN {products.length > itemsPerPage && `• Sayfa ${currentPage}/${totalPages}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <section className="relative py-8">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
              {products.length === 0 ? (
                <div 
                  className="text-center py-20 rounded-xl border"
                  style={{
                    background: 'rgba(0, 0, 0, 0.7)',
                    border: '1px solid rgba(75, 85, 99, 0.2)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  <Gamepad2 className="h-16 w-16 text-purple-300/50 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-3">
                    Bu kategoride ürün bulunmamaktadır
                  </h3>
                  <p className="text-gray-400 text-base">Yakında yeni ürünler eklenecektir.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                  {currentProducts.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Pagination */}
        {products.length > itemsPerPage && (
          <section className="relative py-8">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <div className="flex justify-center">
                <div 
                  className="flex items-center gap-2 rounded-xl border p-4"
                  style={{
                    background: 'rgba(0, 0, 0, 0.7)',
                    border: '1px solid rgba(75, 85, 99, 0.2)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                    backdropFilter: 'blur(12px)',
                  }}
                >
                  {/* Previous Button */}
                  <motion.button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: currentPage === 1 
                        ? 'rgba(75, 85, 99, 0.3)'
                        : 'rgba(139, 92, 246, 0.2)',
                      border: currentPage === 1 
                        ? '1px solid rgba(75, 85, 99, 0.3)'
                        : '1px solid rgba(168, 85, 247, 0.3)',
                    }}
                    whileHover={currentPage !== 1 ? { scale: 1.05, background: 'rgba(139, 92, 246, 0.3)' } : {}}
                    whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Önceki</span>
                  </motion.button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-1">
                    {/* First page */}
                    {currentPage > 3 && (
                      <>
                        <motion.button
                          onClick={() => setCurrentPage(1)}
                          className="w-10 h-10 rounded-lg text-sm font-semibold text-white transition-all duration-300"
                          style={{
                            background: 'rgba(139, 92, 246, 0.2)',
                            border: '1px solid rgba(168, 85, 247, 0.3)',
                          }}
                          whileHover={{ scale: 1.05, background: 'rgba(139, 92, 246, 0.3)' }}
                          whileTap={{ scale: 0.95 }}
                        >
                          1
                        </motion.button>
                        {currentPage > 4 && (
                          <span className="text-white/40 px-2">
                            <MoreHorizontal className="h-4 w-4" />
                          </span>
                        )}
                      </>
                    )}

                    {/* Page range around current page */}
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      if (pageNum < 1 || pageNum > totalPages) return null;

                      const isActive = pageNum === currentPage;
                      return (
                        <motion.button
                          key={pageNum}
                          onClick={() => setCurrentPage(pageNum)}
                          className="w-10 h-10 rounded-lg text-sm font-semibold text-white transition-all duration-300"
                          style={{
                            background: isActive
                              ? 'rgba(139, 92, 246, 0.4)'
                              : 'rgba(139, 92, 246, 0.2)',
                            border: isActive
                              ? '1px solid rgba(168, 85, 247, 0.5)'
                              : '1px solid rgba(168, 85, 247, 0.3)',
                          }}
                          whileHover={{ scale: 1.05, background: isActive ? 'rgba(139, 92, 246, 0.5)' : 'rgba(139, 92, 246, 0.3)' }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {pageNum}
                        </motion.button>
                      );
                    })}

                    {/* Last page */}
                    {currentPage < totalPages - 2 && (
                      <>
                        {currentPage < totalPages - 3 && (
                          <span className="text-white/40 px-2">
                            <MoreHorizontal className="h-4 w-4" />
                          </span>
                        )}
                        <motion.button
                          onClick={() => setCurrentPage(totalPages)}
                          className="w-10 h-10 rounded-lg text-sm font-semibold text-white transition-all duration-300"
                          style={{
                            background: 'rgba(139, 92, 246, 0.2)',
                            border: '1px solid rgba(168, 85, 247, 0.3)',
                          }}
                          whileHover={{ scale: 1.05, background: 'rgba(139, 92, 246, 0.3)' }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {totalPages}
                        </motion.button>
                      </>
                    )}
                  </div>

                  {/* Next Button */}
                  <motion.button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      background: currentPage === totalPages 
                        ? 'rgba(75, 85, 99, 0.3)'
                        : 'rgba(139, 92, 246, 0.2)',
                      border: currentPage === totalPages 
                        ? '1px solid rgba(75, 85, 99, 0.3)'
                        : '1px solid rgba(168, 85, 247, 0.3)',
                    }}
                    whileHover={currentPage !== totalPages ? { scale: 1.05, background: 'rgba(139, 92, 246, 0.3)' } : {}}
                    whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
                  >
                    <span>Sonraki</span>
                    <ChevronRight className="h-4 w-4" />
                  </motion.button>
                </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Call to Action Section */}
           <CallToActionSection />
      </div>
    </div>
  );
};

const ProductCard = ({ product, index }: { product: Product; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link 
        to={`/epin/${product.slug}`}
        className="block group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <motion.div
          whileHover={{ y: -4 }}
          className="relative rounded-xl border overflow-hidden transition-all duration-300 h-full flex flex-col"
          style={{
            background: isHovered
              ? 'rgba(0, 0, 0, 0.85)'
              : 'rgba(0, 0, 0, 0.7)',
            border: isHovered
              ? '1px solid rgba(168, 85, 247, 0.4)'
              : '1px solid rgba(75, 85, 99, 0.2)',
            boxShadow: isHovered
              ? '0 12px 32px rgba(139, 92, 246, 0.25), 0 4px 16px rgba(0,0,0,0.4)'
              : '0 4px 16px rgba(0,0,0,0.3)',
            backdropFilter: 'blur(12px)',
          }}
        >
          {/* Product Image */}
          <div className="relative h-44 overflow-hidden">
            {product.url && !imageError ? (
              <img
                src={product.url}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={() => setImageError(true)}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-500/20 to-purple-600/10 flex items-center justify-center">
                <Gamepad2 className="h-16 w-16 text-purple-300/50" />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            
            {/* Popular Badge */}
            {product.isPopular && (
              <div
                className="absolute top-3 right-3 rounded-lg px-2.5 py-1.5 z-10"
                style={{
                  background: 'rgba(139, 92, 246, 0.25)',
                  border: '1px solid rgba(168, 85, 247, 0.4)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span className="text-white text-xs font-bold">POPÜLER</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4 flex-1 flex flex-col">
            {/* Title */}
            <h3 className="text-white font-bold text-base mb-2 line-clamp-2 leading-tight group-hover:text-purple-300 transition-colors">
              {product.name}
            </h3>
            
            {/* Description */}
            {product.description && (
              <p className="text-gray-400 text-sm mb-3 line-clamp-2 leading-relaxed">
                {product.description}
              </p>
            )}

            {/* Price & Action */}
            <div className="mt-auto pt-3 border-t" style={{ borderColor: 'rgba(75,85,99,0.2)' }}>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  {product.originalPrice && (
                    <span className="text-xs text-gray-400 line-through">
                      {product.originalPrice}
                    </span>
                  )}
                  <span className="text-xl font-black text-white">
                    {product.price}
                  </span>
                </div>
                <motion.div
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white"
                  style={{
                    background: 'rgba(139, 92, 246, 0.2)',
                    border: '1px solid rgba(168, 85, 247, 0.3)',
                  }}
                  whileHover={{ scale: 1.05, background: 'rgba(139, 92, 246, 0.3)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  İncele
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default CategoryDetailPage;