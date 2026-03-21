import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const STATUS_LABELS: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
  pending: { label: "En attente", variant: "secondary" },
  paid: { label: "Payée", variant: "default" },
  processing: { label: "En préparation", variant: "default" },
  shipped: { label: "Expédiée", variant: "default" },
  delivered: { label: "Livrée", variant: "outline" },
  cancelled: { label: "Annulée", variant: "destructive" },
}

export default function CommandesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mes commandes</h1>
      </div>

      <div className="rounded-lg border p-8 text-center">
        <span className="text-4xl">📦</span>
        <h2 className="mt-4 text-lg font-bold">Aucune commande pour le moment</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Vos commandes apparaîtront ici une fois que vous aurez passé une commande.
        </p>
        <Button className="mt-4" render={<Link href="/produits" />}>
          Découvrir nos produits
        </Button>
      </div>
    </div>
  )
}
