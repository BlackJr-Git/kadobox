import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Connexion | Cadeau Chrono",
  description: "Connectez-vous ou créez un compte Cadeau Chrono pour gérer vos commandes et votre liste de souhaits.",
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
