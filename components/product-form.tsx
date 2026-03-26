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
import { Loader2, X } from "lucide-react"

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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Nom du produit *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Prix (CDF) *</Label>
              <Input
                id="price"
                type="number"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: Number(e.target.value) })
                }
                required
              />
            </div>

            <div>
              <Label htmlFor="stock">Stock *</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: Number(e.target.value) })
                }
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="gender">Genre *</Label>
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
              <SelectTrigger>
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

          <div className="flex items-center space-x-2">
            <Checkbox
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) =>
                setFormData({ ...formData, isActive: checked as boolean })
              }
            />
            <Label htmlFor="isActive" className="cursor-pointer">
              Produit actif
            </Label>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <Label>Images</Label>
            <div className="mt-2 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative aspect-square">
                    <Image
                      src={image.url}
                      alt={image.altText || "Product"}
                      fill
                      className="rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="text-destructive-foreground absolute top-2 right-2 rounded-full bg-destructive p-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div>
                <Input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  disabled={uploading}
                  className="cursor-pointer"
                />
                {uploading && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    Upload en cours...
                  </p>
                )}
              </div>
            </div>
          </div>

          <div>
            <Label>Catégories</Label>
            <div className="mt-2 space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={formData.categoryIds.includes(category.id)}
                    onCheckedChange={() => toggleCategory(category.id)}
                  />
                  <Label
                    htmlFor={`category-${category.id}`}
                    className="cursor-pointer"
                  >
                    {category.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label>Occasions</Label>
            <div className="mt-2 space-y-2">
              {occasions.map((occasion) => (
                <div key={occasion.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`occasion-${occasion.id}`}
                    checked={formData.occasionIds.includes(occasion.id)}
                    onCheckedChange={() => toggleOccasion(occasion.id)}
                  />
                  <Label
                    htmlFor={`occasion-${occasion.id}`}
                    className="cursor-pointer"
                  >
                    {occasion.name}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={loading || uploading}>
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {product?.id ? "Mettre à jour" : "Créer le produit"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={loading}
        >
          Annuler
        </Button>
      </div>
    </form>
  )
}
