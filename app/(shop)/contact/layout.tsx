import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contactez-nous | KDOBOX",
  description: "Une question ? Contactez l'équipe KDOBOX. Nous sommes disponibles pour vous aider.",
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
