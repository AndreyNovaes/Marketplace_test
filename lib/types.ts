/**
 * Definições de tipos TypeScript para o Quantum Market
 * Este arquivo contém todas as interfaces e tipos utilizados na aplicação
 */

export interface ProductVariant {
  id: string
  color: string
  colorHex: string
  size: string
  sku: string
  stock: number
  priceModifier: number // Valor a ser adicionado ao preço base
  images: string[] // Array de queries para o componente SmartImage
}

export interface Product {
  id: string
  name: string
  description: string
  shortDescription: string
  basePrice: number
  originalPrice?: number // Preço original antes do desconto
  category: string
  subcategory: string
  brand: string
  rating: number
  reviewCount: number
  tags: string[]
  variants: ProductVariant[]
  features: string[]
  specifications: Record<string, string>
  seller: {
    id: string
    name: string
    rating: number
    verified: boolean
  }
  createdAt: string
  updatedAt: string
  isFeatured: boolean
  isNew: boolean
  isBestSeller: boolean
}

export interface CartItem {
  productId: string
  variantId: string
  quantity: number
  product: Product
  variant: ProductVariant
  addedAt: string
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  discount: number
  shipping: number
  total: number
  promoCode?: string
}

export interface Filter {
  categories: string[]
  brands: string[]
  priceRange: [number, number]
  rating: number
  inStock: boolean
  tags: string[]
}

export interface SearchParams {
  query?: string
  category?: string
  brand?: string
  minPrice?: number
  maxPrice?: number
  rating?: number
  sort?: 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'popular'
  page?: number
  limit?: number
}

export interface SellerProduct {
  name: string
  description: string
  category: string
  subcategory: string
  brand: string
  basePrice: number
  originalPrice?: number
  images: File[]
  features: string[]
  specifications: Record<string, string>
  variants: Omit<ProductVariant, 'id'>[]
  tags: string[]
  isFeatured: boolean
}

export interface PromoCode {
  code: string
  discount: number // Porcentagem de desconto
  minPurchase?: number
  validUntil: string
  isActive: boolean
}

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'buyer' | 'seller' | 'admin'
  createdAt: string
}

export interface Review {
  id: string
  productId: string
  userId: string
  userName: string
  rating: number
  comment: string
  images?: string[]
  helpful: number
  verified: boolean
  createdAt: string
}

export interface Notification {
  id: string
  type: 'order' | 'promotion' | 'review' | 'stock' | 'system'
  title: string
  message: string
  read: boolean
  createdAt: string
  actionUrl?: string
}

// Tipos para estados de UI
export type LoadingState = 'idle' | 'loading' | 'success' | 'error'

export interface ApiResponse<T> {
  data?: T
  error?: string
  message?: string
  status: number
}

// Tipos auxiliares
export type SortOption = {
  value: string
  label: string
}

export type PriceRange = {
  min: number
  max: number
}
