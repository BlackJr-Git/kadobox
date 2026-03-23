import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Paiement | KDOBOX",
  description: "Finalisez votre commande KDOBOX en toute sécurité.",
}

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
