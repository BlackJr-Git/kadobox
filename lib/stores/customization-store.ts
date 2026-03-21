"use client"

import { create } from "zustand"

type CustomizationState = {
  step: number
  orderItemId: string | null
  message: string
  senderName: string
  recipientName: string
  image: string | null
  wrappingType: "standard" | "premium" | "luxury"
  deliveryDate: string | null
  isGift: boolean
  setStep: (step: number) => void
  setOrderItemId: (id: string | null) => void
  setMessage: (message: string) => void
  setSenderName: (name: string) => void
  setRecipientName: (name: string) => void
  setImage: (image: string | null) => void
  setWrappingType: (type: CustomizationState["wrappingType"]) => void
  setDeliveryDate: (date: string | null) => void
  setIsGift: (isGift: boolean) => void
  reset: () => void
}

const initialState = {
  step: 1,
  orderItemId: null,
  message: "",
  senderName: "",
  recipientName: "",
  image: null,
  wrappingType: "standard" as const,
  deliveryDate: null,
  isGift: true,
}

export const useCustomizationStore = create<CustomizationState>()((set) => ({
  ...initialState,
  setStep: (step) => set({ step }),
  setOrderItemId: (orderItemId) => set({ orderItemId }),
  setMessage: (message) => set({ message }),
  setSenderName: (senderName) => set({ senderName }),
  setRecipientName: (recipientName) => set({ recipientName }),
  setImage: (image) => set({ image }),
  setWrappingType: (wrappingType) => set({ wrappingType }),
  setDeliveryDate: (deliveryDate) => set({ deliveryDate }),
  setIsGift: (isGift) => set({ isGift }),
  reset: () => set(initialState),
}))
