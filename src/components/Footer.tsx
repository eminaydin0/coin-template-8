import { Link } from 'react-router-dom';
import { useWebsite } from '../context/WebsiteContext';

const Footer = () => {
  const { websiteData, getInfoValue } = useWebsite();

  return (
    <footer className="relative py-10 mt-20">
      <div className="px-4 sm:px-6 lg:px-8">
        <div 
          className="rounded-xl border p-8"
          style={{
            background: 'rgba(0, 0, 0, 0.7)',
            border: '1px solid rgba(75, 85, 99, 0.2)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* Column 1 - Brand Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-black text-white mb-2">
                  {getInfoValue('TITLE')}
                </h2>
                <div 
                  className="w-12 h-1 rounded-full"
                  style={{
                    background: 'linear-gradient(90deg, rgba(251, 191, 36, 0.8), rgba(251, 191, 36, 0.4))'
                  }}
                ></div>
              </div>
              <div className="space-y-3">
                <p className="text-gray-400 text-sm">
                  Copyright © {new Date().getFullYear()}
                </p>
               
                <a 
                  href="https://maxiipins.com/" 
                  className="text-gray-300 text-sm font-medium hover:text-amber-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Designed by Maxiipins
                </a>
              </div>
            </div>

            {/* Column 2 - Sözleşmeler */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">
                Sözleşmeler
              </h3>
              <ul className="space-y-2">
                {websiteData?.contracts?.map((contract) => (
                  <li key={contract.id}>
                    <Link
                      to={`/sozlesme/${contract.slug}`}
                      className="text-gray-400 hover:text-amber-400 transition-colors text-sm block"
                    >
                      {contract.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3 - Müşteri Hizmetleri */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">
                Müşteri Hizmetleri
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/iletisim"
                    className="text-gray-400 hover:text-amber-400 transition-colors text-sm block"
                  >
                    İletişim & Ulaşım
                  </Link>
                </li>
                <li>
                  <Link
                    to="/banka-hesaplari"
                    className="text-gray-400 hover:text-amber-400 transition-colors text-sm block"
                  >
                    Banka Hesapları
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4 - Satış Hizmetleri */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-white">
                Satış Hizmetleri
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/toplu-satin-alim"
                    className="text-gray-400 hover:text-amber-400 transition-colors text-sm block"
                  >
                    Toplu Satın Alım
                  </Link>
                </li>
                <li>
                  <Link
                    to="/geri-iade"
                    className="text-gray-400 hover:text-amber-400 transition-colors text-sm block"
                  >
                    Geri İade
                  </Link>
                </li>
                <li>
                  <Link
                    to="/canli-destek"
                    className="text-gray-400 hover:text-amber-400 transition-colors text-sm block"
                  >
                    Canlı Destek
                  </Link>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;