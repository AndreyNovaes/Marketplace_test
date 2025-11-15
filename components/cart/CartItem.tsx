'use client'

/**
 * CartItem Component - Item do carrinho de compras
 * Exibe produto, variante, quantidade e permite remoção com data-testid
 */

import { useState } from 'react'
import Link from 'next/link'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { CartItem as CartItemType } from '@/lib/types'
import { SmartImage } from '../product/SmartImage'
import { Button } from '../ui/Button'

interface CartItemProps {
  item: CartItemType
  onUpdateQuantity: (productId: string, variantId: string, quantity: number) => void
  onRemove: (productId: string, variantId: string) => void
  isUpdating?: boolean
}

export function CartItem({ item, onUpdateQuantity, onRemove, isUpdating = false }: CartItemProps) {
  const [isRemoving, setIsRemoving] = useState(false)

  const { product, variant, quantity } = item
  const itemTotal = (product.basePrice + variant.priceModifier) * quantity
  const maxQuantity = Math.min(variant.stock, 99) // Limite máximo de 99 unidades

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1 || newQuantity > maxQuantity) return
    onUpdateQuantity(product.id, variant.id, newQuantity)
  }

  const handleRemove = async () => {
    setIsRemoving(true)
    // Simula latência de rede
    await new Promise(resolve => setTimeout(resolve, 1000))
    onRemove(product.id, variant.id)
  }

  return (
    <div
      className="flex gap-4 p-4 bg-white rounded-lg border border-gray-200 transition-all duration-300 hover:shadow-md"
      data-testid={`cart-item-${product.id}-${variant.id}`}
    >
      {/* Product Image */}
      <Link href={`/product/${product.id}`} className="flex-shrink-0">
        <SmartImage
          query={variant.images[0] || product.name}
          filename={`${product.id}-${variant.id}-0.jpg`}
          alt={`${product.name} - ${variant.color}`}
          className="rounded-lg overflow-hidden"
          width={120}
          height={120}
          productId={`cart-${product.id}`}
        />
      </Link>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        {/* Product Name */}
        <Link
          href={`/product/${product.id}`}
          className="font-semibold text-gray-900 hover:text-primary-600 transition-colors line-clamp-2 mb-1"
          data-testid={`cart-item-name-${product.id}`}
        >
          {product.name}
        </Link>

        {/* Variant Info */}
        <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-2">
          <span data-testid={`cart-item-color-${product.id}-${variant.id}`}>
            Cor: <strong>{variant.color}</strong>
          </span>
          {variant.size && variant.size !== 'Padrão' && (
            <>
              <span className="text-gray-400">•</span>
              <span data-testid={`cart-item-size-${product.id}-${variant.id}`}>
                Tamanho: <strong>{variant.size}</strong>
              </span>
            </>
          )}
        </div>

        {/* Stock Warning */}
        {variant.stock < 5 && variant.stock > 0 && (
          <p className="text-xs text-orange-600 mb-2" data-testid={`cart-item-low-stock-${product.id}-${variant.id}`}>
            Apenas {variant.stock} em estoque!
          </p>
        )}

        {/* Out of Stock */}
        {variant.stock === 0 && (
          <p className="text-xs text-red-600 font-medium mb-2" data-testid={`cart-item-out-of-stock-${product.id}-${variant.id}`}>
            Produto esgotado
          </p>
        )}

        {/* Seller */}
        <p className="text-xs text-gray-500">
          Vendido por <span className="font-medium text-gray-700">{product.seller.name}</span>
        </p>

        {/* Mobile: Price and Actions */}
        <div className="md:hidden mt-3 flex items-center justify-between">
          <div>
            <p className="text-lg font-bold text-gray-900" data-testid={`cart-item-total-${product.id}-${variant.id}`}>
              R$ {itemTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-gray-500">
              R$ {(product.basePrice + variant.priceModifier).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} cada
            </p>
          </div>
        </div>
      </div>

      {/* Desktop: Quantity, Price and Actions */}
      <div className="hidden md:flex flex-col items-end justify-between">
        {/* Price */}
        <div className="text-right">
          <p className="text-xl font-bold text-gray-900" data-testid={`cart-item-total-${product.id}-${variant.id}`}>
            R$ {itemTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-sm text-gray-500">
            R$ {(product.basePrice + variant.priceModifier).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} cada
          </p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleQuantityChange(quantity - 1)}
            disabled={quantity <= 1 || isUpdating || variant.stock === 0}
            className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            data-testid={`cart-item-decrease-${product.id}-${variant.id}`}
            aria-label="Diminuir quantidade"
          >
            <Minus size={16} />
          </button>

          <span
            className="text-lg font-semibold text-gray-900 min-w-[2rem] text-center"
            data-testid={`cart-item-quantity-${product.id}-${variant.id}`}
          >
            {quantity}
          </span>

          <button
            onClick={() => handleQuantityChange(quantity + 1)}
            disabled={quantity >= maxQuantity || isUpdating || variant.stock === 0}
            className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            data-testid={`cart-item-increase-${product.id}-${variant.id}`}
            aria-label="Aumentar quantidade"
          >
            <Plus size={16} />
          </button>
        </div>

        {/* Remove Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRemove}
          disabled={isRemoving}
          isLoading={isRemoving}
          testId={`cart-item-remove-${product.id}-${variant.id}`}
          className="text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <Trash2 size={16} />
          Remover
        </Button>
      </div>

      {/* Mobile: Quantity and Remove */}
      <div className="md:hidden flex flex-col gap-2 w-full mt-3">
        {/* Quantity Controls */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700">Quantidade:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1 || isUpdating || variant.stock === 0}
              className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              data-testid={`cart-item-decrease-mobile-${product.id}-${variant.id}`}
            >
              <Minus size={16} />
            </button>

            <span className="text-lg font-semibold text-gray-900 min-w-[2rem] text-center">
              {quantity}
            </span>

            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={quantity >= maxQuantity || isUpdating || variant.stock === 0}
              className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              data-testid={`cart-item-increase-mobile-${product.id}-${variant.id}`}
            >
              <Plus size={16} />
            </button>
          </div>
        </div>

        {/* Remove Button */}
        <Button
          variant="outline"
          size="sm"
          fullWidth
          onClick={handleRemove}
          disabled={isRemoving}
          isLoading={isRemoving}
          testId={`cart-item-remove-mobile-${product.id}-${variant.id}`}
          className="text-red-600 border-red-600 hover:bg-red-50"
        >
          <Trash2 size={16} />
          Remover
        </Button>
      </div>
    </div>
  )
}
