"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons"

type CheckoutFormProps = {
  form: {
    fullName: string
    email: string
    phone: string
    addressLine1: string
    addressLine2: string
    city: string
    province: string
  }
  onChange: (form: CheckoutFormProps["form"]) => void
}

export function ContactInfoForm({ form, onChange }: CheckoutFormProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Vos coordonnées</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Nom complet *</label>
          <input
            type="text"
            value={form.fullName}
            onChange={(e) => onChange({ ...form, fullName: e.target.value })}
            className="h-9 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
            placeholder="Jean Mukendi"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Téléphone *</label>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => onChange({ ...form, phone: e.target.value })}
            className="h-9 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
            placeholder="+243 XXX XXX XXX"
          />
        </div>
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Email *</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => onChange({ ...form, email: e.target.value })}
          className="h-9 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
          placeholder="jean@example.com"
        />
      </div>
    </div>
  )
}

export function ShippingForm({
  form,
  onChange,
  onBack,
}: CheckoutFormProps & { onBack: () => void }) {
  return (
    <div className="space-y-4">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} className="size-4" />
        Retour
      </button>
      <h2 className="text-xl font-bold">Adresse de livraison</h2>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Adresse *</label>
        <input
          type="text"
          value={form.addressLine1}
          onChange={(e) => onChange({ ...form, addressLine1: e.target.value })}
          className="h-9 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
          placeholder="123 Avenue de la Paix"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">Complément d&apos;adresse</label>
        <input
          type="text"
          value={form.addressLine2}
          onChange={(e) => onChange({ ...form, addressLine2: e.target.value })}
          className="h-9 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
          placeholder="Apt, Étage..."
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium">Ville *</label>
          <input
            type="text"
            value={form.city}
            onChange={(e) => onChange({ ...form, city: e.target.value })}
            className="h-9 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
            placeholder="Kinshasa"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium">Province</label>
          <input
            type="text"
            value={form.province}
            onChange={(e) => onChange({ ...form, province: e.target.value })}
            className="h-9 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
            placeholder="Kinshasa"
          />
        </div>
      </div>
    </div>
  )
}
