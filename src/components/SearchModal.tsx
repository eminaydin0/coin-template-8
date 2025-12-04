import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Gamepad2, ShoppingCart, Keyboard, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getCategories, getCategoryProducts } from '../services/api';
import CommonBackground from './CommonBackground';

interface HomepageItem {
  id: string;
  name: string;
  price: number | string; // Fiyat number veya string olabilir
  originalPrice?: number | string;
  slug: string;
  url?: string;
  isPopular?: boolean;
  rating?: number;
  people?: number;
  category?: {
    name: string;
    slug?: string;
  };
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  homepageItems: HomepageItem[];
}

// Basit bir debounce helper
const useDebouncedCallback = (fn: (...args: any[]) => void, delay = 300) => {
  const timeout = useRef<number | null>(null);
  return useCallback(
    (...args: any[]) => {
      if (timeout.current) window.clearTimeout(timeout.current);
      timeout.current = window.setTimeout(() => fn(...args), delay);
    },
    [fn, delay]
  );
};

const highlight = (text: string, query: string) => {
  if (!query) return text;
  const q = query.trim();
  try {
    const parts = text.split(new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'ig'));
    return parts.map((part, i) =>
      part.toLowerCase() === q.toLowerCase() ? (
        <mark key={i} className="bg-purple-400/30 text-purple-300 rounded px-0.5">{part}</mark>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  } catch {
    return text;
  }
};

const SearchModal = ({ isOpen, onClose, homepageItems }: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<HomepageItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingItems, setIsLoadingItems] = useState(false);
  const [allItems, setAllItems] = useState<HomepageItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const dialogRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Body scroll kilidi
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    setTimeout(() => searchInputRef.current?.focus(), 80);
    loadAllItems();
  }, [isOpen]);

  const loadAllItems = async () => {
    setIsLoadingItems(true);
    setError(null);
    try {
      const categoriesResponse = await getCategories();
      const categories = categoriesResponse.data || [];
      const allProductsPromises = categories.map(async (category: any) => {
        try {
          const productsResponse = await getCategoryProducts(category.slug);
          const products = productsResponse.data || [];
          return products.map((product: any) => ({
            ...product,
            category: { name: category.name, slug: category.slug },
          }));
        } catch (e) {
          console.error(`Kategori ${category.name} ürünleri yüklenirken hata:`, e);
          return [];
        }
      });
      const allProductsArrays = await Promise.all(allProductsPromises);
      const flattened = allProductsArrays.flat();
      setAllItems(flattened);
    } catch (e) {
      console.error('Ürünler yüklenirken hata:', e);
      setError('Ürünler yüklenirken bir sorun oluştu. Anasayfa verileri gösteriliyor.');
      setAllItems(homepageItems);
    } finally {
      setIsLoadingItems(false);
    }
  };

  const itemsToSearch = useMemo(() => (allItems.length ? allItems : homepageItems), [allItems, homepageItems]);

  const runSearch = useCallback(
    (query: string) => {
      const q = query.toLowerCase().trim();
      if (!q) {
        setSearchResults([]);
        setActiveIndex(0);
        setIsSearching(false);
        return;
      }

      setIsSearching(true);

      const filtered = itemsToSearch.filter((item) => {
        const name = item.name?.toLowerCase() || '';
        const cat = item.category?.name?.toLowerCase() || '';
        if (name.includes(q) || cat.includes(q)) return true;
        const qWords = q.split(' ').filter(Boolean);
        const nameWords = name.split(' ');
        const catWords = cat.split(' ');
        return qWords.some((w) => nameWords.some((nw) => nw.includes(w)) || catWords.some((cw) => cw.includes(w)));
      });

      const sorted = filtered.sort((a, b) => {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();
        if (aName === q && bName !== q) return -1;
        if (bName === q && aName !== q) return 1;
        if (aName.startsWith(q) && !bName.startsWith(q)) return -1;
        if (bName.startsWith(q) && !aName.startsWith(q)) return 1;
        if (aName.includes(q) && !bName.includes(q)) return -1;
        if (bName.includes(q) && !aName.includes(q)) return 1;
        return aName.localeCompare(bName);
      });

      setSearchResults(sorted);
      setActiveIndex(0);
      setIsSearching(false);
    },
    [itemsToSearch]
  );

  const debouncedSearch = useDebouncedCallback(runSearch, 250);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    debouncedSearch(value);
  };

  const formatPrice = (price: number | string) => {
    if (typeof price === 'string') return price;
    try {
      return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(price);
    } catch {
      return `${price} ₺`;
    }
  };

  const handleClose = () => {
    setSearchQuery('');
    setSearchResults([]);
    setAllItems([]);
    setIsLoadingItems(false);
    setActiveIndex(0);
    onClose();
  };

  // Klavye kısayolları
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (!searchResults.length) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, searchResults.length - 1));
        listRef.current?.querySelectorAll('[data-row]')[Math.min(activeIndex + 1, searchResults.length - 1)]?.scrollIntoView({ block: 'nearest' });
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
        listRef.current?.querySelectorAll('[data-row]')[Math.max(activeIndex - 1, 0)]?.scrollIntoView({ block: 'nearest' });
      }
      if (e.key === 'Enter') {
        const target = searchResults[activeIndex];
        if (target) {
          // Link'i programatik tıklat
          const el = document.getElementById(`search-link-${target.id}`);
          (el as HTMLAnchorElement)?.click();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, searchResults, activeIndex]);

  // Pencere dışı tıklama kapatma (Backdrop üstünde yakalıyoruz)

  const headerHint = (
    <div className="hidden sm:flex items-center gap-1.5 text-[10px]">
      <div 
        className="inline-flex items-center gap-1 rounded-md px-2 py-1"
        style={{
          background: 'rgba(139, 92, 246, 0.1)',
          border: '1px solid rgba(168, 85, 247, 0.2)',
          color: 'rgba(168, 85, 247, 0.9)',
        }}
      >
        <Keyboard className="h-3 w-3" />
        <span>↑↓</span>
      </div>
      <div 
        className="inline-flex items-center gap-1 rounded-md px-2 py-1"
        style={{
          background: 'rgba(139, 92, 246, 0.1)',
          border: '1px solid rgba(168, 85, 247, 0.2)',
          color: 'rgba(168, 85, 247, 0.9)',
        }}
      >
        <span>Enter</span>
      </div>
      <div 
        className="inline-flex items-center gap-1 rounded-md px-2 py-1"
        style={{
          background: 'rgba(139, 92, 246, 0.1)',
          border: '1px solid rgba(168, 85, 247, 0.2)',
          color: 'rgba(168, 85, 247, 0.9)',
        }}
      >
        <span>Esc</span>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          aria-modal
          role="dialog"
          aria-labelledby="search-title"
        >
          {/* Common Background */}
          <CommonBackground />

          {/* Backdrop */}
          <motion.button
            type="button"
            aria-label="Arama modülünü kapat"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm z-10"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            ref={dialogRef}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl max-h-[85vh] rounded-2xl overflow-hidden border z-20"
            style={{
              background: 'rgba(0, 0, 0, 0.9)',
              border: '1px solid rgba(168, 85, 247, 0.3)',
              boxShadow: '0 20px 60px rgba(139, 92, 246, 0.25), 0 8px 24px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
              backdropFilter: 'blur(20px)',
            }}
          >

            <div className="relative z-10">
              {/* Header - Compact & Modern */}
              <div 
                className="p-4 sm:p-5 border-b flex items-center justify-between gap-4"
                style={{ 
                  borderColor: 'rgba(168, 85, 247, 0.2)',
                  background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(139, 92, 246, 0.02))',
                }}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div 
                    className="inline-flex items-center gap-2 rounded-lg px-3 py-1.5 flex-shrink-0"
                    style={{
                      background: 'rgba(139, 92, 246, 0.15)',
                      border: '1px solid rgba(168, 85, 247, 0.3)',
                    }}
                  >
                    <Search className="h-4 w-4 text-purple-300" />
                    <span id="search-title" className="text-xs font-bold text-white">ARAMA</span>
                  </div>
                  {headerHint}
                </div>

                <motion.button
                  onClick={handleClose}
                  className="group relative flex items-center justify-center w-8 h-8 rounded-lg border transition-all duration-200 flex-shrink-0"
                  style={{
                    background: 'rgba(75, 85, 99, 0.3)',
                    border: '1px solid rgba(75, 85, 99, 0.4)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(139, 92, 246, 0.15)';
                    e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(75, 85, 99, 0.3)';
                    e.currentTarget.style.borderColor = 'rgba(75, 85, 99, 0.4)';
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <X className="w-4 h-4 text-gray-400 group-hover:text-purple-300 transition-colors duration-200" />
                </motion.button>
              </div>

              {/* Search Input - Modern Design */}
              <div className="px-4 sm:px-6 pt-4 pb-3">
                <div className="relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg" style={{ background: 'linear-gradient(180deg, rgba(168, 85, 247, 0.6), rgba(139, 92, 246, 0.4))' }} />
                  <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-purple-300/60" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    placeholder="Oyun adı veya kategori yazın..."
                    className="w-full pl-11 pr-12 py-3 rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all duration-200 text-sm font-medium"
                    style={{
                      background: 'rgba(0, 0, 0, 0.6)',
                      border: '1px solid rgba(168, 85, 247, 0.3)',
                      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.6)';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.15), inset 0 2px 4px rgba(0,0,0,0.3)';
                      e.currentTarget.style.background = 'rgba(0, 0, 0, 0.7)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.3)';
                      e.currentTarget.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.3)';
                      e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
                    }}
                    aria-autocomplete="list"
                    aria-controls="search-results"
                    aria-expanded={!!searchQuery}
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    {isSearching && (
                      <Loader2 className="h-4 w-4 animate-spin text-purple-300" />
                    )}
                  </div>
                </div>
                {error && <p className="mt-2 text-xs text-purple-300/80">{error}</p>}
              </div>

              {/* Results */}
              <div ref={listRef} id="search-results" className="p-4 sm:p-6 max-h-[58vh] overflow-y-auto gaming-scrollbar">
                {isLoadingItems ? (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-purple-300 mb-3" />
                    <h3 className="text-base sm:text-lg font-bold text-white mb-1">Tüm Ürünler Yükleniyor</h3>
                    <p className="text-gray-400 text-sm">Kategorilerden ürünler getiriliyor...</p>
                  </div>
                ) : searchQuery ? (
                  isSearching ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Loader2 className="h-5 w-5 animate-spin text-purple-300" />
                        <span className="text-sm">Aranıyor...</span>
                      </div>
                    </div>
                  ) : searchResults.length ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 mb-3">
                        <span 
                          className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                          style={{
                            background: 'rgba(139, 92, 246, 0.15)',
                            border: '1px solid rgba(168, 85, 247, 0.3)',
                            color: 'rgba(168, 85, 247, 0.95)',
                          }}
                        >
                          {searchResults.length} SONUÇ
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                        {searchResults.map((item, index) => (
                          <motion.div
                            data-row
                            key={item.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2, delay: index * 0.03 }}
                            className={`group relative rounded-xl border overflow-hidden transition-all duration-300 ${
                              activeIndex === index ? 'border-purple-400/60' : 'border-purple-500/20 hover:border-purple-400/50'
                            }`}
                            style={{
                              background: activeIndex === index 
                                ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(139, 92, 246, 0.05))' 
                                : 'rgba(0, 0, 0, 0.5)',
                              boxShadow: activeIndex === index
                                ? '0 4px 12px rgba(139, 92, 246, 0.2), 0 2px 6px rgba(0,0,0,0.3)'
                                : '0 2px 4px rgba(0,0,0,0.2)',
                            }}
                            whileHover={{ y: -2 }}
                          >
                            <Link id={`search-link-${item.id}`} to={`/epin/${item.slug}`} onClick={handleClose}>
                              <div className="p-2.5">
                                <div className="flex items-start gap-2.5">
                                  {/* Image */}
                                  <div 
                                    className="relative h-12 w-12 flex-shrink-0 rounded-lg border overflow-hidden"
                                    style={{
                                      background: 'rgba(139, 92, 246, 0.1)',
                                      border: '1px solid rgba(168, 85, 247, 0.25)',
                                    }}
                                  >
                                    {item.url ? (
                                      <img
                                        src={item.url}
                                        alt={item.name}
                                        className="h-full w-full object-cover"
                                        onError={(e) => {
                                          const target = e.currentTarget as HTMLImageElement;
                                          target.style.display = 'none';
                                          const sib = target.nextElementSibling as HTMLElement;
                                          if (sib) sib.style.display = 'flex';
                                        }}
                                      />
                                    ) : null}
                                    <div className="absolute inset-0 hidden items-center justify-center" style={{ display: item.url ? 'none' as any : 'flex' }}>
                                      <Gamepad2 className="h-5 w-5 text-purple-300/60" />
                                    </div>
                                  </div>

                                  {/* Content */}
                                  <div className="min-w-0 flex-1">
                                    <h3 className="truncate font-bold text-white text-xs mb-0.5 leading-tight">
                                      {highlight(item.name, searchQuery)}
                                    </h3>
                                    {item.category?.name && (
                                      <p className="truncate text-[10px] text-gray-400 mb-1.5">{highlight(item.category.name, searchQuery)}</p>
                                    )}

                                    <div className="flex items-center gap-1.5">
                                      <div 
                                        className="text-xs font-bold px-2 py-0.5 rounded"
                                        style={{
                                          background: 'rgba(139, 92, 246, 0.2)',
                                          color: 'rgba(168, 85, 247, 0.95)',
                                        }}
                                      >
                                        {formatPrice(item.price)}
                                      </div>
                                      {item.originalPrice && (
                                        <div className="text-[10px] text-gray-500 line-through">{formatPrice(item.originalPrice)}</div>
                                      )}
                                    </div>
                                  </div>

                                  {/* CTA */}
                                  <div className="flex-shrink-0 pt-0.5">
                                    <div
                                      className="grid h-7 w-7 place-items-center rounded-lg transition-all duration-200"
                                      style={{
                                        background: 'rgba(139, 92, 246, 0.15)',
                                        border: '1px solid rgba(168, 85, 247, 0.25)',
                                      }}
                                      onMouseEnter={(e) => {
                                        e.currentTarget.style.background = 'rgba(139, 92, 246, 0.25)';
                                        e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.4)';
                                      }}
                                      onMouseLeave={(e) => {
                                        e.currentTarget.style.background = 'rgba(139, 92, 246, 0.15)';
                                        e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.25)';
                                      }}
                                    >
                                      <ShoppingCart className="h-3.5 w-3.5 text-purple-300" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div 
                        className="grid h-16 w-16 place-items-center rounded-xl border mb-4"
                        style={{
                          background: 'rgba(139, 92, 246, 0.1)',
                          border: '1px solid rgba(168, 85, 247, 0.3)',
                        }}
                      >
                        <Search className="h-8 w-8 text-purple-300/60" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-2">Sonuç Bulunamadı</h3>
                      <p className="max-w-md text-sm text-gray-400">"{searchQuery}" için sonuç bulunamadı. Farklı bir arama terimi deneyin.</p>
                    </div>
                  )
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div 
                      className="grid h-20 w-20 place-items-center rounded-xl border mb-5"
                      style={{
                        background: 'rgba(139, 92, 246, 0.1)',
                        border: '1px solid rgba(168, 85, 247, 0.3)',
                      }}
                    >
                      <Search className="h-10 w-10 text-purple-300/60" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                      <span className="bg-gradient-to-r from-purple-300 to-purple-400 bg-clip-text text-transparent">
                        Oyun Ara
                      </span>
                    </h3>
                    <p className="max-w-md text-sm text-gray-400">Yukarıdaki kutuya oyun adı veya kategori yazarak arama yapabilirsiniz.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SearchModal;
