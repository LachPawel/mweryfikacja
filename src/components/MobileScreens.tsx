import { CheckCircle2, XCircle, Camera } from 'lucide-react';

export default function MobileScreens() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-900 to-blue-700">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-white mb-4">
          Perspektywa mobilna
        </h2>
        <p className="text-center text-white/80 mb-16 max-w-2xl mx-auto">
          Tak wygląda proces weryfikacji w aplikacji mObywatel na smartfonie
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Screen 1: Scanner */}
          <div className="text-center">
            <div className="bg-white rounded-3xl p-4 shadow-2xl mx-auto max-w-[280px] mb-6">
              <div className="bg-gray-900 rounded-2xl overflow-hidden" style={{ aspectRatio: '9/19.5' }}>
                {/* Status Bar */}
                <div className="bg-white p-3 flex items-center justify-between">
                  <span className="text-[#101317]">9:41</span>
                  <div className="flex gap-1">
                    <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                    <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                    <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
                
                {/* App Header */}
                <div className="bg-white p-4 flex items-center gap-2">
                  <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center">
                    <span className="text-white">🦅</span>
                  </div>
                  <span className="text-[#101317]">mObywatel</span>
                </div>

                {/* Scanner Area */}
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 h-[400px] flex flex-col items-center justify-center">
                  <div className="w-48 h-48 border-4 border-white/30 rounded-2xl relative mb-4">
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-400 rounded-tl-lg"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-blue-400 rounded-tr-lg"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-blue-400 rounded-bl-lg"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-400 rounded-br-lg"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Camera className="w-12 h-12 text-white/50" />
                    </div>
                  </div>
                  <p className="text-white text-center px-4">
                    Zeskanuj kod QR ze strony gov.pl
                  </p>
                </div>
              </div>
            </div>
            <h3 className="text-white mb-2">1. Skaner QR</h3>
            <p className="text-white/70">
              Użytkownik otwiera funkcję "Weryfikacja strony" i skanuje kod
            </p>
          </div>

          {/* Screen 2: Success */}
          <div className="text-center">
            <div className="bg-white rounded-3xl p-4 shadow-2xl mx-auto max-w-[280px] mb-6">
              <div className="bg-gray-900 rounded-2xl overflow-hidden" style={{ aspectRatio: '9/19.5' }}>
                {/* Status Bar */}
                <div className="bg-white p-3 flex items-center justify-between">
                  <span className="text-[#101317]">9:41</span>
                  <div className="flex gap-1">
                    <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                    <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                    <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
                
                {/* App Header */}
                <div className="bg-white p-4 flex items-center gap-2">
                  <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center">
                    <span className="text-white">🦅</span>
                  </div>
                  <span className="text-[#101317]">mObywatel</span>
                </div>

                {/* Success Content */}
                <div className="bg-white p-6 h-[400px] flex flex-col items-center justify-center">
                  <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-16 h-16 text-green-600" />
                  </div>
                  <h3 className="text-[#101317] mb-3 text-center">
                    <strong>Strona zweryfikowana</strong>
                  </h3>
                  <p className="text-[#4a5568] text-center mb-6 px-4">
                    Ta strona znajduje się w oficjalnym rejestrze domen gov.pl
                  </p>
                  
                  <div className="w-full bg-green-50 border border-green-200 rounded-lg p-4 space-y-2">
                    <div className="flex items-start gap-2 text-left">
                      <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <p className="text-[#101317]">login.gov.pl</p>
                    </div>
                    <div className="flex items-start gap-2 text-left">
                      <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <p className="text-[#101317]">Certyfikat SSL ważny</p>
                    </div>
                    <div className="flex items-start gap-2 text-left">
                      <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                      <p className="text-[#101317]">Kod jednorazowy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <h3 className="text-white mb-2">2. Sukces</h3>
            <p className="text-white/70">
              Strona potwierdzona - bezpieczne korzystanie
            </p>
          </div>

          {/* Screen 3: Warning */}
          <div className="text-center">
            <div className="bg-white rounded-3xl p-4 shadow-2xl mx-auto max-w-[280px] mb-6">
              <div className="bg-gray-900 rounded-2xl overflow-hidden" style={{ aspectRatio: '9/19.5' }}>
                {/* Status Bar */}
                <div className="bg-white p-3 flex items-center justify-between">
                  <span className="text-[#101317]">9:41</span>
                  <div className="flex gap-1">
                    <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                    <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                    <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                  </div>
                </div>
                
                {/* App Header */}
                <div className="bg-white p-4 flex items-center gap-2">
                  <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center">
                    <span className="text-white">🦅</span>
                  </div>
                  <span className="text-[#101317]">mObywatel</span>
                </div>

                {/* Warning Content */}
                <div className="bg-white p-6 h-[400px] flex flex-col items-center justify-center">
                  <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mb-4">
                    <XCircle className="w-16 h-16 text-red-600" />
                  </div>
                  <h3 className="text-[#101317] mb-3 text-center">
                    <strong>Ostrzeżenie!</strong>
                  </h3>
                  <p className="text-[#4a5568] text-center mb-6 px-4">
                    Ta strona może podszywać się pod serwis administracji publicznej
                  </p>
                  
                  <div className="w-full bg-red-50 border border-red-200 rounded-lg p-4 space-y-2 mb-4">
                    <div className="flex items-start gap-2 text-left">
                      <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <p className="text-[#101317]">Domena niezarejestrowana</p>
                    </div>
                    <div className="flex items-start gap-2 text-left">
                      <XCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <p className="text-[#101317]">Certyfikat podejrzany</p>
                    </div>
                  </div>

                  <button className="bg-red-600 text-white px-6 py-2 rounded-full w-full">
                    Zgłoś oszustwo
                  </button>
                </div>
              </div>
            </div>
            <h3 className="text-white mb-2">3. Ostrzeżenie</h3>
            <p className="text-white/70">
              Strona podejrzana - możliwość zgłoszenia
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
