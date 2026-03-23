"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCartStore } from "@/lib/stores/cart-store"
import { HugeiconsIcon } from "@hugeicons/react"
import { ShoppingBag02Icon, ArrowLeft01Icon } from "@hugeicons/core-free-icons"

type CheckoutStep = "info" | "shipping" | "payment" | "confirmation"

const STEPS: { key: CheckoutStep; label: string }[] = [
  { key: "info", label: "Coordonnées" },
  { key: "shipping", label: "Livraison" },
  { key: "payment", label: "Paiement" },
  { key: "confirmation", label: "Confirmation" },
]

export default function CheckoutPage() {
  const items = useCartStore((s) => s.items)
  const totalPrice = useCartStore((s) => s.totalPrice())
  const totalItems = useCartStore((s) => s.totalItems())
  const clearCart = useCartStore((s) => s.clearCart)
  const [step, setStep] = useState<CheckoutStep>("info")
  const [orderNumber, setOrderNumber] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    province: "",
  })

  const currentStepIndex = STEPS.findIndex((s) => s.key === step)

  if (items.length === 0 && !orderNumber) {
    return (
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-24 text-center">
        <HugeiconsIcon
          icon={ShoppingBag02Icon}
          strokeWidth={1.5}
          className="size-16 text-muted-foreground"
        />
        <h1 className="mt-4 text-2xl font-bold">Votre panier est vide</h1>
        <p className="mt-2 text-muted-foreground">
          Ajoutez des produits avant de passer commande.
        </p>
        <Button className="mt-6" render={<Link href="/" />}>
          Continuer les achats
        </Button>
      </div>
    )
  }

  if (step === "confirmation" && orderNumber) {
    return (
      <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-20 text-center">
        <span className="text-6xl">🎉</span>
        <h1 className="mt-6 text-3xl font-bold">Commande confirmée !</h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Merci pour votre commande. Votre numéro de commande est :
        </p>
        <p className="mt-2 text-2xl font-bold text-primary">{orderNumber}</p>
        <p className="mt-4 text-sm text-muted-foreground">
          Un email de confirmation a été envoyé à {form.email}
        </p>
        <Button className="mt-8" render={<Link href="/" />}>
          Retour à l&apos;accueil
        </Button>
      </div>
    )
  }

  const handleSubmitOrder = async () => {
    setSubmitting(true)
    setError("")
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            quantity: item.quantity,
            unitPrice: item.price,
          })),
          address: {
            fullName: form.fullName,
            phone: form.phone,
            addressLine1: form.addressLine1,
            addressLine2: form.addressLine2 || undefined,
            city: form.city,
            province: form.province || undefined,
          },
        }),
      })
      if (!res.ok) {
        const data = await res.json()
        setError(data.error || "Erreur lors de la création de la commande")
        return
      }
      const data = await res.json()
      setOrderNumber(data.orderNumber)
      clearCart()
      setStep("confirmation")
    } catch {
      setError("Erreur réseau. Veuillez réessayer.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {/* Steps */}
      <div className="mb-8 flex items-center justify-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s.key} className="flex items-center gap-2">
            <div
              className={`flex size-8 items-center justify-center rounded-full text-sm font-bold ${
                i <= currentStepIndex
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {i + 1}
            </div>
            <span
              className={`hidden text-sm sm:inline ${
                i <= currentStepIndex ? "font-medium" : "text-muted-foreground"
              }`}
            >
              {s.label}
            </span>
            {i < STEPS.length - 1 && (
              <div className="mx-2 h-px w-8 bg-border" />
            )}
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
        {/* Form */}
        <div>
          {step === "info" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold">Vos coordonnées</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Nom complet *
                  </label>
                  <input
                    type="text"
                    value={form.fullName}
                    onChange={(e) =>
                      setForm({ ...form, fullName: e.target.value })
                    }
                    className="h-9 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
                    placeholder="Jean Mukendi"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="h-9 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
                    placeholder="+243 XXX XXX XXX"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Email *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="h-9 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
                  placeholder="jean@example.com"
                />
              </div>
              <Button
                className="mt-4"
                disabled={!form.fullName || !form.phone || !form.email}
                onClick={() => setStep("shipping")}
              >
                Continuer vers la livraison
              </Button>
            </div>
          )}

          {step === "shipping" && (
            <div className="space-y-4">
              <button
                onClick={() => setStep("info")}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
              >
                <HugeiconsIcon
                  icon={ArrowLeft01Icon}
                  strokeWidth={2}
                  className="size-4"
                />
                Retour
              </button>
              <h2 className="text-xl font-bold">Adresse de livraison</h2>
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Adresse *
                </label>
                <input
                  type="text"
                  value={form.addressLine1}
                  onChange={(e) =>
                    setForm({ ...form, addressLine1: e.target.value })
                  }
                  className="h-9 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
                  placeholder="123 Avenue de la Paix"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium">
                  Complément d&apos;adresse
                </label>
                <input
                  type="text"
                  value={form.addressLine2}
                  onChange={(e) =>
                    setForm({ ...form, addressLine2: e.target.value })
                  }
                  className="h-9 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
                  placeholder="Apt, Étage..."
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Ville *
                  </label>
                  <input
                    type="text"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                    className="h-9 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
                    placeholder="Kinshasa"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-medium">
                    Province
                  </label>
                  <input
                    type="text"
                    value={form.province}
                    onChange={(e) =>
                      setForm({ ...form, province: e.target.value })
                    }
                    className="h-9 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
                    placeholder="Kinshasa"
                  />
                </div>
              </div>
              <Button
                className="mt-4"
                disabled={!form.addressLine1 || !form.city}
                onClick={() => setStep("payment")}
              >
                Continuer vers le paiement
              </Button>
            </div>
          )}

          {step === "payment" && (
            <div className="space-y-4">
              <button
                onClick={() => setStep("shipping")}
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
              >
                <HugeiconsIcon
                  icon={ArrowLeft01Icon}
                  strokeWidth={2}
                  className="size-4"
                />
                Retour
              </button>
              <h2 className="text-xl font-bold">Paiement</h2>

              <div className="rounded-lg border p-6">
                <h3 className="mb-4 font-medium">
                  Choisir un mode de paiement
                </h3>
                <div className="space-y-3">
                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-muted">
                    <input
                      type="radio"
                      name="payment"
                      defaultChecked
                      className="size-4 accent-primary"
                    />
                    <div>
                      <p className="font-medium">Maxicash</p>
                      <p className="text-sm text-muted-foreground">
                        Paiement mobile (M-Pesa, Airtel Money, Orange Money)
                      </p>
                    </div>
                  </label>
                  <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-muted">
                    <input
                      type="radio"
                      name="payment"
                      className="size-4 accent-primary"
                    />
                    <div>
                      <p className="font-medium">Carte cadeau KDOBOX</p>
                      <p className="text-sm text-muted-foreground">
                        Utiliser le solde d&apos;une carte cadeau
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              <div className="rounded-lg border bg-muted/30 p-4 text-sm">
                <p className="font-medium">Récapitulatif livraison</p>
                <p className="mt-1 text-muted-foreground">
                  {form.fullName} — {form.phone}
                </p>
                <p className="text-muted-foreground">
                  {form.addressLine1}
                  {form.addressLine2 ? `, ${form.addressLine2}` : ""}
                </p>
                <p className="text-muted-foreground">
                  {form.city}
                  {form.province ? `, ${form.province}` : ""}, RDC
                </p>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button
                className="mt-4 w-full"
                size="lg"
                onClick={handleSubmitOrder}
                disabled={submitting}
              >
                {submitting
                  ? "Traitement en cours..."
                  : `Payer ${totalPrice.toLocaleString("fr-CD")} CDF`}
              </Button>
            </div>
          )}
        </div>

        {/* Order summary sidebar */}
        {step !== "confirmation" && (
          <div className="h-fit rounded-lg border p-5">
            <h3 className="font-bold">
              Votre commande ({totalItems} article
              {totalItems !== 1 ? "s" : ""})
            </h3>
            <Separator className="my-3" />
            <div className="max-h-64 space-y-3 overflow-y-auto">
              {items.map((item) => (
                <div key={item.productId} className="flex gap-3">
                  <div className="relative size-12 shrink-0 overflow-hidden rounded bg-muted">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="48px"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm">
                        🎁
                      </div>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.quantity} × {item.price.toLocaleString("fr-CD")} CDF
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Separator className="my-3" />
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sous-total</span>
                <span>{totalPrice.toLocaleString("fr-CD")} CDF</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Livraison</span>
                <span className="text-green-600">Gratuite</span>
              </div>
            </div>
            <Separator className="my-3" />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>{totalPrice.toLocaleString("fr-CD")} CDF</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
