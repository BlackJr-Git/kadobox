import { eq } from "drizzle-orm"
import { db } from "@/lib/db"
import { bundle } from "@/lib/schema"
import { serializeData } from "@/lib/serialize"

export async function getBundles() {
  const result = await db.query.bundle.findMany({
    where: eq(bundle.isActive, true),
    with: {
      bundleProducts: {
        with: {
          product: {
            with: {
              images: true,
            },
          },
        },
      },
    },
  })
  return serializeData(result)
}

export async function getBundleBySlug(slug: string) {
  const result = await db.query.bundle.findFirst({
    where: eq(bundle.slug, slug),
    with: {
      bundleProducts: {
        with: {
          product: {
            with: {
              images: true,
            },
          },
        },
      },
    },
  })
  return serializeData(result)
}
