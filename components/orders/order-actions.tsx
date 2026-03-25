"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  MoreHorizontalIcon,
  EyeIcon,
  Edit02Icon,
  Delete02Icon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons"
import Link from "next/link"
import { toast } from "sonner"

interface OrderActionsProps {
  orderId: string
  orderNumber: string
  currentStatus: string
}

export function OrderActions({
  orderId,
  orderNumber,
  currentStatus,
}: OrderActionsProps) {
  const [showStatusDialog, setShowStatusDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [newStatus, setNewStatus] = useState(currentStatus)
  const [isLoading, setIsLoading] = useState(false)

  const handleStatusUpdate = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/orders/${orderId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) throw new Error("Erreur lors de la mise à jour")

      toast.success("Statut mis à jour avec succès")
      setShowStatusDialog(false)
      window.location.reload()
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du statut")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "DELETE",
      })

      if (!response.ok) throw new Error("Erreur lors de la suppression")

      toast.success("Commande supprimée avec succès")
      setShowDeleteDialog(false)
      window.location.reload()
    } catch (error) {
      toast.error("Erreur lors de la suppression de la commande")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon" />}>
          <HugeiconsIcon icon={MoreHorizontalIcon} />
          <span className="sr-only">Actions</span>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            render={<Link href={`/dashboard/commandes/${orderId}`} />}
          >
            <HugeiconsIcon icon={EyeIcon} />
            <span>Voir les détails</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setShowStatusDialog(true)}>
            <HugeiconsIcon icon={CheckmarkCircle02Icon} />
            <span>Changer le statut</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onSelect={() => setShowDeleteDialog(true)}
          >
            <HugeiconsIcon icon={Delete02Icon} />
            <span>Supprimer</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={showStatusDialog} onOpenChange={setShowStatusDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Changer le statut</DialogTitle>
            <DialogDescription>
              Modifier le statut de la commande {orderNumber}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4">
            <Select
              value={newStatus}
              onValueChange={(value) => setNewStatus(value || currentStatus)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">En attente</SelectItem>
                <SelectItem value="paid">Payée</SelectItem>
                <SelectItem value="processing">En préparation</SelectItem>
                <SelectItem value="shipped">Expédiée</SelectItem>
                <SelectItem value="delivered">Livrée</SelectItem>
                <SelectItem value="cancelled">Annulée</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowStatusDialog(false)}
              disabled={isLoading}
            >
              Annuler
            </Button>
            <Button onClick={handleStatusUpdate} disabled={isLoading}>
              {isLoading ? "Mise à jour..." : "Confirmer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Supprimer la commande</DialogTitle>
            <DialogDescription>
              Êtes-vous sûr de vouloir supprimer la commande {orderNumber} ?
              Cette action est irréversible.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              disabled={isLoading}
            >
              Annuler
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isLoading}
            >
              {isLoading ? "Suppression..." : "Supprimer"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
