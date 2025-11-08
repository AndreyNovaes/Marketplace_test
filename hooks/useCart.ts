'use client'

/**
 * useCart Hook - Gerenciamento de estado do carrinho de compras
 * Utiliza localStorage para persistência e simula latência de rede
 */

import { useState, useEffect, useCallback } from 'react'
import { Cart, CartItem, Product, ProductVariant } from '@/lib/types'
import { getProductById } from '@/lib/mock-data'
import { validatePromoCode } from '@/lib/mock-data'

const CART_STORAGE_KEY = 'quantum-market-cart'
const SHIPPING_THRESHOLD = 299 // Valor para frete grátis
const SHIPPING_COST = 29.90

export function useCart() {
  const [cart, setCart] = useState<Cart>({
    items: [],
    subtotal: 0,
    discount: 0,
    shipping: 0,
    total: 0
  })
  const [promoCode, setPromoCode] = useState<string>('')
  const [promoCodeMessage, setPromoCodeMessage] = useState<string>('')
  const [promoCodeError, setPromoCodeError] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Carrega carrinho do localStorage na inicialização
  useEffect(() => {
    loadCart()
  }, [])

  // Salva carrinho no localStorage sempre que mudar
  useEffect(() => {
    if (!isLoading) {
      saveCart()
    }
  }, [cart, isLoading])

  /**
   * Carrega carrinho do localStorage
   */
  const loadCart = () => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY)
      if (stored) {
        const parsedCart = JSON.parse(stored)
        setCart(parsedCart)
      }
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error)
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Salva carrinho no localStorage
   */
  const saveCart = () => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    } catch (error) {
      console.error('Erro ao salvar carrinho:', error)
    }
  }

  /**
   * Calcula totais do carrinho
   */
  const calculateTotals = useCallback((items: CartItem[], discount: number = 0) => {
    const subtotal = items.reduce((total, item) => {
      const itemPrice = item.product.basePrice + item.variant.priceModifier
      return total + (itemPrice * item.quantity)
    }, 0)

    const discountAmount = (subtotal * discount) / 100
    const subtotalAfterDiscount = subtotal - discountAmount

    // Frete grátis se subtotal >= threshold
    const shipping = subtotalAfterDiscount >= SHIPPING_THRESHOLD ? 0 : SHIPPING_COST

    const total = subtotalAfterDiscount + shipping

    return {
      subtotal,
      discount: discountAmount,
      shipping,
      total
    }
  }, [])

  /**
   * Adiciona produto ao carrinho
   */
  const addToCart = async (productId: string, variantId: string, quantity: number = 1): Promise<boolean> => {
    // Simula latência de rede (1-2 segundos)
    await new Promise(resolve => setTimeout(resolve, 1500))

    const product = getProductById(productId)
    if (!product) {
      console.error('Produto não encontrado:', productId)
      return false
    }

    const variant = product.variants.find(v => v.id === variantId)
    if (!variant) {
      console.error('Variante não encontrada:', variantId)
      return false
    }

    // Verifica estoque
    if (variant.stock < quantity) {
      console.error('Estoque insuficiente')
      return false
    }

    setCart(prevCart => {
      const newItems = [...prevCart.items]

      // Verifica se o item já está no carrinho
      const existingItemIndex = newItems.findIndex(
        item => item.productId === productId && item.variantId === variantId
      )

      if (existingItemIndex > -1) {
        // Atualiza quantidade do item existente
        const newQuantity = newItems[existingItemIndex].quantity + quantity

        // Verifica estoque para nova quantidade
        if (newQuantity > variant.stock) {
          console.error('Quantidade excede estoque disponível')
          return prevCart
        }

        newItems[existingItemIndex] = {
          ...newItems[existingItemIndex],
          quantity: newQuantity
        }
      } else {
        // Adiciona novo item
        newItems.push({
          productId,
          variantId,
          quantity,
          product,
          variant,
          addedAt: new Date().toISOString()
        })
      }

      const totals = calculateTotals(newItems, prevCart.discount)

      return {
        ...prevCart,
        items: newItems,
        ...totals
      }
    })

    return true
  }

  /**
   * Remove produto do carrinho
   */
  const removeFromCart = async (productId: string, variantId: string): Promise<void> => {
    // Simula latência de rede
    await new Promise(resolve => setTimeout(resolve, 1000))

    setCart(prevCart => {
      const newItems = prevCart.items.filter(
        item => !(item.productId === productId && item.variantId === variantId)
      )

      const totals = calculateTotals(newItems, prevCart.discount)

      return {
        ...prevCart,
        items: newItems,
        ...totals,
        promoCode: newItems.length === 0 ? undefined : prevCart.promoCode
      }
    })

    // Limpa código promocional se carrinho ficar vazio
    if (cart.items.length === 1) {
      setPromoCode('')
      setPromoCodeMessage('')
      setPromoCodeError(false)
    }
  }

  /**
   * Atualiza quantidade de um item
   */
  const updateQuantity = async (productId: string, variantId: string, quantity: number): Promise<boolean> => {
    if (quantity < 1) return false

    // Simula latência de rede
    await new Promise(resolve => setTimeout(resolve, 800))

    const product = getProductById(productId)
    if (!product) return false

    const variant = product.variants.find(v => v.id === variantId)
    if (!variant || variant.stock < quantity) return false

    setCart(prevCart => {
      const newItems = prevCart.items.map(item => {
        if (item.productId === productId && item.variantId === variantId) {
          return { ...item, quantity }
        }
        return item
      })

      const totals = calculateTotals(newItems, prevCart.discount)

      return {
        ...prevCart,
        items: newItems,
        ...totals
      }
    })

    return true
  }

  /**
   * Aplica código promocional
   */
  const applyPromoCode = async (code: string): Promise<void> => {
    setPromoCodeError(false)
    setPromoCodeMessage('')

    // Simula latência de rede
    await new Promise(resolve => setTimeout(resolve, 1500))

    const validation = validatePromoCode(code, cart.subtotal)

    if (!validation.valid) {
      setPromoCodeError(true)
      setPromoCodeMessage(validation.message)
      return
    }

    setCart(prevCart => {
      const discountPercent = validation.discount || 0
      const totals = calculateTotals(prevCart.items, discountPercent)

      return {
        ...prevCart,
        ...totals,
        promoCode: code
      }
    })

    setPromoCode(code)
    setPromoCodeMessage(validation.message)
    setPromoCodeError(false)
  }

  /**
   * Remove código promocional
   */
  const removePromoCode = () => {
    setCart(prevCart => {
      const totals = calculateTotals(prevCart.items, 0)

      return {
        ...prevCart,
        ...totals,
        promoCode: undefined
      }
    })

    setPromoCode('')
    setPromoCodeMessage('')
    setPromoCodeError(false)
  }

  /**
   * Limpa carrinho
   */
  const clearCart = () => {
    setCart({
      items: [],
      subtotal: 0,
      discount: 0,
      shipping: 0,
      total: 0
    })
    setPromoCode('')
    setPromoCodeMessage('')
    setPromoCodeError(false)
  }

  /**
   * Retorna quantidade total de itens no carrinho
   */
  const getTotalItems = (): number => {
    return cart.items.reduce((total, item) => total + item.quantity, 0)
  }

  return {
    cart,
    isLoading,
    promoCode,
    promoCodeMessage,
    promoCodeError,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyPromoCode,
    removePromoCode,
    clearCart,
    getTotalItems
  }
}
