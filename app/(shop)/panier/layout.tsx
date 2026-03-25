import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mon panier | Cadeau Chrono",
  description: "Consultez et gérez votre panier Cadeau Chrono.",
}

export default function PanierLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
