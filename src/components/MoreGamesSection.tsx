import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Gamepad2, Users, Sparkles } from 'lucide-react';

interface HomepageItem {
  id: string;
  name: string;
  price: number | string;
  originalPrice?: number | string;
  slug: string;
  url?: string;
  isPopular?: boolean;
  people?: number;
  categoryName?: string;
}

interface MoreGamesSectionProps {
  homepageItems: HomepageItem[];
}

const MoreGamesSection = ({ homepageItems }: MoreGamesSectionProps) => {
  const moreGames = homepageItems.slice(10, Math.min(homepageItems.length, 30));

  if (moreGames.length === 0) {
    return null;
  }

  return (
    <section className="relative py-10">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <span
              className="text-xs font-bold px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(251, 191, 36, 0.2)',
                border: '1px solid rgba(251, 191, 36, 0.4)',
                color: 'rgba(251, 191, 36, 0.95)',
                backdropFilter: 'blur(8px)',
              }}
            >
              DAHA FAZLA OYUN
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
            Daha Fazla Oyun
          </h2>
          <p className="text-amber-300/90 text-sm max-w-xl mx-auto">
            Keşfetmeye devam edin.
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 mb-8">
          {moreGames.map((item, index) => (
            <MoreGameCard key={item.id} item={item} index={index} />
          ))}
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

const MoreGameCard = ({ item, index }: { item: HomepageItem; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
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
              ? '1px solid rgba(251, 191, 36, 0.4)'
              : '1px solid rgba(75, 85, 99, 0.2)',
            boxShadow: isHovered
              ? '0 12px 32px rgba(251, 191, 36, 0.25), 0 4px 16px rgba(0,0,0,0.4)'
              : '0 4px 16px rgba(0,0,0,0.3)',
            backdropFilter: 'blur(12px)',
          }}
        >
          {/* Image */}
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

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          </div>

          {/* Content */}
          <div className="p-4 flex-1 flex flex-col">
            {/* Category & People */}
            {item.categoryName && (
              <div className="flex items-center justify-between mb-2">
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
                {item.people !== undefined && item.people > 0 && (
                  <div className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Users className="h-3.5 w-3.5" />
                    <span>{item.people}</span>
                  </div>
                )}
              </div>
            )}
            {!item.categoryName && item.people !== undefined && item.people > 0 && (
              <div className="flex items-center justify-end mb-2">
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Users className="h-3.5 w-3.5" />
                  <span>{item.people}</span>
                </div>
              </div>
            )}

            {/* Title */}
            <h3 className="text-white font-bold text-base mb-2 line-clamp-2 leading-tight group-hover:text-amber-300 transition-colors">
              {item.name}
            </h3>

            {/* Price & Action */}
            <div className="mt-auto pt-3 border-t" style={{ borderColor: 'rgba(75,85,99,0.2)' }}>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  {item.originalPrice && item.originalPrice !== item.price && (
                    <span className="text-xs text-gray-400 line-through">
                      {typeof item.originalPrice === 'string' ? item.originalPrice : `${item.originalPrice}₺`}
                    </span>
                  )}
                  <span className="text-xl font-black text-white">
                    {typeof item.price === 'string' ? item.price : `${item.price}₺`}
                  </span>
                </div>
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
    </motion.div>
  );
};

export default MoreGamesSection;
