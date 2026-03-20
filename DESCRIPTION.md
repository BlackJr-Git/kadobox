# KDOBOX - Documentation Projet

> **Mission** : "Je trouve un cadeau rapidement sans réfléchir"
>
> **Objectif UX** : L'utilisateur trouve un cadeau en moins de 30 secondes

---

## 1. Vision Produit

### 1.1 Les 3 Piliers

| Pilier                      | Description                                               |
| --------------------------- | --------------------------------------------------------- |
| **Occasion → Produit**      | Navigation par événement (anniversaire, mariage, Noël...) |
| **Catalogue e-commerce**    | Produits, catégories, filtres, recherche                  |
| **Personnalisation cadeau** | Message, image, emballage, date d'envoi                   |

### 1.2 Positionnement

KDOBOX ≠ e-commerce classique

**C'est un assistant pour trouver des cadeaux** :

- Tu **guides** l'utilisateur
- Tu **simplifies** le choix
- Tu **proposes** des suggestions

---

## 2. Architecture Technique

### 2.1 Stack Technologique

| Couche        | Technologie                |
| ------------- | -------------------------- |
| **Framework** | Next.js 16 (App Router)    |
| **UI**        | Tailwind CSS 4 + shadcn/ui |
| **State**     | Zustand                    |
| **Auth**      | Better Auth                |
| **ORM**       | Drizzle ORM                |
| **Database**  | PostgreSQL (Neon)          |
| **Icons**     | Hugeicons                  |

### 2.2 Services Externes

| Service      | Fournisseur                 | Usage                         |
| ------------ | --------------------------- | ----------------------------- |
| **Paiement** | Maxicash                    | Checkout, transactions        |
| **Email**    | Resend                      | Transactionnel, notifications |
| **Storage**  | Cloudflare R2 / Uploadthing | Images produits               |
| **Search**   | Meilisearch                 | Recherche produits            |

### 2.3 Structure des Dossiers

```
app/
├── (marketing)/                    # Pages publiques
│   ├── page.tsx                    # Home
│   ├── about/page.tsx
│   └── contact/page.tsx
│
├── (shop)/                         # E-commerce
│   ├── occasion/[slug]/page.tsx    # Navigation par occasion
│   ├── categorie/[slug]/page.tsx   # Navigation par catégorie
│   ├── produit/[slug]/page.tsx     # Fiche produit
│   ├── panier/page.tsx             # Panier
│   ├── checkout/page.tsx           # Tunnel de paiement
│   └── personnalisation/page.tsx   # Wizard personnalisation
│
├── (auth)/                         # Authentification
│   ├── login/page.tsx
│   ├── signup/page.tsx
│   └── forgot-password/page.tsx
│
├── dashboard/                      # Espace client
│   ├── page.tsx                    # Overview
│   ├── commandes/page.tsx          # Historique commandes
│   ├── profil/page.tsx             # Paramètres compte
│   └── cartes-cadeaux/page.tsx     # Mes cartes cadeaux
│
├── admin/                          # Back-office (si nécessaire)
│   ├── produits/
│   ├── commandes/
│   └── clients/
│
└── api/
    ├── auth/[...all]/route.ts      # Better Auth handler
    ├── products/route.ts
    ├── orders/route.ts
    ├── cart/route.ts
    └── webhooks/
        ├── maxicash/route.ts
        └── resend/route.ts

lib/
├── db.ts                           # Connexion Drizzle
├── auth.ts                         # Config Better Auth
├── auth-client.ts                  # Client auth React
├── schema.ts                       # Schémas Drizzle
├── utils.ts                        # Utilitaires
│
├── queries/                        # Fonctions DB réutilisables
│   ├── products.ts
│   ├── occasions.ts
│   ├── categories.ts
│   ├── orders.ts
│   └── users.ts
│
├── services/                       # Logique métier
│   ├── cart.ts
│   ├── payment.ts
│   ├── email.ts
│   └── recommendations.ts
│
└── stores/                         # Zustand stores
    ├── cart-store.ts
    ├── filter-store.ts
    └── customization-store.ts

components/
├── ui/                             # shadcn/ui components
├── layout/                         # Header, Footer, Sidebar
├── product/                        # ProductCard, ProductGrid
├── cart/                           # CartItem, CartSummary
├── checkout/                       # CheckoutForm, PaymentForm
└── customization/                  # CustomizationWizard steps
```

---

## 3. Modélisation Base de Données

### 3.1 Schéma Entités

```
┌─────────────────────────────────────────────────────────────────┐
│                         UTILISATEURS                            │
├─────────────────────────────────────────────────────────────────┤
│  user              │ Utilisateurs (Better Auth)                 │
│  session           │ Sessions actives                           │
│  account           │ Comptes OAuth                              │
│  verification      │ Tokens de vérification                     │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                          CATALOGUE                              │
├─────────────────────────────────────────────────────────────────┤
│  product           │ Produits                                   │
│  category          │ Catégories (hiérarchiques)                 │
│  occasion          │ Occasions (anniversaire, mariage...)       │
│  product_category  │ Relation Product ↔ Category (M:N)          │
│  product_occasion  │ Relation Product ↔ Occasion (M:N)          │
│  product_image     │ Images produit                             │
│  product_variant   │ Variantes (taille, couleur...)             │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                          COMMANDES                              │
├─────────────────────────────────────────────────────────────────┤
│  order             │ Commandes                                  │
│  order_item        │ Lignes de commande                         │
│  gift_customization│ Personnalisation cadeau                    │
│  shipping_address  │ Adresses de livraison                      │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                         AVANCÉ                                  │
├─────────────────────────────────────────────────────────────────┤
│  review            │ Avis clients                               │
│  gift_card         │ Cartes cadeaux                             │
│  bundle            │ Coffrets cadeaux                           │
│  bundle_product    │ Produits dans un coffret                   │
│  wishlist          │ Liste de souhaits                          │
│  wishlist_item     │ Produits dans wishlist                     │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Détail des Tables

#### Product

| Colonne          | Type          | Description                   |
| ---------------- | ------------- | ----------------------------- |
| id               | text (PK)     | Identifiant unique            |
| name             | text          | Nom du produit                |
| slug             | text (unique) | URL-friendly name             |
| description      | text          | Description longue            |
| shortDescription | text          | Description courte            |
| price            | decimal       | Prix en CDF                   |
| compareAtPrice   | decimal       | Prix barré (promo)            |
| sku              | text          | Référence produit             |
| stock            | integer       | Quantité en stock             |
| isActive         | boolean       | Publié ou non                 |
| isFeatured       | boolean       | Mis en avant                  |
| gender           | enum          | homme, femme, unisexe, enfant |
| ageRange         | text          | Tranche d'âge cible           |
| createdAt        | timestamp     | Date création                 |
| updatedAt        | timestamp     | Date modification             |

#### Occasion (CLÉ DU BUSINESS)

| Colonne     | Type          | Description                    |
| ----------- | ------------- | ------------------------------ |
| id          | text (PK)     | Identifiant unique             |
| name        | text          | Nom (Anniversaire, Mariage...) |
| slug        | text (unique) | URL-friendly                   |
| description | text          | Description                    |
| icon        | text          | Emoji ou nom d'icône           |
| color       | text          | Couleur hex pour UI            |
| image       | text          | Image de couverture            |
| sortOrder   | integer       | Ordre d'affichage              |
| isActive    | boolean       | Visible ou non                 |

#### Category

| Colonne     | Type          | Description                    |
| ----------- | ------------- | ------------------------------ |
| id          | text (PK)     | Identifiant unique             |
| name        | text          | Nom                            |
| slug        | text (unique) | URL-friendly                   |
| description | text          | Description                    |
| parentId    | text (FK)     | Catégorie parente (hiérarchie) |
| image       | text          | Image de couverture            |
| sortOrder   | integer       | Ordre d'affichage              |

#### Order

| Colonne           | Type          | Description                                              |
| ----------------- | ------------- | -------------------------------------------------------- |
| id                | text (PK)     | Identifiant unique                                       |
| orderNumber       | text (unique) | Numéro commande (KDB-XXXXX)                              |
| userId            | text (FK)     | Client                                                   |
| status            | enum          | pending, paid, processing, shipped, delivered, cancelled |
| subtotal          | decimal       | Sous-total                                               |
| shippingCost      | decimal       | Frais de livraison                                       |
| total             | decimal       | Total TTC                                                |
| shippingAddressId | text (FK)     | Adresse livraison                                        |
| notes             | text          | Notes client                                             |
| paidAt            | timestamp     | Date paiement                                            |
| shippedAt         | timestamp     | Date expédition                                          |
| deliveredAt       | timestamp     | Date livraison                                           |
| createdAt         | timestamp     | Date création                                            |

#### GiftCustomization

| Colonne       | Type      | Description               |
| ------------- | --------- | ------------------------- |
| id            | text (PK) | Identifiant unique        |
| orderItemId   | text (FK) | Ligne de commande         |
| message       | text      | Message personnalisé      |
| senderName    | text      | Nom de l'expéditeur       |
| recipientName | text      | Nom du destinataire       |
| image         | text      | Image uploadée            |
| wrappingType  | enum      | standard, premium, luxury |
| deliveryDate  | date      | Date d'envoi souhaitée    |
| isGift        | boolean   | Masquer le prix           |

#### GiftCard

| Colonne        | Type          | Description                  |
| -------------- | ------------- | ---------------------------- |
| id             | text (PK)     | Identifiant unique           |
| code           | text (unique) | Code unique (KBOX-XXXX-XXXX) |
| initialBalance | decimal       | Montant initial              |
| currentBalance | decimal       | Solde actuel                 |
| purchasedById  | text (FK)     | Acheteur                     |
| redeemedById   | text (FK)     | Utilisateur                  |
| expiresAt      | timestamp     | Date expiration              |
| isActive       | boolean       | Active ou non                |

#### Bundle (Coffrets)

| Colonne      | Type          | Description           |
| ------------ | ------------- | --------------------- |
| id           | text (PK)     | Identifiant unique    |
| name         | text          | Nom du coffret        |
| slug         | text (unique) | URL-friendly          |
| description  | text          | Description           |
| regularPrice | decimal       | Prix si achat séparé  |
| bundlePrice  | decimal       | Prix coffret (remise) |
| image        | text          | Image                 |
| isActive     | boolean       | Disponible            |

### 3.3 Relations Clés

```
Product ←→ Occasion     (ManyToMany via product_occasion)
Product ←→ Category     (ManyToMany via product_category)
Product ←→ ProductImage (OneToMany)
Product ←→ Review       (OneToMany)

Order ←→ OrderItem      (OneToMany)
OrderItem ←→ GiftCustomization (OneToOne)

User ←→ Order           (OneToMany)
User ←→ Review          (OneToMany)
User ←→ Wishlist        (OneToOne)

Bundle ←→ Product       (ManyToMany via bundle_product)
```

---

## 4. Features

### 4.1 MVP (Core Features)

#### Catalogue Produits

- Liste des produits avec pagination
- Filtres : prix, catégorie, genre, occasion
- Recherche full-text
- Tri : prix, popularité, nouveautés
- Fiche produit détaillée

#### Navigation par Occasion (DIFFÉRENCIATEUR)

- Page `/occasion/[slug]` pour chaque occasion
- Grille de produits filtrée
- Suggestions contextuelles
- Routes :
  - `/occasion/anniversaire`
  - `/occasion/mariage`
  - `/occasion/noel`
  - `/occasion/fete-des-meres`
  - `/occasion/saint-valentin`

#### Personnalisation Cadeau (GAME CHANGER)

- Wizard multi-étapes :
  1. Choix du produit
  2. Message personnalisé (textarea + preview)
  3. Upload image (optionnel)
  4. Choix emballage (standard, premium, luxury)
  5. Date d'envoi souhaitée
  6. Récapitulatif + paiement

#### Panier

- Ajout/suppression produits
- Modification quantités
- Persistance (localStorage + DB si connecté)
- Calcul automatique totaux

#### Paiement

- Intégration Maxicash
- Checkout sécurisé
- Confirmation par email

#### Commandes

- Historique commandes
- Suivi statut en temps réel
- Détails commande

### 4.2 Features Avancées (Post-MVP)

#### Coffrets Cadeaux (Bundles)

- Groupement de produits
- Prix spécial (remise)
- Page dédiée `/coffrets`

#### Cartes Cadeaux

- Achat de cartes cadeaux
- Code unique généré
- Solde et expiration
- Utilisation au checkout

#### Recommandation Intelligente

- Quiz interactif :
  - "Pour qui cherches-tu ?"
  - "Quel est ton budget ?"
  - "Quelle occasion ?"
- Output : produits recommandés
- Algorithme basé sur :
  - Historique achats
  - Produits similaires
  - Best sellers par occasion

#### Mode Entreprise (B2B)

- Commandes en masse
- Personnalisation avec logo entreprise
- Facturation entreprise
- Compte dédié
- Tarifs dégressifs

#### Avis Clients

- Notes et commentaires
- Photos clients
- Modération

#### Wishlist

- Sauvegarde produits favoris
- Partage de liste

---

## 5. UX/UI

### 5.1 Direction Artistique

#### Style Global

- **Moderne** : Design épuré, typographie claire
- **Minimaliste** : Pas de surcharge visuelle
- **Chaleureux** : Couleurs accueillantes, émotionnel

#### Inspirations

| Site   | Ce qu'on prend                       |
| ------ | ------------------------------------ |
| Apple  | Clean, espaces blancs, focus produit |
| Airbnb | Navigation guidée, UX fluide         |
| Amazon | Efficacité, conversion optimisée     |

#### Palette de Couleurs

| Variable       | Usage                | Valeur                    |
| -------------- | -------------------- | ------------------------- |
| `--primary`    | CTA, accents         | Magenta/Rose (oklch 323°) |
| `--secondary`  | Éléments secondaires | Gris neutre               |
| `--accent`     | Highlights, badges   | Or/Orange (à ajouter)     |
| `--background` | Fond                 | Blanc                     |
| `--foreground` | Texte                | Noir                      |

### 5.2 Structure Home Page

```
┌─────────────────────────────────────────────────────────────────┐
│                           HEADER                                │
│  Logo | Navigation | Search | Cart | Account                    │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                         HERO SECTION                            │
│                                                                 │
│     "Trouve le cadeau parfait en 30 secondes"                   │
│                                                                 │
│     [Sous-titre émotionnel]                                     │
│                                                                 │
│     [ Commencer → ]                                             │
│                                                                 │
│     [Illustration / Animation]                                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    SECTION OCCASIONS                            │
│                                                                 │
│  🎂 Anniversaire  💒 Mariage  🎄 Noël  💝 Saint-Valentin       │
│                                                                 │
│  🌸 Fête des mères  👔 Fête des pères  🎓 Diplôme  ...         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    SECTION BEST SELLERS                         │
│                                                                 │
│  [Carousel horizontal de produits]                              │
│  ← ProductCard | ProductCard | ProductCard | ProductCard →      │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    SECTION PAR BUDGET                           │
│                                                                 │
│  [ < 20€ ]  [ 20-50€ ]  [ 50-100€ ]  [ > 100€ ]                │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    SECTION IDÉES CADEAUX                        │
│                                                                 │
│  👨 Pour lui    👩 Pour elle    👶 Pour enfant                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    SECTION COFFRETS                             │
│                                                                 │
│  [Cards coffrets avec prix barrés]                              │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                         FOOTER                                  │
│  Liens | Réseaux | Newsletter | Paiement | Légal                │
└─────────────────────────────────────────────────────────────────┘
```

### 5.3 UX Flow Idéal

```
User arrive sur Home
        │
        ▼
Choisit une OCCASION (ou utilise le quiz)
        │
        ▼
Filtre par BUDGET / GENRE
        │
        ▼
Voit les SUGGESTIONS
        │
        ▼
Clique sur un PRODUIT
        │
        ▼
Ajoute au PANIER
        │
        ▼
Lance la PERSONNALISATION (wizard)
        │
        ├── Message personnalisé
        ├── Upload image (optionnel)
        ├── Choix emballage
        └── Date d'envoi
        │
        ▼
CHECKOUT + PAIEMENT
        │
        ▼
Confirmation + Email
```

### 5.4 Principes de Design

| Principe       | Application                              |
| -------------- | ---------------------------------------- |
| **Guidé**      | L'utilisateur est accompagné, pas perdu  |
| **Rapide**     | Minimum de clics pour acheter            |
| **Visuel**     | Images de qualité, peu de texte          |
| **Émotionnel** | Copywriting qui touche, micro-animations |

---

## 6. SEO

### 6.1 Mots-clés Cibles

| Catégorie        | Exemples                                            |
| ---------------- | --------------------------------------------------- |
| **Par occasion** | cadeau anniversaire, idée cadeau mariage            |
| **Par genre**    | cadeau homme, cadeau femme, cadeau enfant           |
| **Par type**     | cadeau original, cadeau personnalisé                |
| **Combinés**     | cadeau anniversaire homme, idée cadeau femme 30 ans |

### 6.2 Structure URLs SEO-Friendly

```
/                                    # Home
/occasion/anniversaire               # Occasion
/occasion/anniversaire?genre=homme   # Occasion + filtre
/categorie/bijoux                    # Catégorie
/produit/montre-elegante-homme       # Fiche produit
/coffret/coffret-bien-etre           # Coffret
/cadeau/anniversaire/homme           # Landing SEO
/cadeau/noel/femme                   # Landing SEO
```

### 6.3 Optimisations Techniques

- **generateMetadata()** : Meta dynamiques par page
- **generateStaticParams()** : Pré-rendu pages produits/occasions
- **sitemap.ts** : Sitemap XML automatique
- **robots.ts** : Configuration crawlers
- **Structured Data** : JSON-LD pour produits (Schema.org)

---

## 7. Performance

### 7.1 Stratégies Next.js

| Technique     | Usage                               |
| ------------- | ----------------------------------- |
| **SSG**       | Pages statiques (home, about)       |
| **ISR**       | Pages produits (revalidate: 3600)   |
| **SSR**       | Pages dynamiques (panier, checkout) |
| **Streaming** | Chargement progressif               |

### 7.2 Optimisations

- **Images** : next/image avec optimisation automatique
- **Lazy loading** : Composants et images hors viewport
- **Code splitting** : Bundles par route
- **Caching** : Headers cache appropriés
- **CDN** : Assets statiques sur edge

---

## 8. Sécurité

### 8.1 Authentification

- Better Auth avec sessions sécurisées
- Rate limiting sur endpoints auth
- CSRF protection activée
- Cookies HttpOnly + Secure

### 8.2 Données

- Validation Zod sur tous les inputs
- Sanitization des données utilisateur
- Prepared statements (Drizzle)
- Encryption données sensibles

### 8.3 Paiement

- HTTPS obligatoire
- Pas de stockage données carte
- Webhooks signés (Maxicash)
- Logs transactions

---

## 9. Roadmap

### Phase 1 : MVP (4-6 semaines)

| Semaine | Tâches                                            |
| ------- | ------------------------------------------------- |
| S1      | Schéma DB complet, seed data                      |
| S2      | Pages catalogue (produits, occasions, catégories) |
| S3      | Panier + Zustand, fiche produit                   |
| S4      | Checkout + intégration Maxicash                   |
| S5      | Personnalisation cadeau (wizard)                  |
| S6      | Tests, polish, déploiement                        |

### Phase 2 : Growth (4 semaines)

- Coffrets cadeaux
- Cartes cadeaux
- Avis clients
- Wishlist
- SEO avancé

### Phase 3 : Scale (4 semaines)

- Recommandations intelligentes
- Mode B2B
- Analytics avancés
- App mobile (React Native)

---

## 10. Priorités

| Priorité | Tâche                                         | Impact          |
| -------- | --------------------------------------------- | --------------- |
| P0       | Schéma DB complet                             | Bloquant        |
| P0       | Home page avec sections Occasions             | Différenciateur |
| P0       | Pages `/occasion/[slug]` et `/produit/[slug]` | Core business   |
| P1       | Panier + Zustand                              | Conversion      |
| P1       | Checkout + Maxicash                           | Revenue         |
| P2       | Wizard personnalisation cadeau                | Game changer    |
| P2       | SEO dynamique + sitemap                       | Acquisition     |
| P3       | Coffrets / Cartes cadeaux                     | Upsell          |
| P3       | Mode B2B                                      | Revenue B2B     |
