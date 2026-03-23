"use client"

import { Separator } from "@/components/ui/separator"
import { useCustomizationStore } from "@/lib/stores/customization-store"

const WRAPPING_OPTIONS = [
  {
    value: "standard" as const,
    label: "Standard",
    emoji: "🎁",
    desc: "Emballage cadeau classique",
    price: 0,
  },
  {
    value: "premium" as const,
    label: "Premium",
    emoji: "✨",
    desc: "Papier de luxe + ruban satin",
    price: 2000,
  },
  {
    value: "luxury" as const,
    label: "Luxury",
    emoji: "👑",
    desc: "Boîte rigide + noeud fait main",
    price: 5000,
  },
]

export function RecipientStep() {
  const store = useCustomizationStore()

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Pour qui est ce cadeau ?</h2>
      <div>
        <label className="mb-1.5 block text-sm font-medium">
          Nom du destinataire *
        </label>
        <input
          type="text"
          value={store.recipientName}
          onChange={(e) => store.setRecipientName(e.target.value)}
          className="h-9 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
          placeholder="Ex: Marie"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium">
          Votre nom (expéditeur)
        </label>
        <input
          type="text"
          value={store.senderName}
          onChange={(e) => store.setSenderName(e.target.value)}
          className="h-9 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
          placeholder="Ex: Jean"
        />
      </div>
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id="isGift"
          checked={store.isGift}
          onChange={(e) => store.setIsGift(e.target.checked)}
          className="size-4 accent-primary"
        />
        <label htmlFor="isGift" className="text-sm">
          Masquer le prix sur le colis (cadeau)
        </label>
      </div>
    </div>
  )
}

export function MessageStep() {
  const store = useCustomizationStore()

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Votre message</h2>
      <p className="text-sm text-muted-foreground">
        Ajoutez un message personnel qui accompagnera le cadeau.
      </p>
      <div>
        <textarea
          value={store.message}
          onChange={(e) => store.setMessage(e.target.value)}
          rows={5}
          maxLength={500}
          className="w-full resize-none rounded-lg border bg-background px-3 py-2 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
          placeholder="Joyeux anniversaire ! Ce cadeau est pour toi avec tout mon amour..."
        />
        <p className="mt-1 text-right text-xs text-muted-foreground">
          {store.message.length}/500
        </p>
      </div>
      {store.message && (
        <div className="rounded-lg border bg-muted/30 p-4">
          <p className="mb-1 text-xs font-medium text-muted-foreground">Aperçu</p>
          <div className="rounded-md bg-background p-4 shadow-sm">
            <p className="text-sm italic">&ldquo;{store.message}&rdquo;</p>
            {store.senderName && (
              <p className="mt-2 text-right text-sm font-medium">
                — {store.senderName}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export function WrappingStep() {
  const store = useCustomizationStore()

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Choix de l&apos;emballage</h2>
      <div className="space-y-3">
        {WRAPPING_OPTIONS.map((opt) => (
          <label
            key={opt.value}
            className={`flex cursor-pointer items-center gap-4 rounded-lg border-2 p-4 transition-all ${
              store.wrappingType === opt.value
                ? "border-primary bg-primary/5"
                : "border-transparent bg-muted/30 hover:border-muted-foreground/20"
            }`}
          >
            <input
              type="radio"
              name="wrapping"
              checked={store.wrappingType === opt.value}
              onChange={() => store.setWrappingType(opt.value)}
              className="sr-only"
            />
            <span className="text-3xl">{opt.emoji}</span>
            <div className="flex-1">
              <p className="font-medium">{opt.label}</p>
              <p className="text-sm text-muted-foreground">{opt.desc}</p>
            </div>
            <span className="text-sm font-bold">
              {opt.price === 0
                ? "Gratuit"
                : `+${opt.price.toLocaleString("fr-CD")} CDF`}
            </span>
          </label>
        ))}
      </div>
    </div>
  )
}

export function RecapStep() {
  const store = useCustomizationStore()

  return (
    <div className="space-y-5">
      <h2 className="text-2xl font-bold">Date d&apos;envoi et récapitulatif</h2>
      <div>
        <label className="mb-1.5 block text-sm font-medium">
          Date d&apos;envoi souhaitée
        </label>
        <input
          type="date"
          value={store.deliveryDate || ""}
          onChange={(e) => store.setDeliveryDate(e.target.value || null)}
          min={new Date().toISOString().split("T")[0]}
          className="h-9 w-full rounded-lg border bg-background px-3 text-sm outline-none focus:border-ring focus:ring-2 focus:ring-ring/50"
        />
      </div>
      <Separator />
      <div className="rounded-lg border p-5">
        <h3 className="mb-3 font-bold">Récapitulatif personnalisation</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Destinataire</span>
            <span className="font-medium">{store.recipientName}</span>
          </div>
          {store.senderName && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Expéditeur</span>
              <span>{store.senderName}</span>
            </div>
          )}
          {store.message && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Message</span>
              <span className="max-w-[200px] truncate text-right">
                {store.message}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-muted-foreground">Emballage</span>
            <span>
              {WRAPPING_OPTIONS.find((o) => o.value === store.wrappingType)?.label}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Cadeau (prix masqué)</span>
            <span>{store.isGift ? "Oui" : "Non"}</span>
          </div>
          {store.deliveryDate && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Date d&apos;envoi</span>
              <span>
                {new Date(store.deliveryDate).toLocaleDateString("fr-FR")}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
