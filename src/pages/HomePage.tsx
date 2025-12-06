import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getHomepageItems, getCategories } from '../services/api';
import { useWebsite } from '../context/WebsiteContext';
import SEOHead from '../components/SEOHead';
import LoadingSpinner from '../components/LoadingSpinner';
import ScrollToTopButton from '../components/ScrollToTopButton';
import NewsletterSignup from '../components/NewsletterSignup';
import CallToActionSection from '../components/CallToActionSection';
import HeroSection from '../components/HeroSection';
import PopularProductsSection from '../components/PopularProductsSection';
import MoreGamesSection from '../components/MoreGamesSection';
import BestSellingGamesSection from '../components/BestSellingGamesSection';
import HowItWorksSection from '../components/HowItWorksSection';
import CommonBackground from '../components/CommonBackground';
import { motion } from 'framer-motion';
import { Star, Gamepad2 } from 'lucide-react';

interface HomepageItem {
  id: string;
  name: string;
  price: number | string;
  originalPrice?: number | string;
  slug: string;
  url?: string;
  isPopular?: boolean;
  rating?: number;
  people?: number;
  category?: {
    name: string;
  };
}

interface Category {
  id: string;
  name: string;
  slug: string;
  url?: string;
  description?: string;
}

const HomePage = () => {
  const [homepageItems, setHomepageItems] = useState<HomepageItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const { getHeroList } = useWebsite();
  const heroList = getHeroList();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [itemsResponse, categoriesResponse] = await Promise.all([
          getHomepageItems(20),
          getCategories()
        ]);

        setHomepageItems(itemsResponse.data || []);
        setCategories(categoriesResponse.data || []);
      } catch (error) {
        // Silent error handling
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center relative overflow-hidden">
        <CommonBackground />
        <LoadingSpinner
          size="xl"
          text="Ana Sayfa Yükleniyor..."
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
        {/* HERO SECTION WITH SIDEBAR */}
        <div className="w-full mb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* LEFT: Hero Section + Best Selling Games (2/3) */}
              <div className="lg:col-span-2 space-y-6">
                {/* Hero Carousel */}
                <div className="h-[70vh] min-h-[500px] max-h-[700px] overflow-hidden">
                  <HeroSection
                    heroList={heroList}
                    currentHeroIndex={currentHeroIndex}
                    setCurrentHeroIndex={setCurrentHeroIndex}
                    isPlaying={isPlaying}
                    setIsPlaying={setIsPlaying}
                  />
                </div>

                {/* Best Selling Games Section */}
                <div className="rounded-2xl backdrop-blur-xl bg-black/20 border border-white/10 p-6 shadow-2xl">
                  <BestSellingGamesSection homepageItems={homepageItems} />
                </div>

                {/* Popular Products Carousel */}
                <div className="rounded-2xl backdrop-blur-xl bg-black/20 border border-white/10 p-6 shadow-2xl">
                  <PopularProductsSection />
                </div>
              </div>

              {/* RIGHT: Popular Products + Categories + How It Works (1/3) */}
              <div className="lg:col-span-1 space-y-6">
                {/* Popular Products Sidebar */}
                <div className="rounded-2xl backdrop-blur-xl bg-black/20 border border-white/10 p-6 shadow-2xl overflow-hidden">
                  <PopularProductsSidebar homepageItems={homepageItems} categories={categories} />
                </div>

                {/* How It Works Section */}
                <div className="rounded-2xl backdrop-blur-xl bg-black/20 border border-white/10 p-6 shadow-2xl overflow-hidden">
                  <HowItWorksSection />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MORE GAMES + NEWSLETTER/CTA SECTION */}
        <div className="w-full mb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* LEFT: More Games (2/3) */}
              <div className="lg:col-span-2">
                <div className="rounded-2xl backdrop-blur-xl bg-black/20 border border-white/10 p-6 shadow-2xl">
                  <MoreGamesSection homepageItems={homepageItems} />
                </div>
              </div>

              {/* RIGHT: Newsletter + CTA (1/3) */}
              <div className="lg:col-span-1 space-y-6">
                {/* Newsletter */}
                <div className="rounded-2xl backdrop-blur-xl bg-black/20 border border-white/10 p-6 shadow-2xl overflow-hidden">
                  <NewsletterSignup />
                </div>

                {/* CTA */}
                <div className="rounded-2xl backdrop-blur-xl bg-black/20 border border-white/10 p-6 shadow-2xl overflow-hidden">
                  <CallToActionSection variant="compact" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <ScrollToTopButton />
      </div>
    </div>
  );
};

// Compact Popular Products Sidebar Component with Categories
const PopularProductsSidebar = ({ homepageItems, categories }: { homepageItems: HomepageItem[]; categories: Category[] }) => {
  const popularItems = homepageItems.slice(0, 5);
  const displayCategories = categories.slice(0, 6);

  return (
    <div className="flex flex-col gap-6">
      {/* POPULAR PRODUCTS SECTION */}
      <div className="flex flex-col">
        {/* Compact Header */}
        <motion.div 
          className="mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="flex items-center gap-1.5 mb-1.5">
            <div 
              className="w-6 h-6 rounded-lg flex items-center justify-center"
              style={{
                background: 'rgba(139, 92, 246, 0.12)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
              }}
            >
              <Star className="h-3 w-3 text-purple-300" />
            </div>
            <h3 className="text-lg font-bold text-white">
              <span className="bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent">
                Popüler Ürünler
              </span>
            </h3>
          </div>
          <p className="text-gray-400 text-[10px] ml-8">En çok tercih edilen oyunlar</p>
        </motion.div>

        {/* Compact Products List */}
        <div className="space-y-2">
          {popularItems.length === 0 ? (
            <div className="text-center py-8">
              <Gamepad2 className="h-8 w-8 text-purple-300/50 mx-auto mb-2" />
              <span className="text-gray-400 text-xs">Henüz popüler oyun bulunmuyor</span>
            </div>
          ) : (
            popularItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
              >
                <UnifiedCard 
                  type="product" 
                  product={item} 
                />
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* CATEGORIES SECTION */}
      {displayCategories.length > 0 && (
        <div className="flex flex-col pt-4 border-t border-purple-500/10">
          {/* Compact Header */}
          <motion.div 
            className="mb-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <div 
                className="w-6 h-6 rounded-lg flex items-center justify-center"
                style={{
                  background: 'rgba(139, 92, 246, 0.12)',
                  border: '1px solid rgba(168, 85, 247, 0.3)',
                }}
              >
                <Gamepad2 className="h-3 w-3 text-purple-300" />
              </div>
              <h3 className="text-lg font-bold text-white">
                <span className="bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent">
                  Kategoriler
                </span>
              </h3>
            </div>
            <p className="text-gray-400 text-[10px] ml-8">Tüm oyun kategorileri</p>
          </motion.div>

          {/* Compact Categories Grid */}
          <div className="grid grid-cols-2 gap-2">
            {displayCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
              >
                <UnifiedCard 
                  type="category" 
                  category={category} 
                />
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Unified Card Component - Creative Design for Products and Categories
const UnifiedCard = ({ 
  type, 
  product, 
  category 
}: { 
  type: 'product' | 'category';
  product?: HomepageItem;
  category?: Category;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  const initials = (name?: string) =>
    (name || '?')
      .split(/\s+/)
      .slice(0, 2)
      .map((s) => s[0])
      .join('')
      .toUpperCase();

  if (type === 'product' && product) {
    return (
      <Link
        to={`/epin/${product.slug}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="block group"
      >
        <motion.div 
          className="relative rounded-xl border overflow-hidden transition-all duration-300"
          whileHover={{ scale: 1.02, y: -2 }}
          style={{
            background: isHovered
              ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(168, 85, 247, 0.1))'
              : 'rgba(0, 0, 0, 0.6)',
            border: isHovered
              ? '1.5px solid rgba(168, 85, 247, 0.5)'
              : '1px solid rgba(168, 85, 247, 0.2)',
            boxShadow: isHovered
              ? '0 8px 24px rgba(139, 92, 246, 0.25), 0 0 40px rgba(139, 92, 246, 0.1)'
              : '0 2px 8px rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(12px)',
          }}
        >
          {/* Shine Effect */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 z-10"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 0.6 }}
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
              }}
            />
          )}

          <div className="relative z-0 p-3 flex items-center gap-3">
            {/* Image/Icon */}
            <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0 relative">
              {product.url && !imageError ? (
                <motion.img
                  src={product.url}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                  animate={{ scale: isHovered ? 1.1 : 1 }}
                  transition={{ duration: 0.3 }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-500/30 to-purple-600/20 flex items-center justify-center">
                  <Gamepad2 className="h-6 w-6 text-purple-300" />
                </div>
              )}
              {/* Glow Effect */}
              {isHovered && (
                <motion.div
                  className="absolute inset-0 rounded-lg"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(139, 92, 246, 0.4)',
                      '0 0 30px rgba(168, 85, 247, 0.6)',
                      '0 0 20px rgba(139, 92, 246, 0.4)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-bold text-xs mb-1 group-hover:text-purple-300 transition-colors duration-200 truncate">
                {product.name}
              </h3>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-purple-300 font-black text-sm">
                  {typeof product.price === 'string' ? product.price : `${product.price}₺`}
                </span>
                {product.rating && (
                  <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-purple-500/10 border border-purple-500/20">
                    <Star className="h-2.5 w-2.5 text-purple-300 fill-current" />
                    <span className="text-purple-300 text-[10px] font-semibold">{product.rating}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    );
  }

  if (type === 'category' && category) {
    return (
      <Link
        to={`/oyunlar/${category.slug}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="block group"
      >
        <motion.div 
          className="relative rounded-xl border overflow-hidden transition-all duration-300 aspect-square"
          whileHover={{ scale: 1.05, rotate: 1 }}
          style={{
            background: isHovered
              ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(168, 85, 247, 0.1))'
              : 'rgba(0, 0, 0, 0.6)',
            border: isHovered
              ? '1.5px solid rgba(168, 85, 247, 0.5)'
              : '1px solid rgba(168, 85, 247, 0.2)',
            boxShadow: isHovered
              ? '0 8px 24px rgba(139, 92, 246, 0.25), 0 0 40px rgba(139, 92, 246, 0.1)'
              : '0 2px 8px rgba(0, 0, 0, 0.3)',
            backdropFilter: 'blur(12px)',
          }}
        >
          {/* Shine Effect */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 z-10"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ duration: 0.6 }}
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
              }}
            />
          )}

          <div className="relative z-0 h-full flex flex-col items-center justify-center p-3">
            {/* Category Icon/Image */}
            <motion.div 
              className="w-16 h-16 rounded-full overflow-hidden mb-2 relative"
              animate={{ 
                scale: isHovered ? 1.1 : 1,
                rotate: isHovered ? 5 : 0,
              }}
            >
              {category.url && !imageError ? (
                <img
                  src={category.url}
                  alt={category.name}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-500/30 to-purple-600/20 flex items-center justify-center">
                  <span className="text-purple-300 font-black text-lg">
                    {initials(category.name)}
                  </span>
                </div>
              )}
              {/* Pulsing Glow */}
              {isHovered && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      '0 0 20px rgba(139, 92, 246, 0.5)',
                      '0 0 35px rgba(168, 85, 247, 0.7)',
                      '0 0 20px rgba(139, 92, 246, 0.5)',
                    ],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              )}
            </motion.div>

            {/* Category Name */}
            <h3 className="text-white font-bold text-[10px] text-center group-hover:text-purple-300 transition-colors duration-200 line-clamp-2">
              {category.name}
            </h3>
          </div>
        </motion.div>
      </Link>
    );
  }

  return null;
};

export default HomePage;
