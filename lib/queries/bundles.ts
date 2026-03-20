import { eq } from "drizzle-orm"
import { db } from "@/lib/db"
import { bundle } from "@/lib/schema"

export async function getBundles() {
  return db.query.bundle.findMany({
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
}

export async function getBundleBySlug(slug: string) {
  return db.query.bundle.findFirst({
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
}
