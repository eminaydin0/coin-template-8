import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Gamepad2, 
  ArrowRight,
  Home,
  ChevronRight,
  Layers
} from 'lucide-react';
import { getCategories } from '../services/api';
import SEOHead from '../components/SEOHead';
import LoadingSpinner from '../components/LoadingSpinner';
import CommonBackground from '../components/CommonBackground';
import CallToActionSection from '../components/CallToActionSection';

interface Category {
  id: string;
  name: string;
  slug: string;
  url?: string;
  description?: string;
  productCount?: number;
}

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        console.log('Kategoriler yükleniyor...');
        const response = await getCategories();
        console.log('API Response:', response);
        setCategories(response.data || []);
      } catch (error) {
        console.error('Kategoriler yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden">
        <CommonBackground />
        <LoadingSpinner 
          size="xl" 
          text="Kategoriler Yükleniyor..." 
          variant="gaming" 
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden gaming-scrollbar">
      <SEOHead />
      
      {/* Common Background */}
      <CommonBackground />

      <div className="w-full relative z-10">
        {/* Başlık Section - Compact */}
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
                <span className="text-gray-300 font-medium">Kategoriler</span>
              </div>

              {/* Right: Badge - Centered vertically */}
              <div className="flex items-center justify-center sm:justify-end gap-2">
                <Layers className="w-4 h-4 text-amber-400" />
                <span
                  className="text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{
                    background: 'rgba(251, 191, 36, 0.2)',
                    border: '1px solid rgba(251, 191, 36, 0.4)',
                    color: 'rgba(251, 191, 36, 0.95)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {categories.length} KATEGORİ
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Oyun Kategorileri
            </h1>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="relative py-8">
          <div className="px-4 sm:px-6 lg:px-8">
            {categories.length === 0 ? (
              <div 
                className="text-center py-20 rounded-xl border"
                style={{
                  background: 'rgba(0, 0, 0, 0.7)',
                  border: '1px solid rgba(75, 85, 99, 0.2)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <Gamepad2 className="h-16 w-16 text-amber-300/50 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-3">
                  Kategori bulunamadı
                </h3>
                <p className="text-gray-400 text-base">Yakında yeni kategoriler eklenecektir.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {categories.map((category, index) => (
                  <CategoryCard key={category.id} category={category} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Call to Action Section */}
        <CallToActionSection />
      </div>
    </div>
  );
};

const CategoryCard = ({ category, index }: { category: Category; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Link 
        to={`/oyunlar/${category.slug}`}
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
              ? '1px solid rgba(251, 191, 36, 0.4)'
              : '1px solid rgba(75, 85, 99, 0.2)',
            boxShadow: isHovered
              ? '0 12px 32px rgba(251, 191, 36, 0.25), 0 4px 16px rgba(0,0,0,0.4)'
              : '0 4px 16px rgba(0,0,0,0.3)',
            backdropFilter: 'blur(12px)',
          }}
        >
          {/* Category Image */}
          <div className="relative h-44 overflow-hidden">
            {category.url && !imageError ? (
              <img
                src={category.url}
                alt={category.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={() => setImageError(true)}
                loading="lazy"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center">
                <Gamepad2 className="h-16 w-16 text-amber-300/50" />
              </div>
            )}

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            
            {/* Product Count Badge */}
            {category.productCount && category.productCount > 0 && (
              <div
                className="absolute top-3 right-3 rounded-lg px-2.5 py-1.5 z-10"
                style={{
                  background: 'rgba(251, 191, 36, 0.25)',
                  border: '1px solid rgba(251, 191, 36, 0.4)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span className="text-white text-xs font-bold">{category.productCount}+ ürün</span>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-4 flex-1 flex flex-col">
            {/* Title */}
            <h3 className="text-white font-bold text-lg mb-2 line-clamp-2 leading-tight group-hover:text-amber-300 transition-colors">
              {category.name}
            </h3>
            
            {/* Description */}
            {category.description && (
              <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">
                {category.description}
              </p>
            )}

            {/* Action Button */}
            <div className="mt-auto pt-3 border-t" style={{ borderColor: 'rgba(75,85,99,0.2)' }}>
              <motion.div
                className="flex items-center justify-between"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-xs font-medium text-gray-400">Kategoriyi Gör</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-amber-400">Keşfet</span>
                  <ArrowRight className="h-4 w-4 text-amber-400" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default CategoriesPage;
