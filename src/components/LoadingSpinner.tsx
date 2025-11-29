import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import CommonBackground from './CommonBackground';

interface LoadingSpinnerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  text?: string;
  variant?: 'default' | 'gaming' | 'minimal' | 'compact' | 'inline';
  color?: 'blue' | 'red' | 'green' | 'yellow' | 'purple' | 'amber';
  className?: string;
  showBackground?: boolean;
}

const LoadingSpinner = ({ 
  size = 'lg', 
  text = 'Yükleniyor...', 
  variant = 'gaming',
  color = 'amber',
  className = '',
  showBackground = false
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    xs: 'w-4 h-4',
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16'
  };

  const textSizes = {
    xs: 'text-xs',
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };

  const iconSizes = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8'
  };

  // Inline variant - just the spinner without container
  if (variant === 'inline') {
    return (
      <motion.div
        className={`${sizeClasses[size]} border-2 border-gray-600 border-t-amber-400 rounded-full ${className}`}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        role="status"
        aria-label="Yükleniyor"
      />
    );
  }

  // Compact variant - minimal spinner with optional text
  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <motion.div
          className={`${sizeClasses[size]} border-2 border-gray-600 border-t-amber-400 rounded-full`}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          role="status"
          aria-label="Yükleniyor"
        />
        {text && (
          <span className={`${textSizes[size]} text-gray-300 font-medium`}>
            {text}
          </span>
        )}
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
        <motion.div
          className={`${sizeClasses[size]} border-4 border-gray-600 border-t-amber-400 rounded-full`}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          role="status"
          aria-label="Yükleniyor"
        />
        {text && (
          <motion.p 
            className={`${textSizes[size]} text-gray-300 font-medium`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {text}
          </motion.p>
        )}
      </div>
    );
  }

  if (variant === 'gaming') {
    const spinnerContent = (
      <div className={`flex flex-col items-center justify-center space-y-6 relative min-h-screen ${className}`}>
        {/* Amber Spinner */}
        <div className="relative">
          {/* Main Spinner Ring */}
          <motion.div
            className={`${sizeClasses[size]} border-4 rounded-full relative`}
            style={{
              borderColor: 'rgba(251, 191, 36, 0.2)',
              borderTopColor: 'rgba(251, 191, 36, 0.8)',
              boxShadow: '0 0 20px rgba(251, 191, 36, 0.3)'
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Center Icon */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <Loader2 className={`${iconSizes[size]} text-amber-400`} />
          </div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-3">
          <motion.p 
            className={`${textSizes[size]} text-gray-300 font-medium`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {text}
          </motion.p>
          
          {/* Animated Dots */}
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-amber-400/60"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{ 
                  duration: 1.2, 
                  repeat: Infinity, 
                  delay: i * 0.15,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
      </div>
    );

    if (showBackground) {
      return (
        <div className="relative w-full h-full">
          <CommonBackground />
          {spinnerContent}
        </div>
      );
    }

    return spinnerContent;
  }

  // Default variant
  const defaultContent = (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      {/* Amber Spinner */}
      <div className="relative">
        {/* Main Spinner Ring */}
        <motion.div
          className={`${sizeClasses[size]} border-4 rounded-full relative`}
          style={{
            borderColor: 'rgba(251, 191, 36, 0.2)',
            borderTopColor: 'rgba(251, 191, 36, 0.8)',
            boxShadow: '0 0 20px rgba(251, 191, 36, 0.3)'
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          role="status"
          aria-label="Yükleniyor"
        />
        
        {/* Center Icon */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <Loader2 className={`${iconSizes[size]} text-amber-400`} />
        </div>
      </div>
      
      {/* Loading Text */}
      {text && (
        <div className="text-center space-y-2">
          <motion.p 
            className={`${textSizes[size]} text-gray-300 font-medium`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {text}
          </motion.p>
          
          {/* Animated Dots */}
          <div className="flex justify-center space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-amber-400/60"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{ 
                  duration: 1.2, 
                  repeat: Infinity, 
                  delay: i * 0.15,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );

  if (showBackground) {
    return (
      <div className="relative w-full h-full">
        <CommonBackground />
        {defaultContent}
      </div>
    );
  }

  return defaultContent;
};

export default LoadingSpinner;
