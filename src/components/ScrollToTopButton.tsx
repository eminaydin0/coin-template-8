import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

const ScrollToTopButton = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {showScrollButton && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 w-10 h-10 rounded-xl border transition-all duration-200 flex items-center justify-center"
          style={{
            background: 'rgba(0, 0, 0, 0.7)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.3), 0 0 20px rgba(139,92,246,0.2)',
            backdropFilter: 'blur(12px)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.3), 0 0 30px rgba(139,92,246,0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.3)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.3), 0 0 20px rgba(139,92,246,0.2)';
          }}
        >
          <ArrowUp className="w-4 h-4 text-purple-300" />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTopButton;
