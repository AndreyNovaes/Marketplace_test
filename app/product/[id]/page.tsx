'use client'

/**
 * Product Detail Page (PDP) - Página de detalhes do produto
 * Inclui galeria de imagens, seleção de variantes, especificações e reviews
 */

import { useState, useMemo } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Star, ShoppingCart, Heart, Share2, Package, Shield, TruckIcon } from 'lucide-react'
import { getProductById } from '@/lib/mock-data'
import { ImageGallery } from '@/components/product/SmartImage'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useCart } from '@/hooks/useCart'
import { ProductCard } from '@/components/product/ProductCard'
import { MOCK_PRODUCTS } from '@/lib/mock-data'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { addToCart } = useCart()

  const productId = params.id as string
  const product = getProductById(productId)

  const [selectedVariantId, setSelectedVariantId] = useState<string>('')
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  // Inicializa variante selecionada
  useMemo(() => {
    if (product && !selectedVariantId) {
      const defaultVariant = product.variants.find(v => v.stock > 0) || product.variants[0]
      setSelectedVariantId(defaultVariant.id)
    }
  }, [product, selectedVariantId])

  if (!product) {
    return (
      <div className="container py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4" data-testid="product-not-found">Produto não encontrado</h1>
          <p className="text-gray-600 mb-8">O produto que você está procurando não existe ou foi removido.</p>
          <Button onClick={() => router.push('/')} testId="back-to-home">
            Voltar para Home
          </Button>
        </div>
      </div>
    )
  }

  const selectedVariant = product.variants.find(v => v.id === selectedVariantId)
  if (!selectedVariant) return null

  const finalPrice = product.basePrice + selectedVariant.priceModifier
  const hasDiscount = product.originalPrice && product.originalPrice > finalPrice
  const discountPercent = hasDiscount
    ? Math.round(((product.originalPrice! - finalPrice) / product.originalPrice!) * 100)
    : 0

  const hasStock = selectedVariant.stock > 0
  const maxQuantity = Math.min(selectedVariant.stock, 10)

  // Prepara imagens para galeria
  const galleryImages = selectedVariant.images.map((query, index) => ({
    query,
    filename: `${product.id}-${selectedVariant.id}-${index}.jpg`
  }))

  const handleAddToCart = async () => {
    if (!hasStock) return

    setIsAddingToCart(true)
    await addToCart(product.id, selectedVariant.id, quantity)
    setIsAddingToCart(false)
  }

  // Produtos relacionados (mesma categoria)
  const relatedProducts = MOCK_PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container py-3">
          <nav className="flex items-center gap-2 text-sm" data-testid="breadcrumb">
            <a href="/" className="text-gray-600 hover:text-primary-600">Home</a>
            <span className="text-gray-400">/</span>
            <a href={`/search?category=${product.category}`} className="text-gray-600 hover:text-primary-600">{product.category}</a>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium line-clamp-1">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div>
            <ImageGallery
              images={galleryImages}
              alt={product.name}
              productId={product.id}
            />
          </div>

          {/* Product Info */}
          <div>
            {/* Product Name and Rating */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-3" data-testid="product-title">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-2" data-testid="product-rating-display">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                  <span className="text-lg font-semibold">{product.rating.toFixed(1)}</span>
                </div>
                <span className="text-gray-600" data-testid="product-review-count">
                  ({product.reviewCount.toLocaleString('pt-BR')} avaliações)
                </span>
              </div>

              <p className="text-gray-600" data-testid="product-description-short">
                {product.shortDescription}
              </p>
            </div>

            {/* Price */}
            <div className="mb-6 pb-6 border-b border-gray-200">
              {hasDiscount && (
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl text-gray-500 line-through" data-testid="product-original-price">
                    R$ {product.originalPrice!.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </span>
                  <Badge variant="danger" size="md" testId="discount-badge">
                    -{discountPercent}% OFF
                  </Badge>
                </div>
              )}

              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-4xl font-bold text-gray-900" data-testid="product-price">
                  R$ {finalPrice.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </span>
              </div>

              <p className="text-gray-600">
                ou até <strong>12x de R$ {(finalPrice / 12).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong> sem juros
              </p>
            </div>

            {/* Variant Selection - Color */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Cor: <span className="text-gray-600 font-normal">{selectedVariant.color}</span>
              </label>

              <div className="flex flex-wrap gap-3">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => {
                      setSelectedVariantId(variant.id)
                      setQuantity(1)
                    }}
                    disabled={variant.stock === 0}
                    className={`
                      relative px-4 py-2 border-2 rounded-lg transition-all
                      ${selectedVariant.id === variant.id
                        ? 'border-primary-600 bg-primary-50'
                        : variant.stock > 0
                          ? 'border-gray-300 hover:border-gray-400'
                          : 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50'
                      }
                    `}
                    data-testid={`variant-color-${variant.id}`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded-full border-2 border-white shadow"
                        style={{ backgroundColor: variant.colorHex }}
                      />
                      <span className="font-medium">{variant.color}</span>
                    </div>

                    {variant.stock === 0 && (
                      <span className="text-xs text-red-600 absolute -top-2 -right-2 bg-white px-1 rounded">
                        Esgotado
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Variant Selection - Size (if different from "Padrão") */}
            {product.variants.some(v => v.size && v.size !== 'Padrão') && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Configuração: <span className="text-gray-600 font-normal">{selectedVariant.size}</span>
                </label>

                <div className="flex flex-wrap gap-3">
                  {product.variants
                    .filter(v => v.color === selectedVariant.color)
                    .map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => {
                          setSelectedVariantId(variant.id)
                          setQuantity(1)
                        }}
                        disabled={variant.stock === 0}
                        className={`
                          px-4 py-3 border-2 rounded-lg transition-all min-w-[120px]
                          ${selectedVariant.id === variant.id
                            ? 'border-primary-600 bg-primary-50'
                            : variant.stock > 0
                              ? 'border-gray-300 hover:border-gray-400'
                              : 'border-gray-200 bg-gray-50 cursor-not-allowed opacity-50'
                          }
                        `}
                        data-testid={`variant-size-${variant.id}`}
                      >
                        <div className="font-medium">{variant.size}</div>
                        {variant.priceModifier !== 0 && (
                          <div className="text-xs text-gray-600 mt-1">
                            +R$ {variant.priceModifier.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                          </div>
                        )}
                      </button>
                    ))}
                </div>
              </div>
            )}

            {/* Stock Status */}
            <div className="mb-6">
              {hasStock ? (
                <>
                  <p className="text-green-600 font-semibold mb-2" data-testid="stock-status">
                    ✓ Em estoque
                  </p>
                  {selectedVariant.stock < 10 && (
                    <p className="text-orange-600 text-sm" data-testid="low-stock-warning">
                      Apenas {selectedVariant.stock} unidades disponíveis
                    </p>
                  )}
                </>
              ) : (
                <p className="text-red-600 font-semibold" data-testid="stock-status">
                  ✗ Produto esgotado
                </p>
              )}
            </div>

            {/* Quantity Selector */}
            {hasStock && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Quantidade
                </label>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                    data-testid="quantity-decrease"
                  >
                    -
                  </button>

                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => {
                      const val = parseInt(e.target.value) || 1
                      setQuantity(Math.max(1, Math.min(maxQuantity, val)))
                    }}
                    min={1}
                    max={maxQuantity}
                    className="w-20 h-10 border-2 border-gray-300 rounded-lg text-center font-semibold"
                    data-testid="quantity-input"
                  />

                  <button
                    onClick={() => setQuantity(Math.min(maxQuantity, quantity + 1))}
                    disabled={quantity >= maxQuantity}
                    className="w-10 h-10 border-2 border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                    data-testid="quantity-increase"
                  >
                    +
                  </button>

                  <span className="text-sm text-gray-600">Máx: {maxQuantity}</span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 mb-8">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleAddToCart}
                disabled={!hasStock || isAddingToCart}
                isLoading={isAddingToCart}
                testId="add-to-cart-button"
                className="flex-1"
              >
                <ShoppingCart size={20} />
                Adicionar ao Carrinho
              </Button>

              <Button
                variant="outline"
                size="lg"
                testId="wishlist-button"
                className="px-6"
              >
                <Heart size={20} />
              </Button>

              <Button
                variant="outline"
                size="lg"
                testId="share-button"
                className="px-6"
              >
                <Share2 size={20} />
              </Button>
            </div>

            {/* Benefits */}
            <div className="space-y-3 mb-8 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3 text-sm">
                <TruckIcon size={20} className="text-primary-600" />
                <span>Frete grátis para compras acima de R$ 299</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Package size={20} className="text-primary-600" />
                <span>Entrega estimada: 5-10 dias úteis</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Shield size={20} className="text-primary-600" />
                <span>Garantia de 12 meses direto com o fabricante</span>
              </div>
            </div>

            {/* Seller Info */}
            <div className="p-4 border border-gray-200 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">Vendido por</p>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-900" data-testid="seller-name">
                  {product.seller.name}
                </p>
                {product.seller.verified && (
                  <Badge variant="primary" size="sm">Verificado</Badge>
                )}
              </div>
              <div className="flex items-center gap-2 mt-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < Math.floor(product.seller.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">{product.seller.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200 mb-8">
            <div className="flex gap-8">
              <button className="pb-4 border-b-2 border-primary-600 text-primary-600 font-semibold" data-testid="tab-description">
                Descrição
              </button>
              <button className="pb-4 text-gray-600 hover:text-gray-900" data-testid="tab-specs">
                Especificações
              </button>
              <button className="pb-4 text-gray-600 hover:text-gray-900" data-testid="tab-reviews">
                Avaliações
              </button>
            </div>
          </div>

          {/* Description */}
          <div className="mb-12">
            <p className="text-gray-700 leading-relaxed mb-6" data-testid="product-description">
              {product.description}
            </p>

            <h3 className="text-xl font-bold text-gray-900 mb-4">Características Principais</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-start gap-3" data-testid={`feature-${index}`}>
                  <span className="text-primary-600 mt-1">✓</span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Specifications */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Especificações Técnicas</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value], index) => (
                <div
                  key={key}
                  className="flex justify-between p-4 bg-gray-50 rounded-lg"
                  data-testid={`spec-${index}`}
                >
                  <span className="font-medium text-gray-900">{key}:</span>
                  <span className="text-gray-700">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Produtos Relacionados</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
