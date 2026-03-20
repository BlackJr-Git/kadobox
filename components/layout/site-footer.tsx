import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="text-lg font-bold tracking-tight">
              <span className="text-primary">KDOB</span>OX
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              Trouve le cadeau parfait en 30 secondes.
            </p>
          </div>

          <div>
            <h4 className="mb-3 text-sm font-semibold">Occasions</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/occasion/anniversaire" className="hover:text-foreground">
                  Anniversaire
                </Link>
              </li>
              <li>
                <Link href="/occasion/mariage" className="hover:text-foreground">
                  Mariage
                </Link>
              </li>
              <li>
                <Link href="/occasion/noel" className="hover:text-foreground">
                  Noël
                </Link>
              </li>
              <li>
                <Link href="/occasion/saint-valentin" className="hover:text-foreground">
                  Saint-Valentin
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

        <div className="mt-10 border-t pt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} KDOBOX. Tous droits réservés.
        </div>
      </div>
    </footer>
  )
}
