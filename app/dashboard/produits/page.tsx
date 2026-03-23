import { db } from "@/lib/db"
import { product } from "@/lib/schema"
import { desc } from "drizzle-orm"
import { Badge } from "@/components/ui/badge"

export default async function DashboardProduitsPage() {
  const products = await db.query.product.findMany({
    with: { images: true },
    orderBy: [desc(product.createdAt)],
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Produits ({products.length})</h1>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <table className="w-full text-sm">
          <thead className="border-b bg-muted/50">
            <tr>
              <th className="px-4 py-3 text-left font-medium">Produit</th>
              <th className="px-4 py-3 text-left font-medium">Prix</th>
              <th className="px-4 py-3 text-left font-medium">Stock</th>
              <th className="px-4 py-3 text-left font-medium">Statut</th>
              <th className="px-4 py-3 text-left font-medium">Genre</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b last:border-0">
                <td className="px-4 py-3">
                  <div>
                    <p className="font-medium">{p.name}</p>
                    <p className="text-xs text-muted-foreground">{p.sku || p.slug}</p>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
