import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Home,
  ChevronRight,
  Headphones
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useWebsite } from '../context/WebsiteContext';
import SEOHead from '../components/SEOHead';
import LoadingSpinner from '../components/LoadingSpinner';
import CommonBackground from '../components/CommonBackground';
import CallToActionSection from '../components/CallToActionSection';

const ContactPage = () => {
  const [loading, setLoading] = useState(true);
  const { getInfoValue } = useWebsite();

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  const contactPhone = getInfoValue('CONTACT_PHONE');
  const contactEmail = getInfoValue('CONTACT_EMAIL');
  const contactAddress = getInfoValue('CONTACT_ADDRESS');

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <CommonBackground />
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <LoadingSpinner 
            size="xl" 
            text="İletişim Yükleniyor..." 
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
                <span className="text-gray-300 font-medium">İletişim</span>
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
              İletişim & Destek
            </h1>
          </div>
        </section>

        {/* Contact Information Section */}
        <section className="relative py-8">
          <div className="px-4 sm:px-6 lg:px-8">
          {(!contactPhone && !contactEmail && !contactAddress) ? (
            <div 
              className="text-center py-20 rounded-xl border"
              style={{
                background: 'rgba(0, 0, 0, 0.7)',
                border: '1px solid rgba(75, 85, 99, 0.2)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                backdropFilter: 'blur(12px)',
              }}
            >
              <Headphones className="h-16 w-16 text-amber-300/50 mx-auto mb-6" />
              <h3 className="text-2xl font-bold text-white mb-3">
                İletişim bilgileri bulunamadı
              </h3>
              <p className="text-gray-400 text-base">Yakında iletişim bilgileri eklenecektir.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {contactPhone && (
                <ContactCard
                  icon={Phone}
                  title="Telefon Desteği"
                  description="7/24 müşteri hizmetleri ile yanınızdayız"
                  contact={contactPhone}
                  contactLabel="Arama Yapın"
                  badgeText="TELEFON"
                  features={[
                    'Anında yanıt garantisi',
                    'Profesyonel destek ekibi',
                    'Türkçe müşteri hizmetleri'
                  ]}
                  buttonText="Hemen Ara"
                  buttonIcon={Phone}
                />
              )}

              {contactEmail && (
                <ContactCard
                  icon={Mail}
                  title="E-posta Desteği"
                  description="24 saat içinde detaylı yanıt alın"
                  contact={contactEmail}
                  contactLabel="E-posta Gönderin"
                  badgeText="E-POSTA"
                  features={[
                    'Detaylı yanıt garantisi',
                    'Teknik destek ekibi',
                    'Dosya ekleme imkanı'
                  ]}
                  buttonText="E-posta Gönder"
                  buttonIcon={Mail}
                />
              )}

              {contactAddress && (
                <ContactCard
                  icon={MapPin}
                  title="Ofis Adresi"
                  description="Merkez ofisimiz ve operasyon merkezi"
                  contact={contactAddress}
                  contactLabel="Ziyaret Edin"
                  badgeText="OFİS"
                  features={[
                    'Profesyonel ekip merkezi',
                    'Güvenli ve modern ofis',
                    'Kolay ulaşım imkanı'
                  ]}
                  buttonText="Konumu Gör"
                  buttonIcon={MapPin}
                />
              )}
            </div>
          )}
          </div>
        </section>

        {/* Call to Action Section */}
        <CallToActionSection />
      </div>
    </div>
  );
};

// Contact Card Component
interface ContactCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  contact: string;
  contactLabel: string;
  badgeText: string;
  features: string[];
  buttonText: string;
  buttonIcon: LucideIcon;
}

const ContactCard = ({
  icon: Icon,
  title,
  description,
  contact,
  contactLabel,
  badgeText,
  features,
  buttonText,
  buttonIcon: ButtonIcon
}: ContactCardProps) => {
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
        <div className="flex items-center justify-between gap-3 mb-4">
          {/* Icon */}
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{
              background: 'rgba(251, 191, 36, 0.2)',
              border: '1px solid rgba(251, 191, 36, 0.3)',
            }}
          >
            <Icon className="h-6 w-6 text-amber-400" />
          </div>
          
          {/* Badge */}
          <div 
            className="px-3 py-1.5 rounded-lg text-xs font-bold flex-shrink-0"
            style={{
              background: 'rgba(251, 191, 36, 0.2)',
              border: '1px solid rgba(251, 191, 36, 0.4)',
              color: 'rgba(251, 191, 36, 0.95)',
            }}
          >
            {badgeText}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col space-y-4">
          {/* Title & Description */}
          <div>
            <h3 className="text-white font-bold text-lg mb-2">
              {title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              {description}
            </p>
          </div>

          {/* Contact Info */}
          <div 
            className="rounded-lg p-4 border"
            style={{
              background: 'rgba(251, 191, 36, 0.1)',
              border: '1px solid rgba(251, 191, 36, 0.2)',
            }}
          >
            <p className="text-gray-400 text-xs font-semibold mb-2 uppercase tracking-wide">{contactLabel}</p>
            <p className="text-white font-bold text-sm break-all leading-relaxed">{contact}</p>
          </div>

          {/* Features */}
          <div className="space-y-2 flex-1">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-1.5 flex-shrink-0"></div>
                <span className="text-gray-400 text-xs leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>

          {/* Action Button */}
          <motion.button
            className="w-full font-bold text-black py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 shadow-[0_0_30px_rgba(251,191,36,0.5)] hover:shadow-[0_0_50px_rgba(251,191,36,0.7)] mt-auto"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ButtonIcon className="h-4 w-4" />
            <span className="text-sm">{buttonText}</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
