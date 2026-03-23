import "dotenv/config"
import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"
import * as schema from "./schema"

const sql = neon(process.env.DATABASE_URL!)
const db = drizzle({ client: sql, schema })

async function seed() {
  console.log("🌱 Seeding database...")

  // Admin User
  const adminUser = await db
    .insert(schema.user)
    .values({
      id: "admin_user_001",
      name: "Admin KDOBOX",
      email: "admin@kdobox.com",
      emailVerified: true,
      role: "admin",
      phone: "+243 999 999 999",
    })
    .onConflictDoNothing()
    .returning()

  console.log(`✅ ${adminUser.length} utilisateur admin créé`)

  // Occasions
  const occasions = await db
    .insert(schema.occasion)
    .values([
      {
        id: "occ_anniversaire",
        name: "Anniversaire",
        slug: "anniversaire",
        description: "Des cadeaux mémorables pour chaque anniversaire",
        icon: "🎂",
        color: "#f59e0b",
        sortOrder: 1,
      },
      {
        id: "occ_mariage",
        name: "Mariage",
        slug: "mariage",
        description: "Célébrez l'amour avec un cadeau unique",
        icon: "💒",
        color: "#ec4899",
        sortOrder: 2,
      },
      {
        id: "occ_noel",
        name: "Noël",
        slug: "noel",
        description: "La magie de Noël dans chaque cadeau",
        icon: "🎄",
        color: "#22c55e",
        sortOrder: 3,
      },
      {
        id: "occ_saint_valentin",
        name: "Saint-Valentin",
        slug: "saint-valentin",
        description: "Exprime ton amour avec le cadeau parfait",
        icon: "💝",
        color: "#ef4444",
        sortOrder: 4,
      },
      {
        id: "occ_fete_meres",
        name: "Fête des mères",
        slug: "fete-des-meres",
        description: "Pour la femme la plus importante de ta vie",
        icon: "🌸",
        color: "#d946ef",
        sortOrder: 5,
      },
      {
        id: "occ_fete_peres",
        name: "Fête des pères",
        slug: "fete-des-peres",
        description: "Un cadeau à la hauteur de ton père",
        icon: "👔",
        color: "#3b82f6",
        sortOrder: 6,
      },
      {
        id: "occ_diplome",
        name: "Diplôme",
        slug: "diplome",
        description: "Félicite un nouveau diplômé",
        icon: "🎓",
        color: "#8b5cf6",
        sortOrder: 7,
      },
      {
        id: "occ_naissance",
        name: "Naissance",
        slug: "naissance",
        description: "Accueille un nouveau-né avec tendresse",
        icon: "👶",
        color: "#06b6d4",
        sortOrder: 8,
      },
    ])
    .onConflictDoNothing()
    .returning()

  console.log(`✅ ${occasions.length} occasions créées`)

  // Categories
  const categories = await db
    .insert(schema.category)
    .values([
      {
        id: "cat_bijoux",
        name: "Bijoux",
        slug: "bijoux",
        description: "Colliers, bracelets, bagues et plus",
        sortOrder: 1,
      },
      {
        id: "cat_mode",
        name: "Mode",
        slug: "mode",
        description: "Vêtements et accessoires tendance",
        sortOrder: 2,
      },
      {
        id: "cat_tech",
        name: "Tech",
        slug: "tech",
        description: "Gadgets et accessoires technologiques",
        sortOrder: 3,
      },
      {
        id: "cat_beaute",
        name: "Beauté",
        slug: "beaute",
        description: "Soins, parfums et maquillage",
        sortOrder: 4,
      },
      {
        id: "cat_maison",
        name: "Maison",
        slug: "maison",
        description: "Décoration et objets pour la maison",
        sortOrder: 5,
      },
      {
        id: "cat_gourmand",
        name: "Gourmandises",
        slug: "gourmandises",
        description: "Chocolats, paniers gourmands et plus",
        sortOrder: 6,
      },
    ])
    .onConflictDoNothing()
    .returning()

  console.log(`✅ ${categories.length} catégories créées`)

  // Products
  const products = await db
    .insert(schema.product)
    .values([
      {
        id: "prod_montre_elegante",
        name: "Montre Élégante Or Rose",
        slug: "montre-elegante-or-rose",
        description:
          "Une montre élégante en or rose avec bracelet en cuir véritable. Mouvement quartz japonais de précision. Étanche jusqu'à 30 mètres. Le cadeau parfait pour marquer un moment spécial.",
        shortDescription: "Montre or rose avec bracelet cuir, mouvement quartz",
        price: "35000",
        compareAtPrice: "45000",
        sku: "MON-001",
        stock: 15,
        isFeatured: true,
        gender: "femme",
      },
      {
        id: "prod_parfum_homme",
        name: "Parfum Signature Homme",
        slug: "parfum-signature-homme",
        description:
          "Un parfum boisé et épicé aux notes de cèdre, poivre noir et ambre. Longue tenue, idéal pour le quotidien comme pour les occasions spéciales.",
        shortDescription: "Eau de parfum boisé, 100ml",
        price: "28000",
        sku: "PAR-001",
        stock: 20,
        isFeatured: true,
        gender: "homme",
      },
      {
        id: "prod_bracelet_argent",
        name: "Bracelet Argent Personnalisable",
        slug: "bracelet-argent-personnalisable",
        description:
          "Bracelet en argent sterling 925 avec possibilité de gravure personnalisée. Fermoir de sécurité. Livré dans un écrin cadeau.",
        shortDescription: "Bracelet argent 925, gravure possible",
        price: "18000",
        compareAtPrice: "22000",
        sku: "BIJ-001",
        stock: 30,
        isFeatured: true,
        gender: "unisexe",
      },
      {
        id: "prod_ecouteurs_sans_fil",
        name: "Écouteurs Sans Fil Premium",
        slug: "ecouteurs-sans-fil-premium",
        description:
          "Écouteurs Bluetooth 5.3 avec réduction active du bruit. Autonomie de 30h avec le boîtier. Son haute fidélité.",
        shortDescription: "Bluetooth 5.3, ANC, 30h d'autonomie",
        price: "42000",
        sku: "TEC-001",
        stock: 10,
        isFeatured: true,
        gender: "unisexe",
      },
      {
        id: "prod_coffret_chocolat",
        name: "Coffret Chocolats Artisanaux",
        slug: "coffret-chocolats-artisanaux",
        description:
          "Assortiment de 24 chocolats fins artisanaux. Pralinés, ganaches, truffes. Cacao d'origine Kivu.",
        shortDescription: "24 chocolats fins, cacao du Kivu",
        price: "15000",
        sku: "GOU-001",
        stock: 25,
        isFeatured: true,
        gender: "unisexe",
      },
      {
        id: "prod_sac_cuir",
        name: "Sac à Main Cuir Véritable",
        slug: "sac-main-cuir-veritable",
        description:
          "Sac à main en cuir véritable, doublure en tissu satiné. Plusieurs compartiments intérieurs. Bandoulière amovible.",
        shortDescription: "Cuir véritable, bandoulière amovible",
        price: "55000",
        compareAtPrice: "70000",
        sku: "MOD-001",
        stock: 8,
        isFeatured: true,
        gender: "femme",
      },
      {
        id: "prod_lampe_led",
        name: "Lampe LED Personnalisée",
        slug: "lampe-led-personnalisee",
        description:
          "Lampe LED 3D avec socle en bois. Photo personnalisée gravée au laser. Lumière chaude et douce. Alimentation USB.",
        shortDescription: "Lampe 3D avec photo personnalisée",
        price: "12000",
        sku: "MAI-001",
        stock: 40,
        gender: "unisexe",
      },
      {
        id: "prod_coffret_soin",
        name: "Coffret Soin Visage Bio",
        slug: "coffret-soin-visage-bio",
        description:
          "Coffret de 5 produits de soin visage bio : nettoyant, tonique, sérum, crème de jour et crème de nuit. Ingrédients naturels.",
        shortDescription: "5 produits de soin bio",
        price: "32000",
        sku: "BEA-001",
        stock: 12,
        isFeatured: true,
        gender: "femme",
      },
      {
        id: "prod_portefeuille",
        name: "Portefeuille Cuir Minimaliste",
        slug: "portefeuille-cuir-minimaliste",
        description:
          "Portefeuille slim en cuir pleine fleur. Porte-cartes RFID protégé. Compartiment billets. Design épuré et élégant.",
        shortDescription: "Cuir pleine fleur, protection RFID",
        price: "20000",
        sku: "MOD-002",
        stock: 18,
        gender: "homme",
      },
      {
        id: "prod_jouet_educatif",
        name: "Kit Scientifique Enfant",
        slug: "kit-scientifique-enfant",
        description:
          "Kit de 50 expériences scientifiques pour enfants de 6 à 12 ans. Inclut tout le matériel nécessaire et un guide illustré.",
        shortDescription: "50 expériences, 6-12 ans",
        price: "25000",
        sku: "ENF-001",
        stock: 15,
        gender: "enfant",
      },
    ])
    .onConflictDoNothing()
    .returning()

  console.log(`✅ ${products.length} produits créés`)

  // Product-Occasion links
  const productOccasionLinks = await db
    .insert(schema.productOccasion)
    .values([
      // Anniversaire
      { productId: "prod_montre_elegante", occasionId: "occ_anniversaire" },
      { productId: "prod_parfum_homme", occasionId: "occ_anniversaire" },
      { productId: "prod_bracelet_argent", occasionId: "occ_anniversaire" },
      { productId: "prod_ecouteurs_sans_fil", occasionId: "occ_anniversaire" },
      { productId: "prod_sac_cuir", occasionId: "occ_anniversaire" },
      { productId: "prod_coffret_chocolat", occasionId: "occ_anniversaire" },
      // Mariage
      { productId: "prod_montre_elegante", occasionId: "occ_mariage" },
      { productId: "prod_bracelet_argent", occasionId: "occ_mariage" },
      { productId: "prod_sac_cuir", occasionId: "occ_mariage" },
      { productId: "prod_lampe_led", occasionId: "occ_mariage" },
      // Noël
      { productId: "prod_coffret_chocolat", occasionId: "occ_noel" },
      { productId: "prod_ecouteurs_sans_fil", occasionId: "occ_noel" },
      { productId: "prod_jouet_educatif", occasionId: "occ_noel" },
      { productId: "prod_coffret_soin", occasionId: "occ_noel" },
      { productId: "prod_lampe_led", occasionId: "occ_noel" },
      // Saint-Valentin
      { productId: "prod_montre_elegante", occasionId: "occ_saint_valentin" },
      { productId: "prod_parfum_homme", occasionId: "occ_saint_valentin" },
      { productId: "prod_bracelet_argent", occasionId: "occ_saint_valentin" },
      { productId: "prod_coffret_chocolat", occasionId: "occ_saint_valentin" },
      { productId: "prod_coffret_soin", occasionId: "occ_saint_valentin" },
      // Fête des mères
      { productId: "prod_montre_elegante", occasionId: "occ_fete_meres" },
      { productId: "prod_sac_cuir", occasionId: "occ_fete_meres" },
      { productId: "prod_coffret_soin", occasionId: "occ_fete_meres" },
      { productId: "prod_bracelet_argent", occasionId: "occ_fete_meres" },
      // Fête des pères
      { productId: "prod_parfum_homme", occasionId: "occ_fete_peres" },
      { productId: "prod_portefeuille", occasionId: "occ_fete_peres" },
      { productId: "prod_ecouteurs_sans_fil", occasionId: "occ_fete_peres" },
      // Diplôme
      { productId: "prod_montre_elegante", occasionId: "occ_diplome" },
      { productId: "prod_ecouteurs_sans_fil", occasionId: "occ_diplome" },
      { productId: "prod_portefeuille", occasionId: "occ_diplome" },
      // Naissance
      { productId: "prod_jouet_educatif", occasionId: "occ_naissance" },
      { productId: "prod_lampe_led", occasionId: "occ_naissance" },
    ])
    .onConflictDoNothing()
    .returning()

  console.log(`✅ ${productOccasionLinks.length} liens produit-occasion créés`)

  // Product-Category links
  const productCategoryLinks = await db
    .insert(schema.productCategory)
    .values([
      { productId: "prod_montre_elegante", categoryId: "cat_bijoux" },
      { productId: "prod_bracelet_argent", categoryId: "cat_bijoux" },
      { productId: "prod_parfum_homme", categoryId: "cat_beaute" },
      { productId: "prod_coffret_soin", categoryId: "cat_beaute" },
      { productId: "prod_ecouteurs_sans_fil", categoryId: "cat_tech" },
      { productId: "prod_sac_cuir", categoryId: "cat_mode" },
      { productId: "prod_portefeuille", categoryId: "cat_mode" },
      { productId: "prod_lampe_led", categoryId: "cat_maison" },
      { productId: "prod_coffret_chocolat", categoryId: "cat_gourmand" },
      { productId: "prod_jouet_educatif", categoryId: "cat_tech" },
    ])
    .onConflictDoNothing()
    .returning()

  console.log(`✅ ${productCategoryLinks.length} liens produit-catégorie créés`)

  console.log("\n🎉 Seed terminé avec succès !")
}

seed().catch((err) => {
  console.error("❌ Erreur lors du seed:", err)
  process.exit(1)
})
