import type { MetadataRoute } from "next"
import { db } from "@/lib/db"
import { product, occasion, category } from "@/lib/schema"
import { eq } from "drizzle-orm"

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://cadeauchrono.com"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, occasions, categories] = await Promise.all([
    db.query.product.findMany({
      where: eq(product.isActive, true),
      columns: { slug: true, updatedAt: true },
    }),
    db.query.occasion.findMany({
      where: eq(occasion.isActive, true),
      columns: { slug: true, updatedAt: true },
    }),
    db.query.category.findMany({
      where: eq(category.isActive, true),
      columns: { slug: true, updatedAt: true },
    }),
  ])

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/produits`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/coffrets`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/cartes-cadeaux`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/recommandation`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/personnalisation`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ]

  const genders = ["homme", "femme", "enfant"]
  const cadeauLandingPages: MetadataRoute.Sitemap = occasions.flatMap((o) =>
    genders.map((g) => ({
      url: `${BASE_URL}/cadeau/${o.slug}/${g}`,
      lastModified: o.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }))
  )

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/produit/${p.slug}`,
    lastModified: p.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  const occasionPages: MetadataRoute.Sitemap = occasions.map((o) => ({
    url: `${BASE_URL}/occasion/${o.slug}`,
    lastModified: o.updatedAt,
    changeFrequency: "weekly",
    priority: 0.9,
  }))

  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${BASE_URL}/categorie/${c.slug}`,
    lastModified: c.updatedAt,
    changeFrequency: "weekly",
    priority: 0.7,
  }))

  return [
    ...staticPages,
    ...occasionPages,
    ...categoryPages,
    ...productPages,
    ...cadeauLandingPages,
  ]
}
