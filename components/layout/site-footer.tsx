import Link from "next/link"
import { NewsletterForm } from "@/components/layout/newsletter-form"

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          <div>
            <Link href="/" className="text-lg font-bold tracking-tight">
              <span className="text-primary">KDOB</span>OX
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Trouve le cadeau parfait en 30 secondes.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Boutique</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/produits" className="hover:text-foreground">
                  Tous les produits
                </Link>
              </li>
              <li>
                <Link href="/coffrets" className="hover:text-foreground">
                  Coffrets
                </Link>
              </li>
              <li>
                <Link href="/cartes-cadeaux" className="hover:text-foreground">
                  Cartes cadeaux
                </Link>
              </li>
              <li>
                <Link href="/recommandation" className="hover:text-foreground">
                  Quiz cadeau
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Occasions</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/occasion/anniversaire"
                  className="hover:text-foreground"
                >
                  Anniversaire
                </Link>
              </li>
              <li>
                <Link
                  href="/occasion/mariage"
                  className="hover:text-foreground"
                >
                  Mariage
                </Link>
              </li>
              <li>
                <Link href="/occasion/noel" className="hover:text-foreground">
                  Noël
                </Link>
              </li>
              <li>
                <Link
                  href="/occasion/saint-valentin"
                  className="hover:text-foreground"
                >
                  Saint-Valentin
                </Link>
              </li>
              <li>
                <Link
                  href="/occasion/fete-des-meres"
                  className="hover:text-foreground"
                >
                  Fête des mères
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Aide</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/contact" className="hover:text-foreground">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-foreground">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/livraison" className="hover:text-foreground">
                  Livraison
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Légal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/cgv" className="hover:text-foreground">
                  CGV
                </Link>
              </li>
              <li>
                <Link href="/confidentialite" className="hover:text-foreground">
                  Confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t pt-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <div>
              <h4 className="text-sm font-semibold">Newsletter</h4>
              <p className="mt-1 text-xs text-muted-foreground">
                Recevez nos offres et idées cadeaux
              </p>
            </div>
            <div className="w-full max-w-xs">
              <NewsletterForm />
            </div>
          </div>
          <p className="mt-6 text-center text-xs text-muted-foreground">
            © {new Date().getFullYear()} KDOBOX. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
