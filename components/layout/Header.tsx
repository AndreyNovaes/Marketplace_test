'use client'

/**
 * Header Component - Cabeçalho principal da aplicação
 * Inclui logo, busca, navegação e carrinho com data-testid para testes
 */

import Link from 'next/link'
import { useState } from 'react'
import { Search, ShoppingCart, Menu, X, User, Package } from 'lucide-react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

interface HeaderProps {
  cartItemCount?: number
}

export function Header({ cartItemCount = 0 }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?query=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm" data-testid="main-header">
      {/* Top Bar */}
      <div className="bg-primary-700 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between text-sm">
            <p data-testid="promo-message">Frete grátis em compras acima de R$ 299</p>
            <div className="flex items-center gap-4">
              <Link href="/seller/products/new" className="hover:underline" data-testid="sell-link">
                Vender
              </Link>
              <Link href="/help" className="hover:underline" data-testid="help-link">
                Ajuda
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2" data-testid="logo-link">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-secondary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">Q</span>
            </div>
            <span className="text-2xl font-bold text-gray-900 hidden sm:block">
              Quantum<span className="text-primary-600">Market</span>
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="flex-1 max-w-2xl hidden md:block">
            <div className="relative">
              <Input
                type="text"
                placeholder="Buscar produtos, marcas e muito mais..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                testId="search-input"
                leftIcon={<Search size={20} />}
                className="pr-24"
              />
              <Button
                type="submit"
                size="sm"
                className="absolute right-1 top-1/2 -translate-y-1/2"
                testId="search-button"
              >
                Buscar
              </Button>
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* User Account */}
            <Link
              href="/account"
              className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              data-testid="account-link"
            >
              <User size={20} className="text-gray-700" />
              <div className="text-left">
                <p className="text-xs text-gray-600">Minha</p>
                <p className="text-sm font-medium text-gray-900">Conta</p>
              </div>
            </Link>

            {/* Orders */}
            <Link
              href="/orders"
              className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              data-testid="orders-link"
            >
              <Package size={20} className="text-gray-700" />
              <div className="text-left">
                <p className="text-xs text-gray-600">Meus</p>
                <p className="text-sm font-medium text-gray-900">Pedidos</p>
              </div>
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              className="relative flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              data-testid="cart-link"
            >
              <ShoppingCart size={24} className="text-gray-700" />
              {cartItemCount > 0 && (
                <span
                  className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                  data-testid="cart-count"
                >
                  {cartItemCount > 99 ? '99+' : cartItemCount}
                </span>
              )}
              <span className="hidden sm:block text-sm font-medium text-gray-900">Carrinho</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2"
              data-testid="mobile-menu-toggle"
              aria-label="Menu de navegação"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar - Mobile */}
        <form onSubmit={handleSearch} className="mt-4 md:hidden">
          <div className="relative">
            <Input
              type="text"
              placeholder="Buscar produtos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              testId="search-input-mobile"
              leftIcon={<Search size={20} />}
            />
          </div>
        </form>
      </div>

      {/* Categories Navigation */}
      <nav className="border-t border-gray-200 bg-gray-50" data-testid="categories-nav">
        <div className="container mx-auto px-4">
          <ul className="flex items-center gap-6 overflow-x-auto py-3 text-sm font-medium scrollbar-hide">
            <li>
              <Link href="/search?category=Eletrônicos" className="hover:text-primary-600 whitespace-nowrap" data-testid="category-eletronicos">
                Eletrônicos
              </Link>
            </li>
            <li>
              <Link href="/search?category=Informática" className="hover:text-primary-600 whitespace-nowrap" data-testid="category-informatica">
                Informática
              </Link>
            </li>
            <li>
              <Link href="/search?category=Smartphones" className="hover:text-primary-600 whitespace-nowrap" data-testid="category-smartphones">
                Smartphones
              </Link>
            </li>
            <li>
              <Link href="/search?category=Games" className="hover:text-primary-600 whitespace-nowrap" data-testid="category-games">
                Games
              </Link>
            </li>
            <li>
              <Link href="/search?category=Áudio" className="hover:text-primary-600 whitespace-nowrap" data-testid="category-audio">
                Áudio
              </Link>
            </li>
            <li>
              <Link href="/search?category=Fotografia" className="hover:text-primary-600 whitespace-nowrap" data-testid="category-fotografia">
                Fotografia
              </Link>
            </li>
            <li>
              <Link href="/search" className="text-primary-600 whitespace-nowrap" data-testid="category-all">
                Ver todas →
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white" data-testid="mobile-menu">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link href="/account" className="flex items-center gap-3 py-2" data-testid="mobile-account-link">
              <User size={20} />
              <span>Minha Conta</span>
            </Link>
            <Link href="/orders" className="flex items-center gap-3 py-2" data-testid="mobile-orders-link">
              <Package size={20} />
              <span>Meus Pedidos</span>
            </Link>
            <Link href="/seller/products/new" className="flex items-center gap-3 py-2" data-testid="mobile-sell-link">
              <Package size={20} />
              <span>Vender</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
