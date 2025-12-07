import { FileText, Video, Github, Presentation, Shield, CheckCircle2, Book, ExternalLink, ArrowLeft } from 'lucide-react';

interface DocumentationProps {
  onBack: () => void;
}

export default function Documentation({ onBack }: DocumentationProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-[#0452a8] hover:text-[#033d8a] transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Powrót do demo</span>
        </button>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="w-12 h-12 text-[#0452a8]" />
            <h1 className="text-[#101317]">
              <strong>mWeryfikacja</strong>
            </h1>
          </div>
          <p className="text-[#4a5568] max-w-3xl mx-auto">
            System weryfikacji autentyczności stron gov.pl za pomocą aplikacji mObywatel
          </p>
          <div className="flex items-center justify-center gap-4 mt-6 flex-wrap">
            <span className="px-4 py-2 bg-blue-100 text-[#0452a8] rounded-full text-[14px]">
              Hackathon Gov-Tech 2025
            </span>
            <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-[14px]">
              Prototyp funkcjonalny
            </span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <a href="#problem" className="p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-[#0452a8] transition-colors">
            <FileText className="w-8 h-8 text-[#0452a8] mb-3" />
            <h3 className="text-[#101317] mb-2"><strong>Opis problemu</strong></h3>
            <p className="text-[#6b7280] text-[14px]">Phishing stron gov.pl</p>
          </a>

          <a href="#solution" className="p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-[#0452a8] transition-colors">
            <CheckCircle2 className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="text-[#101317] mb-2"><strong>Rozwiązanie</strong></h3>
            <p className="text-[#6b7280] text-[14px]">Weryfikacja QR w mObywatel</p>
          </a>

          <a href="#demo" className="p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-[#0452a8] transition-colors">
            <Video className="w-8 h-8 text-red-600 mb-3" />
            <h3 className="text-[#101317] mb-2"><strong>Demo video</strong></h3>
            <p className="text-[#6b7280] text-[14px]">3 min prezentacja</p>
          </a>

          <a href="#presentation" className="p-6 bg-white rounded-xl border-2 border-gray-200 hover:border-[#0452a8] transition-colors">
            <Presentation className="w-8 h-8 text-purple-600 mb-3" />
            <h3 className="text-[#101317] mb-2"><strong>Prezentacja</strong></h3>
            <p className="text-[#6b7280] text-[14px]">10 slajdów PDF</p>
          </a>
        </div>

        {/* Problem Statement */}
        <section id="problem" className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
          <h2 className="text-[#101317] mb-6"><strong>1. Problem - Phishing stron administracji publicznej</strong></h2>
          
          <div className="space-y-4 text-[#4a5568]">
            <p>
              <strong>Oszustwa phishingowe</strong> w Polsce coraz częściej wykorzystują strony publiczne. 
              Cyberprzestępcy tworzą fałszywe kopie portali gov.pl, które wyglądają niemal identycznie jak oryginały.
            </p>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <p className="text-[#101317]"><strong>Główne zagrożenia:</strong></p>
              <ul className="list-disc list-inside mt-2 space-y-1 text-[#6b7280]">
                <li>Wyłudzanie danych logowania do ePUAP i Profilu Zaufanego</li>
                <li>Kradzież informacji osobowych i bankowych</li>
                <li>Podszywanie się pod kampanie rządowe (dopłaty, świadczenia)</li>
                <li>Wykorzystanie certyfikatów SSL i domen podobnych do oficjalnych</li>
              </ul>
            </div>

            <p>
              <strong>Luka systemowa:</strong> Brakuje jednolitej platformy weryfikacji autentyczności stron rządowych 
              ani prostych mechanizmów pozwalających szybko sprawdzić, czy dana witryna jest oficjalna.
            </p>
          </div>
        </section>

        {/* Solution */}
        <section id="solution" className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
          <h2 className="text-[#101317] mb-6"><strong>2. Rozwiązanie - mWeryfikacja</strong></h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-blue-50 rounded-xl p-6">
              <h3 className="text-[#101317] mb-4"><strong>Co oferujemy?</strong></h3>
              <ul className="space-y-2 text-[#4a5568]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Weryfikacja w <strong>5 sekund</strong> przez aplikację mObywatel</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span><strong>Jednorazowy kod QR</strong> (nonce) - odporny na powtórki</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Sprawdzenie domeny w <strong>oficjalnym rejestrze gov.pl</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span>Walidacja <strong>certyfikatu SSL</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                  <span><strong>Zgłaszanie oszustw</strong> do CSIRT NASK</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-xl p-6">
              <h3 className="text-[#101317] mb-4"><strong>Wykorzystane zasoby</strong></h3>
              <div className="space-y-3">
                <div>
                  <p className="text-[#101317] mb-1"><strong>Oficjalny rejestr domen:</strong></p>
                  <a 
                    href="https://dane.gov.pl/pl/dataset/1463" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#0452a8] hover:underline text-[14px] flex items-center gap-1"
                  >
                    dane.gov.pl/dataset/1463
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <p className="text-[#6b7280] text-[13px] mt-1">
                    Lista wszystkich oficjalnych domen i subdomen gov.pl
                  </p>
                </div>

                <div>
                  <p className="text-[#101317] mb-1"><strong>Środowiska testowe:</strong></p>
                  <div className="space-y-1">
                    <a 
                      href="https://badssl.com/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0452a8] hover:underline text-[14px] flex items-center gap-1"
                    >
                      badssl.com
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <a 
                      href="https://c1.sh/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0452a8] hover:underline text-[14px] flex items-center gap-1"
                    >
                      c1.sh
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-[#6b7280] text-[13px] mt-1">
                    Demonstracja wykrywania błędnych certyfikatów
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-6 border-2 border-[#0452a8]">
            <h3 className="text-[#101317] mb-4"><strong>Flow weryfikacji (zgodnie z wymaganiami):</strong></h3>
            <ol className="space-y-3 text-[#4a5568]">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-[#0452a8] text-white rounded-full flex items-center justify-center text-[14px]">1</span>
                <div>
                  <strong>Przycisk CTA na stronie gov.pl</strong>
                  <p className="text-[14px] text-[#6b7280]">Widoczny pasek weryfikacji w łatwo dostępnym miejscu</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-[#0452a8] text-white rounded-full flex items-center justify-center text-[14px]">2</span>
                <div>
                  <strong>Moduł z informacjami weryfikującymi</strong>
                  <p className="text-[14px] text-[#6b7280]">Sprawdzenie domeny .gov.pl, certyfikat SSL, link do kompendium stron</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-[#0452a8] text-white rounded-full flex items-center justify-center text-[14px]">3</span>
                <div>
                  <strong>Weryfikacja QR w mObywatel</strong>
                  <p className="text-[14px] text-[#6b7280]">Jednorazowy kod, ważny 60 sekund</p>
                </div>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-[#0452a8] text-white rounded-full flex items-center justify-center text-[14px]">4</span>
                <div>
                  <strong>Informacja zwrotna</strong>
                  <p className="text-[14px] text-[#6b7280]">Komunikat w aplikacji i na stronie (sukces/ostrzeżenie)</p>
                </div>
              </li>
            </ol>
          </div>
        </section>

        {/* Technical Requirements */}
        <section id="technical" className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
          <h2 className="text-[#101317] mb-6"><strong>3. Spełnienie wymagań technicznych</strong></h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#101317]"><strong>Koncepcja integracji</strong></p>
                  <p className="text-[#6b7280] text-[14px]">Pasek weryfikacji jako widget - łatwa integracja przez {'<script>'} tag</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#101317]"><strong>Szyfrowana komunikacja</strong></p>
                  <p className="text-[#6b7280] text-[14px]">HTTPS + TLS 1.3, WebSocket zabezpieczone</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#101317]"><strong>Lekki moduł</strong></p>
                  <p className="text-[#6b7280] text-[14px]">{'<50KB}'}, lazy loading komponentów</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#101317]"><strong>Jednorazowy nonce</strong></p>
                  <p className="text-[#6b7280] text-[14px]">UUID v4, ważność 60s, usuwany po użyciu</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#101317]"><strong>Cyberbezpieczeństwo</strong></p>
                  <p className="text-[#6b7280] text-[14px]">Rate limiting, walidacja input, odporność na replay attacks</p>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[#101317]"><strong>Obsługa błędów</strong></p>
                  <p className="text-[#6b7280] text-[14px]">Timeout, błędny QR, brak połączenia - wszystko obsłużone</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Demo & Materials */}
        <section id="demo" className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
          <h2 className="text-[#101317] mb-6"><strong>4. Materiały demonstracyjne</strong></h2>
          
          <div className="space-y-4">
            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-[#0452a8] transition-colors">
              <div className="flex items-start gap-4">
                <Video className="w-8 h-8 text-red-600 shrink-0" />
                <div className="flex-1">
                  <h3 className="text-[#101317] mb-2"><strong>Film demonstracyjny (max 3 min)</strong></h3>
                  <p className="text-[#6b7280] mb-3">
                    Prezentacja pełnego flow: scenariusz pozytywny (strona zweryfikowana) 
                    i negatywny (wykrycie phishingu + zgłoszenie do CSIRT NASK)
                  </p>
                  <a 
                    href="https://youtu.be/demo" 
                    className="inline-flex items-center gap-2 text-[#0452a8] hover:underline"
                  >
                    Zobacz film
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-[#0452a8] transition-colors">
              <div className="flex items-start gap-4">
                <Presentation className="w-8 h-8 text-purple-600 shrink-0" />
                <div className="flex-1">
                  <h3 className="text-[#101317] mb-2"><strong>Prezentacja PDF (max 10 slajdów)</strong></h3>
                  <p className="text-[#6b7280] mb-3">
                    Szczegółowy opis projektu, architektura, bezpieczeństwo, plan wdrożenia
                  </p>
                  <a 
                    href="/mWeryfikacja_Prezentacja.pdf" 
                    className="inline-flex items-center gap-2 text-[#0452a8] hover:underline"
                  >
                    Pobierz PDF
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-[#0452a8] transition-colors">
              <div className="flex items-start gap-4">
                <Github className="w-8 h-8 text-gray-800 shrink-0" />
                <div className="flex-1">
                  <h3 className="text-[#101317] mb-2"><strong>Repozytorium kodu</strong></h3>
                  <p className="text-[#6b7280] mb-3">
                    Frontend (React + TypeScript), Backend API (Node.js), Dokumentacja techniczna
                  </p>
                  <a 
                    href="https://github.com/govtech/mWeryfikacja" 
                    className="inline-flex items-center gap-2 text-[#0452a8] hover:underline"
                  >
                    Zobacz repozytorium
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-[#0452a8] transition-colors">
              <div className="flex items-start gap-4">
                <Book className="w-8 h-8 text-orange-600 shrink-0" />
                <div className="flex-1">
                  <h3 className="text-[#101317] mb-2"><strong>Makiety rozwiązania (lo-fi)</strong></h3>
                  <p className="text-[#6b7280] mb-3">
                    Mockupy ekranów mobilnych mObywatel, diagramy architektury, user flows
                  </p>
                  <button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="inline-flex items-center gap-2 text-[#0452a8] hover:underline"
                  >
                    Zobacz w aplikacji
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Evaluation Criteria */}
        <section id="criteria" className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
          <h2 className="text-[#101317] mb-6"><strong>5. Kryteria oceny - nasze podejście</strong></h2>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
              <div className="flex justify-between items-start mb-2">
                <p className="text-[#101317]"><strong>Związek z wyzwaniem</strong></p>
                <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-[14px]">25%</span>
              </div>
              <p className="text-[#6b7280] text-[14px]">
                Rozwiązanie bezpośrednio odpowiada na problem phishingu stron gov.pl. 
                Wykorzystujemy oficjalny rejestr domen, certyfikaty SSL i aplikację mObywatel znaną obywatelom.
              </p>
            </div>

            <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded-r-lg">
              <div className="flex justify-between items-start mb-2">
                <p className="text-[#101317]"><strong>Wdrożeniowy potencjał</strong></p>
                <span className="px-3 py-1 bg-green-600 text-white rounded-full text-[14px]">25%</span>
              </div>
              <p className="text-[#6b7280] text-[14px]">
                Lekki widget {'(<50KB)'}, łatwa integracja przez {'<script>'}, nie wpływa na wydajność. 
                Gotowy do pilotażu na wybranych stronach gov.pl.
              </p>
            </div>

            <div className="bg-purple-50 border-l-4 border-purple-500 p-4 rounded-r-lg">
              <div className="flex justify-between items-start mb-2">
                <p className="text-[#101317]"><strong>Walidacja i bezpieczeństwo</strong></p>
                <span className="px-3 py-1 bg-purple-600 text-white rounded-full text-[14px]">20%</span>
              </div>
              <p className="text-[#6b7280] text-[14px]">
                Jednorazowy nonce (60s), szyfrowanie TLS 1.3, rate limiting, walidacja input, 
                odporność na replay attacks i spoofing QR.
              </p>
            </div>

            <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
              <div className="flex justify-between items-start mb-2">
                <p className="text-[#101317]"><strong>UX i ergonomia</strong></p>
                <span className="px-3 py-1 bg-orange-600 text-white rounded-full text-[14px]">15%</span>
              </div>
              <p className="text-[#6b7280] text-[14px]">
                Weryfikacja w 5 sekund, prosty flow (klik → skan → wynik), 
                responsywny design, jasne komunikaty sukcesu/ostrzeżenia.
              </p>
            </div>

            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
              <div className="flex justify-between items-start mb-2">
                <p className="text-[#101317]"><strong>Innowacyjność i prezentacja</strong></p>
                <span className="px-3 py-1 bg-red-600 text-white rounded-full text-[14px]">15%</span>
              </div>
              <p className="text-[#6b7280] text-[14px]">
                Crowdsourcing cyberbezpieczeństwa - użytkownicy aktywnie zgłaszają oszustwa do CSIRT NASK. 
                Kompletna dokumentacja + działający prototyp.
              </p>
            </div>
          </div>
        </section>

        {/* Implementation Roadmap */}
        <section id="roadmap" className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
          <h2 className="text-[#101317] mb-6"><strong>6. Plan wdrożenia</strong></h2>
          
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-blue-100 text-[#0452a8] rounded-full flex items-center justify-center">1</div>
                <div className="w-0.5 h-full bg-blue-200 mt-2"></div>
              </div>
              <div className="flex-1 pb-6">
                <h3 className="text-[#101317] mb-2"><strong>MVP (2 tygodnie)</strong></h3>
                <ul className="text-[#6b7280] text-[14px] space-y-1">
                  <li>• Backend API (generowanie nonce, weryfikacja)</li>
                  <li>• Widget frontend (pasek + modal QR)</li>
                  <li>• Integracja z rejestrem domen dane.gov.pl</li>
                  <li>• Podstawowa walidacja SSL</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-green-100 text-green-700 rounded-full flex items-center justify-center">2</div>
                <div className="w-0.5 h-full bg-green-200 mt-2"></div>
              </div>
              <div className="flex-1 pb-6">
                <h3 className="text-[#101317] mb-2"><strong>Pilot (1-2 miesiące)</strong></h3>
                <ul className="text-[#6b7280] text-[14px] space-y-1">
                  <li>• Wdrożenie na 3-5 wybranych stronach gov.pl</li>
                  <li>• Integracja z aplikacją mObywatel (skaner QR)</li>
                  <li>• Testowanie z prawdziwymi użytkownikami</li>
                  <li>• Zbieranie feedbacku i metryk (ile weryfikacji, wykrytych oszustw)</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center">3</div>
                <div className="w-0.5 h-full bg-purple-200 mt-2"></div>
              </div>
              <div className="flex-1 pb-6">
                <h3 className="text-[#101317] mb-2"><strong>Rozszerzenie (3-6 miesięcy)</strong></h3>
                <ul className="text-[#6b7280] text-[14px] space-y-1">
                  <li>• System zgłaszania oszustw do CSIRT NASK</li>
                  <li>• Dashboard analityczny dla administratorów</li>
                  <li>• Automatyczne blokowanie wykrytych domen phishingowych</li>
                  <li>• Rozszerzenie na wszystkie strony gov.pl</li>
                </ul>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 bg-orange-100 text-orange-700 rounded-full flex items-center justify-center">4</div>
              </div>
              <div className="flex-1">
                <h3 className="text-[#101317] mb-2"><strong>Full rollout (6-12 miesięcy)</strong></h3>
                <ul className="text-[#6b7280] text-[14px] space-y-1">
                  <li>• Pełna integracja z infrastrukturą gov.pl</li>
                  <li>• Kampania edukacyjna dla obywateli</li>
                  <li>• Rozszerzenie na strony samorządowe (*.gov.pl)</li>
                  <li>• Współpraca z CERT Polska i NASK</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Team & Contact */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
          <div className="text-center mb-6">
            <h2 className="mb-4"><strong>Gotowi do wdrożenia</strong></h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              Najlepsze rozwiązania mogą zostać skierowane do pilotażowego wdrożenia 
              w procesie rozwoju aplikacji mObywatel.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="/"
              className="px-6 py-3 bg-white text-[#0452a8] rounded-full hover:bg-blue-50 transition-colors"
            >
              Przetestuj demo
            </a>
            <a 
              href="https://discord.gg/hackathon"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border-2 border-white text-white rounded-full hover:bg-white/10 transition-colors"
            >
              Kontakt na Discord
            </a>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center mt-12 text-[#6b7280]">
          <p className="text-[14px]">
            mWeryfikacja – System weryfikacji autentyczności stron gov.pl
          </p>
          <p className="text-[13px] mt-2">
            Projekt hackathonowy • Hackathon Gov-Tech 2025
          </p>
        </footer>
      </div>
    </div>
  );
}