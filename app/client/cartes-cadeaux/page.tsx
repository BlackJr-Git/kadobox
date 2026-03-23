import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ClientCartesCadeauxPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Mes cartes cadeaux</h1>
        <Button render={<Link href="/cartes-cadeaux" />}>
          Acheter une carte
        </Button>
      </div>

      <div className="rounded-lg border p-8 text-center">
        <span className="text-4xl">🎁</span>
        <h2 className="mt-4 text-lg font-bold">
          Aucune carte cadeau
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Vos cartes cadeaux achetées et reçues apparaîtront ici.
        </p>
      </div>
    </div>
  )
}
