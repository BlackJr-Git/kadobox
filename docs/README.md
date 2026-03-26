# 🎁 KadoBox - Plateforme de Cadeaux Personnalisés

> **Mission** : "Je trouve un cadeau rapidement sans réfléchir"  
> **Objectif UX** : L'utilisateur trouve un cadeau en moins de 30 secondes

[![Next.js](https://img.shields.io/badge/Next.js-16.1.7-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.2.1-38B2AC)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn/ui-1.0.0-000000)](https://ui.shadcn.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 📋 Table des Matières

- [🎯 Vue d'Ensemble](#-vue-densemble)
- [🏗️ Architecture Technique](#️-architecture-technique)
- [🚀 Démarrage Rapide](#-démarrage-rapide)
- [⚙️ Configuration](#️-configuration)
- [📁 Structure du Projet](#-structure-du-projet)
- [🎨 Fonctionnalités](#-fonctionnalités)
- [🔧 Développement](#-développement)
- [📊 Dashboard Admin](#-dashboard-admin)
- [🔐 Sécurité](#-sécurité)
- [📈 SEO & Performance](#-seo--performance)
- [🚨 Éléments Manquants](#️-éléments-manquants)
- [🤝 Contribuer](#-contribuer)
- [📄 License](#-license)

---

## 🎯 Vue d'Ensemble

Cadeau Chrono est une plateforme e-commerce spécialisée dans les cadeaux personnalisés pour le marché congolais (RDC). Notre différenciateur principal est la navigation par **occasions** plutôt que par catégories traditionnelles.

### Les 3 Piliers du Business

| Pilier                      | Description                                               |
| --------------------------- | --------------------------------------------------------- |
| **Occasion → Produit**      | Navigation par événement (anniversaire, mariage, Noël...) |
| **Catalogue e-commerce**    | Produits, catégories, filtres, recherche                  |
| **Personnalisation cadeau** | Message, image, emballage, date d'envoi                   |

### Positionnement

KadoBox ≠ e-commerce classique  
**C'est un assistant pour trouver des cadeaux** :

- ✅ Tu **guides** l'utilisateur
- ✅ Tu **simplifies** le choix
- ✅ Tu **proposes** des suggestions

---

## 🏗️ Architecture Technique

### Stack Technologique

| Couche        | Technologie                |
| ------------- | -------------------------- |
| **Framework** | Next.js 16 (App Router)    |
| **UI**        | Tailwind CSS 4 + shadcn/ui |
| **State**     | Zustand                    |
| **Auth**      | Better Auth                |
| **ORM**       | Drizzle ORM                |
| **Database**  | PostgreSQL (Neon)          |
| **Icons**     | Hugeicons                  |
| **Charts**    | Recharts                   |

### Services Externes

| Service      | Fournisseur                 | Usage                         |
| ------------ | --------------------------- | ----------------------------- |
| **Paiement** | Maxicash                    | Checkout, transactions        |
| **Email**    | Resend                      | Transactionnel, notifications |
| **Storage**  | Cloudflare R2 / Uploadthing | Images produits               |
| **Search**   | Meilisearch                 | Recherche produits            |

---

## 🚀 Démarrage Rapide

### Prérequis

- Node.js 18+
- npm ou yarn
- PostgreSQL (Neon recommandé)

### Installation

```bash
# Cloner le projet
git clone https://github.com/your-org/kadobox.git
cd kadobox

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env.local
# Éditer .env.local avec vos clés

# Lancer la base de données
npm run db:push

# Lancer le seed de données
npm run db:seed

# Démarrer le serveur de développement
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

---

## ⚙️ Configuration

### Variables d'Environnement

Créez un fichier `.env.local` avec les variables suivantes :

```env
# Database
DATABASE_URL="postgresql://..."

# Auth
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"

# Payment - Maxicash
MAXICASH_API_URL="https://api.maxicash.co"
MAXICASH_MERCHANT_ID="your-merchant-id"
MAXICASH_SECRET="your-secret"

# Email - Resend
RESEND_API_KEY="re_..."

# Storage - Uploadthing
UPLOADTHING_SECRET="..."
UPLOADTHING_APP_ID="..."

# Search - Meilisearch
MEILISEARCH_HOST="http://localhost:7700"
MEILISEARCH_API_KEY="..."

# App
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

### Scripts Disponibles

```bash
# Développement
npm run dev          # Serveur de développement
npm run build        # Build pour production
npm run start        # Serveur de production

# Base de données
npm run db:push      # Pousser le schéma vers la DB
npm run db:seed      # Peupler la base de données
npm run db:studio    # Ouvrir Drizzle Studio

# Qualité
npm run lint         # ESLint
npm run format       # Prettier
npm run typecheck    # TypeScript
```

---

## 📁 Structure du Projet

```
kadobox/
├── app/                          # Pages Next.js (App Router)
│   ├── (shop)/                   # E-commerce public
│   │   ├── page.tsx              # Home
│   │   ├── occasion/[slug]/      # Pages occasions
│   │   ├── produit/[slug]/       # Fiches produits
│   │   ├── checkout/             # Tunnel de paiement
│   │   └── personnalisation/     # Wizard personnalisation
│   ├── (auth)/                   # Authentification
│   ├── dashboard/                # Admin panel
│   ├── client/                   # Espace client
│   ├── api/                      # API routes
│   └── layout.tsx                # Layout racine
│
├── components/                    # Composants React
│   ├── ui/                       # shadcn/ui components
│   ├── layout/                   # Header, Footer, Sidebar
│   ├── product/                  # ProductCard, ProductGrid
│   ├── cart/                     # CartItem, CartSummary
│   ├── checkout/                 # CheckoutForm, PaymentForm
│   └── dashboard/                # Dashboard components
│
├── lib/                          # Logique métier
│   ├── db.ts                     # Connexion Drizzle
│   ├── auth.ts                   # Config Better Auth
│   ├── schema.ts                 # Schémas Drizzle
│   ├── queries/                  # Fonctions DB réutilisables
│   ├── services/                 # Logique métier
│   └── stores/                   # Zustand stores
│
├── public/                       # Assets statiques
├── drizzle/                      # Config Drizzle
└── docs/                         # Documentation
```

---

## 🎨 Fonctionnalités

### ✅ Fonctionnalités Implémentées

#### E-commerce Core

- ✅ **Catalogue produits** avec pagination et filtres
- ✅ **Navigation par occasions** (différenciateur clé)
- ✅ **Fiches produits détaillées**
- ✅ **Panier** avec persistance
- ✅ **Checkout** multi-étapes
- ✅ **Personnalisation cadeau** (wizard complet)

#### Gestion Catalogue

- ✅ **Produits** avec images, variantes, stock
- ✅ **Catégories** hiérarchiques
- ✅ **Occasions** avec icônes et couleurs
- ✅ **Bundles/Coffrets** avec prix spécial
- ✅ **Cartes cadeaux** avec codes uniques

#### Utilisateurs & Auth

- ✅ **Authentification** (Better Auth)
- ✅ **Rôles** (admin/client)
- ✅ **Espace client** avec historique
- ✅ **Wishlist** partagée
- ✅ **Avis clients** avec notes

#### Dashboard Admin

- ✅ **Vue d'ensemble** avec KPIs
- ✅ **Liste produits** (lecture seule)
- ✅ **Liste commandes** avec statuts
- ✅ **Liste clients** avec rôles
- ✅ **Graphiques** de tendances

#### SEO & Performance

- ✅ **Métadonnées** Open Graph & Twitter
- ✅ **Sitemap** dynamique
- ✅ **Robots.txt** configuré
- ✅ **JSON-LD** pour produits (Schema.org)
- ✅ **Optimisation images** (next/image)

### 🚨 Fonctionnalités Manquantes Critiques

#### Dashboard Admin (P0)

- ❌ **CRUD Produits** (créer, modifier, supprimer)
- ❌ **Détail commande** et gestion statut
- ❌ **Pagination** sur toutes les listes
- ❌ **Filtres** et recherche
- ❌ **Gestion occasions/categories**
- ❌ **Exports** (CSV, PDF)

#### Configuration & Sécurité (P0)

- ❌ **Tests** unitaires et d'intégration
- ❌ **Rate limiting** sur API sensibles
- ❌ **Pages d'erreur** personnalisées
- ❌ **Monitoring** (Sentry)
- ❌ **Documentation** développeur

#### Services Externes (P1)

- ❌ **Uploadthing** pour images
- ❌ **Meilisearch** pour recherche
- ❌ **Webhooks Maxicash** à tester
- ❌ **Analytics** (Google Analytics)

#### UX/Performance (P1)

- ❌ **Loading states** complets
- ❌ **Audit accessibilité**
- ❌ **PWA** support
- ❌ **CI/CD** pipeline

---

## 🔧 Développement

### Ajouter des Composants shadcn/ui

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add form
```

### Base de Données

#### Nouvelle Table

```typescript
// lib/schema.ts
export const nouvelleTable = pgTable("nouvelle_table", {
  id: text("id").primaryKey(),
  // ... colonnes
})
```

#### Migration

```bash
npm run db:push  # Push vers la DB
npm run db:studio  # Visualiser
```

#### Seed Data

```typescript
// lib/seed.ts
await db.insert(nouvelleTable).values([
  // ... données
])
```

### API Routes

```typescript
// app/api/mon-endpoint/route.ts
import { db } from "@/lib/db"
import { maTable } from "@/lib/schema"

export async function GET() {
  const data = await db.query.maTable.findMany()
  return Response.json(data)
}

export async function POST(request: Request) {
  const body = await request.json()
  const data = await db.insert(maTable).values(body)
  return Response.json(data)
}
```

### Styles & Thème

Le projet utilise **Tailwind CSS 4** avec un thème personnalisé :

```css
/* app/globals.css */
:root {
  --primary: oklch(0.627 0.265 323.06);
  --secondary: oklch(0.905 0.025 323.06);
  /* ... */
}
```

---

## 📊 Dashboard Admin

### Accès

Le dashboard est accessible uniquement aux utilisateurs avec `role = "admin"` :

- URL : `/dashboard`
- Protection : Middleware dans `app/dashboard/layout.tsx`

### Pages Actuelles

| Page                   | Statut | Fonctionnalités                  |
| ---------------------- | ------ | -------------------------------- |
| `/dashboard`           | ✅     | Vue d'ensemble, KPIs, graphiques |
| `/dashboard/produits`  | ✅     | Liste produits (lecture seule)   |
| `/dashboard/commandes` | ✅     | Liste commandes avec statuts     |
| `/dashboard/clients`   | ✅     | Liste clients avec rôles         |

### Pages à Créer (Urgent)

| Page                            | Priorité | Description                 |
| ------------------------------- | -------- | --------------------------- |
| `/dashboard/produits/nouveau`   | **P0**   | Formulaire création produit |
| `/dashboard/produits/[id]/edit` | **P0**   | Formulaire édition produit  |
| `/dashboard/commandes/[id]`     | **P0**   | Détail commande             |
| `/dashboard/occasions`          | P1       | CRUD occasions              |
| `/dashboard/categories`         | P1       | CRUD catégories             |
| `/dashboard/parametres`         | P1       | Configuration site          |

### Composants Manquants

```tsx
// À créer :
components/dashboard/
├── data-table.tsx          // Table avec tri/filtres/pagination
├── product-form.tsx        // Formulaire produit
├── order-actions.tsx       // Actions commande
├── filters/
│   ├── status-filter.tsx
│   └── date-range-filter.tsx
└── exports/
    ├── csv-export.tsx
    └── pdf-invoice.tsx
```

---

## 🔐 Sécurité

### Authentification

- ✅ **Better Auth** avec sessions sécurisées
- ✅ **Rôles** admin/client avec protection middleware
- ✅ **CSRF protection** activée
- ✅ **Cookies HttpOnly + Secure**

### Validation

- ✅ **Zod** pour validation des inputs
- ✅ **TypeScript** pour type safety
- ⚠️ **Rate limiting** à implémenter
- ⚠️ **Sanitization** à renforcer

### Paiement

- ✅ **HTTPS** obligatoire en production
- ✅ **Pas de stockage** données carte
- ✅ **Webhooks signés** (Maxicash)
- ✅ **Logs transactions**

---

## 📈 SEO & Performance

### Optimisations Actuelles

- ✅ **Next.js 16** avec App Router
- ✅ **Images optimisées** (next/image)
- ✅ **Code splitting** automatique
- ✅ **Métadonnées** dynamiques
- ✅ **Sitemap** XML automatique

### À Améliorer

- ⚠️ **ISR** pour pages produits
- ⚠️ **Lazy loading** explicite
- ⚠️ **Bundle size** optimisation
- ❌ **Core Web Vitals** monitoring

### Métadonnées

```typescript
// Exemple pour page produit
export const metadata: Metadata = {
  title: "Nom du produit | KadoBox",
  description: "Description du produit...",
  openGraph: {
    title: "Nom du produit | KadoBox",
    description: "Description du produit...",
    images: ["/og-image.jpg"],
  },
}
```

---

## 🚨 Roadmap - Éléments Manquants

### Phase 1: Critique (Avant Production)

**Dashboard Admin** (2-3 semaines)

1. ✅ CRUD Produits complet
2. ✅ Gestion commandes (détail + statut)
3. ✅ Pagination & filtres sur toutes les listes
4. ✅ Recherche globale
5. ✅ Exports CSV/PDF

**Configuration** (1 semaine) 6. ✅ Tests unitaires (Jest/Vitest) 7. ✅ Rate limiting (Upstash) 8. ✅ Pages d'erreur personnalisées 9. ✅ Monitoring (Sentry) 10. ✅ `.env.example` et documentation

### Phase 2: Important (Post-Launch)

**Services** (2 semaines) 11. ✅ Uploadthing pour images 12. ✅ Meilisearch pour recherche 13. ✅ Webhooks Maxicash testés 14. ✅ Analytics (Google Analytics)

**Fonctionnalités** (2 semaines) 15. ✅ CRUD Occasions/Catégories 16. ✅ CRUD Bundles/Cartes cadeaux 17. ✅ Gestion Avis clients 18. ✅ Paramètres du site

### Phase 3: Amélioration Continue

**UX/Performance** (1 semaine) 19. ✅ Loading states complets 20. ✅ Audit accessibilité (axe) 21. ✅ PWA support 22. ✅ CI/CD pipeline

**Avancé** (2 semaines) 23. ✅ Mode B2B/Entreprise 24. ✅ Recommandations intelligentes 25. ✅ Multi-langue 26. ✅ App mobile (React Native)

---

## 🤝 Contribuer

### Prérequis

1. Fork le projet
2. Créer une branche feature : `git checkout -b feature/nouvelle-fonctionnalite`
3. Installer les dépendances : `npm install`
4. Configurer `.env.local`

### Développement

```bash
# Lancer le développement
npm run dev

# Vérifier le code
npm run lint
npm run typecheck
npm run format

# Tests
npm run test  # À implémenter
```

### Pull Request

1. Faire les changements
2. Ajouter les tests si nécessaire
3. Passer les vérifications
4. Créer la PR avec description claire

### Conventions

- **Code Style** : Prettier + ESLint
- **Commits** : Conventional Commits
- **Branches** : `feature/`, `fix/`, `docs/`
- **Components** : PascalCase
- **Variables** : camelCase

---

## 📄 License

Ce projet est sous license **MIT** - voir le fichier [LICENSE](LICENSE) pour les détails.

---

## 📞 Support

- **Email** : support@kadobox.com
- **Documentation** : [docs/](docs/)
- **Issues** : [GitHub Issues](https://github.com/your-org/kadobox/issues)
- **Discord** : [Serveur Discord](https://discord.gg/kadobox)

---

## 🙏 Remerciements

- **Next.js** - Framework React
- **shadcn/ui** - Composants UI
- **Tailwind CSS** - Framework CSS
- **Drizzle ORM** - ORM TypeScript
- **Neon** - Database PostgreSQL
- **Better Auth** - Authentification moderne

---

<div align="center">
  <p>Fait avec ❤️ pour les cadeaux congolais</p>
  <p>© 2024 KadoBox. Tous droits réservés.</p>
</div>
