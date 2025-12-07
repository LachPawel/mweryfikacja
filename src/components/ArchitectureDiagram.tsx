import { Shield, Smartphone, Server, Database, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ArchitectureDiagram() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-[#101317] mb-4">
          Architektura systemu
        </h2>
        <p className="text-center text-[#4a5568] mb-16 max-w-2xl mx-auto">
          Bezpieczny przepływ danych z wykorzystaniem jednorazowych tokenów nonce
        </p>

        {/* Desktop Diagram */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Step 1: User on Website */}
            <div className="flex items-center justify-between mb-12">
              <div className="flex-1">
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 max-w-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-8 h-8 text-[#0452a8]" />
                    <h3 className="text-[#101317]">1. Strona gov.pl</h3>
                  </div>
                  <p className="text-[#4a5568] mb-3">
                    Użytkownik klika "Zweryfikuj"
                  </p>
                  <div className="bg-white p-3 rounded border border-blue-200">
                    <code className="text-[#0452a8]">
                      POST /generateNonce<br/>
                      {'{'} pageUrl: "login.gov.pl" {'}'}
                    </code>
                  </div>
                </div>
              </div>

              <ArrowRight className="w-8 h-8 text-blue-400 mx-6" />

              <div className="flex-1">
                <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6 max-w-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <Server className="w-8 h-8 text-purple-600" />
                    <h3 className="text-[#101317]">2. Backend</h3>
                  </div>
                  <p className="text-[#4a5568] mb-3">
                    Generuje jednorazowy nonce
                  </p>
                  <div className="bg-white p-3 rounded border border-purple-200 space-y-1">
                    <div className="text-[#4a5568]">✓ Generuje UUID</div>
                    <div className="text-[#4a5568]">✓ Zapisuje w bazie</div>
                    <div className="text-[#4a5568]">✓ Ważność: 60s</div>
                  </div>
                </div>
              </div>

              <ArrowRight className="w-8 h-8 text-blue-400 mx-6" />

              <div className="flex-1">
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 max-w-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-8 h-8 text-[#0452a8]" />
                    <h3 className="text-[#101317]">3. Strona</h3>
                  </div>
                  <p className="text-[#4a5568] mb-3">
                    Wyświetla kod QR
                  </p>
                  <div className="bg-white p-4 rounded border border-blue-200">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded mx-auto flex items-center justify-center">
                      <span className="text-[#0452a8]">QR</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Mobile Scan */}
            <div className="flex items-center justify-between mb-12">
              <div className="flex-1">
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 max-w-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <Smartphone className="w-8 h-8 text-green-600" />
                    <h3 className="text-[#101317]">4. mObywatel</h3>
                  </div>
                  <p className="text-[#4a5568] mb-3">
                    Użytkownik skanuje QR
                  </p>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <code className="text-green-600">
                      POST /verifyNonce<br/>
                      {'{'} nonce: "abc-123..." {'}'}
                    </code>
                  </div>
                </div>
              </div>

              <ArrowRight className="w-8 h-8 text-blue-400 mx-6" />

              <div className="flex-1">
                <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6 max-w-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <Database className="w-8 h-8 text-purple-600" />
                    <h3 className="text-[#101317]">5. Weryfikacja</h3>
                  </div>
                  <p className="text-[#4a5568] mb-3">
                    Backend sprawdza:
                  </p>
                  <div className="bg-white p-3 rounded border border-purple-200 space-y-1">
                    <div className="text-[#4a5568]">✓ Czy nonce istnieje</div>
                    <div className="text-[#4a5568]">✓ Czy nie wygasł</div>
                    <div className="text-[#4a5568]">✓ Czy nie użyty</div>
                    <div className="text-[#4a5568]">✓ Domena w rejestrze</div>
                    <div className="text-[#4a5568]">✓ Certyfikat SSL</div>
                  </div>
                </div>
              </div>

              <ArrowRight className="w-8 h-8 text-blue-400 mx-6" />

              <div className="flex-1">
                <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 max-w-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                    <h3 className="text-[#101317]">6. Wynik</h3>
                  </div>
                  <p className="text-[#4a5568] mb-3">
                    Odpowiedź do appki i strony
                  </p>
                  <div className="bg-white p-3 rounded border border-green-200">
                    <div className="text-green-600 mb-2">✓ TRUSTED</div>
                    <div className="text-[#4a5568]">lub</div>
                    <div className="text-red-600 mt-2">✗ UNTRUSTED</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Diagram - Stacked */}
        <div className="lg:hidden space-y-6">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center shrink-0">1</div>
              <h3 className="text-[#101317]">Strona gov.pl</h3>
            </div>
            <p className="text-[#4a5568]">Użytkownik klika "Zweryfikuj" → wywołanie POST /generateNonce</p>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="w-6 h-6 text-blue-400 rotate-90" />
          </div>

          <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center shrink-0">2</div>
              <h3 className="text-[#101317]">Backend</h3>
            </div>
            <p className="text-[#4a5568] mb-3">Generuje jednorazowy nonce:</p>
            <div className="bg-white p-3 rounded border border-purple-200 space-y-1">
              <div className="text-[#4a5568]">✓ UUID + timestamp</div>
              <div className="text-[#4a5568]">✓ Zapis w bazie</div>
              <div className="text-[#4a5568]">✓ Ważność 60s</div>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="w-6 h-6 text-blue-400 rotate-90" />
          </div>

          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center shrink-0">3</div>
              <h3 className="text-[#101317]">QR na stronie</h3>
            </div>
            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-blue-200 rounded mx-auto flex items-center justify-center">
              <span className="text-[#0452a8]">QR CODE</span>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="w-6 h-6 text-blue-400 rotate-90" />
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center shrink-0">4</div>
              <h3 className="text-[#101317]">mObywatel</h3>
            </div>
            <p className="text-[#4a5568]">Użytkownik skanuje QR → POST /verifyNonce z nonce</p>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="w-6 h-6 text-blue-400 rotate-90" />
          </div>

          <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center shrink-0">5</div>
              <h3 className="text-[#101317]">Weryfikacja</h3>
            </div>
            <p className="text-[#4a5568] mb-3">Backend sprawdza wszystko:</p>
            <div className="bg-white p-3 rounded border border-purple-200 space-y-1">
              <div className="text-[#4a5568]">✓ Nonce istnieje i nie wygasł</div>
              <div className="text-[#4a5568]">✓ Domena w rejestrze gov.pl</div>
              <div className="text-[#4a5568]">✓ Certyfikat SSL zaufany</div>
            </div>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="w-6 h-6 text-blue-400 rotate-90" />
          </div>

          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center shrink-0">6</div>
              <h3 className="text-[#101317]">Wynik</h3>
            </div>
            <div className="bg-white p-4 rounded border border-green-200">
              <div className="text-green-600 mb-2">✓ TRUSTED - Strona oficjalna</div>
              <div className="text-[#6b7280] my-2">lub</div>
              <div className="text-red-600">✗ UNTRUSTED - Phishing!</div>
            </div>
          </div>
        </div>

        {/* Security Note */}
        <div className="mt-12 bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-xl">
          <h4 className="text-[#101317] mb-3"><strong>Dlaczego to bezpieczne?</strong></h4>
          <ul className="space-y-2 text-[#4a5568]">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <span><strong>Jednorazowość:</strong> Każdy nonce może być użyty tylko raz - haker nie może skopiować QR</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <span><strong>Czas życia:</strong> QR wygasa po 60 sekundach - zero replay attacks</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <span><strong>Powiązanie z URL:</strong> Nonce jest związany z konkretną stroną - nie da się przenieść</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <span><strong>Rejestr domen:</strong> Walidacja z oficjalną listą gov.pl dostarczaną przez NASK</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
