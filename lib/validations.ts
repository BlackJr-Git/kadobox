import { z } from "zod"

export const contactFormSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  subject: z.string().min(3, "Le sujet doit contenir au moins 3 caractères"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
})

export const checkoutInfoSchema = z.object({
  fullName: z.string().min(2, "Nom requis"),
  email: z.string().email("Email invalide"),
  phone: z
    .string()
    .min(9, "Numéro de téléphone invalide")
    .regex(/^\+?[0-9\s-]+$/, "Format invalide"),
})

export const shippingAddressSchema = z.object({
  addressLine1: z.string().min(5, "Adresse requise"),
  addressLine2: z.string().optional(),
  city: z.string().min(2, "Ville requise"),
  province: z.string().optional(),
  country: z.string().default("RDC"),
})

export const giftCustomizationSchema = z.object({
  recipientName: z.string().min(1, "Nom du destinataire requis"),
  senderName: z.string().optional(),
  message: z.string().max(500, "Message trop long").optional(),
  wrappingType: z.enum(["standard", "premium", "luxury"]),
  deliveryDate: z.string().optional(),
  isGift: z.boolean().default(true),
})

export const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().uuid("ID produit invalide"),
        quantity: z.number().int().min(1, "Quantité minimum: 1"),
        unitPrice: z.number().positive("Prix invalide"),
      })
    )
    .min(1, "Le panier est vide"),
  address: shippingAddressSchema.merge(
    z.object({
      fullName: z.string().min(2, "Nom requis"),
      phone: z.string().min(9, "Téléphone requis"),
    })
  ),
  notes: z.string().optional(),
})

export const reviewSchema = z.object({
  productId: z.string().uuid("ID produit invalide"),
  rating: z.number().int().min(1).max(5),
  comment: z.string().max(1000).optional(),
})

export type ContactFormValues = z.infer<typeof contactFormSchema>
export type CheckoutInfoValues = z.infer<typeof checkoutInfoSchema>
export type ShippingAddressValues = z.infer<typeof shippingAddressSchema>
export type GiftCustomizationValues = z.infer<typeof giftCustomizationSchema>
export type CreateOrderValues = z.infer<typeof createOrderSchema>
export type ReviewValues = z.infer<typeof reviewSchema>
