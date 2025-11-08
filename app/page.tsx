'use client'

/**
 * Homepage - Página principal do Quantum Market
 * Exibe produtos em destaque, mais vendidos, novos e categorias
 */

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, TrendingUp, Sparkles, Star } from 'lucide-react'
import { ProductCard } from '@/components/product/ProductCard'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { useCart } from '@/hooks/useCart'
import {
  MOCK_PRODUCTS,
  getFeaturedProducts,
  getBestSellerProducts,
  getNewProducts,
  CATEGORIES
} from '@/lib/mock-data'

export default function HomePage() {
  const { addToCart } = useCart()
  const [addingToCartId, setAddingToCartId] = useState<string | null>(null)

  const featuredProducts = getFeaturedProducts()
  const bestSellers = getBestSellerProducts().slice(0, 8)
  const newProducts = getNewProducts().slice(0, 8)

  const handleAddToCart = async (productId: string, variantId: string) => {
    setAddingToCartId(productId)
    await addToCart(productId, variantId)
    setAddingToCartId(null)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-16" data-testid="hero-banner">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4" data-testid="hero-title">
              Bem-vindo ao Quantum Market
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100" data-testid="hero-description">
              Os melhores produtos de tecnologia com os melhores preços. Frete grátis em compras acima de R$ 299.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/search">
                <Button size="lg" variant="secondary" testId="hero-shop-button">
                  Ver Todos os Produtos
                  <ArrowRight size={20} />
                </Button>
              </Link>
              <Link href="/search?category=Eletrônicos">
                <Button size="lg" variant="outline" testId="hero-electronics-button" className="bg-white/10 border-white text-white hover:bg-white/20">
                  Eletrônicos em Destaque
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Quick Access */}
      <section className="py-8 border-b border-gray-200 bg-white" data-testid="categories-section">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Compre por Categoria</h2>
            <Link href="/search" className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2" data-testid="view-all-categories">
              Ver todas
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {CATEGORIES.slice(0, 6).map((category, index) => (
              <Link
                key={category}
                href={`/search?category=${encodeURIComponent(category)}`}
                className="group p-6 bg-gray-50 rounded-lg hover:bg-primary-50 hover:shadow-md transition-all duration-200 text-center"
                data-testid={`category-card-${index}`}
              >
                <div className="text-3xl mb-2">📦</div>
                <p className="font-medium text-gray-900 group-hover:text-primary-700 transition-colors">
                  {category}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-12 bg-gray-50" data-testid="featured-section">
          <div className="container">
            <div className="flex items-center gap-3 mb-8">
              <Star size={32} className="text-yellow-500 fill-yellow-500" />
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Produtos em Destaque</h2>
                <p className="text-gray-600">Selecionados especialmente para você</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredProducts.slice(0, 8).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  isAddingToCart={addingToCartId === product.id}
                />
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/search?featured=true">
                <Button size="lg" variant="outline" testId="view-all-featured">
                  Ver Todos os Destaques
                  <ArrowRight size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Best Sellers */}
      {bestSellers.length > 0 && (
        <section className="py-12 bg-white" data-testid="bestsellers-section">
          <div className="container">
            <div className="flex items-center gap-3 mb-8">
              <TrendingUp size={32} className="text-green-600" />
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Mais Vendidos</h2>
                <p className="text-gray-600">Os produtos favoritos dos nossos clientes</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {bestSellers.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  isAddingToCart={addingToCartId === product.id}
                />
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/search?bestsellers=true">
                <Button size="lg" variant="outline" testId="view-all-bestsellers">
                  Ver Todos os Mais Vendidos
                  <ArrowRight size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* New Products */}
      {newProducts.length > 0 && (
        <section className="py-12 bg-gray-50" data-testid="new-products-section">
          <div className="container">
            <div className="flex items-center gap-3 mb-8">
              <Sparkles size={32} className="text-primary-600" />
              <div>
                <h2 className="text-3xl font-bold text-gray-900">Novidades</h2>
                <p className="text-gray-600">Produtos recém-chegados ao catálogo</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {newProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  isAddingToCartId={addingToCartId === product.id}
                />
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/search?new=true">
                <Button size="lg" variant="outline" testId="view-all-new">
                  Ver Todas as Novidades
                  <ArrowRight size={20} />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Benefits Banner */}
      <section className="py-12 bg-white border-t border-gray-200" data-testid="benefits-section">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center" data-testid="benefit-shipping">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🚚</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Frete Grátis</h3>
              <p className="text-gray-600">Em compras acima de R$ 299 para todo o Brasil</p>
            </div>

            <div className="text-center" data-testid="benefit-security">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Compra Segura</h3>
              <p className="text-gray-600">Seus dados protegidos com criptografia SSL</p>
            </div>

            <div className="text-center" data-testid="benefit-support">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Suporte 24/7</h3>
              <p className="text-gray-600">Atendimento sempre disponível para você</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
