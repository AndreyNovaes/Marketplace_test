#!/bin/bash

# Script para extrair produtos e gerar prompt para IA criar os prompts de imagem

OUTPUT_JSON="products-extracted.json"

echo "🚀 Extraindo produtos do mock-data.ts..."

# Extrai produtos usando o script Node.js
node extract-products.js > "${OUTPUT_JSON}" 2>&1

if [ ! -f "${OUTPUT_JSON}" ]; then
  echo "❌ Erro ao extrair produtos"
  exit 1
fi

PRODUCT_COUNT=$(cat "${OUTPUT_JSON}" | grep -o '"id": "prod-' | wc -l)

echo ""
echo "✅ Extraídos ${PRODUCT_COUNT} produtos"
echo "📁 JSON salvo em: scripts/${OUTPUT_JSON}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📝 PROMPT PARA IA - Copie tudo abaixo e cole em Claude/ChatGPT"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cat << 'EOF'
Você é especialista em criação de prompts para Gemini Imagen API.

Para cada produto e variante no JSON abaixo, crie 2 prompts fotográficos profissionais.

REGRAS:
- Estilo: fotografia de produto profissional, fundo neutro
- Mencionar cor da variante quando relevante
- Prompt 1: visão principal do produto
- Prompt 2: ângulo alternativo ou em uso
- Máximo 80 caracteres por prompt
- Português brasileiro
- Seja específico e descritivo

FORMATO DE SAÍDA (copie exatamente essa estrutura Python):

PRODUCTS = [
    {
        "id": "prod-001",
        "name": "Nome do Produto",
        "variants": [
            {
                "id": "var-001-01",
                "images": [
                    "prompt curto e direto da imagem 1",
                    "prompt curto e direto da imagem 2"
                ]
            }
        ]
    }
]

DADOS DOS PRODUTOS:

EOF

cat "${OUTPUT_JSON}"

echo ""
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🎯 PRÓXIMOS PASSOS:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. Copie todo o prompt acima (incluindo o JSON)"
echo "2. Cole em Claude/ChatGPT"
echo "3. Copie a resposta (array PRODUCTS)"
echo "4. Cole em generate-images.py substituindo o array PRODUCTS atual"
echo "5. Rode: python generate-images.py"
echo ""
