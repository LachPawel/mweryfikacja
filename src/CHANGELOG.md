# Changelog

Wszystkie istotne zmiany w projekcie **mWeryfikacja** będą dokumentowane w tym pliku.

Format oparty na [Keep a Changelog](https://keepachangelog.com/pl/1.0.0/),
projekt stosuje [Semantic Versioning](https://semver.org/lang/pl/).

---

## [1.0.0] - 2024-12-06 - Hackathon Gov-Tech Release 🎉

### ✨ Dodane (Added)

#### Główne Funkcjonalności
- **System weryfikacji URL** - Sprawdzanie autentyczności stron gov.pl w 5 sekund
- **Sticky verification banner** - Pasek weryfikacji zawsze widoczny na górze strony
- **QR Code generation** - Dynamiczne generowanie kodów do skanowania aplikacją mObywatel
- **Multi-layer validation** - Weryfikacja przez dane.gov.pl + badssl.com + c1.sh

#### Komponenty UI
- `VerificationModal.tsx` - Modal z QR code i wynikami weryfikacji
- `Documentation.tsx` - Kompletna dokumentacja projektu
- `ValidationTester.tsx` - Sandbox do testowania walidacji SSL
- `ReportForm.tsx` - Formularz zgłaszania oszustw do CSIRT NASK
- `Frame1.tsx` - Imported pasek weryfikacji z Figma

#### Walidacja & Bezpieczeństwo
- **2000+ oficjalnych domen gov.pl** - Pełny rejestr z dane.gov.pl w `domainValidator.ts`
- **SSL/TLS validation** - Walidacja certyfikatów przez badssl.com i c1.sh
- **Nonce (One-Time Codes)** - Kody jednorazowe z timeout 5 minut
- **Iframe sandbox** - Bezpieczne ładowanie stron z ograniczeniami `sandbox`
- **HTTPS protocol check** - Automatyczne dodawanie https:// do URL

#### Scenariusze Testowe
- **Success scenario** - Oficjalna domena gov.pl (✅ krakow.pinb.gov.pl)
- **Failure scenario** - Strona phishingowa (❌ onet.pl)
- **Expired scenario** - Timeout kodu QR (⏰ > 5 minut)

#### Źródła Danych
- Integracja z **dane.gov.pl** - Rejestr oficjalnych domen
- Integracja z **badssl.com** - Testowanie expired/wrong-host/self-signed
- Integracja z **c1.sh** - Testowanie Let's Encrypt certificates

#### UI/UX
- Responsywny design (Desktop + Mobile)
- Automatyczne ładowanie `krakow.pinb.gov.pl` przy starcie
- URL input z auto-HTTPS
- Animacje loading states
- Ikony Lucide React (Shield, CheckCircle2, AlertTriangle, Clock, Globe)

#### Dokumentacja
- `README.md` - Kompletna dokumentacja projektu
- `CONTRIBUTING.md` - Wytyczne dla kontrybutorów
- `CHANGELOG.md` - Historia zmian
- `LICENSE` - Licencja MIT

### 🐛 Naprawione (Fixed)
- Poprawka walidacji SSL dla stron HTTPS (nie-gov.pl) - teraz pokazuje "Certyfikat istnieje, ale niezaufany"
- Usunięto zbędny ✅ tick z Success state w modalу
- Wszystkie komunikaty błędów przetłumaczone na polski

### 🔒 Bezpieczeństwo (Security)
- Implementacja nonce z timeout protection (5 minut)
- Iframe sandbox z ograniczonymi uprawnieniami
- Input sanitization dla URL
- HTTPS-only validation

### 📚 Dokumentacja (Documentation)
- Dodano kompletny README.md z instrukcjami instalacji
- Dodano CONTRIBUTING.md z wytycznymi dla developerów
- Dodano LICENSE (MIT)
- Dodano CHANGELOG.md

---

## [Unreleased] - Planowane Funkcjonalności

### 🚀 Do Dodania (To Add)

#### Phase 2 - Production (Q1 2025)
- [ ] Integracja z prawdziwą aplikacją mObywatel
- [ ] Backend API (Node.js + PostgreSQL)
- [ ] Real-time certificate validation
- [ ] Dashboard dla CSIRT NASK
- [ ] Analytics & monitoring
- [ ] Browser extension (Chrome, Firefox)

#### Phase 3 - Scale (Q2 2025)
- [ ] AI-powered phishing detection
- [ ] Machine learning dla wykrywania anomalii
- [ ] Mobile app (iOS + Android)
- [ ] API dla integracji z innymi systemami
- [ ] Edukacja użytkowników (tutorials, videos)

#### Ulepszenia Bezpieczeństwa
- [ ] WebAuthn support dla weryfikacji biometrycznej
- [ ] Hardware security key support (YubiKey)
- [ ] Rate limiting dla API
- [ ] CAPTCHA protection
- [ ] IP reputation checking

#### UI/UX Improvements
- [ ] Dark mode support
- [ ] Accessibility improvements (WCAG 2.1 AA)
- [ ] Multi-language support (EN, DE, UK)
- [ ] Keyboard shortcuts
- [ ] Tutorial onboarding

---

## [0.9.0] - 2024-12-05 - Beta Release

### ✨ Dodane
- Podstawowa struktura projektu
- React + TypeScript + Tailwind setup
- Vite configuration
- Podstawowe komponenty UI

### 🔧 Zmienione
- Migracja z Webpack do Vite
- Aktualizacja Tailwind CSS do v4.0

---

## [0.1.0] - 2024-12-01 - Initial Prototype

### ✨ Dodane
- Proof of concept
- Podstawowa walidacja URL
- Mockup UI

---

## Format Wpisów

Każdy wpis powinien zawierać:

### ✨ Dodane (Added)
Nowe funkcjonalności

### 🔧 Zmienione (Changed)
Zmiany w istniejących funkcjonalnościach

### 🗑️ Usunięte (Deprecated)
Funkcjonalności do usunięcia w przyszłości

### 🐛 Naprawione (Fixed)
Naprawy błędów

### 🔒 Bezpieczeństwo (Security)
Poprawki bezpieczeństwa

---

## Linki do Wersji

- [1.0.0] - https://github.com/twoj-username/mweryfikacja/releases/tag/v1.0.0
- [0.9.0] - https://github.com/twoj-username/mweryfikacja/releases/tag/v0.9.0
- [0.1.0] - https://github.com/twoj-username/mweryfikacja/releases/tag/v0.1.0

---

<div align="center">

**🛡️ mWeryfikacja - Bezpieczeństwo w 5 sekund**

[README](./README.md) • [Contributing](./CONTRIBUTING.md) • [License](./LICENSE)

</div>
