"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"
import Image from "next/image"
import { Loader2, X, Upload, Package, Tag, Calendar } from "lucide-react"

type Category = {
  id: string
  name: string
}

type Occasion = {
  id: string
  name: string
}

type ProductFormData = {
  id?: string
  name: string
  description: string
  price: number
  stock: number
  gender: "homme" | "femme" | "unisexe" | "enfant"
  isActive: boolean
  images: { url: string; altText?: string }[]
  categoryIds: string[]
  occasionIds: string[]
}

type ProductFormProps = {
  product?: ProductFormData
  categories: Category[]
  occasions: Occasion[]
}

export function ProductForm({
  product,
  categories,
  occasions,
}: ProductFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState<ProductFormData>({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    stock: product?.stock || 0,
    gender: product?.gender || "unisexe",
    isActive: product?.isActive ?? true,
    images: product?.images || [],
    categoryIds: product?.categoryIds || [],
    occasionIds: product?.occasionIds || [],
  })

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData()
        formData.append("file", file)

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) throw new Error("Upload failed")

        const data = await response.json()
        return { url: data.secure_url, altText: file.name }
      })

      const uploadedImages = await Promise.all(uploadPromises)
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...uploadedImages],
      }))
      toast.success("Images uploadées avec succès")
    } catch (error) {
      toast.error("Erreur lors de l'upload des images")
      console.error(error)
    } finally {
      setUploading(false)
    }
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const url = product?.id ? "/api/products" : "/api/products"
      const method = product?.id ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          id: product?.id,
        }),
      })

      if (!response.ok) throw new Error("Failed to save product")

      toast.success(
        product?.id
          ? "Produit mis à jour avec succès"
          : "Produit créé avec succès"
      )
      router.push("/dashboard/produits")
      router.refresh()
    } catch (error) {
      toast.error("Erreur lors de l'enregistrement du produit")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const toggleCategory = (categoryId: string) => {
    setFormData((prev) => ({
      ...prev,
      categoryIds: prev.categoryIds.includes(categoryId)
        ? prev.categoryIds.filter((id) => id !== categoryId)
        : [...prev.categoryIds, categoryId],
    }))
  }

  const toggleOccasion = (occasionId: string) => {
    setFormData((prev) => ({
      ...prev,
      occasionIds: prev.occasionIds.includes(occasionId)
        ? prev.occasionIds.filter((id) => id !== occasionId)
        : [...prev.occasionIds, occasionId],
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-5xl space-y-8">
      {/* Informations principales */}
      <div className="space-y-6 rounded-xl border bg-card p-6">
        <div className="flex items-center gap-3 border-b pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Package className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Informations du produit</h2>
            <p className="text-sm text-muted-foreground">
              Détails essentiels du produit
            </p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium">
              Nom du produit <span className="text-destructive">*</span>
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Ex: Montre élégante pour homme"
              className="h-11"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Décrivez le produit, ses caractéristiques et ce qui le rend spécial..."
              rows={4}
              className="resize-none"
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="price" className="text-sm font-medium">
                Prix (CDF) <span className="text-destructive">*</span>
              </Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
                placeholder="0"
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock" className="text-sm font-medium">
                Stock <span className="text-destructive">*</span>
              </Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: Number(e.target.value) })
                }
                placeholder="0"
                className="h-11"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gender" className="text-sm font-medium">
                Genre <span className="text-destructive">*</span>
              </Label>
              <Select
                value={formData.gender}
                onValueChange={(value) => {
                  if (
                    value &&
                    (value === "homme" ||
                      value === "femme" ||
                      value === "unisexe" ||
                      value === "enfant")
                  ) {
                    setFormData({ ...formData, gender: value })
                  }
                }}
              >
                <SelectTrigger className="h-11">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="homme">Homme</SelectItem>
                  <SelectItem value="femme">Femme</SelectItem>
                  <SelectItem value="unisexe">Unisexe</SelectItem>
                  <SelectItem value="enfant">Enfant</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-lg border bg-muted/30 p-4">
            <Checkbox
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, isActive: checked as boolean })
              }
            />
            <div className="flex-1">
              <Label htmlFor="isActive" className="cursor-pointer font-medium">
                Produit actif
              </Label>
              <p className="text-sm text-muted-foreground">
                Le produit sera visible sur la boutique
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Images */}
      <div className="space-y-6 rounded-xl border bg-card p-6">
        <div className="flex items-center gap-3 border-b pb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Upload className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Images du produit</h2>
            <p className="text-sm text-muted-foreground">
              {formData.images.length > 0
                ? `${formData.images.length} image${formData.images.length > 1 ? "s" : ""} ajoutée${formData.images.length > 1 ? "s" : ""}`
                : "Ajoutez des images de qualité"}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {formData.images.length > 0 && (
            <div className="grid gap-4 sm:grid-cols-3">
              {formData.images.map((image, index) => (
                <div
                  key={index}
                  className="group relative aspect-square overflow-hidden rounded-lg border bg-muted"
                >
                  <Image
                    src={image.url}
                    alt={image.altText || "Product"}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="text-destructive-foreground absolute top-2 right-2 rounded-full bg-destructive p-1.5 opacity-0 shadow-lg transition-opacity group-hover:opacity-100"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  {index === 0 && (
                    <div className="absolute bottom-2 left-2 rounded bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
                      Principal
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <label
            htmlFor="image-upload"
            className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/30 p-8 transition-colors hover:border-muted-foreground/50 hover:bg-muted/50"
          >
            <Upload className="mb-3 h-10 w-10 text-muted-foreground" />
            <p className="mb-1 text-sm font-medium">
              {uploading
                ? "Upload en cours..."
                : "Cliquez pour ajouter des images"}
            </p>
            <p className="text-xs text-muted-foreground">
              PNG, JPG ou WEBP (max. 5MB)
            </p>
            <Input
              id="image-upload"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Catégories et Occasions */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-6 rounded-xl border bg-card p-6">
          <div className="flex items-center gap-3 border-b pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Tag className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Catégories</h2>
              <p className="text-sm text-muted-foreground">
                {formData.categoryIds.length > 0
                  ? `${formData.categoryIds.length} sélectionnée${formData.categoryIds.length > 1 ? "s" : ""}`
                  : "Aucune catégorie"}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {categories.map((category) => (
              <label
                key={category.id}
                htmlFor={`category-${category.id}`}
                className="flex cursor-pointer items-center gap-3 rounded-lg border bg-muted/30 p-3 transition-colors hover:bg-muted/50"
              >
                <Checkbox
                  id={`category-${category.id}`}
                  checked={formData.categoryIds.includes(category.id)}
                  onCheckedChange={() => toggleCategory(category.id)}
                />
                <span className="flex-1 text-sm font-medium">
                  {category.name}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div className="space-y-6 rounded-xl border bg-card p-6">
          <div className="flex items-center gap-3 border-b pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Calendar className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Occasions</h2>
              <p className="text-sm text-muted-foreground">
                {formData.occasionIds.length > 0
                  ? `${formData.occasionIds.length} sélectionnée${formData.occasionIds.length > 1 ? "s" : ""}`
                  : "Aucune occasion"}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            {occasions.map((occasion) => (
              <label
                key={occasion.id}
                htmlFor={`occasion-${occasion.id}`}
                className="flex cursor-pointer items-center gap-3 rounded-lg border bg-muted/30 p-3 transition-colors hover:bg-muted/50"
              >
                <Checkbox
                  id={`occasion-${occasion.id}`}
                  checked={formData.occasionIds.includes(occasion.id)}
                  onCheckedChange={() => toggleOccasion(occasion.id)}
                />
                <span className="flex-1 text-sm font-medium">
                  {occasion.name}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="sticky bottom-0 flex items-center justify-between gap-4 rounded-xl border bg-card p-6 shadow-lg">
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.back()}
          disabled={loading}
        >
          Annuler
        </Button>
        <Button
          type="submit"
          disabled={loading || uploading}
          size="lg"
          className="min-w-[200px]"
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {product?.id ? "Mettre à jour le produit" : "Créer le produit"}
        </Button>
      </div>
    </form>
  )
}
