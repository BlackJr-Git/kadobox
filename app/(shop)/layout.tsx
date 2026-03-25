import type { Metadata } from "next"
import { SiteNav } from "@/components/layout/site-nav"
import { SiteFooter } from "@/components/layout/site-footer"

export const metadata: Metadata = {
  metadataBase: new URL("https://kadobox.com"),
  title: {
    default: "KadoBox - Cadeaux pour toutes les occasions en RDC",
    template: "%s | KadoBox",
  },
  description:
    "La boutique en ligne de référence pour vos cadeaux en RDC. Trouvez le cadeau parfait pour chaque occasion avec livraison rapide à Kinshasa.",
  keywords: [
    "cadeaux",
    "boutique en ligne",
    "Kinshasa",
    "RDC",
    "Congo",
    "livraison",
    "occasions spéciales",
  ],
  authors: [{ name: "KadoBox" }],
  creator: "KadoBox",
  publisher: "KadoBox",
  openGraph: {
    type: "website",
    locale: "fr_CD",
    url: "https://kadobox.com",
    siteName: "KadoBox",
    title: "KadoBox - Cadeaux pour toutes les occasions en RDC",
    description:
      "La boutique en ligne de référence pour vos cadeaux en RDC. Trouvez le cadeau parfait pour chaque occasion avec livraison rapide à Kinshasa.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "KadoBox - Votre boutique de cadeaux en ligne",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KadoBox - Cadeaux pour toutes les occasions en RDC",
    description:
      "La boutique en ligne de référence pour vos cadeaux en RDC. Trouvez le cadeau parfait pour chaque occasion avec livraison rapide à Kinshasa.",
    creator: "@kadobox",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
}

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-svh flex-col">
      <SiteNav />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  )
}
