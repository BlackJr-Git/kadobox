"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Erreur lors de l'envoi")
        return
      }
      setSent(true)
    } catch {
      setError("Erreur réseau")
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-24 text-center">
        <span className="text-5xl">✅</span>
        <h1 className="mt-4 text-2xl font-bold">Message envoyé !</h1>
        <p className="mt-2 text-muted-foreground">
          Merci pour votre message. Nous vous répondrons dans les plus brefs
          délais.
        </p>
        <Button className="mt-6" onClick={() => setSent(false)}>
          Envoyer un autre message
        </Button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold">Contactez-nous</h1>
        <p className="mt-2 text-muted-foreground">
          Une question ? Une suggestion ? Écrivez-nous !
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium">Nom *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="h-9 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
              placeholder="Jean Mukendi"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium">Email *</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="h-9 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
              placeholder="jean@example.com"
            />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Sujet *</label>
          <input
            type="text"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            required
            className="h-9 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
            placeholder="Question sur une commande"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Message *</label>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
            rows={6}
            className="w-full resize-none rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
            placeholder="Votre message..."
          />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <Button
          type="submit"
          className="w-full"
          disabled={
            loading ||
            !form.name ||
            !form.email ||
            !form.subject ||
            !form.message
          }
        >
          {loading ? "Envoi en cours..." : "Envoyer"}
        </Button>
      </form>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        <div className="text-center">
          <span className="text-2xl">📧</span>
          <h3 className="mt-2 font-medium">Email</h3>
          <p className="text-sm text-muted-foreground">contact@kdobox.com</p>
        </div>
        <div className="text-center">
          <span className="text-2xl">📱</span>
          <h3 className="mt-2 font-medium">Téléphone</h3>
          <p className="text-sm text-muted-foreground">+243 XXX XXX XXX</p>
        </div>
        <div className="text-center">
          <span className="text-2xl">📍</span>
          <h3 className="mt-2 font-medium">Adresse</h3>
          <p className="text-sm text-muted-foreground">Kinshasa, RDC</p>
        </div>
      </div>
    </div>
  )
}
