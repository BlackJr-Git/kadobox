import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata = {
  title: "À propos | Cadeau Chrono",
  description:
    "Découvrez Cadeau Chrono, votre assistant pour trouver le cadeau parfait en RDC. Notre mission : simplifier l'art d'offrir.",
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold md:text-4xl">À propos de Cadeau Chrono</h1>

      <section className="mt-8 space-y-4 text-muted-foreground">
        <p className="text-lg">
          <strong className="text-foreground">Cadeau Chrono</strong> est né d&apos;un
          constat simple : trouver un cadeau ne devrait pas être stressant.
        </p>
        <p>
          Nous avons créé une plateforme qui vous guide pas à pas pour trouver
          le cadeau parfait, quelle que soit l&apos;occasion — anniversaire,
          mariage, Noël, fête des mères... En moins de 30 secondes, vous pouvez
          découvrir des idées personnalisées et passer commande.
        </p>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-bold">Nos 3 piliers</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <div className="rounded-xl border p-6 text-center">
            <span className="text-3xl">🎯</span>
            <h3 className="mt-3 font-bold">Occasion → Produit</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Naviguez par événement pour trouver le cadeau idéal en un clic.
            </p>
          </div>
          <div className="rounded-xl border p-6 text-center">
            <span className="text-3xl">🛍️</span>
            <h3 className="mt-3 font-bold">Catalogue curé</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Des produits soigneusement sélectionnés, avec filtres et
              recommandations.
            </p>
          </div>
          <div className="rounded-xl border p-6 text-center">
            <span className="text-3xl">🎁</span>
            <h3 className="mt-3 font-bold">Personnalisation</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Message, emballage et date d&apos;envoi — chaque cadeau est unique.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-12 space-y-4 text-muted-foreground">
        <h2 className="text-xl font-bold text-foreground">Notre mission</h2>
        <p>
          Chez Cadeau Chrono, nous croyons que l&apos;art d&apos;offrir peut être
          simple, rapide et joyeux. Nous combinons technologie et curation pour
          proposer une expérience d&apos;achat unique en République Démocratique
          du Congo.
        </p>
        <p>
          Que vous cherchiez un cadeau pour un proche, un collègue ou un client,
          notre plateforme vous accompagne du choix du produit jusqu&apos;à la
          livraison.
        </p>
      </section>

      <section className="mt-12 rounded-xl bg-primary/5 p-8 text-center">
        <h2 className="text-xl font-bold">Prêt à offrir ?</h2>
        <p className="mt-2 text-muted-foreground">
          Laissez-nous vous guider vers le cadeau parfait.
        </p>
        <div className="mt-4 flex justify-center gap-3">
          <Button render={<Link href="/recommandation" />}>
            Lancer le quiz
          </Button>
          <Button variant="outline" render={<Link href="/produits" />}>
            Voir les produits
          </Button>
        </div>
      </section>
    </div>
  )
}
