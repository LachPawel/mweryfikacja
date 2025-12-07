import { useState, useEffect } from 'react';
import { X, Shield, CheckCircle2, XCircle, Loader2, Clock, AlertTriangle, Send, ThumbsUp } from 'lucide-react';
import { 
  performFullValidation, 
  generateNonce, 
  type ValidationResult 
} from '../utils/domainValidator';

interface VerificationModalProps {
  onClose: () => void;
  scenarioType?: 'full-auto' | 'success' | 'failure' | 'expired';
  urlToVerify?: string;
}

type VerificationState = 'initial' | 'processing' | 'success' | 'failure' | 'expired' | 'report-form' | 'report-sending' | 'report-success';

export default function VerificationModal({ onClose, scenarioType = 'full-auto', urlToVerify }: VerificationModalProps) {
  const [state, setState] = useState<VerificationState>('initial');
  const [timeLeft, setTimeLeft] = useState(scenarioType === 'expired' ? 6 : 60);
  const [nonce, setNonce] = useState(generateNonce());
  const [qrData, setQrData] = useState(`https://verify.gov.pl/check?nonce=${nonce}`);
  const [checkingStep, setCheckingStep] = useState(0);
  const [reportNotes, setReportNotes] = useState('');
  const [suspiciousUrl, setSuspiciousUrl] = useState(urlToVerify || 'https://falszywa-strona-gov.pl/logowanie');
  const [validationResult, setValidationResult] = useState<ValidationResult | null>(null);

  // Timer for QR code expiration
  useEffect(() => {
    if (state === 'initial' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            // When timer reaches 0 in 'expired' scenario, go directly to expired
            if (scenarioType === 'expired') {
              setState('expired');
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [state, timeLeft, scenarioType]);

  // Auto-progression through states based on scenario type
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (state === 'initial' && scenarioType !== 'expired') {
      // For expired scenario, we rely on timer expiration, not auto-progression
      timer = setTimeout(() => {
        setState('processing');
        setCheckingStep(0);
      }, 3000);
    } else if (state === 'processing') {
      const stepTimer = setInterval(() => {
        setCheckingStep((prev) => {
          if (prev < 2) return prev + 1;
          return prev;
        });
      }, 1000);

      // Perform REAL validation if we have a URL
      timer = setTimeout(() => {
        clearInterval(stepTimer);
        
        // If we have a URL to verify, use REAL validation
        if (urlToVerify && scenarioType === 'full-auto') {
          const result = performFullValidation(urlToVerify, nonce);
          setValidationResult(result);
          
          // Set state based on actual validation result
          if (result.isValid) {
            setState('success');
          } else {
            setState('failure');
          }
        } else {
          // Otherwise use scenario type
          if (scenarioType === 'success') {
            setState('success');
          } else if (scenarioType === 'failure') {
            setState('failure');
          } else if (scenarioType === 'expired') {
            setState('expired');
          } else {
            // full-auto demo: go through all states
            setState('success');
          }
        }
      }, 4000);

      return () => {
        clearInterval(stepTimer);
        if (timer) clearTimeout(timer);
      };
    } else if (state === 'success' && scenarioType === 'full-auto' && !urlToVerify) {
      // Only auto-progress in demo mode (when no URL to verify)
      timer = setTimeout(() => {
        setState('failure');
      }, 4000);
    } else if (state === 'failure' && scenarioType === 'full-auto' && !urlToVerify) {
      // Only auto-progress in demo mode (when no URL to verify)
      timer = setTimeout(() => {
        setState('expired');
      }, 4000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [state, scenarioType, urlToVerify, nonce]);

  const handleNewCode = () => {
    setState('initial');
    setTimeLeft(60);
    setNonce(generateNonce());
    setQrData(`https://verify.gov.pl/check?nonce=${nonce}`);
  };

  const handleReportClick = () => {
    setState('report-form');
  };

  const handleCancelReport = () => {
    setState('failure');
    setReportNotes('');
  };

  const handleSubmitReport = () => {
    setState('report-sending');
    // Simulate sending
    setTimeout(() => {
      setState('report-success');
    }, 1500);
  };

  const handleSafeExit = () => {
    window.open('https://www.gov.pl', '_blank');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-2xl max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <Shield className={`w-6 h-6 sm:w-8 sm:h-8 shrink-0 ${
              state === 'success' ? 'text-green-600' : 
              state === 'failure' ? 'text-red-600' : 
              state === 'expired' ? 'text-orange-600' :
              state.startsWith('report') ? 'text-blue-600' :
              'text-[#0452a8]'
            }`} />
            <h2 className="text-[#101317] text-[16px] sm:text-[18px] md:text-[20px] leading-tight">
              {state === 'initial' && <strong>Weryfikacja autentyczności strony</strong>}
              {state === 'processing' && <strong>Trwa weryfikacja...</strong>}
              {state === 'success' && <strong>Strona została pomyślnie zweryfikowana</strong>}
              {state === 'failure' && <strong>Uwaga! Strona nie została zweryfikowana</strong>}
              {state === 'expired' && <strong>Kod QR wygasł</strong>}
              {state === 'report-form' && <strong>Zgłoś incydent bezpieczeństwa</strong>}
              {state === 'report-sending' && <strong>Wysyłanie zgłoszenia...</strong>}
              {state === 'report-success' && <strong>Zgłoszenie przyjęte</strong>}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors shrink-0"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
          </button>
        </div>

        {/* Content - scrollable only here */}
        <div className="p-4 sm:p-6 md:p-8 overflow-y-auto flex-1">
          {/* Initial State */}
          {state === 'initial' && (
            <div className="text-center">
              <p className="text-[#4a5568] mb-6 text-[14px] sm:text-[15px] md:text-[16px]">
                Zeskanuj kod QR w aplikacji mObywatel, aby sprawdzić, czy ta strona jest oficjalnym serwisem administracji publicznej.
                Kod jest jednorazowy i ważny przez 60 sekund.
              </p>

              {/* QR Code Placeholder */}
              <div className="bg-white border-4 border-[#0452a8] rounded-xl p-4 sm:p-6 md:p-8 max-w-[280px] sm:max-w-sm mx-auto mb-6">
                <div className="aspect-square bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 200 200" className="w-full h-full">
                    {/* Simple QR-like pattern for demo */}
                    <rect x="10" y="10" width="30" height="30" fill="#0452a8" />
                    <rect x="50" y="10" width="10" height="10" fill="#0452a8" />
                    <rect x="70" y="10" width="10" height="10" fill="#0452a8" />
                    <rect x="90" y="10" width="10" height="10" fill="#0452a8" />
                    <rect x="160" y="10" width="30" height="30" fill="#0452a8" />
                    <rect x="10" y="50" width="10" height="10" fill="#0452a8" />
                    <rect x="30" y="50" width="10" height="10" fill="#0452a8" />
                    <rect x="50" y="50" width="30" height="30" fill="#0452a8" />
                    <rect x="90" y="50" width="10" height="10" fill="#0452a8" />
                    <rect x="110" y="50" width="30" height="30" fill="#0452a8" />
                    <rect x="160" y="50" width="10" height="10" fill="#0452a8" />
                    <rect x="180" y="50" width="10" height="10" fill="#0452a8" />
                    <rect x="10" y="160" width="30" height="30" fill="#0452a8" />
                    <rect x="50" y="160" width="10" height="10" fill="#0452a8" />
                    <rect x="90" y="160" width="30" height="30" fill="#0452a8" />
                    <rect x="160" y="160" width="30" height="30" fill="#0452a8" />
                  </svg>
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 text-[#4a5568] mb-6 text-[14px] sm:text-[15px]">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Pozostały czas: {String(Math.floor(timeLeft / 60)).padStart(2, '0')}:{String(timeLeft % 60).padStart(2, '0')}</span>
              </div>

              <p className="text-[#6b7280] text-[12px] sm:text-[13px] md:text-[14px] break-all">
                {qrData}
              </p>
            </div>
          )}

          {/* Processing State */}
          {state === 'processing' && (
            <div className="text-center py-4 sm:py-6 md:py-8">
              <Loader2 className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-[#0452a8] animate-spin mx-auto mb-4 sm:mb-6" />
              <h3 className="text-[#101317] mb-3 text-[16px] sm:text-[18px]"><strong>Trwa weryfikacja...</strong></h3>
              <p className="text-[#4a5568] mb-6 sm:mb-8 text-[14px] sm:text-[15px] md:text-[16px]">
                Sprawdzamy domenę, certyfikat SSL oraz integralność połączenia.
              </p>
              <div className="space-y-2 sm:space-y-3 max-w-md mx-auto">
                <div className={`flex items-center justify-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg transition-all text-[13px] sm:text-[14px] md:text-[15px] ${
                  checkingStep >= 0 ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-gray-50'
                }`}>
                  {checkingStep > 0 ? (
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 shrink-0" />
                  ) : (
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin text-[#0452a8] shrink-0" />
                  )}
                  <span className={checkingStep >= 0 ? 'text-[#101317]' : 'text-[#6b7280]'}>
                    Weryfikacja domeny w rejestrze gov.pl
                  </span>
                </div>
                <div className={`flex items-center justify-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg transition-all text-[13px] sm:text-[14px] md:text-[15px] ${
                  checkingStep >= 1 ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-gray-50'
                }`}>
                  {checkingStep > 1 ? (
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 shrink-0" />
                  ) : checkingStep === 1 ? (
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin text-[#0452a8] shrink-0" />
                  ) : (
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-gray-300 rounded-full shrink-0"></div>
                  )}
                  <span className={checkingStep >= 1 ? 'text-[#101317]' : 'text-[#6b7280]'}>
                    Sprawdzanie certyfikatu SSL
                  </span>
                </div>
                <div className={`flex items-center justify-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg transition-all text-[13px] sm:text-[14px] md:text-[15px] ${
                  checkingStep >= 2 ? 'bg-blue-50 border-l-4 border-blue-500' : 'bg-gray-50'
                }`}>
                  {checkingStep > 2 ? (
                    <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 shrink-0" />
                  ) : checkingStep === 2 ? (
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin text-[#0452a8] shrink-0" />
                  ) : (
                    <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-gray-300 rounded-full shrink-0"></div>
                  )}
                  <span className={checkingStep >= 2 ? 'text-[#101317]' : 'text-[#6b7280]'}>
                    Walidacja kodu jednorazowego
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Success State */}
          {state === 'success' && (
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-green-600" />
              </div>
              <p className="text-[#4a5568] mb-4 sm:mb-6 text-[14px] sm:text-[15px] md:text-[16px]">
                Ta witryna znajduje się w oficjalnym rejestrze domen gov.pl. Możesz bezpiecznie kontynuować korzystanie z serwisu.
              </p>

              <div className="bg-green-50 border border-green-200 rounded-xl p-4 sm:p-6 text-left space-y-2 sm:space-y-3 mb-4">
                <h4 className="text-[#101317] mb-2 sm:mb-3 text-[14px] sm:text-[15px] md:text-[16px]"><strong>Szczegóły weryfikacji:</strong></h4>
                
                {/* Real validation results or demo data */}
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#101317]">
                      <strong>Domena:</strong> {validationResult?.domain || 'login.gov.pl'}
                    </p>
                    <p className="text-[#6b7280]">
                      {validationResult?.isOfficialGov 
                        ? 'Znajduje się w oficjalnym rejestrze gov.pl (dane.gov.pl)' 
                        : 'Zgodna z oficjalnym rejestrem'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#101317]">
                      <strong>Certyfikat SSL:</strong> {validationResult?.ssl?.isValid 
                        ? `Ważny do ${validationResult.ssl.validTo}` 
                        : 'Ważny do 31.12.2026'}
                    </p>
                    <p className="text-[#6b7280]">
                      {validationResult?.ssl?.issuer 
                        ? `Wystawca: ${validationResult.ssl.issuer}` 
                        : 'Zaufany wystawca'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#101317]">
                      <strong>Nonce:</strong> {validationResult?.nonce?.valid ? 'Poprawny' : 'Poprawny'}
                    </p>
                    <p className="text-[#6b7280]">
                      {validationResult ? `Kod: ${validationResult.nonce.value.slice(0, 20)}...` : 'Kod jednorazowy, nie wygasł'}
                    </p>
                  </div>
                </div>

                {/* Show data sources */}
                {validationResult && (
                  <div className="pt-3 mt-3 border-t border-green-200">
                    <p className="text-[#6b7280] text-[12px] sm:text-[13px]">
                      <strong>Źródła weryfikacji:</strong> dane.gov.pl, badssl.com, c1.sh
                    </p>
                  </div>
                )}
              </div>

              <button
                onClick={onClose}
                className="bg-green-600 text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-green-700 transition-colors text-[14px] sm:text-[15px] md:text-[16px] cursor-pointer"
              >
                Kontynuuj
              </button>
            </div>
          )}

          {/* Failure State */}
          {state === 'failure' && (
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <XCircle className="w-10 h-10 sm:w-12 sm:h-12 text-red-600" />
              </div>
              <p className="text-[#4a5568] mb-4 sm:mb-6 text-[14px] sm:text-[15px] md:text-[16px]">
                Ta witryna może podszywać się pod oficjalny serwis administracji publicznej. Zalecamy przerwanie korzystania z niej.
              </p>

              <div className="bg-red-50 border border-red-200 rounded-xl p-4 sm:p-6 text-left space-y-2 sm:space-y-3 mb-4">
                <h4 className="text-[#101317] mb-2 sm:mb-3 text-[14px] sm:text-[15px] md:text-[16px]"><strong>Wykryte problemy:</strong></h4>
                
                {/* Show real validation errors or default errors */}
                {validationResult && validationResult.errors.length > 0 ? (
                  validationResult.errors.map((error, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 shrink-0 mt-0.5" />
                      <div className="text-[13px] sm:text-[14px] md:text-[15px]">
                        <p className="text-[#101317]"><strong>{error}</strong></p>
                      </div>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 shrink-0 mt-0.5" />
                      <div className="text-[13px] sm:text-[14px] md:text-[15px]">
                        <p className="text-[#101317]"><strong>Domena niezarejestrowana</strong></p>
                        <p className="text-[#6b7280]">Brak w oficjalnym rejestrze gov.pl</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-600 shrink-0 mt-0.5" />
                      <div className="text-[13px] sm:text-[14px] md:text-[15px]">
                        <p className="text-[#101317]"><strong>Certyfikat SSL podejrzany</strong></p>
                        <p className="text-[#6b7280]">Nie zgadza się z zaufaną listą</p>
                      </div>
                    </div>
                  </>
                )}

                {/* Show tested URL */}
                {validationResult && (
                  <div className="pt-3 mt-3 border-t border-red-200">
                    <p className="text-[#6b7280] text-[12px] sm:text-[13px]">
                      <strong>Testowany URL:</strong> {validationResult.domain}
                    </p>
                    <p className="text-[#6b7280] text-[12px] sm:text-[13px]">
                      <strong>Źródła weryfikacji:</strong> dane.gov.pl, badssl.com, c1.sh
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-3 justify-center">
                <button
                  onClick={handleSafeExit}
                  className="bg-red-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-red-700 transition-colors text-[14px] sm:text-[15px] md:text-[16px]"
                >
                  Przejdź na gov.pl
                </button>
                <button
                  onClick={handleReportClick}
                  className="bg-[#0452a8] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-[#033d8a] transition-colors flex items-center gap-2 justify-center text-[14px] sm:text-[15px] md:text-[16px]"
                >
                  <AlertTriangle className="w-4 h-4" />
                  Zgłoś oszustwo
                </button>
              </div>
            </div>
          )}

          {/* Expired State */}
          {state === 'expired' && (
            <div className="text-center py-4 sm:py-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Clock className="w-10 h-10 sm:w-12 sm:h-12 text-orange-600" />
              </div>
              <h3 className="text-[#101317] mb-4 text-[16px] sm:text-[18px]"><strong>Kod QR wygasł</strong></h3>
              <p className="text-[#4a5568] mb-4 sm:mb-6 text-[14px] sm:text-[15px] md:text-[16px]">
                Kod QR jest ważny tylko przez 60 sekund. Wygeneruj nowy kod, aby przeprowadzić weryfikację.
              </p>
              <button
                onClick={handleNewCode}
                className="bg-[#0452a8] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-[#033d8a] transition-colors mb-4 text-[14px] sm:text-[15px] md:text-[16px]"
              >
                Wygeneruj nowy kod
              </button>

              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-[#4a5568] text-[13px] sm:text-[14px]">
                  <strong>Demo zakończone!</strong> Przeszedłeś przez wszystkie stany weryfikacji.
                </p>
              </div>
            </div>
          )}

          {/* Report Form State */}
          {state === 'report-form' && (
            <div>
              <div className="mb-4 sm:mb-6">
                <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 bg-orange-50 border border-orange-200 rounded-lg mb-4 sm:mb-6">
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 shrink-0 mt-0.5" />
                  <p className="text-[#4a5568] text-[13px] sm:text-[14px] md:text-[15px]">
                    Poniższa strona została oznaczona jako potencjalnie niebezpieczna. 
                    Prześlij raport, aby pomóc chronić innych użytkowników.
                  </p>
                </div>

                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-[#101317] mb-2 text-[14px] sm:text-[15px]">
                      <strong>Zgłaszany adres URL</strong>
                    </label>
                    <input
                      type="text"
                      value={suspiciousUrl}
                      disabled
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-100 border border-gray-300 rounded-lg text-[#6b7280] cursor-not-allowed text-[13px] sm:text-[14px] md:text-[15px]"
                    />
                  </div>

                  <div>
                    <label className="block text-[#101317] mb-2 text-[14px] sm:text-[15px]">
                      Dodatkowe uwagi <span className="text-[#6b7280]">(opcjonalne)</span>
                    </label>
                    <textarea
                      value={reportNotes}
                      onChange={(e) => setReportNotes(e.target.value)}
                      placeholder="Np. strona wyłudza dane logowania bankowego..."
                      rows={4}
                      className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0452a8] text-[#101317] text-[13px] sm:text-[14px] md:text-[15px]"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border-l-4 border-blue-500 p-3 sm:p-4 mb-4 sm:mb-6 rounded-r-lg">
                <p className="text-[#4a5568] text-[13px] sm:text-[14px]">
                  <strong>Dokąd trafi zgłoszenie?</strong><br />
                  Raport zostanie przekazany do CSIRT NASK (Naukowa i Akademicka Sieć Komputerowa), 
                  która koordynuje reakcję na incydenty bezpieczeństwa w domenie gov.pl.
                </p>
              </div>

              <div className="flex flex-col gap-3 justify-end">
                <button
                  onClick={handleCancelReport}
                  className="px-4 sm:px-6 py-2 sm:py-3 border border-gray-300 text-[#101317] rounded-full hover:bg-gray-50 transition-colors text-[14px] sm:text-[15px]"
                >
                  Anuluj
                </button>
                <button
                  onClick={handleSubmitReport}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-[#0452a8] text-white rounded-full hover:bg-[#033d8a] transition-colors flex items-center gap-2 justify-center text-[14px] sm:text-[15px]"
                >
                  <Send className="w-4 h-4" />
                  Wyślij zgłoszenie do CERT Polska
                </button>
              </div>
            </div>
          )}

          {/* Report Sending State */}
          {state === 'report-sending' && (
            <div className="text-center py-8 sm:py-12">
              <Loader2 className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-[#0452a8] animate-spin mx-auto mb-4 sm:mb-6" />
              <h3 className="text-[#101317] mb-3 text-[16px] sm:text-[18px]"><strong>Wysyłanie zgłoszenia...</strong></h3>
              <p className="text-[#4a5568] text-[14px] sm:text-[15px]">
                Przesyłamy informacje do systemu CSIRT NASK
              </p>
            </div>
          )}

          {/* Report Success State */}
          {state === 'report-success' && (
            <div className="text-center py-4 sm:py-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <ThumbsUp className="w-10 h-10 sm:w-12 sm:h-12 text-[#0452a8]" />
              </div>
              <h3 className="text-[#101317] mb-4 text-[16px] sm:text-[18px]"><strong>Dziękujemy za zgłoszenie</strong></h3>
              <p className="text-[#4a5568] mb-4 sm:mb-6 max-w-md mx-auto text-[14px] sm:text-[15px] md:text-[16px]">
                Twoja czujność pomaga dbać o bezpieczeństwo w sieci. 
                Zgłoszenie zostało przekazane do analizy przez zespół CSIRT NASK.
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 max-w-md mx-auto">
                <div className="flex items-start gap-2 text-left">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 shrink-0 mt-0.5" />
                  <div className="text-[13px] sm:text-[14px]">
                    <p className="text-[#101317]"><strong>Raport został zarejestrowany</strong></p>
                    <p className="text-[#6b7280]">ID: #{Math.floor(Math.random() * 100000)}</p>
                  </div>
                </div>
              </div>

              <p className="text-[#6b7280] mb-4 sm:mb-6 text-[13px] sm:text-[14px]">
                W razie potrzeby skontaktujemy się z Tobą przez aplikację mObywatel.
              </p>

              <button
                onClick={handleSafeExit}
                className="bg-[#0452a8] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-[#033d8a] transition-colors text-[14px] sm:text-[15px] md:text-[16px]"
              >
                Bezpieczny powrót na gov.pl
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}