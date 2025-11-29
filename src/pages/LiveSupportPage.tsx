import React from 'react';
import { 
  Clock, 
  Zap, 
  Shield,
  Home,
  ChevronRight,
  Headphones
} from 'lucide-react';
import { Link } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import SEOHead from '../components/SEOHead';
import CommonBackground from '../components/CommonBackground';
import CallToActionSection from '../components/CallToActionSection';

const LiveSupportPage = () => {
  return (
    <div className="min-h-screen pt-20 relative overflow-hidden gaming-scrollbar">
      <SEOHead />
      
      {/* Lüks Arka Plan Efektleri */}
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
                <span className="text-gray-300 font-medium">Canlı Destek</span>
              </div>

              {/* Right: Badge */}
              <div className="flex items-center justify-center sm:justify-end gap-2">
                <Headphones className="w-4 h-4 text-amber-400" />
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
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Canlı Destek
            </h1>
          </div>
        </section>

        {/* Live Support Features List */}
        <section className="relative py-8">
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {[
                {
                  icon: Clock,
                  title: "7/24 Destek",
                  description: "Her zaman yanınızdayız. Anında yanıt garantisi ile hizmetinizdeyiz.",
                  features: ["Anında yanıt", "Kesintisiz hizmet"],
                  badge: "7/24"
                },
                {
                  icon: Zap,
                  title: "Hızlı Yanıt",
                  description: "En kısa sürede dönüş yapıyoruz. Sorularınızı hızla çözüyoruz.",
                  features: ["1 saat içinde", "Hızlı çözüm"],
                  badge: "HIZLI"
                },
                {
                  icon: Shield,
                  title: "Güvenli İletişim",
                  description: "Şifrelenmiş iletişim ile güvenliğinizi ön planda tutuyoruz.",
                  features: ["SSL korumalı", "Gizlilik garantisi"],
                  badge: "GÜVENLİ"
                }
              ].map((feature, index) => (
                <SupportFeatureCard key={index} feature={feature} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="relative py-8">
          <div className="px-4 sm:px-6 lg:px-8">
            <div 
              className="relative rounded-xl overflow-hidden border"
              style={{
                background: 'rgba(0, 0, 0, 0.7)',
                border: '1px solid rgba(251, 191, 36, 0.3)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <div className="p-6 sm:p-8">
                <ContactForm
                  title="Canlı Destek"
                  description="7/24 canlı destek hizmetimiz için sorularınızı gönderin. En kısa sürede size dönüş yapacağız."
                  method="Canlı Destek"
                  backLink="/"
                  backText="Ana sayfaya dön"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <CallToActionSection />
      </div>
    </div>
  );
};

// Support Feature Card Component
interface SupportFeature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  features: string[];
  badge: string;
}

interface SupportFeatureCardProps {
  feature: SupportFeature;
}

const SupportFeatureCard = ({ feature }: SupportFeatureCardProps) => {
  const Icon = feature.icon;
  
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
        <div className="flex items-start justify-between gap-4 mb-4">
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
          
          {/* Badge */}
          <span
            className="text-xs font-bold px-3 py-1.5 rounded-full h-fit"
            style={{
              background: 'rgba(251, 191, 36, 0.2)',
              border: '1px solid rgba(251, 191, 36, 0.4)',
              color: 'rgba(251, 191, 36, 0.95)',
              backdropFilter: 'blur(8px)',
            }}
          >
            {feature.badge}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col space-y-3">
          {/* Title */}
          <h3 className="text-white font-bold text-lg">
            {feature.title}
          </h3>
          
          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed">
            {feature.description}
          </p>

          {/* Features List */}
          <div className="space-y-2 mt-2">
            {feature.features.map((item, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5 flex-shrink-0"></div>
                <span className="text-gray-400 text-xs leading-relaxed">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveSupportPage;
