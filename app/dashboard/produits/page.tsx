import { db } from "@/lib/db"
import { product } from "@/lib/schema"
import { desc } from "drizzle-orm"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ProductActions } from "@/components/product-actions"
import Image from "next/image"
import { serializeData } from "@/lib/serialize"

export default async function DashboardProduitsPage() {
  const products = serializeData(
    await db.query.product.findMany({
      with: { images: true },
      orderBy: [desc(product.createdAt)],
    })
  )

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Produits ({products.length})</h1>
        <Button render={<Link href="/dashboard/produits/nouveau" />}>
          Ajouter un produit
        </Button>
      </div>

      {products.length === 0 ? (
        <div className="rounded-lg border p-8 text-center">
          <p className="text-muted-foreground">Aucun produit pour le moment.</p>
          <Button
            className="mt-4"
            render={<Link href="/dashboard/produits/nouveau" />}
          >
            Créer votre premier produit
          </Button>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg border">
          <table className="w-full text-sm">
            <thead className="border-b bg-muted/50">
              <tr>
                <th className="px-4 py-3 text-left font-medium">Produit</th>
                <th className="px-4 py-3 text-left font-medium">Prix</th>
                <th className="px-4 py-3 text-left font-medium">Stock</th>
                <th className="px-4 py-3 text-left font-medium">Statut</th>
                <th className="px-4 py-3 text-left font-medium">Genre</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b last:border-0">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {p.images[0] && (
                        <div className="relative h-10 w-10 overflow-hidden rounded">
                          <Image
                            src={p.images[0].url}
                            alt={p.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <p className="font-medium">{p.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {p.sku || p.slug}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    {Number(p.price).toLocaleString("fr-CD")} CDF
                  </td>
                  <td className="px-4 py-3">{p.stock}</td>
                  <td className="px-4 py-3">
                    <Badge variant={p.isActive ? "default" : "secondary"}>
                      {p.isActive ? "Actif" : "Inactif"}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 capitalize">{p.gender}</td>
                  <td className="px-4 py-3 text-right">
                    <ProductActions productId={p.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
