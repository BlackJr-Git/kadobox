import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Mon panier | KDOBOX",
  description: "Consultez et gérez votre panier KDOBOX.",
}

export default function PanierLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
