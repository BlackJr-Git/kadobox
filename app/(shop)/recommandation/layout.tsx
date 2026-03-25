import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Recommandation cadeau | Cadeau Chrono",
  description: "Trouvez le cadeau parfait grâce à notre outil de recommandation personnalisé.",
}

export default function RecommandationLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
