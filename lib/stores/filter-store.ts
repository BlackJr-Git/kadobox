"use client"

import { create } from "zustand"

type FilterState = {
  gender: string | null
  occasionId: string | null
  categoryId: string | null
  minPrice: number | null
  maxPrice: number | null
  sort: "newest" | "price-asc" | "price-desc" | "popular"
  setGender: (gender: string | null) => void
  setOccasionId: (id: string | null) => void
  setCategoryId: (id: string | null) => void
  setMinPrice: (price: number | null) => void
  setMaxPrice: (price: number | null) => void
  setSort: (sort: FilterState["sort"]) => void
  reset: () => void
}

const initialState = {
  gender: null,
  occasionId: null,
  categoryId: null,
  minPrice: null,
  maxPrice: null,
  sort: "newest" as const,
}

export const useFilterStore = create<FilterState>()((set) => ({
  ...initialState,
  setGender: (gender) => set({ gender }),
  setOccasionId: (occasionId) => set({ occasionId }),
  setCategoryId: (categoryId) => set({ categoryId }),
  setMinPrice: (minPrice) => set({ minPrice }),
  setMaxPrice: (maxPrice) => set({ maxPrice }),
  setSort: (sort) => set({ sort }),
  reset: () => set(initialState),
}))
