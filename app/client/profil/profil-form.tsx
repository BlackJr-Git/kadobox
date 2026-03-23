"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

type User = {
  id: string
  name: string
  email: string
  phone?: string | null
}

export function ProfilForm({ user }: { user: User }) {
  const [form, setForm] = useState({
    name: user.name || "",
    email: user.email || "",
    phone: (user.phone as string) || "",
  })
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    try {
      // TODO: Connect to user update API
      setMessage("Profil mis à jour avec succès !")
    } catch {
      setMessage("Erreur lors de la mise à jour")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-6 space-y-6">
      <form onSubmit={handleSave} className="max-w-lg space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium">
            Nom complet
          </label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="h-9 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
            placeholder="Jean Mukendi"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="h-9 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
            placeholder="jean@example.com"
            disabled
          />
          <p className="mt-1 text-xs text-muted-foreground">
            L&apos;email ne peut pas être modifié.
          </p>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Téléphone</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="h-9 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
            placeholder="+243 XXX XXX XXX"
          />
        </div>
        {message && (
          <p className="text-sm text-green-600">{message}</p>
        )}
        <Button type="submit" disabled={loading}>
          {loading ? "Enregistrement..." : "Enregistrer"}
        </Button>
      </form>

      <Separator />

      <div>
        <h2 className="mb-3 text-lg font-bold">Sécurité</h2>
        <Button variant="outline">Changer le mot de passe</Button>
      </div>

      <Separator />

      <div>
        <h2 className="mb-3 text-lg font-bold text-destructive">
          Zone dangereuse
        </h2>
        <Button variant="destructive">Supprimer mon compte</Button>
      </div>
    </div>
  )
}
