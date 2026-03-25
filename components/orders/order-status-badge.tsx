import { Badge } from "@/components/ui/badge"

const STATUS_CONFIG: Record<
  string,
  {
    label: string
    variant: "default" | "secondary" | "outline" | "destructive"
  }
> = {
  pending: { label: "En attente", variant: "secondary" },
  paid: { label: "Payée", variant: "default" },
  processing: { label: "En préparation", variant: "default" },
  shipped: { label: "Expédiée", variant: "default" },
  delivered: { label: "Livrée", variant: "outline" },
  cancelled: { label: "Annulée", variant: "destructive" },
}

export function OrderStatusBadge({ status }: { status: string }) {
  const config = STATUS_CONFIG[status] || {
    label: status,
    variant: "secondary" as const,
  }

  return <Badge variant={config.variant}>{config.label}</Badge>
}

export { STATUS_CONFIG }
