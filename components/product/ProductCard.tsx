'use client'

/**
 * ProductCard Component - Cartão de produto para exibição em listagens
 * Inclui imagem, preço, avaliação e badges com data-testid completo
 */

import Link from 'next/link'
import { Star, ShoppingCart, TrendingUp, Sparkles } from 'lucide-react'
import { Product } from '@/lib/types'
import { SmartImage } from './SmartImage'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'

interface ProductCardProps {
  product: Product
  onAddToCart?: (productId: string, variantId: string) => void
  isAddingToCart?: boolean
}

export function ProductCard({ product, onAddToCart, isAddingToCart = false }: ProductCardProps) {
  // Pega a primeira variante disponível
  const defaultVariant = product.variants.find(v => v.stock > 0) || product.variants[0]
  const hasStock = defaultVariant && defaultVariant.stock > 0
  const finalPrice = product.basePrice + (defaultVariant?.priceModifier || 0)
  const hasDiscount = product.originalPrice && product.originalPrice > finalPrice
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - finalPrice) / product.originalPrice!) * 100)
    : 0

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault() // Previne navegação do Link
    if (onAddToCart && defaultVariant && hasStock) {
      onAddToCart(product.id, defaultVariant.id)
    }
  }

  return (
    <div
      className="group bg-white rounded-lg border border-gray-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
      data-testid={`product-card-${product.id}`}
    >
      <Link href={`/product/${product.id}`}>
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <SmartImage
            query={defaultVariant?.images[0] || product.name}
            filename={`${product.id}-${defaultVariant?.id}-0.jpg`}
            alt={product.name}
            className="w-full h-full"
            width={400}
            height={400}
            productId={product.id}
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1.5">
            {product.isNew && (
              <Badge variant="primary" size="sm" testId={`badge-new-${product.id}`}>
                <Sparkles size={12} className="mr-1" />
                Novo
              </Badge>
            )}
            {product.isBestSeller && (
              <Badge variant="warning" size="sm" testId={`badge-bestseller-${product.id}`}>
                <TrendingUp size={12} className="mr-1" />
                Mais Vendido
              </Badge>
            )}
            {hasDiscount && (
              <Badge variant="danger" size="sm" testId={`badge-discount-${product.id}`}>
                -{discountPercent}%
              </Badge>
            )}
          </div>

          {/* Out of Stock Overlay */}
          {!hasStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="bg-white px-4 py-2 rounded-lg font-bold text-gray-900" data-testid={`out-of-stock-${product.id}`}>
                Esgotado
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Category */}
          <p className="text-xs text-gray-500 mb-1" data-testid={`product-category-${product.id}`}>
            {product.category}
          </p>

          {/* Product Name */}
          <h3
            className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-primary-600 transition-colors min-h-[2.5rem]"
            data-testid={`product-name-${product.id}`}
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center gap-1" data-testid={`product-rating-${product.id}`}>
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium text-gray-900">{product.rating.toFixed(1)}</span>
            </div>
            <span className="text-xs text-gray-500" data-testid={`product-reviews-${product.id}`}>
              ({product.reviewCount.toLocaleString('pt-BR')} avaliações)
            </span>
          </div>

          {/* Price */}
          <div className="mb-3">
            {hasDiscount && (
              <p className="text-sm text-gray-500 line-through" data-testid={`product-original-price-${product.id}`}>
                R$ {product.originalPrice!.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            )}
            <p className="text-2xl font-bold text-gray-900" data-testid={`product-price-${product.id}`}>
              R$ {finalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
            {hasStock && (
              <p className="text-xs text-green-600" data-testid={`product-installments-${product.id}`}>
                em até 12x de R$ {(finalPrice / 12).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            )}
          </div>

          {/* Stock Status */}
          {hasStock && defaultVariant.stock < 10 && (
            <p className="text-xs text-orange-600 mb-3" data-testid={`product-low-stock-${product.id}`}>
              Apenas {defaultVariant.stock} em estoque!
            </p>
          )}

          {/* Add to Cart Button */}
          <Button
            variant="primary"
            size="md"
            fullWidth
            disabled={!hasStock || isAddingToCart}
            isLoading={isAddingToCart}
            onClick={handleAddToCart}
            testId={`add-to-cart-button-${product.id}`}
          >
            <ShoppingCart size={18} />
            {hasStock ? 'Adicionar ao Carrinho' : 'Indisponível'}
          </Button>

          {/* Seller */}
          <div className="mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-600">
              Vendido por{' '}
              <span className="font-medium text-gray-900" data-testid={`product-seller-${product.id}`}>
                {product.seller.name}
              </span>
              {product.seller.verified && (
                <span className="ml-1 text-primary-600">✓</span>
              )}
            </p>
          </div>
        </div>
      </Link>
    </div>
  )
}
