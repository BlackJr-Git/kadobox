"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function ProfilPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  })

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Mon profil</h1>

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
          />
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
        <Button type="submit">Enregistrer</Button>
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
