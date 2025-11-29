import { useState, useEffect } from 'react';
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
import CategoriesSection from '../components/CategoriesSection';
import BestSellingGamesSection from '../components/BestSellingGamesSection';
import HowItWorksSection from '../components/HowItWorksSection';
import CommonBackground from '../components/CommonBackground';

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
        {/* HERO + CATEGORIES SIDE BY SIDE - No Padding */}
        <div className="w-full py-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 px-4 sm:px-6 lg:px-8">
            {/* LEFT: Hero Section (3/5 - Wider) */}
            <div className="lg:col-span-3 h-[70vh] max-h-[70vh] overflow-hidden">
              <HeroSection
                heroList={heroList}
                currentHeroIndex={currentHeroIndex}
                setCurrentHeroIndex={setCurrentHeroIndex}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
              />
            </div>

            {/* RIGHT: Categories List (2/5 - Narrower) */}
            <div className="lg:col-span-2 h-[70vh] max-h-[70vh] overflow-y-auto">
              <CategoriesSection categories={categories} />
            </div>
          </div>
        </div>

        {/* HOW IT WORKS - Full Width, No Padding */}
        <div className="w-full py-8 mb-16">
          <HowItWorksSection />
        </div>

        {/* PRODUCTS SECTION - Stacked Vertically */}
        <div className="w-full py-8 mb-16 space-y-12">
          {/* Popular Products */}
          <PopularProductsSection />

          {/* Best Selling */}
          <BestSellingGamesSection homepageItems={homepageItems} />

          {/* More Games */}
          <MoreGamesSection homepageItems={homepageItems} />
        </div>

        {/* BOTTOM SECTION - Newsletter + CTA Side by Side */}
        <div className="w-full py-8 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="lg:col-span-1 border-r border-gray-700/30">
              <NewsletterSignup />
            </div>
            <div className="lg:col-span-1">
              <CallToActionSection />
            </div>
          </div>
        </div>

        {/* Scroll to Top Button */}
        <ScrollToTopButton />
      </div>
    </div>
  );
};

export default HomePage;
