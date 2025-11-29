import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';

interface Category {
  id: string;
  name: string;
  slug: string;
  url?: string;
  description?: string;
}

interface CategoriesSectionProps {
  categories: Category[];
}

const initials = (name?: string) =>
  (name || '?')
    .split(/\s+/)
    .slice(0, 2)
    .map((s) => s[0])
    .join('')
    .toUpperCase();

const CategoriesSection = ({ categories }: CategoriesSectionProps) => {
  if (!categories.length) return null;

  // Kategorileri iki kez tekrarla sonsuz döngü için
  const duplicatedCategories = [...categories, ...categories];
  // Her kategori için yaklaşık 4 saniye (daha yavaş akış)
  const animationDuration = categories.length * 4;

  return (
    <section className="relative w-full h-full overflow-hidden">
      <style>
        {`
          @keyframes scrollUp {
            0% {
              transform: translateY(0);
            }
            100% {
              transform: translateY(-50%);
            }
          }
          .scroll-container {
            animation: scrollUp ${animationDuration}s linear infinite;
          }
          .scroll-container:hover {
            animation-play-state: paused;
          }
        `}
      </style>
      
      <div className="h-full overflow-hidden">
        <div className="scroll-container">
          <div className="space-y-2">
            {duplicatedCategories.map((c, i) => (
              <div key={`${c.id || c.slug}-${i}`}>
                <CategoryCard category={c} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;

const CategoryCard = ({ category }: { category: Category }) => {
  const [error, setError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={`/oyunlar/${category.slug}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="block"
    >
      <motion.div
        whileHover={{ x: 2 }}
        className="relative flex items-center gap-4 p-4 rounded-lg transition-all duration-300 overflow-hidden group cursor-pointer"
        style={{
          background: isHovered
            ? 'rgba(0, 0, 0, 0.85)'
            : 'rgba(0, 0, 0, 0.7)',
          border: isHovered
            ? '1px solid rgba(251, 191, 36, 0.3)'
            : '1px solid rgba(75, 85, 99, 0.2)',
          boxShadow: isHovered
            ? '0 4px 12px rgba(251, 191, 36, 0.15), 0 2px 8px rgba(0,0,0,0.3)'
            : '0 2px 8px rgba(0,0,0,0.2)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Icon Container */}
        <motion.div
          className="relative flex-shrink-0"
          animate={{ 
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center overflow-hidden"
            style={{
              background: 'rgba(251, 191, 36, 0.15)',
              border: '1px solid rgba(251, 191, 36, 0.25)',
            }}
          >
            {!error && category.url ? (
              <img
                src={category.url}
                alt={category.name}
                className="h-full w-full object-cover"
                onError={() => setError(true)}
              />
            ) : (
              <span className="text-yellow-400 font-bold text-base">
                {initials(category.name)}
              </span>
            )}
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0 relative z-10">
          <h3
            className="text-white font-semibold text-sm mb-0.5 group-hover:text-amber-300 transition-colors duration-200 truncate"
          >
            {category.name}
          </h3>
          {category.description && (
            <p className="text-gray-400 text-xs truncate">
              {category.description}
            </p>
          )}
        </div>

        {/* Arrow */}
        <motion.div
          className="flex-shrink-0"
          animate={{ 
            x: isHovered ? 2 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{
              background: 'rgba(251, 191, 36, 0.1)',
              border: '1px solid rgba(251, 191, 36, 0.2)',
            }}
          >
            <ChevronRight
              className={`h-4 w-4 ${
                isHovered ? 'text-amber-300' : 'text-gray-500'
              } transition-colors`}
            />
          </div>
        </motion.div>
      </motion.div>
    </Link>
  );
};
