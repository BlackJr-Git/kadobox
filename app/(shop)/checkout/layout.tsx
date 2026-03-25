import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Paiement | Cadeau Chrono",
  description: "Finalisez votre commande Cadeau Chrono en toute sécurité.",
}

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
