import { motion } from 'framer-motion';
import { Search, Zap } from 'lucide-react';

interface SearchButtonProps {
  onClick: () => void;
}

const SearchButton = ({ onClick }: SearchButtonProps) => {
  return (
    <motion.button
      onClick={onClick}
      className="fixed bottom-6 left-6 z-40 group"
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
    >
      {/* Outer Glow Ring */}
      <div className="absolute -inset-3 bg-gradient-to-r from-red-500 via-red-400 to-red-500 rounded-full blur-lg opacity-30 group-hover:opacity-60 transition-all duration-500"></div>
      
      {/* Main Button */}
      <div className="relative bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 px-6 transition-all duration-500 shadow-lg hover:shadow-red-600/30 border-2 border-red-500/50 rounded-2xl overflow-hidden group/btn"
        style={{
          clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'
        }}
      >
        {/* Button glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-red-400/20 to-red-600/20 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
        
        {/* Animated corner accent */}
        <div className="absolute top-0 right-0 w-4 h-4 bg-gradient-to-bl from-red-400 to-red-500 opacity-0 group-hover/btn:opacity-80 transition-opacity duration-300"></div>
        <div className="absolute top-0 right-0 w-3 h-3 bg-black transform rotate-45 translate-x-0.5 -translate-y-0.5 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
        
        {/* Content */}
        <div className="relative z-10 flex items-center space-x-3">
          <Search className="w-6 h-6 group-hover/btn:rotate-12 transition-transform duration-300" />
          <span className="rajdhani-font tracking-wider text-lg">ARA</span>
          <Zap className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" />
        </div>
        
        {/* Pulsing effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-red-500/20 to-red-400/20 rounded-2xl"
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>
      
      {/* Floating particles effect */}
      <div className="absolute -top-2 -right-2 w-2 h-2 bg-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <motion.div
          className="w-full h-full bg-red-400 rounded-full"
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      </div>
      <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 bg-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
        <motion.div
          className="w-full h-full bg-red-500 rounded-full"
          animate={{ scale: [1, 1.3, 1], opacity: [1, 0, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 0.5 }}
        />
      </div>
    </motion.button>
  );
};

export default SearchButton;
