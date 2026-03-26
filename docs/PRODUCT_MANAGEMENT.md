# Gestion des Produits - Dashboard Admin

## 📋 Vue d'ensemble

Le système de gestion des produits permet aux administrateurs de créer, modifier et supprimer des produits via le dashboard admin avec upload d'images via Cloudinary.

## 🚀 Fonctionnalités

### ✅ CRUD Complet
- **Créer** un nouveau produit avec images, catégories et occasions
- **Lire** la liste complète des produits avec filtres
- **Modifier** les informations d'un produit existant
- **Supprimer** un produit (avec confirmation)

### 📸 Upload d'Images
- Upload multiple d'images via Cloudinary
- Prévisualisation des images
- Suppression d'images individuelles
- Stockage sécurisé dans le dossier `kdobox/products`

### 🏷️ Catégories et Occasions
- Association multiple aux catégories (Bijoux, Parfums, etc.)
- Association multiple aux occasions (Anniversaire, Mariage, etc.)
- Sélection via checkboxes dans le formulaire

### 📊 Informations Produit
- Nom et description
- Prix (CDF)
- Stock disponible
- Genre (Homme, Femme, Unisexe, Enfant)
- Statut actif/inactif

## 🔧 Configuration Cloudinary

### 1. Créer un compte Cloudinary
1. Allez sur [cloudinary.com](https://cloudinary.com)
2. Créez un compte gratuit
3. Accédez à votre Dashboard

### 2. Récupérer les credentials
Dans votre Dashboard Cloudinary, copiez :
- **Cloud Name**
- **API Key**
- **API Secret**

### 3. Configurer les variables d'environnement
Ajoutez dans votre fichier `.env.local` :

```env
CLOUDINARY_CLOUD_NAME=votre_cloud_name
CLOUDINARY_API_KEY=votre_api_key
CLOUDINARY_API_SECRET=votre_api_secret
```

## 📁 Structure des Fichiers

```
app/
├── api/
│   ├── upload/
│   │   └── route.ts          # API upload Cloudinary
│   └── products/
│       └── route.ts           # API CRUD produits (GET, POST, PUT, DELETE)
├── dashboard/
│   └── produits/
│       ├── page.tsx           # Liste des produits
│       ├── nouveau/
│       │   └── page.tsx       # Créer un produit
│       └── [id]/
│           └── page.tsx       # Modifier un produit

components/
├── product-form.tsx           # Formulaire de produit
└── product-actions.tsx        # Actions (modifier/supprimer)
```

## 🎯 Utilisation

### Créer un Produit

1. Allez sur `/dashboard/produits`
2. Cliquez sur **"Ajouter un produit"**
3. Remplissez le formulaire :
   - Nom du produit *
   - Description
   - Prix (CDF) *
   - Stock *
   - Genre *
   - Images (upload multiple)
   - Catégories (sélection multiple)
   - Occasions (sélection multiple)
   - Statut actif/inactif
4. Cliquez sur **"Créer le produit"**

### Modifier un Produit

1. Dans la liste des produits, cliquez sur **⋮** (menu actions)
2. Sélectionnez **"Modifier"**
3. Modifiez les informations souhaitées
4. Cliquez sur **"Mettre à jour"**

### Supprimer un Produit

1. Dans la liste des produits, cliquez sur **⋮** (menu actions)
2. Sélectionnez **"Supprimer"**
3. Confirmez la suppression dans la boîte de dialogue

## 🔌 API Endpoints

### Upload d'Image
```typescript
POST /api/upload
Content-Type: multipart/form-data

Body: FormData avec file

Response: {
  secure_url: string
  public_id: string
  // ... autres données Cloudinary
}
```

### Créer un Produit
```typescript
POST /api/products
Content-Type: application/json

Body: {
  name: string
  description?: string
  price: number
  stock: number
  gender: "homme" | "femme" | "unisexe" | "enfant"
  isActive?: boolean
  images: Array<{ url: string, altText?: string }>
  categoryIds: string[]
  occasionIds: string[]
}

Response: { product: Product }
```

### Modifier un Produit
```typescript
PUT /api/products
Content-Type: application/json

Body: {
  id: string
  // ... mêmes champs que POST
}

Response: { product: Product }
```

### Supprimer un Produit
```typescript
DELETE /api/products?id={productId}

Response: { success: true }
```

## 🔒 Sécurité

- ✅ Authentification requise (Better Auth)
- ✅ Vérification du rôle admin
- ✅ Validation des données côté serveur
- ✅ Upload sécurisé via Cloudinary
- ✅ Confirmation avant suppression

## 💡 Bonnes Pratiques

1. **Images** : Utilisez des images de bonne qualité (min 800x800px)
2. **Prix** : Toujours en Francs Congolais (CDF)
3. **Stock** : Mettez à jour régulièrement le stock
4. **Catégories** : Associez au moins une catégorie par produit
5. **Occasions** : Associez aux occasions pertinentes pour améliorer la découvrabilité
6. **Statut** : Désactivez les produits en rupture de stock au lieu de les supprimer

## 🐛 Dépannage

### Les images ne s'uploadent pas
- Vérifiez vos credentials Cloudinary dans `.env.local`
- Vérifiez que le serveur Next.js est redémarré après modification du `.env.local`
- Vérifiez la taille des images (max 10MB par défaut)

### Erreur 401 lors de la création
- Vérifiez que vous êtes connecté en tant qu'admin
- Vérifiez votre session Better Auth

### Le produit n'apparaît pas sur la boutique
- Vérifiez que le produit est actif (`isActive: true`)
- Vérifiez que le stock est > 0
- Vérifiez qu'au moins une image est associée

## 📚 Ressources

- [Documentation Cloudinary](https://cloudinary.com/documentation)
- [Better Auth Docs](https://www.better-auth.com)
- [Drizzle ORM](https://orm.drizzle.team)
