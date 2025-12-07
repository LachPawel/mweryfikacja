# 🚀 Deployment Guide - mWeryfikacja

Instrukcje wdrożenia aplikacji **mWeryfikacja** na różne platformy.

---

## 📋 Spis Treści

- [Wymagania](#wymagania)
- [Build Production](#build-production)
- [Vercel](#vercel)
- [Netlify](#netlify)
- [GitHub Pages](#github-pages)
- [Docker](#docker)
- [AWS](#aws)
- [Zmienne Środowiskowe](#zmienne-środowiskowe)

---

## ✅ Wymagania

Przed wdrożeniem upewnij się, że masz:

- Node.js 18+ 
- npm lub yarn
- Git
- Konto na platformie deployment (Vercel/Netlify/etc.)

---

## 🏗️ Build Production

### 1. Instalacja Dependencies

```bash
npm install
```

### 2. Build

```bash
npm run build
```

To utworzy folder `dist/` z zoptymalizowaną aplikacją.

### 3. Preview Build

```bash
npm run preview
```

Przetestuj build lokalnie przed wdrożeniem.

---

## ▲ Vercel (Zalecane)

### Metoda 1: Vercel CLI

```bash
# Zainstaluj Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Production deploy
vercel --prod
```

### Metoda 2: GitHub Integration

1. Push kod do GitHub
2. Przejdź do [vercel.com](https://vercel.com)
3. **New Project** → Import z GitHub
4. Wybierz repozytorium `mweryfikacja`
5. Vercel auto-wykryje Vite
6. Kliknij **Deploy**

### Konfiguracja Vercel

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## 🌐 Netlify

### Metoda 1: Netlify CLI

```bash
# Zainstaluj Netlify CLI
npm i -g netlify-cli

# Login
netlify login

# Deploy
netlify deploy

# Production deploy
netlify deploy --prod
```

### Metoda 2: GitHub Integration

1. Push kod do GitHub
2. Przejdź do [netlify.com](https://netlify.com)
3. **New site from Git** → Connect GitHub
4. Wybierz repozytorium `mweryfikacja`
5. Ustawienia:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. Kliknij **Deploy site**

### Konfiguracja Netlify

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## 📄 GitHub Pages

### 1. Zainstaluj gh-pages

```bash
npm install --save-dev gh-pages
```

### 2. Dodaj Scripts do package.json

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

### 3. Konfiguracja Vite

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/mweryfikacja/' // Nazwa repo
})
```

### 4. Deploy

```bash
npm run deploy
```

### 5. Konfiguracja GitHub

1. Przejdź do **Settings** → **Pages**
2. Source: **gh-pages branch**
3. Zapisz

Aplikacja będzie dostępna pod: `https://username.github.io/mweryfikacja/`

---

## 🐳 Docker

### 1. Dockerfile

```dockerfile
# Dockerfile
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci

# Copy source
COPY . .

# Build
RUN npm run build

# Production image
FROM nginx:alpine

# Copy built files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
```

### 2. nginx.conf

```nginx
server {
    listen 80;
    server_name localhost;
    
    root /usr/share/nginx/html;
    index index.html;
    
    # Gzip compression
    gzip on;
    gzip_types text/css application/javascript application/json;
    
    # SPA routing
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### 3. Build & Run

```bash
# Build image
docker build -t mweryfikacja:latest .

# Run container
docker run -p 8080:80 mweryfikacja:latest

# Access at http://localhost:8080
```

### 4. Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "8080:80"
    restart: unless-stopped
```

```bash
# Start
docker-compose up -d

# Stop
docker-compose down
```

---

## ☁️ AWS (Amazon Web Services)

### Opcja 1: AWS Amplify

1. Push kod do GitHub
2. Przejdź do [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
3. **New app** → **Host web app** → Connect GitHub
4. Wybierz repozytorium
5. Build settings:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: dist
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```
6. Save and deploy

### Opcja 2: S3 + CloudFront

```bash
# 1. Build
npm run build

# 2. Upload do S3
aws s3 sync dist/ s3://your-bucket-name --delete

# 3. Invalidate CloudFront cache
aws cloudfront create-invalidation \
  --distribution-id YOUR_DISTRIBUTION_ID \
  --paths "/*"
```

---

## 🔐 Zmienne Środowiskowe

### Development (.env.development)

```bash
# Development environment
VITE_APP_ENV=development
VITE_API_URL=http://localhost:3000
VITE_ENABLE_DEBUG=true
```

### Production (.env.production)

```bash
# Production environment
VITE_APP_ENV=production
VITE_API_URL=https://api.mweryfikacja.gov.pl
VITE_ENABLE_DEBUG=false
VITE_SENTRY_DSN=https://your-sentry-dsn
```

### Użycie w kodzie

```typescript
// Dostęp do zmiennych środowiskowych
const apiUrl = import.meta.env.VITE_API_URL;
const isDev = import.meta.env.VITE_APP_ENV === 'development';

console.log('API URL:', apiUrl);
```

### Konfiguracja Platform

**Vercel:**
- Settings → Environment Variables
- Dodaj: `VITE_API_URL`, `VITE_SENTRY_DSN`, etc.

**Netlify:**
- Site settings → Build & deploy → Environment
- Dodaj zmienne

**GitHub Actions:**
```yaml
env:
  VITE_API_URL: ${{ secrets.VITE_API_URL }}
```

---

## 🔍 Health Check

Po wdrożeniu sprawdź:

### 1. Dostępność

```bash
curl https://your-domain.com
# Powinno zwrócić HTML
```

### 2. SSL/TLS

```bash
curl -I https://your-domain.com
# Sprawdź header: Strict-Transport-Security
```

### 3. Performance

- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [WebPageTest](https://www.webpagetest.org/)
- [GTmetrix](https://gtmetrix.com/)

### 4. Security Headers

```bash
curl -I https://your-domain.com

# Oczekiwane headery:
# X-Frame-Options: DENY
# X-Content-Type-Options: nosniff
# Referrer-Policy: strict-origin-when-cross-origin
# Content-Security-Policy: default-src 'self'
```

---

## 📊 Monitoring

### 1. Error Tracking (Sentry)

```bash
npm install @sentry/react
```

```typescript
// main.tsx
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  environment: import.meta.env.VITE_APP_ENV,
  tracesSampleRate: 1.0,
});
```

### 2. Analytics (Google Analytics)

```bash
npm install react-ga4
```

```typescript
import ReactGA from 'react-ga4';

ReactGA.initialize('G-XXXXXXXXXX');
ReactGA.send("pageview");
```

---

## 🚨 Troubleshooting

### Blank page po deploymencie

**Problem:** Aplikacja pokazuje pustą stronę  
**Rozwiązanie:** Sprawdź `base` w `vite.config.ts`

```typescript
export default defineConfig({
  base: '/', // Zmień na '/subdirectory/' jeśli nie root
})
```

### 404 przy odświeżeniu strony

**Problem:** SPA routing nie działa  
**Rozwiązanie:** Dodaj redirects/rewrites

**Vercel:**
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

**Netlify:**
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Assets nie ładują się

**Problem:** CSS/JS 404  
**Rozwiązanie:** Sprawdź ścieżki w buildzie

```bash
# Sprawdź dist/
ls -la dist/

# Sprawdź index.html
cat dist/index.html | grep '<script'
```

---

## 📚 Dodatkowe Zasoby

- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com/)
- [AWS Amplify Documentation](https://docs.amplify.aws/)

---

## ✅ Checklist Pre-Deployment

- [ ] Uruchom `npm run build` lokalnie - brak błędów
- [ ] Przetestuj `npm run preview` - aplikacja działa
- [ ] Sprawdź `console.log` - usuń debug logs
- [ ] Sprawdź `.env` - nie commituj secretów
- [ ] Zaktualizuj `README.md` z live URL
- [ ] Skonfiguruj zmienne środowiskowe na platformie
- [ ] Dodaj custom domain (opcjonalnie)
- [ ] Skonfiguruj SSL certificate
- [ ] Włącz monitoring/analytics
- [ ] Test deployment na staging przed production

---

<div align="center">

**🚀 Gotowy do startu!**

[README](./README.md) • [Contributing](./CONTRIBUTING.md) • [License](./LICENSE)

</div>
