import { useState } from 'react';
import Frame from './imports/Frame1';
import VerificationModal from './components/VerificationModal';
import Documentation from './components/Documentation';
import ValidationTester from './components/ValidationTester';
import govPageReference from 'figma:asset/16d3bc66dab7f1baa6472e7eb1bdf2192d242583.png';
import { FileText, CheckCircle2, AlertTriangle, Clock, FlaskConical, Globe, Search } from 'lucide-react';

type ScenarioType = 'full-auto' | 'success' | 'failure' | 'expired';

export default function App() {
  const [urlToVerify, setUrlToVerify] = useState('krakow.pinb.gov.pl');
  const [loadedUrl, setLoadedUrl] = useState('https://krakow.pinb.gov.pl');
  const [showModal, setShowModal] = useState(false);
  const [scenarioType, setScenarioType] = useState<'full-auto' | 'success' | 'failure' | 'expired'>('full-auto');
  const [showDocumentation, setShowDocumentation] = useState(false);
  const [showValidationTester, setShowValidationTester] = useState(false);

  const handleVerifyClick = () => {
    setScenarioType('full-auto');
    setShowModal(true);
  };

  const handleScenario = (type: ScenarioType) => {
    setScenarioType(type);
    setShowModal(true);
  };

  const handleLoadUrl = () => {
    if (urlToVerify.trim()) {
      let url = urlToVerify.trim();
      
      // Add https:// if no protocol specified
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'https://' + url;
      }
      
      setLoadedUrl(url);
      setUrlToVerify(url); // Update input to show full URL
    }
  };

  if (showDocumentation) {
    return <Documentation onBack={() => setShowDocumentation(false)} />;
  }

  if (showValidationTester) {
    return <ValidationTester onClose={() => setShowValidationTester(false)} />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Full Screen with Background */}
      <section className="relative h-screen overflow-hidden bg-gray-100">
        {/* Background - Loaded URL or Gov.pl Reference */}
        <div className="absolute inset-0">
          {loadedUrl ? (
            <iframe
              src={loadedUrl}
              className="w-full h-full border-0"
              title="Strona w tle"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
              <img 
                src={govPageReference} 
                alt="Gov.pl strona" 
                className="min-w-full min-h-full object-contain opacity-30"
              />
            </div>
          )}
        </div>

        {/* Sticky Verification Banner at Top with Shadow */}
        <div className="sticky top-0 left-0 right-0 z-50 shadow-[0_4px_20px_rgba(0,0,0,0.15)]">
          <div onClick={handleVerifyClick} className="cursor-pointer">
            <Frame />
          </div>
        </div>

        {/* URL Input - Top Center */}
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-40 w-full max-w-2xl px-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-4 border-2 border-gray-300">
            <h3 className="text-center text-[#101317] mb-3">
              <strong>Wpisz URL strony do weryfikacji</strong>
            </h3>
            
            <div className="flex gap-3">
              <div className="flex-1 flex items-center gap-3 px-4 py-3 border-2 border-gray-300 rounded-xl bg-white focus-within:border-[#0452a8] transition-colors">
                <Globe className="w-5 h-5 text-[#6b7280]" />
                <input
                  type="text"
                  value={urlToVerify}
                  onChange={(e) => setUrlToVerify(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLoadUrl()}
                  placeholder="https://www.gov.pl"
                  className="flex-1 outline-none text-[#101317]"
                />
              </div>
              <button
                onClick={handleLoadUrl}
                className="px-6 py-3 bg-[#0452a8] text-white rounded-xl hover:bg-[#033d8a] transition-colors flex items-center gap-2 shadow-lg"
              >
                <Search className="w-5 h-5" />
                <span><strong>Załaduj</strong></span>
              </button>
            </div>

            <p className="text-center text-[#6b7280] mt-3 text-[13px]">
              Strona załaduje się w tle. Kliknij <strong>pasek weryfikacji powyżej</strong> aby sprawdzić autentyczność.
            </p>
          </div>
        </div>

        {/* Floating Action Buttons Container */}
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-full max-w-4xl px-4">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-6 border-2 border-gray-300">
            <h3 className="text-center text-[#101317] mb-4">
              <strong>Przetestuj scenariusze mWeryfikacja</strong>
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Success Scenario */}
              <button
                onClick={() => handleScenario('success')}
                className="flex flex-col items-center gap-2 p-4 bg-green-50 border-2 border-green-500 rounded-xl hover:bg-green-100 transition-all hover:scale-105"
              >
                <CheckCircle2 className="w-8 h-8 text-green-600" />
                <div className="text-center">
                  <p className="text-green-900"><strong>Sukces</strong></p>
                  <p className="text-green-700 text-[13px]">Zweryfikowana</p>
                </div>
              </button>

              {/* Failure Scenario */}
              <button
                onClick={() => handleScenario('failure')}
                className="flex flex-col items-center gap-2 p-4 bg-red-50 border-2 border-red-500 rounded-xl hover:bg-red-100 transition-all hover:scale-105"
              >
                <AlertTriangle className="w-8 h-8 text-red-600" />
                <div className="text-center">
                  <p className="text-red-900"><strong>Uwaga!</strong></p>
                  <p className="text-red-700 text-[13px]">Niezweryfikowana</p>
                </div>
              </button>

              {/* Expired Scenario */}
              <button
                onClick={() => handleScenario('expired')}
                className="flex flex-col items-center gap-2 p-4 bg-orange-50 border-2 border-orange-500 rounded-xl hover:bg-orange-100 transition-all hover:scale-105"
              >
                <Clock className="w-8 h-8 text-orange-600" />
                <div className="text-center">
                  <p className="text-orange-900"><strong>Wygasł</strong></p>
                  <p className="text-orange-700 text-[13px]">Kod QR</p>
                </div>
              </button>

              {/* Documentation */}
              <button
                onClick={() => setShowDocumentation(true)}
                className="flex flex-col items-center gap-2 p-4 bg-blue-50 border-2 border-[#0452a8] rounded-xl hover:bg-blue-100 transition-all hover:scale-105"
              >
                <FileText className="w-8 h-8 text-[#0452a8]" />
                <div className="text-center">
                  <p className="text-[#0452a8]"><strong>Dokumentacja</strong></p>
                  <p className="text-blue-700 text-[13px]">Projekt</p>
                </div>
              </button>

              {/* Validation Tester */}
              <button
                onClick={() => setShowValidationTester(true)}
                className="flex flex-col items-center gap-2 p-4 bg-purple-50 border-2 border-[#6b46c1] rounded-xl hover:bg-purple-100 transition-all hover:scale-105"
              >
                <FlaskConical className="w-8 h-8 text-[#6b46c1]" />
                <div className="text-center">
                  <p className="text-[#6b46c1]"><strong>Tester</strong></p>
                  <p className="text-purple-700 text-[13px]">Walidacji SSL</p>
                </div>
              </button>
            </div>

            <p className="text-center text-[#6b7280] mt-4 text-[13px]">
              <strong>Kliknij pasek weryfikacji powyżej</strong> aby zweryfikować załadowaną stronę (dane.gov.pl + badssl.com + c1.sh)
            </p>
            <p className="text-center text-[#6b7280] mt-2 text-[12px]">
              Lub wybierz scenariusz demo: <strong>Sukces</strong> (zweryfikowana), <strong>Uwaga</strong> (phishing), <strong>Wygasł</strong> (timeout), <strong>Tester</strong> (sandbox SSL)
            </p>
          </div>
        </div>
      </section>

      {/* Verification Modal */}
      {showModal && (
        <VerificationModal 
          onClose={() => setShowModal(false)} 
          scenarioType={scenarioType}
          urlToVerify={loadedUrl || urlToVerify}
        />
      )}
    </div>
  );
}