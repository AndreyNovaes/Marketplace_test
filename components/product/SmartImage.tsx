'use client'

/**
 * SmartImage Component - Componente CRÍTICO para lógica de imagem
 *
 * Este componente implementa um sistema inteligente de fallback de imagens com 3 níveis:
 * 1. Verificação local: Tenta carregar a imagem do diretório /public (gerada pelo script Python)
 * 2. Fallback API/Proxy Google: Busca a imagem via rota de API /api/image-proxy
 * 3. Fallback Placeholder: Exibe placeholder quando nada é encontrado
 *
 * NOTA: As imagens devem ser geradas previamente usando o script:
 * python scripts/generate-images.py
 *
 * Durante o processo, exibe um esqueleto de carregamento e mensagens de status
 * para facilitar a automação de testes
 */

import { useState, useEffect } from 'react'
import { Loader2, AlertCircle } from 'lucide-react'

interface SmartImageProps {
  query: string // Query de busca (ex: "Drone profissional com câmera 4K")
  filename: string // Nome do arquivo esperado (ex: "drone-pro-01.jpg")
  alt: string // Texto alternativo da imagem
  className?: string // Classes CSS adicionais
  priority?: boolean // Se deve carregar com prioridade
  width?: number // Largura desejada
  height?: number // Altura desejada
  productId?: string // ID do produto (para data-testid)
}

type LoadingState = 'idle' | 'checking-local' | 'fetching-api' | 'success' | 'error'

export function SmartImage({
  query,
  filename,
  alt,
  className = '',
  priority = false,
  width = 600,
  height = 400,
  productId
}: SmartImageProps) {
  const [loadingState, setLoadingState] = useState<LoadingState>('idle')
  const [imageUrl, setImageUrl] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [statusMessage, setStatusMessage] = useState<string>('')

  useEffect(() => {
    loadImage()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, filename])

  /**
   * Função principal de carregamento de imagem
   * Executa a sequência de fallbacks
   */
  const loadImage = async () => {
    setLoadingState('checking-local')
    setStatusMessage('Verificando imagem local...')

    // Simula latência de rede de 800ms
    await new Promise(resolve => setTimeout(resolve, 800))

    // PASSO 1: Verificação Local
    const localPath = `/${filename}`
    const localImageExists = await checkImageExists(localPath)

    if (localImageExists) {
      setImageUrl(localPath)
      setLoadingState('success')
      setStatusMessage('Imagem carregada do cache local')
      return
    }

    // PASSO 2: Fallback - Rota de API / Proxy Google
    setLoadingState('fetching-api')
    setStatusMessage('Buscando imagem na API...')

    // Simula latência de rede de 1500ms
    await new Promise(resolve => setTimeout(resolve, 1500))

    try {
      const response = await fetch(`/api/image-proxy?query=${encodeURIComponent(query)}`)

      if (response.ok) {
        const data = await response.json()
        if (data.imageUrl) {
          setImageUrl(data.imageUrl)
          setLoadingState('success')
          setStatusMessage('Imagem encontrada via Google')
          // Simula salvamento no /public
          simulateSaveToPublic(data.imageUrl, filename)
          return
        }
      }
    } catch (error) {
      console.error('Erro ao buscar imagem da API:', error)
    }

    // PASSO 3: Fallback - Placeholder
    // Gera URL de placeholder com as dimensões especificadas
    const placeholderUrl = `https://placehold.co/${width}x${height}/e2e8f0/64748b?text=${encodeURIComponent(query.substring(0, 30))}`
    setImageUrl(placeholderUrl)
    setLoadingState('success')
    setStatusMessage('Exibindo placeholder')
  }

  /**
   * Verifica se uma imagem existe em um caminho específico
   */
  const checkImageExists = async (url: string): Promise<boolean> => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => resolve(true)
      img.onerror = () => resolve(false)
      img.src = url

      // Timeout de 3 segundos para verificação
      setTimeout(() => resolve(false), 3000)
    })
  }

  /**
   * Simula o salvamento da imagem no diretório /public
   * Na prática, isso seria feito no servidor
   */
  const simulateSaveToPublic = (url: string, filename: string) => {
    console.log(`[SmartImage] Simulando salvamento: ${url} -> /public/${filename}`)
    // Em produção, aqui seria feita uma chamada para uma API que salvaria a imagem
  }

  /**
   * Renderiza o skeleton de carregamento
   */
  const renderSkeleton = () => {
    return (
      <div
        className={`relative bg-gradient-to-br from-gray-200 to-gray-300 animate-pulse ${className}`}
        style={{ width, height }}
        data-testid={productId ? `image-skeleton-${productId}` : 'image-skeleton'}
        role="status"
        aria-label="Carregando imagem"
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          {/* Ícone de loading baseado no estado */}
          {loadingState === 'checking-local' && (
            <Loader2 className="w-12 h-12 text-gray-400 animate-spin mb-2" data-testid="loading-icon-local" />
          )}
          {loadingState === 'fetching-api' && (
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-2" data-testid="loading-icon-api" />
          )}

          {/* Mensagem de status */}
          <p
            className="text-sm text-gray-600 text-center font-medium"
            data-testid={productId ? `image-status-${productId}` : 'image-status'}
          >
            {statusMessage}
          </p>

          {/* Indicador de progresso */}
          <div className="mt-3 w-full max-w-[200px] bg-gray-300 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full transition-all duration-500 ${
                loadingState === 'checking-local' ? 'w-1/3 bg-gray-400' :
                loadingState === 'fetching-api' ? 'w-2/3 bg-blue-500' :
                'w-full bg-green-500'
              }`}
              data-testid="loading-progress-bar"
            />
          </div>
        </div>
      </div>
    )
  }

  /**
   * Renderiza mensagem de erro
   */
  const renderError = () => {
    return (
      <div
        className={`relative bg-red-50 border-2 border-red-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
        data-testid={productId ? `image-error-${productId}` : 'image-error'}
        role="alert"
      >
        <div className="text-center p-4">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-2" />
          <p className="text-sm text-red-700 font-medium">Erro ao carregar imagem</p>
          {errorMessage && (
            <p className="text-xs text-red-600 mt-1">{errorMessage}</p>
          )}
        </div>
      </div>
    )
  }

  // Renderização condicional baseada no estado
  if (loadingState === 'error') {
    return renderError()
  }

  if (loadingState !== 'success' || !imageUrl) {
    return renderSkeleton()
  }

  // Renderiza a imagem com sucesso
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gray-100 ${className}`}
      style={{ width, height }}
      data-testid={productId ? `smart-image-${productId}` : 'smart-image'}
    >
      <img
        src={imageUrl}
        alt={alt}
        className="w-full h-full object-contain"
        loading={priority ? 'eager' : 'lazy'}
        data-testid={productId ? `product-image-${productId}` : 'product-image'}
        onError={() => {
          setLoadingState('error')
          setErrorMessage('Falha ao carregar a imagem')
        }}
      />

      {/* Badge indicando a origem da imagem (útil para debug e testes) */}
      <div
        className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-xs text-white font-medium"
        data-testid={productId ? `image-source-badge-${productId}` : 'image-source-badge'}
      >
        {statusMessage}
      </div>
    </div>
  )
}

/**
 * Componente auxiliar para galeria de imagens
 * Permite navegar entre múltiplas imagens de um produto
 */
interface ImageGalleryProps {
  images: Array<{ query: string; filename: string }>
  alt: string
  productId: string
}

export function ImageGallery({ images, alt, productId }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  if (!images || images.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-100 rounded-lg">
        <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-600">Nenhuma imagem disponível</p>
      </div>
    )
  }

  const selectedImage = images[selectedIndex]

  return (
    <div className="space-y-4" data-testid={`image-gallery-${productId}`}>
      {/* Imagem principal */}
      <SmartImage
        query={selectedImage.query}
        filename={selectedImage.filename}
        alt={`${alt} - Imagem ${selectedIndex + 1}`}
        className="w-full rounded-lg shadow-lg"
        priority={selectedIndex === 0}
        width={800}
        height={600}
        productId={`${productId}-main`}
      />

      {/* Miniaturas */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`flex-shrink-0 rounded-lg overflow-hidden transition-all border-2 ${
                index === selectedIndex
                  ? 'border-primary-600 shadow-md scale-105'
                  : 'border-gray-200 hover:border-primary-400 opacity-70 hover:opacity-100'
              }`}
              data-testid={`gallery-thumbnail-${productId}-${index}`}
              aria-label={`Ver imagem ${index + 1}`}
              aria-pressed={index === selectedIndex}
            >
              <SmartImage
                query={image.query}
                filename={image.filename}
                alt={`${alt} - Miniatura ${index + 1}`}
                className="cursor-pointer"
                width={120}
                height={90}
                productId={`${productId}-thumb-${index}`}
              />
            </button>
          ))}
        </div>
      )}

      {/* Indicador de posição */}
      <div
        className="text-center text-sm text-gray-600"
        data-testid={`gallery-counter-${productId}`}
      >
        {selectedIndex + 1} / {images.length}
      </div>
    </div>
  )
}
