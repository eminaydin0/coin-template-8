import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  CreditCard, 
  ShoppingCart, 
  Download, 
  CheckCircle, 
  Gamepad2,
  Home,
  ChevronRight,
  ArrowRight,
  BookOpen
} from 'lucide-react';
import SEOHead from '../components/SEOHead';
import LoadingSpinner from '../components/LoadingSpinner';
import CommonBackground from '../components/CommonBackground';
import CallToActionSection from '../components/CallToActionSection';

const NasilYapilirPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const steps = [
    {
      id: 1,
      title: "Hesap Oluştur",
      description: "İlk olarak sitemize üye olun veya mevcut hesabınızla giriş yapın.",
      icon: CheckCircle,
      details: [
        "Sağ üst köşedeki 'Kayıt Ol' butonuna tıklayın",
        "Gerekli bilgileri doldurun",
        "E-posta doğrulaması yapın",
        "Hesabınız aktif hale gelir"
      ]
    },
    {
      id: 2,
      title: "Oyun Kategorisini Seç",
      description: "Aradığınız oyunu kategoriler arasından bulun.",
      icon: Gamepad2,
      details: [
        "Ana menüden 'Oyunlar' sekmesine tıklayın",
        "İstediğiniz oyun kategorisini seçin",
        "Oyun listesini inceleyin",
        "Fiyat ve özelliklerini karşılaştırın"
      ]
    },
    {
      id: 3,
      title: "Ürünü Sepete Ekle",
      description: "Beğendiğiniz ürünü sepetinize ekleyin.",
      icon: ShoppingCart,
      details: [
        "Ürün detay sayfasında özellikleri inceleyin",
        "'Sepete Ekle' butonuna tıklayın",
        "Miktar seçimi yapın",
        "Sepetinizi kontrol edin"
      ]
    },
    {
      id: 4,
      title: "Ödeme Yap",
      description: "Güvenli ödeme yöntemleriyle siparişinizi tamamlayın.",
      icon: CreditCard,
      details: [
        "Sepet sayfasından 'Ödemeye Geç' butonuna tıklayın",
        "Ödeme bilgilerinizi girin",
        "Banka transferi veya EFT ile ödeme yapın",
        "Ödeme onayını bekleyin"
      ]
    },
    {
      id: 5,
      title: "Kodunuzu Alın",
      description: "Ödeme onaylandıktan sonra oyun kodunuz teslim edilir.",
      icon: Download,
      details: [
        "Ödeme onaylandıktan sonra",
        "E-posta adresinize kod gönderilir",
        "Hesabınızdan siparişlerinizi takip edin",
        "Anında teslimat garantisi"
      ]
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <CommonBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <LoadingSpinner 
            size="xl" 
            text="Nasıl Yapılır Yükleniyor..." 
            variant="gaming" 
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 relative overflow-hidden gaming-scrollbar">
      <SEOHead />
      
      {/* Common Background */}
      <CommonBackground />

      <div className="w-full relative z-10">
        {/* Header - Compact */}
        <section className="relative py-10 mb-6 border-b" style={{ borderColor: 'rgba(251, 191, 36, 0.3)' }}>
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              {/* Left: Breadcrumb */}
              <div className="flex items-center justify-center sm:justify-start gap-2 text-sm">
                <Link 
                  to="/" 
                  className="flex items-center gap-1.5 text-gray-400 hover:text-amber-400 transition-colors"
                >
                  <Home className="h-4 w-4" />
                  <span>Ana Sayfa</span>
                </Link>
                <ChevronRight className="h-4 w-4 text-gray-600" />
                <span className="text-gray-300 font-medium">Nasıl Yapılır</span>
              </div>

              {/* Right: Badge */}
              <div className="flex items-center justify-center sm:justify-end gap-2">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span
                  className="text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{
                    background: 'rgba(251, 191, 36, 0.2)',
                    border: '1px solid rgba(251, 191, 36, 0.4)',
                    color: 'rgba(251, 191, 36, 0.95)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  5 ADIM
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Nasıl Yapılır?
            </h1>
          </div>
        </section>

        {/* Steps Section */}
        <section className="relative py-8">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
              {steps.map((step) => (
                <StepCard key={step.id} step={step} />
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <CallToActionSection />
      </div>
    </div>
  );
};

// Step Card Component
interface Step {
  id: number;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  details: string[];
}

interface StepCardProps {
  step: Step;
}

const StepCard = ({ step }: StepCardProps) => {
  const Icon = step.icon;
  
  return (
    <div
      className="relative rounded-xl border overflow-hidden transition-all duration-200 hover:border-amber-400/40 h-full flex flex-col"
      style={{
        background: 'rgba(0, 0, 0, 0.7)',
        border: '1px solid rgba(75, 85, 99, 0.2)',
        boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="p-5 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center gap-4 mb-4">
          {/* Step Number */}
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-black text-lg flex-shrink-0"
            style={{
              background: 'rgba(251, 191, 36, 0.2)',
              border: '1px solid rgba(251, 191, 36, 0.3)',
            }}
          >
            {step.id}
          </div>
          
          {/* Icon */}
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{
              background: 'rgba(251, 191, 36, 0.15)',
              border: '1px solid rgba(251, 191, 36, 0.25)',
            }}
          >
            <Icon className="h-6 w-6 text-amber-400" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col space-y-4">
          {/* Title & Description */}
          <div>
            <h3 className="text-white font-bold text-lg mb-2">
              {step.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {step.description}
            </p>
          </div>

          {/* Details List */}
          <div className="space-y-2 flex-1">
            {step.details.map((detail, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5 flex-shrink-0"></div>
                <span className="text-gray-400 text-xs leading-relaxed">{detail}</span>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <motion.button
            className="w-full font-bold text-black py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 shadow-[0_0_30px_rgba(251,191,36,0.5)] hover:shadow-[0_0_50px_rgba(251,191,36,0.7)] mt-auto"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-sm">Adım {step.id}</span>
            <ArrowRight className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default NasilYapilirPage;
