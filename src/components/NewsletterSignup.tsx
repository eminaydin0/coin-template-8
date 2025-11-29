import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Check, Bell } from 'lucide-react';
import toast from 'react-hot-toast';

const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted, email:', email);
    if (!email.trim()) {
      console.log('Email is empty');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      setEmail('');
      
      // Show success toast
      toast.success('GAMING BÜLTENİNE BAŞARIYLA KAYDOLDUNUZ!', {
        duration: 3000,
        style: {
          fontSize: '12px',
          padding: '8px 12px',
          maxWidth: '300px'
        }
      });
      
      // Reset after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }, 1000);
  };

  return (
    <section className="relative py-10">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <Bell className="w-5 h-5 text-amber-400" />
            <span
              className="text-xs font-bold px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(251, 191, 36, 0.2)',
                border: '1px solid rgba(251, 191, 36, 0.4)',
                color: 'rgba(251, 191, 36, 0.95)',
                backdropFilter: 'blur(8px)',
              }}
            >
              BÜLTEN
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
            Bültene Kaydol
          </h2>
          <p className="text-amber-300/90 text-sm max-w-xl mx-auto">
            En yeni oyun haberleri, özel indirimler ve gaming dünyasından son gelişmeleri kaçırma!
          </p>
        </div>

        {/* Newsletter Form */}
        <div className="max-w-md mx-auto">
          <div 
            className="relative rounded-xl border p-6"
            style={{
              background: 'rgba(0, 0, 0, 0.7)',
              border: '1px solid rgba(75, 85, 99, 0.2)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              backdropFilter: 'blur(12px)',
            }}
          >
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Input */}
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-amber-400/80" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="E-posta adresinizi girin"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl text-white placeholder-gray-400 focus:outline-none transition-all duration-300 text-sm font-medium"
                    style={{
                      background: 'rgba(0, 0, 0, 0.5)',
                      border: '1px solid rgba(251, 191, 36, 0.3)',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    }}
                    onFocus={(e) => {
                      e.target.style.border = '1px solid rgba(251, 191, 36, 0.5)';
                      e.target.style.boxShadow = '0 0 0 3px rgba(251, 191, 36, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.border = '1px solid rgba(251, 191, 36, 0.3)';
                      e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.2)';
                    }}
                    required
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  onClick={(e) => {
                    if (!email.trim()) {
                      e.preventDefault();
                      toast.error('Lütfen email adresinizi girin!', {
                        duration: 2000,
                        style: {
                          fontSize: '12px',
                          padding: '8px 12px',
                          maxWidth: '300px'
                        }
                      });
                      return;
                    }
                  }}
                  className="group relative w-full font-bold text-black py-3.5 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 shadow-[0_0_30px_rgba(251,191,36,0.5)] hover:shadow-[0_0_50px_rgba(251,191,36,0.7)]"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        className="w-5 h-5 border-2 border-black border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      <span className="text-sm font-bold">GÖNDERİLİYOR...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span className="text-sm font-bold">KAYDOL</span>
                    </>
                  )}
                </motion.button>
              </form>
            ) : (
              /* Success Message */
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  className="w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: 'rgba(251, 191, 36, 0.2)',
                    border: '1px solid rgba(251, 191, 36, 0.4)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <Check className="h-8 w-8 text-amber-400" />
                </motion.div>
                <h3 className="text-xl font-black text-white mb-3">
                  BAŞARILI!
                </h3>
                <p className="text-amber-300/90 text-sm">
                  <span className="text-white font-bold">Bültenimize</span> başarıyla kaydoldunuz.{' '}
                  <span className="text-amber-300 font-bold">Teşekkürler!</span>
                </p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Footer Text */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-xs">
            <span className="text-gray-300 font-medium">Spam göndermiyoruz.</span> İstediğiniz zaman{' '}
            <span className="text-gray-300 font-medium">abonelikten çıkabilirsiniz.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSignup;
