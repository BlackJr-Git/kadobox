"use client"

import { HugeiconsIcon } from "@hugeicons/react"
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons"

type PaymentFormProps = {
  form: {
    fullName: string
    phone: string
    addressLine1: string
    addressLine2: string
    city: string
    province: string
  }
  onBack: () => void
}

export function PaymentForm({ form, onBack }: PaymentFormProps) {
  return (
    <div className="space-y-4">
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <HugeiconsIcon icon={ArrowLeft01Icon} strokeWidth={2} className="size-4" />
        Retour
      </button>
      <h2 className="text-xl font-bold">Paiement</h2>

      <div className="rounded-lg border p-6">
        <h3 className="mb-4 font-medium">Choisir un mode de paiement</h3>
        <div className="space-y-3">
          <label className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-muted">
            <input
              type="radio"
              name="payment"
              value="maxicash"
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
              value="giftcard"
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
    </div>
  )
}
