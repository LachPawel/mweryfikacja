import { useState } from 'react';
import { Shield, CheckCircle2, XCircle, AlertTriangle, Lock, Globe, Key, ArrowLeft } from 'lucide-react';
import { 
  performFullValidation, 
  generateNonce, 
  TEST_URLS,
  type ValidationResult 
} from '../utils/domainValidator';

interface ValidationTesterProps {
  onClose: () => void;
}

export default function ValidationTester({ onClose }: ValidationTesterProps) {
  const [url, setUrl] = useState('https://www.gov.pl');
  const [nonce, setNonce] = useState(generateNonce());
  const [result, setResult] = useState<ValidationResult | null>(null);
  const [isValidating, setIsValidating] = useState(false);

  const handleValidate = () => {
    setIsValidating(true);
    
    // Simulate validation delay
    setTimeout(() => {
      const validation = performFullValidation(url, nonce);
      setResult(validation);
      setIsValidating(false);
    }, 1500);
  };

  const handleTestUrl = (testUrl: string) => {
    setUrl(testUrl);
    setNonce(generateNonce());
    setResult(null);
  };

  const handleRegenerateNonce = () => {
    setNonce(generateNonce());
    setResult(null);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl p-6 max-w-4xl mx-auto my-8 w-full">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-8 h-8 text-[#0452a8]" />
          <h2 className="text-[#101317] flex-1">
            <strong>Tester walidacji - Sandbox badssl.com & c1.sh</strong>
          </h2>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-5 h-5 text-[#6b7280]" />
            <span>Powrót</span>
          </button>
        </div>

        {/* Test URL Buttons */}
        <div className="mb-6">
          <h3 className="text-[#101317] mb-3">
            <strong>Testowe domeny:</strong>
          </h3>
          
          {/* Valid Gov.pl Domains */}
          <div className="mb-4">
            <p className="text-[#6b7280] mb-2">✅ Oficjalne domeny gov.pl (z dane.gov.pl):</p>
            <div className="flex flex-wrap gap-2">
              {TEST_URLS.validGov.map((testUrl) => (
                <button
                  key={testUrl}
                  onClick={() => handleTestUrl(testUrl)}
                  className="px-3 py-1.5 bg-green-50 border border-green-300 text-green-800 rounded-lg hover:bg-green-100 transition-colors"
                >
                  {new URL(testUrl).hostname}
                </button>
              ))}
            </div>
          </div>

          {/* Invalid/Phishing Domains */}
          <div className="mb-4">
            <p className="text-[#6b7280] mb-2">❌ Fałszywe domeny (symulacja phishingu):</p>
            <div className="flex flex-wrap gap-2">
              {TEST_URLS.invalidGov.map((testUrl) => (
                <button
                  key={testUrl}
                  onClick={() => handleTestUrl(testUrl)}
                  className="px-3 py-1.5 bg-red-50 border border-red-300 text-red-800 rounded-lg hover:bg-red-100 transition-colors"
                >
                  {new URL(testUrl).hostname}
                </button>
              ))}
            </div>
          </div>

          {/* Badssl.com Test URLs */}
          <div className="mb-4">
            <p className="text-[#6b7280] mb-2">🧪 Sandbox badssl.com (testy certyfikatów SSL):</p>
            <div className="flex flex-wrap gap-2">
              {TEST_URLS.badsslTests.map((testUrl) => (
                <button
                  key={testUrl}
                  onClick={() => handleTestUrl(testUrl)}
                  className="px-3 py-1.5 bg-blue-50 border border-blue-300 text-blue-800 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  {new URL(testUrl).hostname.replace('.badssl.com', '')}
                </button>
              ))}
            </div>
          </div>

          {/* C1.sh Test URLs */}
          <div className="mb-4">
            <p className="text-[#6b7280] mb-2">🧪 Sandbox c1.sh (dodatkowe testy):</p>
            <div className="flex flex-wrap gap-2">
              {TEST_URLS.c1shTests.map((testUrl) => (
                <button
                  key={testUrl}
                  onClick={() => handleTestUrl(testUrl)}
                  className="px-3 py-1.5 bg-purple-50 border border-purple-300 text-purple-800 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  {new URL(testUrl).hostname}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Manual URL Input */}
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-[#101317] mb-2">
              <strong>URL do weryfikacji:</strong>
            </label>
            <div className="flex gap-2">
              <div className="flex-1 flex items-center gap-2 px-4 py-3 border border-gray-300 rounded-lg">
                <Globe className="w-5 h-5 text-[#6b7280]" />
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://www.gov.pl"
                  className="flex-1 outline-none text-[#101317]"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[#101317] mb-2">
              <strong>Nonce (kod jednorazowy):</strong>
            </label>
            <div className="flex gap-2">
              <div className="flex-1 flex items-center gap-2 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg">
                <Key className="w-5 h-5 text-[#6b7280]" />
                <code className="flex-1 text-[#6b7280] text-sm break-all">{nonce}</code>
              </div>
              <button
                onClick={handleRegenerateNonce}
                className="px-4 py-3 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Nowy
              </button>
            </div>
          </div>
        </div>

        {/* Validate Button */}
        <button
          onClick={handleValidate}
          disabled={isValidating}
          className="w-full bg-[#0452a8] text-white py-3 rounded-lg hover:bg-[#033d8a] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed mb-6"
        >
          {isValidating ? 'Weryfikuję...' : 'Weryfikuj'}
        </button>

        {/* Validation Result */}
        {result && (
          <div className={`border-2 rounded-xl p-6 ${
            result.isValid 
              ? 'bg-green-50 border-green-500' 
              : 'bg-red-50 border-red-500'
          }`}>
            <div className="flex items-center gap-3 mb-4">
              {result.isValid ? (
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              ) : (
                <XCircle className="w-8 h-8 text-red-600" />
              )}
              <h3 className="text-[#101317]">
                <strong>
                  {result.isValid ? 'Weryfikacja pomyślna' : 'Weryfikacja nieudana'}
                </strong>
              </h3>
            </div>

            {/* Domain Check */}
            <div className="space-y-3 mb-4">
              <div className="flex items-start gap-2">
                <Globe className="w-5 h-5 text-[#0452a8] mt-0.5" />
                <div className="flex-1">
                  <p className="text-[#101317]">
                    <strong>Domena:</strong> {result.domain}
                  </p>
                  <p className={`text-sm ${result.isOfficialGov ? 'text-green-700' : 'text-red-700'}`}>
                    {result.isOfficialGov 
                      ? '✅ Znajduje się w oficjalnym rejestrze gov.pl (dane.gov.pl)' 
                      : '❌ Brak w oficjalnym rejestrze gov.pl'
                    }
                  </p>
                </div>
              </div>

              {/* SSL Certificate */}
              {result.ssl && (
                <div className="flex items-start gap-2">
                  <Lock className="w-5 h-5 text-[#0452a8] mt-0.5" />
                  <div className="flex-1">
                    <p className="text-[#101317]">
                      <strong>Certyfikat SSL:</strong>
                    </p>
                    <div className="text-sm space-y-1 mt-1">
                      <p className="text-[#6b7280]">
                        <strong>Wystawca:</strong> {result.ssl.issuer}
                      </p>
                      <p className="text-[#6b7280]">
                        <strong>Ważny:</strong> {result.ssl.validFrom} - {result.ssl.validTo}
                      </p>
                      <p className={result.ssl.isValid ? 'text-green-700' : 'text-red-700'}>
                        {result.ssl.isValid ? '✅ Certyfikat ważny' : '❌ Certyfikat nieważny'}
                      </p>
                      <p className={result.ssl.isTrusted ? 'text-green-700' : 'text-orange-700'}>
                        {result.ssl.isTrusted ? '✅ Zaufany wystawca' : '⚠️ Niezaufany wystawca'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Nonce Validation */}
              <div className="flex items-start gap-2">
                <Key className="w-5 h-5 text-[#0452a8] mt-0.5" />
                <div className="flex-1">
                  <p className="text-[#101317]">
                    <strong>Kod jednorazowy (nonce):</strong>
                  </p>
                  <p className={`text-sm ${result.nonce.valid ? 'text-green-700' : 'text-red-700'}`}>
                    {result.nonce.valid 
                      ? '✅ Nonce poprawny i niewygas' + 'ł'
                      : result.nonce.expired 
                        ? '❌ Nonce wygasł (>60s)' 
                        : '❌ Nonce niepoprawny'
                    }
                  </p>
                </div>
              </div>
            </div>

            {/* Errors */}
            {result.errors.length > 0 && (
              <div className="bg-red-100 border border-red-300 rounded-lg p-4 mb-4">
                <h4 className="text-red-900 mb-2"><strong>Błędy:</strong></h4>
                <ul className="space-y-1">
                  {result.errors.map((error, idx) => (
                    <li key={idx} className="text-red-800 flex items-start gap-2">
                      <XCircle className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>{error}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Warnings */}
            {result.warnings.length > 0 && (
              <div className="bg-orange-100 border border-orange-300 rounded-lg p-4">
                <h4 className="text-orange-900 mb-2"><strong>Ostrzeżenia:</strong></h4>
                <ul className="space-y-1">
                  {result.warnings.map((warning, idx) => (
                    <li key={idx} className="text-orange-800 flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 mt-0.5 shrink-0" />
                      <span>{warning}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
          <p className="text-[#4a5568]">
            <strong>Techniczne informacje:</strong><br />
            System używa oficjalnej listy domen z <strong>dane.gov.pl</strong> oraz testuje certyfikaty SSL 
            na środowiskach <strong>badssl.com</strong> i <strong>c1.sh</strong> zgodnie z wymaganiami hackathonu gov-tech.
          </p>
        </div>
      </div>
    </div>
  );
}