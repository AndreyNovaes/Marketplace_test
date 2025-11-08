'use client'

/**
 * New Product Page - Formulário de cadastro de produto
 * Formulário complexo com mais de 10 campos, validação e upload de arquivo
 */

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Package, Upload, X, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select } from '@/components/ui/Select'
import { Checkbox } from '@/components/ui/Checkbox'
import { CATEGORIES, BRANDS } from '@/lib/mock-data'

interface FormErrors {
  [key: string]: string
}

export default function NewProductPage() {
  const router = useRouter()

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    subcategory: '',
    brand: '',
    basePrice: '',
    originalPrice: '',
    sku: '',
    stock: '',
    weight: '',
    dimensions: '',
    warranty: '',
    features: '',
    isFeatured: false,
    acceptTerms: false
  })

  const [images, setImages] = useState<File[]>([])
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Validation
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Nome do produto é obrigatório'
    } else if (formData.name.trim().length < 10) {
      newErrors.name = 'Nome deve ter pelo menos 10 caracteres'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Descrição é obrigatória'
    } else if (formData.description.trim().length < 50) {
      newErrors.description = 'Descrição deve ter pelo menos 50 caracteres'
    }

    if (!formData.category) {
      newErrors.category = 'Selecione uma categoria'
    }

    if (!formData.brand) {
      newErrors.brand = 'Selecione uma marca'
    }

    if (!formData.basePrice) {
      newErrors.basePrice = 'Preço é obrigatório'
    } else if (parseFloat(formData.basePrice) <= 0) {
      newErrors.basePrice = 'Preço deve ser maior que zero'
    }

    if (!formData.sku.trim()) {
      newErrors.sku = 'SKU é obrigatório'
    }

    if (!formData.stock) {
      newErrors.stock = 'Quantidade em estoque é obrigatória'
    } else if (parseInt(formData.stock) < 0) {
      newErrors.stock = 'Estoque não pode ser negativo'
    }

    if (!formData.weight.trim()) {
      newErrors.weight = 'Peso é obrigatório'
    }

    if (images.length === 0) {
      newErrors.images = 'Adicione pelo menos uma imagem do produto'
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'Você deve aceitar os termos e condições'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  // Handle file upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newImages = Array.from(files)

    // Validate file types
    const validTypes = ['image/jpeg', 'image/png', 'image/webp']
    const invalidFiles = newImages.filter(file => !validTypes.includes(file.type))

    if (invalidFiles.length > 0) {
      setErrors(prev => ({
        ...prev,
        images: 'Apenas arquivos JPEG, PNG e WebP são permitidos'
      }))
      return
    }

    // Validate file sizes (max 5MB each)
    const oversizedFiles = newImages.filter(file => file.size > 5 * 1024 * 1024)
    if (oversizedFiles.length > 0) {
      setErrors(prev => ({
        ...prev,
        images: 'Cada imagem deve ter no máximo 5MB'
      }))
      return
    }

    // Limit to 5 images
    const totalImages = images.length + newImages.length
    if (totalImages > 5) {
      setErrors(prev => ({
        ...prev,
        images: 'Máximo de 5 imagens permitidas'
      }))
      return
    }

    setImages(prev => [...prev, ...newImages])

    if (errors.images) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors.images
        return newErrors
      })
    }
  }

  // Remove image
  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  // Handle submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    setIsSubmitting(true)

    // Simulate API call (2-3 seconds delay)
    await new Promise(resolve => setTimeout(resolve, 2500))

    console.log('Product submitted:', formData, images)

    setIsSubmitting(false)
    setSubmitSuccess(true)

    // Reset form after success
    setTimeout(() => {
      router.push('/')
    }, 2000)
  }

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center" data-testid="success-message">
          <CheckCircle size={64} className="text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Produto Cadastrado com Sucesso!</h1>
          <p className="text-gray-600 mb-6">Redirecionando...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <Package size={32} className="text-primary-600" />
            <h1 className="text-3xl font-bold text-gray-900" data-testid="page-title">
              Cadastrar Novo Produto
            </h1>
          </div>
          <p className="text-gray-600">
            Preencha todos os campos obrigatórios para cadastrar seu produto no marketplace
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Informações Básicas</h2>

            <div className="space-y-6">
              <Input
                label="Nome do Produto"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ex: Notebook Gamer ASUS ROG Strix G16"
                required
                error={errors.name}
                testId="product-name"
                helperText="Seja descritivo e inclua as principais características"
              />

              <Textarea
                label="Descrição Completa"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Descreva detalhadamente o produto, suas características, benefícios e diferenciais..."
                required
                error={errors.description}
                testId="product-description"
                showCharCount
                maxLength={2000}
                className="min-h-[150px]"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  label="Categoria"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  options={[
                    { value: '', label: 'Selecione...', disabled: true },
                    ...CATEGORIES.map(cat => ({ value: cat, label: cat }))
                  ]}
                  required
                  error={errors.category}
                  testId="product-category"
                />

                <Input
                  label="Subcategoria"
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                  placeholder="Ex: Notebooks"
                  testId="product-subcategory"
                />
              </div>

              <Select
                label="Marca"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                options={[
                  { value: '', label: 'Selecione...', disabled: true },
                  ...BRANDS.map(brand => ({ value: brand, label: brand }))
                ]}
                required
                error={errors.brand}
                testId="product-brand"
              />
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Preço e Estoque</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Preço de Venda"
                name="basePrice"
                type="number"
                step="0.01"
                min="0"
                value={formData.basePrice}
                onChange={handleChange}
                placeholder="0.00"
                required
                error={errors.basePrice}
                testId="product-price"
                leftIcon={<span className="text-gray-500">R$</span>}
              />

              <Input
                label="Preço Original (Opcional)"
                name="originalPrice"
                type="number"
                step="0.01"
                min="0"
                value={formData.originalPrice}
                onChange={handleChange}
                placeholder="0.00"
                testId="product-original-price"
                leftIcon={<span className="text-gray-500">R$</span>}
                helperText="Para produtos com desconto"
              />

              <Input
                label="SKU (Código do Produto)"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                placeholder="Ex: NB-ASUS-ROG-001"
                required
                error={errors.sku}
                testId="product-sku"
              />

              <Input
                label="Quantidade em Estoque"
                name="stock"
                type="number"
                min="0"
                value={formData.stock}
                onChange={handleChange}
                placeholder="0"
                required
                error={errors.stock}
                testId="product-stock"
              />
            </div>
          </div>

          {/* Shipping Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Informações de Envio</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Peso (kg)"
                name="weight"
                type="number"
                step="0.001"
                min="0"
                value={formData.weight}
                onChange={handleChange}
                placeholder="Ex: 2.5"
                required
                error={errors.weight}
                testId="product-weight"
              />

              <Input
                label="Dimensões (C x L x A cm)"
                name="dimensions"
                value={formData.dimensions}
                onChange={handleChange}
                placeholder="Ex: 40 x 30 x 10"
                testId="product-dimensions"
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Informações Adicionais</h2>

            <div className="space-y-6">
              <Input
                label="Garantia"
                name="warranty"
                value={formData.warranty}
                onChange={handleChange}
                placeholder="Ex: 12 meses"
                testId="product-warranty"
              />

              <Textarea
                label="Características Principais"
                name="features"
                value={formData.features}
                onChange={handleChange}
                placeholder="Liste as características principais, uma por linha"
                testId="product-features"
                helperText="Separe cada característica por linha"
              />
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Imagens do Produto</h2>

            <div className="space-y-4">
              {/* Upload Button */}
              <div>
                <label
                  htmlFor="image-upload"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 cursor-pointer transition-colors"
                  data-testid="image-upload-label"
                >
                  <Upload size={20} />
                  Adicionar Imagens
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                  data-testid="image-uploader"
                />
                <p className="text-sm text-gray-600 mt-2">
                  Formatos aceitos: JPEG, PNG, WebP. Máximo 5 imagens de até 5MB cada.
                </p>
                {errors.images && (
                  <p className="text-sm text-red-600 mt-2" data-testid="images-error">
                    {errors.images}
                  </p>
                )}
              </div>

              {/* Image Preview */}
              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4" data-testid="image-preview-grid">
                  {images.map((image, index) => (
                    <div
                      key={index}
                      className="relative group aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200"
                      data-testid={`image-preview-${index}`}
                    >
                      <img
                        src={URL.createObjectURL(image)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full hover:bg-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                        data-testid={`remove-image-${index}`}
                        aria-label="Remover imagem"
                      >
                        <X size={16} />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs p-2">
                        {image.name}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Options */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Opções</h2>

            <div className="space-y-4">
              <Checkbox
                label="Produto em Destaque"
                description="Exibir este produto na página inicial"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleChange}
                testId="product-featured"
              />

              <Checkbox
                label="Aceito os termos e condições"
                description="Li e concordo com os termos de venda do marketplace"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleChange}
                testId="accept-terms"
              />
              {errors.acceptTerms && (
                <p className="text-sm text-red-600" data-testid="accept-terms-error">
                  {errors.acceptTerms}
                </p>
              )}
            </div>
          </div>

          {/* Submit Actions */}
          <div className="flex gap-4">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              isLoading={isSubmitting}
              loadingText="Cadastrando produto..."
              testId="submit-product-button"
            >
              Cadastrar Produto
            </Button>

            <Button
              type="button"
              variant="outline"
              size="lg"
              onClick={() => router.push('/')}
              disabled={isSubmitting}
              testId="cancel-button"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
