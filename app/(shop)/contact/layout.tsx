import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contactez-nous | Cadeau Chrono",
  description: "Une question ? Contactez l'équipe Cadeau Chrono. Nous sommes disponibles pour vous aider.",
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
