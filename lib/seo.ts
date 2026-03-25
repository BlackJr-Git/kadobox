const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kdobox.com"

type ProductJsonLdProps = {
  name: string
  slug: string
  description?: string | null
  price: string
  image?: string | null
  sku?: string | null
  stock: number
  rating?: number | null
  reviewCount?: number
}

export function generateProductJsonLd({
  name,
  slug,
  description,
  price,
  image,
  sku,
  stock,
  rating,
  reviewCount,
}: ProductJsonLdProps) {
  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description: description || `${name} - Cadeau disponible sur Cadeau Chrono`,
    url: `${BASE_URL}/produit/${slug}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "CDF",
      price: Number(price),
      availability:
        stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Cadeau Chrono",
      },
    },
  }

  if (image) {
    jsonLd.image = image
  }

  if (sku) {
    jsonLd.sku = sku
  }

  if (rating && reviewCount) {
    jsonLd.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: rating,
      reviewCount,
    }
  }

  return jsonLd
}

export function generateBreadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  }
}
