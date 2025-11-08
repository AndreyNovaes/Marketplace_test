'use client'

/**
 * Cart Page - Página do carrinho de compras
 * Permite visualizar itens, alterar quantidades, aplicar cupons e finalizar compra
 */

import { useState } from 'react'
import Link from 'next/link'
import { ShoppingCart, ArrowRight, Tag, Trash2 } from 'lucide-react'
import { CartItem as CartItemComponent } from '@/components/cart/CartItem'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useCart } from '@/hooks/useCart'

export default function CartPage() {
  const {
    cart,
    isLoading,
    promoCode,
    promoCodeMessage,
    promoCodeError,
    updateQuantity,
    removeFromCart,
    applyPromoCode,
    removePromoCode,
    getTotalItems
  } = useCart()

  const [promoCodeInput, setPromoCodeInput] = useState('')
  const [isApplyingPromo, setIsApplyingPromo] = useState(false)

  const handleApplyPromoCode = async () => {
    if (!promoCodeInput.trim()) return

    setIsApplyingPromo(true)
    await applyPromoCode(promoCodeInput.trim().toUpperCase())
    setIsApplyingPromo(false)
  }

  const handleRemovePromoCode = () => {
    removePromoCode()
    setPromoCodeInput('')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando carrinho...</p>
        </div>
      </div>
    )
  }

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container py-16">
          <div className="max-w-md mx-auto text-center" data-testid="empty-cart">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart size={48} className="text-gray-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Seu carrinho está vazio</h1>
            <p className="text-gray-600 mb-8">
              Adicione produtos ao carrinho para continuar comprando
            </p>
            <Link href="/">
              <Button size="lg" testId="continue-shopping-empty">
                <ArrowRight size={20} className="rotate-180" />
                Continuar Comprando
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="cart-title">
            Meu Carrinho
          </h1>
          <p className="text-gray-600" data-testid="cart-item-count">
            {getTotalItems()} {getTotalItems() === 1 ? 'item' : 'itens'} no carrinho
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4" data-testid="cart-items-list">
              {cart.items.map((item) => (
                <CartItemComponent
                  key={`${item.productId}-${item.variantId}`}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="mt-6">
              <Link href="/search">
                <Button variant="outline" size="lg" testId="continue-shopping">
                  <ArrowRight size={20} className="rotate-180" />
                  Continuar Comprando
                </Button>
              </Link>
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4" data-testid="cart-summary">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Resumo do Pedido</h2>

              {/* Promo Code */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  <Tag size={16} className="inline mr-2" />
                  Cupom de Desconto
                </label>

                {!promoCode ? (
                  <div className="flex gap-2">
                    <Input
                      type="text"
                      placeholder="Digite o cupom"
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                      onKeyPress={(e) => e.key === 'Enter' && handleApplyPromoCode()}
                      testId="promo-code-input"
                      error={promoCodeError ? promoCodeMessage : undefined}
                      className="flex-1"
                    />
                    <Button
                      onClick={handleApplyPromoCode}
                      disabled={!promoCodeInput.trim() || isApplyingPromo}
                      isLoading={isApplyingPromo}
                      testId="apply-promo-button"
                    >
                      Aplicar
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <div>
                      <p className="font-semibold text-green-800" data-testid="applied-promo-code">
                        {promoCode}
                      </p>
                      <p className="text-sm text-green-600" data-testid="promo-code-message">
                        {promoCodeMessage}
                      </p>
                    </div>
                    <button
                      onClick={handleRemovePromoCode}
                      className="text-green-600 hover:text-green-700"
                      data-testid="remove-promo-button"
                      aria-label="Remover cupom"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                )}

                {promoCodeMessage && !promoCodeError && !promoCode && (
                  <p className="mt-2 text-sm text-green-600" data-testid="promo-success-message">
                    {promoCodeMessage}
                  </p>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal ({getTotalItems()} itens)</span>
                  <span data-testid="cart-subtotal">
                    R$ {cart.subtotal.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                {cart.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Desconto</span>
                    <span data-testid="cart-discount">
                      -R$ {cart.discount.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                )}

                <div className="flex justify-between text-gray-700">
                  <span>Frete</span>
                  <span data-testid="cart-shipping">
                    {cart.shipping === 0 ? (
                      <span className="text-green-600 font-semibold">GRÁTIS</span>
                    ) : (
                      `R$ ${cart.shipping.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                    )}
                  </span>
                </div>

                {cart.shipping > 0 && (
                  <div className="text-xs text-gray-600 bg-blue-50 p-2 rounded">
                    💡 Frete grátis em compras acima de R$ 299
                    {cart.subtotal < 299 && (
                      <p className="mt-1 font-medium">
                        Faltam R$ {(299 - cart.subtotal).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} para frete grátis!
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center text-xl font-bold text-gray-900 mb-6 pt-6 border-t-2 border-gray-200">
                <span>Total</span>
                <span data-testid="cart-total">
                  R$ {cart.total.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              {/* Checkout Button */}
              <Button
                variant="primary"
                size="lg"
                fullWidth
                testId="checkout-button"
                onClick={() => alert('Checkout não implementado nesta demo. Recurso disponível em produção.')}
              >
                Finalizar Compra
                <ArrowRight size={20} />
              </Button>

              {/* Payment Methods */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-600 mb-3">Formas de pagamento:</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">VISA</div>
                  <div className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">MASTERCARD</div>
                  <div className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">ELO</div>
                  <div className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">PIX</div>
                  <div className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">BOLETO</div>
                </div>
              </div>

              {/* Security Notice */}
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-start gap-2">
                  <span className="text-green-600">🔒</span>
                  <p className="text-xs text-gray-600">
                    Compra 100% segura. Seus dados estão protegidos com criptografia SSL.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
