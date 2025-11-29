import { Link } from 'react-router-dom';
import { 
  CheckCircle, 
  Gamepad2, 
  ShoppingCart, 
  CreditCard, 
  Download,
  ArrowRight
} from 'lucide-react';
import { useState } from 'react';

const HowItWorksSection = () => {
  const steps = [
    { 
      id: 1, 
      title: "Hesap Oluştur", 
      icon: CheckCircle
    },
    { 
      id: 2, 
      title: "Oyun Seç", 
      icon: Gamepad2
    },
    { 
      id: 3, 
      title: "Sepete Ekle", 
      icon: ShoppingCart
    },
    { 
      id: 4, 
      title: "Ödeme Yap", 
      icon: CreditCard
    },
    { 
      id: 5, 
      title: "Kodunu Al", 
      icon: Download
    }
  ];

  return (
    <section className="relative py-8">
      <div className="px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
            Nasıl Çalışır?
          </h2>
          
          <p className="text-amber-300/90 text-sm max-w-xl mx-auto">
            Sipariş verme sürecimiz çok basit ve güvenli.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
          {steps.map((step) => (
            <StepCard key={step.id} step={step} />
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            to="/nasilyapilir"
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-black bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 shadow-[0_0_30px_rgba(251,191,36,0.5)] hover:shadow-[0_0_50px_rgba(251,191,36,0.7)] transition-all"
          >
            <span>Detaylı Rehber</span>
            <ArrowRight className="h-5 w-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
};

const StepCard = ({ step }: { step: { id: number; title: string; icon: any } }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="group relative">
      {/* Connection Line */}
      {step.id < 5 && (
        <div className="hidden lg:block absolute top-1/2 -right-2 w-4 h-0.5 bg-gradient-to-r from-amber-400/60 to-transparent z-10"></div>
      )}

      <div 
        className="relative rounded-xl border pt-8 pb-6 px-6 text-center transition-all duration-300"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          background: 'rgba(0, 0, 0, 0.7)',
          border: isHovered
            ? '1px solid rgba(251, 191, 36, 0.3)'
            : '1px solid rgba(75, 85, 99, 0.2)',
          boxShadow: isHovered
            ? '0 8px 24px rgba(251, 191, 36, 0.15), 0 4px 12px rgba(0,0,0,0.3)'
            : '0 4px 16px rgba(0,0,0,0.3)',
          backdropFilter: 'blur(12px)',
        }}
      >
        {/* Step Number */}
        <div 
          className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center text-black font-black text-base z-20"
          style={{
            background: 'linear-gradient(135deg, rgba(251, 191, 36, 1), rgba(245, 158, 11, 1))',
            boxShadow: '0 4px 16px rgba(251, 191, 36, 0.5), 0 2px 8px rgba(0,0,0,0.3)',
            border: '2px solid rgba(0, 0, 0, 0.2)',
          }}
        >
          {step.id}
        </div>
        
        {/* Icon */}
        <div 
          className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4"
          style={{
            background: 'rgba(251, 191, 36, 0.15)',
            border: '1px solid rgba(251, 191, 36, 0.25)',
            boxShadow: '0 4px 16px rgba(251, 191, 36, 0.2)',
          }}
        >
          <step.icon className="h-7 w-7 text-amber-300" />
        </div>
        
        {/* Title */}
        <h3 className="text-white font-semibold text-sm group-hover:text-amber-300 transition-colors duration-300">
          {step.title}
        </h3>
      </div>
    </div>
  );
};

export default HowItWorksSection;
