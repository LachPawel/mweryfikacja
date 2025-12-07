# 🤝 Wkład w Projekt mWeryfikacja

Dziękujemy za zainteresowanie projektem **mWeryfikacja**! Ten dokument zawiera wytyczne dla osób chcących wnieść swój wkład.

## 📋 Spis Treści

- [Jak mogę pomóc?](#jak-mogę-pomóc)
- [Zgłaszanie błędów](#zgłaszanie-błędów)
- [Propozycje nowych funkcji](#propozycje-nowych-funkcji)
- [Proces Pull Request](#proces-pull-request)
- [Style Guide](#style-guide)
- [Struktura Commitów](#struktura-commitów)

---

## 🎯 Jak mogę pomóc?

Istnieje wiele sposobów na wniesienie wkładu:

- 🐛 **Zgłaszanie błędów** - Znalazłeś bug? Daj nam znać!
- 💡 **Propozycje funkcji** - Masz pomysł na ulepszenie?
- 📝 **Dokumentacja** - Popraw lub rozszerz dokumentację
- 🧪 **Testowanie** - Testuj nowe funkcje i zgłaszaj problemy
- 💻 **Kod** - Dodaj nowe funkcje lub popraw istniejące

---

## 🐛 Zgłaszanie Błędów

Przed zgłoszeniem błędu:

1. **Sprawdź istniejące issues** - Może ktoś już to zgłosił
2. **Użyj najnowszej wersji** - Problem może być już naprawiony
3. **Przygotuj minimalny przykład** - Pomaga w reprodukcji

### Szablon zgłoszenia błędu

```markdown
**Opis błędu**
Jasny opis co się dzieje.

**Kroki reprodukcji**
1. Przejdź do '...'
2. Kliknij na '....'
3. Przewiń do '....'
4. Zobacz błąd

**Oczekiwane zachowanie**
Co powinno się stać.

**Screenshoty**
Jeśli dotyczy, dodaj screenshoty.

**Środowisko**
- OS: [np. macOS 14]
- Browser: [np. Chrome 120]
- Wersja: [np. 1.0.0]
```

---

## 💡 Propozycje Nowych Funkcji

Masz pomysł? Świetnie!

1. **Otwórz Issue** z tagiem `enhancement`
2. **Opisz use case** - Po co ta funkcja?
3. **Zaproponuj rozwiązanie** - Jak to może działać?
4. **Rozważ alternatywy** - Czy są inne sposoby?

---

## 🔄 Proces Pull Request

### 1. Fork & Clone

```bash
# Fork repozytorium na GitHubie
# Następnie sklonuj swój fork

git clone https://github.com/TWOJ-USERNAME/mweryfikacja.git
cd mweryfikacja
```

### 2. Utwórz Branch

```bash
# Użyj opisowej nazwy brancha
git checkout -b feature/nowa-funkcja
# lub
git checkout -b fix/naprawa-bledu
```

### 3. Kod

```bash
# Zainstaluj dependencies
npm install

# Uruchom dev server
npm run dev

# Pisz kod...
# Testuj zmiany...
```

### 4. Commit

```bash
# Dodaj zmiany
git add .

# Commit z opisem (patrz Style Guide)
git commit -m "feat: dodaj walidację email w formularzu CSIRT"
```

### 5. Push & PR

```bash
# Push do swojego forka
git push origin feature/nowa-funkcja

# Otwórz Pull Request na GitHubie
```

### 6. Code Review

- Poczekaj na review
- Odpowiedz na komentarze
- Wprowadź sugerowane zmiany
- Po zatwierdzeniu - merge!

---

## 📝 Style Guide

### TypeScript

```typescript
// ✅ Dobre
interface ValidationResult {
  isValid: boolean;
  domain: string;
  errors: string[];
}

const validateDomain = (url: string): ValidationResult => {
  // implementacja
};

// ❌ Złe
function validate(u) {
  // brak typów
}
```

### React Components

```tsx
// ✅ Dobre - Funkcyjne komponenty z TypeScript
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

export function Button({ onClick, children, variant = 'primary' }: ButtonProps) {
  return (
    <button 
      onClick={onClick}
      className={`btn btn-${variant}`}
    >
      {children}
    </button>
  );
}

// ❌ Złe - Class components
class Button extends React.Component {
  // staroświecki kod
}
```

### Tailwind CSS

```tsx
// ✅ Dobre - Utility classes
<div className="flex items-center gap-4 p-6 bg-white rounded-xl shadow-lg">

// ❌ Złe - Inline styles (chyba że absolutnie konieczne)
<div style={{ display: 'flex', padding: '24px' }}>
```

### Nazewnictwo

```typescript
// Komponenty - PascalCase
VerificationModal.tsx
ValidationTester.tsx

// Funkcje - camelCase
validateDomain()
generateNonce()

// Stałe - UPPER_SNAKE_CASE
const MAX_TIMEOUT = 300000;
const OFFICIAL_GOV_DOMAINS = [...];

// Pliki utils - camelCase
domainValidator.ts
sslValidator.ts
```

---

## 📦 Struktura Commitów

Używamy [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Typy commitów

- `feat:` - Nowa funkcja
- `fix:` - Naprawa błędu
- `docs:` - Zmiany w dokumentacji
- `style:` - Formatowanie (bez zmian w kodzie)
- `refactor:` - Refaktoryzacja kodu
- `test:` - Dodanie lub poprawka testów
- `chore:` - Zmiany w build/narzędziach

### Przykłady

```bash
# Nowa funkcja
git commit -m "feat(validation): dodaj walidację email w formularzu CSIRT"

# Naprawa błędu
git commit -m "fix(ssl): popraw walidację certyfikatów expired.badssl.com"

# Dokumentacja
git commit -m "docs: zaktualizuj README z instrukcjami instalacji"

# Refaktoryzacja
git commit -m "refactor(modal): wydziel QR code do osobnego komponentu"

# Breaking change
git commit -m "feat(api)!: zmień format ValidationResult (BREAKING CHANGE)"
```

---

## 🧪 Testowanie

```bash
# Uruchom testy (gdy będą dostępne)
npm test

# Type checking
npm run type-check

# Linting
npm run lint

# Build
npm run build
```

---

## 📚 Dodatkowe Zasoby

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [dane.gov.pl API](https://dane.gov.pl)

---

## ❓ Masz Pytania?

- 📧 Email: [twoj-email@example.com]
- 💬 Discord: [Link do serwera]
- 🐙 GitHub Issues: [Link do issues]

---

## 🙏 Dziękujemy!

Każdy wkład, duży czy mały, jest doceniany. Dziękujemy za pomoc w rozwoju **mWeryfikacja**!

---

<div align="center">

**🛡️ Razem czynimy internet bezpieczniejszym!**

</div>
