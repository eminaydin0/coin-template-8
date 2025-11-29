import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Clock, ShieldCheck, Sparkles, Headphones } from 'lucide-react';
import { motion } from 'framer-motion';

const CallToActionSection: React.FC = () => {
  return (
    <section className="relative py-10" aria-labelledby="cta-title">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <Headphones className="w-5 h-5 text-amber-400" />
            <span
              className="text-xs font-bold px-3 py-1.5 rounded-full"
              style={{
                background: 'rgba(251, 191, 36, 0.2)',
                border: '1px solid rgba(251, 191, 36, 0.4)',
                color: 'rgba(251, 191, 36, 0.95)',
                backdropFilter: 'blur(8px)',
              }}
            >
              7/24 DESTEK
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white mb-2">
            Hâlâ Sorularınız mı Var?
          </h2>
          <p className="text-amber-300/90 text-sm max-w-xl mx-auto">
            Uzman ekibimiz günün her saati yanınızda. Hızlı çözümler için bize ulaşın.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <motion.div 
            className="flex items-center gap-3 rounded-xl border p-4"
            style={{
              background: 'rgba(0, 0, 0, 0.7)',
              border: '1px solid rgba(75, 85, 99, 0.2)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              backdropFilter: 'blur(12px)',
            }}
            whileHover={{ 
              border: '1px solid rgba(251, 191, 36, 0.4)',
              boxShadow: '0 6px 20px rgba(251, 191, 36, 0.2)'
            }}
            transition={{ duration: 0.2 }}
          >
            <ShieldCheck className="h-5 w-5 text-amber-400" />
            <div>
              <p className="text-sm font-semibold text-white">Güvenli</p>
              <p className="text-xs text-gray-400">KVKK uyumlu</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-3 rounded-xl border p-4"
            style={{
              background: 'rgba(0, 0, 0, 0.7)',
              border: '1px solid rgba(75, 85, 99, 0.2)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              backdropFilter: 'blur(12px)',
            }}
            whileHover={{ 
              border: '1px solid rgba(251, 191, 36, 0.4)',
              boxShadow: '0 6px 20px rgba(251, 191, 36, 0.2)'
            }}
            transition={{ duration: 0.2 }}
          >
            <Sparkles className="h-5 w-5 text-amber-400" />
            <div>
              <p className="text-sm font-semibold text-white">Hızlı</p>
              <p className="text-xs text-gray-400">Dakikalar içinde</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="flex items-center gap-3 rounded-xl border p-4"
            style={{
              background: 'rgba(0, 0, 0, 0.7)',
              border: '1px solid rgba(75, 85, 99, 0.2)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
              backdropFilter: 'blur(12px)',
            }}
            whileHover={{ 
              border: '1px solid rgba(251, 191, 36, 0.4)',
              boxShadow: '0 6px 20px rgba(251, 191, 36, 0.2)'
            }}
            transition={{ duration: 0.2 }}
          >
            <Clock className="h-5 w-5 text-amber-400" />
            <div>
              <p className="text-sm font-semibold text-white">7/24</p>
              <p className="text-xs text-gray-400">Her zaman</p>
            </div>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/canli-destek" aria-label="Canlı Destek sayfasına git" className="group">
            <motion.button
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-black bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 shadow-[0_0_30px_rgba(251,191,36,0.5)] hover:shadow-[0_0_50px_rgba(251,191,36,0.7)] transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <MessageCircle className="h-5 w-5" />
              <span>Canlı Destek</span>
            </motion.button>
          </Link>

          <Link to="/iletisim" aria-label="İletişim sayfasına git" className="group">
            <motion.button
              className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-white border transition-all"
              style={{
                background: 'rgba(0, 0, 0, 0.5)',
                border: '1px solid rgba(251, 191, 36, 0.4)',
                backdropFilter: 'blur(12px)',
              }}
              whileHover={{ 
                scale: 1.05,
                background: 'rgba(0, 0, 0, 0.7)',
                border: '1px solid rgba(251, 191, 36, 0.6)',
              }}
              whileTap={{ scale: 0.95 }}
            >
              <Clock className="h-5 w-5" />
              <span>İletişim</span>
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
