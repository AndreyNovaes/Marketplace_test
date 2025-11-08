/**
 * API Route: /api/image-proxy
 * Simula a busca de imagens via Google ou API externa
 * Retorna 404 na maioria dos casos para forçar o fallback para geração com IA
 */

import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')

  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter is required' },
      { status: 400 }
    )
  }

  // Simula latência de rede (500ms - 1500ms)
  const delay = Math.floor(Math.random() * 1000) + 500
  await new Promise(resolve => setTimeout(resolve, delay))

  // Simula taxa de sucesso de 20% (80% retorna 404 para forçar fallback)
  const shouldSucceed = Math.random() < 0.2

  if (shouldSucceed) {
    // Retorna URL de placeholder simulando imagem encontrada no Google
    const placeholderUrl = `https://placehold.co/600x400/3b82f6/ffffff?text=${encodeURIComponent(query.substring(0, 30))}`

    return NextResponse.json({
      success: true,
      imageUrl: placeholderUrl,
      source: 'google-search',
      message: 'Imagem encontrada via busca'
    })
  } else {
    // Retorna 404 para forçar fallback para geração com IA
    return NextResponse.json(
      {
        error: 'Image not found',
        message: 'Nenhuma imagem encontrada para a query fornecida'
      },
      { status: 404 }
    )
  }
}

// Configuração para runtime do Edge (opcional, para melhor performance)
export const runtime = 'edge'
