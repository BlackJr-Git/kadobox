import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Personnalisation | Cadeau Chrono",
  description: "Personnalisez votre cadeau avec un message, un emballage premium et une livraison planifiée.",
}

export default function PersonnalisationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
