import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, MessageSquare, Send, Zap, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createMessage } from '../services/api';
import toast from 'react-hot-toast';

interface ContactFormProps {
  title: string;
  description: string;
  method: string;
  backLink: string;
  backText: string;
}

const ContactForm = ({ title, description, method, backLink, backText }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    title: '',
    text: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const messageData = {
        ...formData,
        method
      };

      await createMessage(messageData);
      toast.success('Mesajınız başarıyla gönderildi!');
      
      // Form'u temizle
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        title: '',
        text: ''
      });
    } catch (error: any) {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || 'Mesaj gönderilirken bir hata oluştu';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative overflow-hidden">
      <div className="relative z-10 w-full">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="text-center">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
              className="w-16 h-16 flex items-center justify-center mx-auto mb-4 rounded-2xl"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                backdropFilter: 'blur(8px)'
              }}
            >
              <MessageSquare className="h-8 w-8 text-white/80" />
            </motion.div>
            <h1 className="text-2xl font-bold rajdhani-font tracking-wider mb-2 bg-gradient-to-r from-white via-gray-200 to-gray-300 bg-clip-text text-transparent">
              {title.toUpperCase()}
            </h1>
            <p className="text-white/70 text-sm max-w-md mx-auto leading-relaxed">
              {description}
            </p>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative rounded-2xl overflow-hidden border border-white/20 shadow-xl relative z-10 p-6"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-semibold text-white/80 mb-2 rajdhani-font tracking-wider">
                  AD
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-lg bg-white/10 grid place-items-center">
                    <User className="h-3.5 w-3.5 text-white/60" />
                  </div>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/20 text-white px-4 py-4 pl-12 rounded-xl outline-none transition-all backdrop-blur-sm inter-font placeholder-white/50 focus:border-white/40 focus:ring-2 focus:ring-white/20"
                    placeholder="Adınız"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/40 animate-pulse" />
                </div>
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-semibold text-white/80 mb-2 rajdhani-font tracking-wider">
                  SOYAD
                </label>
                <div className="relative">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-lg bg-white/10 grid place-items-center">
                    <User className="h-3.5 w-3.5 text-white/60" />
                  </div>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/10 border border-white/20 text-white px-4 py-4 pl-12 rounded-xl outline-none transition-all backdrop-blur-sm inter-font placeholder-white/50 focus:border-white/40 focus:ring-2 focus:ring-white/20"
                    placeholder="Soyadınız"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/40 animate-pulse" />
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-white/80 mb-2 rajdhani-font tracking-wider">
                E-POSTA ADRESİ
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-lg bg-white/10 grid place-items-center">
                  <Mail className="h-3.5 w-3.5 text-white/60" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-white/20 text-white px-4 py-4 pl-12 rounded-xl outline-none transition-all backdrop-blur-sm inter-font placeholder-white/50 focus:border-white/40 focus:ring-2 focus:ring-white/20"
                  placeholder="ornek@email.com"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/40 animate-pulse" />
              </div>
            </div>

            {/* Subject Field */}
            <div>
              <label htmlFor="title" className="block text-sm font-semibold text-white/80 mb-2 rajdhani-font tracking-wider">
                KONU
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 rounded-lg bg-white/10 grid place-items-center">
                  <MessageSquare className="h-3.5 w-3.5 text-white/60" />
                </div>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/10 border border-white/20 text-white px-4 py-4 pl-12 rounded-xl outline-none transition-all backdrop-blur-sm inter-font placeholder-white/50 focus:border-white/40 focus:ring-2 focus:ring-white/20"
                  placeholder="Mesajınızın konusu"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/40 animate-pulse" />
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="text" className="block text-sm font-semibold text-white/80 mb-2 rajdhani-font tracking-wider">
                MESAJ
              </label>
              <textarea
                id="text"
                name="text"
                value={formData.text}
                onChange={handleChange}
                required
                rows={4}
                className="w-full bg-white/10 border border-white/20 text-white px-4 py-4 rounded-xl outline-none transition-all backdrop-blur-sm inter-font placeholder-white/50 focus:border-white/40 focus:ring-2 focus:ring-white/20 resize-none"
                placeholder="Mesajınızı buraya yazın..."
              />
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full py-4 text-white font-semibold transition-all rounded-xl relative overflow-hidden group"
              style={{
                background: 'linear-gradient(180deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.3)',
                backdropFilter: 'blur(8px)'
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/20 border-t-white" />
                  <span className="rajdhani-font tracking-wider text-sm">GÖNDERİLİYOR...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <Send className="h-5 w-5" />
                  <span className="rajdhani-font tracking-wider text-sm">MESAJ GÖNDER</span>
                  <Zap className="h-4 w-4" />
                </div>
              )}
            </motion.button>
          </form>
        </motion.div>

      </div>
    </div>
  );
};

export default ContactForm;
