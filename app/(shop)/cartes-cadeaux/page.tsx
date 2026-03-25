import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata = {
  title: "Cartes Cadeaux | Cadeau Chrono",
  description:
    "Offrez une carte cadeau Cadeau Chrono et laissez le destinataire choisir son cadeau parfait.",
}

const AMOUNTS = [5000, 10000, 20000, 50000, 100000]

export default function CartesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold md:text-4xl">Cartes Cadeaux 🎁</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          La liberté de choisir, le plaisir d&apos;offrir
        </p>
      </div>

      <div className="mx-auto max-w-3xl">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {AMOUNTS.map((amount) => (
            <button
              key={amount}
              className="group flex flex-col items-center gap-2 rounded-xl border-2 border-transparent bg-card p-6 text-center transition-all hover:border-primary hover:shadow-md focus:border-primary focus:outline-none"
            >
              <span className="text-3xl">🎁</span>
              <span className="text-lg font-bold group-hover:text-primary">
                {amount.toLocaleString("fr-CD")}
              </span>
              <span className="text-xs text-muted-foreground">CDF</span>
            </button>
          ))}
        </div>

        <div className="mt-10 rounded-xl border bg-muted/30 p-8 text-center">
          <h2 className="text-xl font-bold">Comment ça marche ?</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            <div className="flex flex-col items-center gap-2">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                1
              </span>
              <h3 className="font-medium">Choisissez le montant</h3>
              <p className="text-sm text-muted-foreground">
                Sélectionnez la valeur de la carte
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                2
              </span>
              <h3 className="font-medium">Personnalisez</h3>
              <p className="text-sm text-muted-foreground">
                Ajoutez un message personnel
              </p>
            </div>
            <div className="flex flex-col items-center gap-2">
              <span className="flex size-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                3
              </span>
              <h3 className="font-medium">Envoyez</h3>
              <p className="text-sm text-muted-foreground">
                Par email ou imprimez la carte
              </p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            Les cartes cadeaux seront bientôt disponibles à l&apos;achat.
          </p>
          <Button className="mt-4" render={<Link href="/" />}>
            Retour à l&apos;accueil
          </Button>
        </div>
      </div>
    </div>
  )
}
