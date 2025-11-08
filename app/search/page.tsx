'use client'

/**
 * Search Page - Página de busca com filtros complexos
 * Inclui filtros de preço, marca, categoria, avaliação e mais
 */

import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Filter, X, SlidersHorizontal } from 'lucide-react'
import { ProductCard } from '@/components/product/ProductCard'
import { Button } from '@/components/ui/Button'
import { Checkbox } from '@/components/ui/Checkbox'
import { Slider } from '@/components/ui/Slider'
import { Select } from '@/components/ui/Select'
import { useCart } from '@/hooks/useCart'
import {
  MOCK_PRODUCTS,
  CATEGORIES,
  BRANDS,
  searchProducts,
  filterProducts,
  sortProducts
} from '@/lib/mock-data'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const { addToCart } = useCart()

  const [showFilters, setShowFilters] = useState(true)
  const [addingToCartId, setAddingToCartId] = useState<string | null>(null)

  // Estado dos filtros
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 20000])
  const [minRating, setMinRating] = useState<number>(0)
  const [inStockOnly, setInStockOnly] = useState<boolean>(false)
  const [sortBy, setSortBy] = useState<string>('relevance')

  // Query de busca
  const searchQuery = searchParams.get('query') || ''
  const categoryParam = searchParams.get('category')

  // Inicializa filtros com parâmetros da URL
  useEffect(() => {
    if (categoryParam && !selectedCategories.includes(categoryParam)) {
      setSelectedCategories([categoryParam])
    }
  }, [categoryParam, selectedCategories])

  // Aplica filtros e ordenação
  const filteredProducts = useMemo(() => {
    let products = searchQuery ? searchProducts(searchQuery) : [...MOCK_PRODUCTS]

    // Aplica filtros
    products = filterProducts(products, {
      minPrice: priceRange[0],
      maxPrice: priceRange[1],
      brands: selectedBrands.length > 0 ? selectedBrands : undefined,
      categories: selectedCategories.length > 0 ? selectedCategories : undefined,
      rating: minRating > 0 ? minRating : undefined,
      inStock: inStockOnly
    })

    // Aplica ordenação
    if (sortBy !== 'relevance') {
      products = sortProducts(products, sortBy as any)
    }

    return products
  }, [searchQuery, selectedCategories, selectedBrands, priceRange, minRating, inStockOnly, sortBy])

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand)
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedBrands([])
    setPriceRange([0, 20000])
    setMinRating(0)
    setInStockOnly(false)
    setSortBy('relevance')
  }

  const activeFiltersCount = selectedCategories.length + selectedBrands.length +
    (priceRange[0] > 0 || priceRange[1] < 20000 ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (inStockOnly ? 1 : 0)

  const handleAddToCart = async (productId: string, variantId: string) => {
    setAddingToCartId(productId)
    await addToCart(productId, variantId)
    setAddingToCartId(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2" data-testid="search-title">
              {searchQuery ? `Resultados para "${searchQuery}"` : 'Todos os Produtos'}
            </h1>
            <p className="text-gray-600" data-testid="results-count">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'produto encontrado' : 'produtos encontrados'}
            </p>
          </div>

          {/* Mobile Filter Toggle */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            testId="toggle-filters"
            className="lg:hidden"
          >
            <SlidersHorizontal size={20} />
            Filtros {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          {showFilters && (
            <aside className="lg:col-span-1" data-testid="filters-sidebar">
              <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Filter size={20} />
                    Filtros
                  </h2>

                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                      data-testid="clear-filters"
                    >
                      Limpar tudo
                    </button>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Price Range Filter */}
                  <div className="pb-6 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4">Faixa de Preço</h3>
                    <Slider
                      min={0}
                      max={20000}
                      step={100}
                      value={priceRange}
                      onChange={(value) => setPriceRange(value as [number, number])}
                      range
                      formatValue={(val) => `R$ ${val.toLocaleString('pt-BR')}`}
                      testId="price-slider"
                    />
                  </div>

                  {/* Categories Filter */}
                  <div className="pb-6 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4">Categorias</h3>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {CATEGORIES.map((category) => (
                        <Checkbox
                          key={category}
                          label={category}
                          checked={selectedCategories.includes(category)}
                          onChange={() => handleCategoryToggle(category)}
                          testId={`category-filter-${category.toLowerCase().replace(/\s+/g, '-')}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Brands Filter */}
                  <div className="pb-6 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4">Marcas</h3>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {BRANDS.map((brand) => (
                        <Checkbox
                          key={brand}
                          label={brand}
                          checked={selectedBrands.includes(brand)}
                          onChange={() => handleBrandToggle(brand)}
                          testId={`brand-filter-${brand.toLowerCase().replace(/\s+/g, '-')}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Rating Filter */}
                  <div className="pb-6 border-b border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4">Avaliação Mínima</h3>
                    <div className="space-y-2">
                      {[4, 3, 2, 1].map((rating) => (
                        <label key={rating} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="rating"
                            value={rating}
                            checked={minRating === rating}
                            onChange={() => setMinRating(rating)}
                            className="w-4 h-4"
                            data-testid={`rating-filter-${rating}`}
                          />
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <span
                                key={i}
                                className={`text-sm ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
                              >
                                ★
                              </span>
                            ))}
                            <span className="text-sm text-gray-600 ml-1">ou mais</span>
                          </div>
                        </label>
                      ))}
                      {minRating > 0 && (
                        <button
                          onClick={() => setMinRating(0)}
                          className="text-sm text-primary-600 hover:text-primary-700"
                          data-testid="clear-rating-filter"
                        >
                          Limpar
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Stock Filter */}
                  <div>
                    <Checkbox
                      label="Apenas produtos em estoque"
                      checked={inStockOnly}
                      onChange={(e) => setInStockOnly(e.target.checked)}
                      testId="in-stock-filter"
                    />
                  </div>
                </div>
              </div>
            </aside>
          )}

          {/* Products Grid */}
          <main className={showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}>
            {/* Sort and View Options */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700">Ordenar por:</label>
                <Select
                  options={[
                    { value: 'relevance', label: 'Relevância' },
                    { value: 'price-asc', label: 'Menor Preço' },
                    { value: 'price-desc', label: 'Maior Preço' },
                    { value: 'rating', label: 'Melhor Avaliação' },
                    { value: 'newest', label: 'Mais Recentes' },
                    { value: 'popular', label: 'Mais Populares' }
                  ]}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  testId="sort-select"
                  fullWidth={false}
                />
              </div>

              {/* Active Filters Display */}
              {activeFiltersCount > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">{activeFiltersCount} filtros ativos</span>
                </div>
              )}
            </div>

            {/* Active Filters Pills */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-6" data-testid="active-filters">
                {selectedCategories.map(category => (
                  <button
                    key={category}
                    onClick={() => handleCategoryToggle(category)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-primary-100 text-primary-800 rounded-full text-sm font-medium hover:bg-primary-200"
                    data-testid={`active-filter-category-${category}`}
                  >
                    {category}
                    <X size={14} />
                  </button>
                ))}

                {selectedBrands.map(brand => (
                  <button
                    key={brand}
                    onClick={() => handleBrandToggle(brand)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary-100 text-secondary-800 rounded-full text-sm font-medium hover:bg-secondary-200"
                    data-testid={`active-filter-brand-${brand}`}
                  >
                    {brand}
                    <X size={14} />
                  </button>
                ))}

                {(priceRange[0] > 0 || priceRange[1] < 20000) && (
                  <button
                    onClick={() => setPriceRange([0, 20000])}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 text-green-800 rounded-full text-sm font-medium hover:bg-green-200"
                    data-testid="active-filter-price"
                  >
                    R$ {priceRange[0].toLocaleString('pt-BR')} - R$ {priceRange[1].toLocaleString('pt-BR')}
                    <X size={14} />
                  </button>
                )}
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6" data-testid="products-grid">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                    isAddingToCart={addingToCartId === product.id}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16" data-testid="no-results">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Nenhum produto encontrado</h3>
                <p className="text-gray-600 mb-6">Tente ajustar os filtros ou fazer uma nova busca</p>
                <Button onClick={clearFilters} testId="no-results-clear-filters">
                  Limpar Filtros
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
