"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  if (sent) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6">
        <Card className="w-full max-w-sm">
          <CardHeader className="text-center">
            <span className="mx-auto text-4xl">📧</span>
            <CardTitle className="mt-2 text-xl">Email envoyé !</CardTitle>
            <CardDescription>
              Si un compte existe avec l&apos;adresse {email}, vous recevrez un
              lien de réinitialisation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" render={<Link href="/login" />}>
              Retour à la connexion
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Mot de passe oublié</CardTitle>
          <CardDescription>
            Entrez votre email pour recevoir un lien de réinitialisation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="h-9 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
                placeholder="jean@example.com"
              />
            </div>
            <Button type="submit" className="w-full" disabled={!email}>
              Envoyer le lien
            </Button>
            <p className="text-center text-sm text-muted-foreground">
              <Link href="/login" className="underline hover:text-foreground">
                Retour à la connexion
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
