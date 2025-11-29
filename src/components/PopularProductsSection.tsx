import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { ArrowRight, Gamepad2, Star, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { getHomepageItems } from '../services/api';

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
  categoryName?: string;
}

const PopularProductsSection = () => {
  const [homepageItems, setHomepageItems] = useState<HomepageItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true, 
      align: 'start', 
      dragFree: false,
      slidesToScroll: 'auto'
    },
    [Autoplay({ delay: 3500, stopOnInteraction: false })]
  );
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const loadPopularProducts = async () => {
    setIsLoading(true);
    try {
      const response = await getHomepageItems(20);
      setHomepageItems(response.data || []);
    } catch (error) {
      console.error('Popüler ürünler yüklenirken hata:', error);
      setHomepageItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPopularProducts();
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi]);

  const scrollPrev = () => {
    emblaApi?.scrollPrev();
  };

  const scrollNext = () => {
    emblaApi?.scrollNext();
  };

  if (isLoading || homepageItems.length === 0) {
    return (
      <section className="relative py-10">
        <div className="px-4 sm:px-6 lg:px-8">
          <div
            className="flex items-center justify-center h-48 border rounded-xl backdrop-blur-sm"
            style={{
              background: 'rgba(0, 0, 0, 0.7)',
              border: '1px solid rgba(75, 85, 99, 0.2)',
            }}
          >
            {isLoading ? (
              <div className="flex flex-col items-center gap-3">
                <div className="relative h-10 w-10">
                  <div className="absolute inset-0 rounded-full border-3 border-gray-700/50" />
                  <div className="absolute inset-0 rounded-full border-3 border-amber-400/80 border-t-transparent border-l-transparent animate-spin" />
                </div>
                <span className="text-white text-base font-medium">
                  Oyunlar yükleniyor...
                </span>
              </div>
            ) : (
              <div className="text-center">
                <Gamepad2 className="w-12 h-12 text-amber-300 mx-auto mb-3" />
                <span className="text-gray-400 text-base">
                  Henüz popüler oyun bulunmuyor
                </span>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-10">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
            En Çok Tercih Edilenler
          </h2>
          <p className="text-amber-300/90 text-sm max-w-xl mx-auto">
            Oyuncuların en çok tercih ettikleri oyunlar.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {homepageItems.slice(0, 12).map((item) => (
                <div
                  key={item.id}
                  className="min-w-[250px] sm:min-w-[280px] md:min-w-[300px] flex-shrink-0"
                >
                  <ProductCard item={item} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          {homepageItems.length > 0 && (
            <>
              <button
                onClick={scrollPrev}
                disabled={!canScrollPrev}
                className="absolute left-0 sm:-left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 active:scale-95"
                style={{
                  background: canScrollPrev
                    ? 'rgba(251, 191, 36, 0.2)'
                    : 'rgba(75, 85, 99, 0.2)',
                  border: canScrollPrev
                    ? '1px solid rgba(251, 191, 36, 0.4)'
                    : '1px solid rgba(75, 85, 99, 0.3)',
                  backdropFilter: 'blur(8px)',
                }}
                aria-label="Önceki"
              >
                <ChevronLeft 
                  className="w-5 h-5 sm:w-6 sm:h-6" 
                  style={{ 
                    color: canScrollPrev ? 'rgba(251, 191, 36, 0.9)' : 'rgba(156, 163, 175, 0.5)' 
                  }} 
                />
              </button>
              <button
                onClick={scrollNext}
                disabled={!canScrollNext}
                className="absolute right-0 sm:-right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-110 active:scale-95"
                style={{
                  background: canScrollNext
                    ? 'rgba(251, 191, 36, 0.2)'
                    : 'rgba(75, 85, 99, 0.2)',
                  border: canScrollNext
                    ? '1px solid rgba(251, 191, 36, 0.4)'
                    : '1px solid rgba(75, 85, 99, 0.3)',
                  backdropFilter: 'blur(8px)',
                }}
                aria-label="Sonraki"
              >
                <ChevronRight 
                  className="w-5 h-5 sm:w-6 sm:h-6" 
                  style={{ 
                    color: canScrollNext ? 'rgba(251, 191, 36, 0.9)' : 'rgba(156, 163, 175, 0.5)' 
                  }} 
                />
              </button>
            </>
          )}
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <Link
            to="/oyunlar"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-black bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 shadow-[0_0_30px_rgba(251,191,36,0.5)] hover:shadow-[0_0_50px_rgba(251,191,36,0.7)] transition-all"
          >
            <span>Tüm Oyunları Gör</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

const ProductCard = ({ item }: { item: HomepageItem }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      to={`/epin/${item.slug}`}
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
            ? '1px solid rgba(251, 191, 36, 0.3)'
            : '1px solid rgba(75, 85, 99, 0.2)',
          boxShadow: isHovered
            ? '0 12px 32px rgba(251, 191, 36, 0.2), 0 4px 16px rgba(0,0,0,0.4)'
            : '0 4px 16px rgba(0,0,0,0.3)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <div className="relative h-44 overflow-hidden">
          {item.url && !imageError ? (
            <img
              src={item.url}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-amber-500/20 to-amber-600/10 flex items-center justify-center">
              <Gamepad2 className="h-12 w-12 text-amber-300/50" />
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          {typeof item.rating === 'number' && (
            <div
              className="absolute top-3 left-3 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5 z-10"
              style={{
                background: 'rgba(251, 191, 36, 0.25)',
                border: '1px solid rgba(251, 191, 36, 0.4)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Star className="h-3.5 w-3.5 text-amber-300 fill-current" />
              <span className="text-white text-xs font-bold">{item.rating}</span>
            </div>
          )}
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-2">
            {item.categoryName && (
              <span
                className="text-xs font-medium px-2.5 py-1 rounded-lg"
                style={{
                  background: 'rgba(251, 191, 36, 0.15)',
                  border: '1px solid rgba(251, 191, 36, 0.25)',
                  color: 'rgba(251, 191, 36, 0.9)',
                }}
              >
                {item.categoryName}
              </span>
            )}
            {item.people !== undefined && item.people > 0 && (
              <div className="flex items-center gap-1.5 text-xs text-gray-400 ml-auto">
                <Users className="h-3.5 w-3.5" />
                <span>{item.people}</span>
              </div>
            )}
          </div>

          <h3 className="text-white font-bold text-base mb-2 line-clamp-2 leading-tight group-hover:text-amber-300 transition-colors">
            {item.name}
          </h3>

          <div className="mt-auto pt-3 border-t" style={{ borderColor: 'rgba(75,85,99,0.2)' }}>
            <div className="flex items-center justify-between">
              <span className="text-xl font-black text-white">
                {typeof item.price === 'string' ? item.price : `${item.price}₺`}
              </span>
              <motion.div
                className="px-4 py-1.5 rounded-lg text-xs font-semibold text-white"
                style={{
                  background: 'rgba(251, 191, 36, 0.2)',
                  border: '1px solid rgba(251, 191, 36, 0.3)',
                }}
                whileHover={{ scale: 1.05, background: 'rgba(251, 191, 36, 0.3)' }}
                whileTap={{ scale: 0.95 }}
              >
                İncele
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default PopularProductsSection;
