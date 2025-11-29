import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  CreditCard,
  Copy,
  CheckCircle,
  Home,
  ChevronRight,
  CreditCard as CreditCardIcon
} from 'lucide-react';
import { useWebsite } from '../context/WebsiteContext';
import SEOHead from '../components/SEOHead';
import LoadingSpinner from '../components/LoadingSpinner';
import CommonBackground from '../components/CommonBackground';
import CallToActionSection from '../components/CallToActionSection';

const BankAccountsPage = () => {
  const { websiteData, refreshData } = useWebsite();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  // Component mount olduğunda verileri yükle
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!websiteData || !websiteData.bankAccounts) {
          refreshData();
        }
      } catch (error) {
        console.error('Bank accounts fetch error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [websiteData, refreshData]);

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const bankAccounts = websiteData?.bankAccounts || [];

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
        <LoadingSpinner 
          size="xl" 
          text="Banka Hesapları Yükleniyor..." 
          variant="gaming" 
        />
      </div>
    );
  }

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
                <span className="text-gray-300 font-medium">Banka Hesapları</span>
              </div>

              {/* Right: Badge */}
              <div className="flex items-center justify-center sm:justify-end gap-2">
                <CreditCardIcon className="w-4 h-4 text-amber-400" />
                <span
                  className="text-xs font-bold px-3 py-1.5 rounded-full"
                  style={{
                    background: 'rgba(251, 191, 36, 0.2)',
                    border: '1px solid rgba(251, 191, 36, 0.4)',
                    color: 'rgba(251, 191, 36, 0.95)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  {bankAccounts.length} HESAP
                </span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Banka Hesapları
            </h1>
          </div>
        </section>

        {/* Bank Accounts List */}
        <section className="relative py-8">
          <div className="px-4 sm:px-6 lg:px-8">
            {bankAccounts.length === 0 ? (
              <div 
                className="text-center py-20 rounded-xl border"
                style={{
                  background: 'rgba(0, 0, 0, 0.7)',
                  border: '1px solid rgba(251, 191, 36, 0.3)',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
                  backdropFilter: 'blur(12px)',
                }}
              >
                <CreditCardIcon className="h-16 w-16 text-amber-400/60 mx-auto mb-6" />
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  Banka hesabı bulunamadı
                </h3>
                <p className="text-gray-400 text-sm px-4">Yakında yeni banka hesapları eklenecektir.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                {bankAccounts.map((account, index) => (
                  <BankAccountCard
                    key={index}
                    account={account}
                    index={index}
                    copiedIndex={copiedIndex}
                    onCopy={copyToClipboard}
                  />
                ))}
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

// Bank Account Card Component
interface BankAccount {
  name: string;
  iban: string;
}

interface BankAccountCardProps {
  account: BankAccount;
  index: number;
  copiedIndex: number | null;
  onCopy: (text: string, index: number) => void;
}

const BankAccountCard = ({ account, index, copiedIndex, onCopy }: BankAccountCardProps) => {
  const isCopied = copiedIndex === index;
  
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
        <div className="flex items-start gap-3 mb-4">
          {/* Icon */}
          <div 
            className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{
              background: 'rgba(251, 191, 36, 0.15)',
              border: '1px solid rgba(251, 191, 36, 0.25)',
            }}
          >
            <CreditCard className="h-6 w-6 text-amber-400" />
          </div>
          
          {/* Title */}
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-lg line-clamp-2">
              {account.name}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col space-y-4">
          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed">
            Güvenli banka hesabı ile hızlı ödeme yapabilirsiniz.
          </p>

          {/* IBAN Display */}
          <div 
            className="px-3 py-2.5 rounded-lg border"
            style={{
              background: 'rgba(251, 191, 36, 0.1)',
              border: '1px solid rgba(251, 191, 36, 0.2)',
            }}
          >
            <p className="text-amber-400/90 text-xs font-mono text-center break-all">
              {account.iban}
            </p>
          </div>

          {/* Action Button */}
          <motion.button
            onClick={() => onCopy(account.iban, index)}
            className={`w-full font-bold py-3 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 mt-auto ${
              isCopied 
                ? 'bg-green-500/20 border border-green-500/40 text-green-400' 
                : 'bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-black shadow-[0_0_30px_rgba(251,191,36,0.5)] hover:shadow-[0_0_50px_rgba(251,191,36,0.7)]'
            }`}
            whileHover={{ scale: isCopied ? 1 : 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isCopied ? (
              <>
                <CheckCircle className="h-4 w-4" />
                <span className="text-sm">Kopyalandı!</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span className="text-sm">Kopyala</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default BankAccountsPage;
