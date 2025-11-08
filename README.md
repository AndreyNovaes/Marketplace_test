# 🛒 Quantum Market - E-commerce Marketplace

Aplicação de marketplace de grande escala construída com **Next.js 15**, **React 18**, **TypeScript** e **Tailwind CSS**. Desenvolvida especificamente como alvo de testes de automação QA de nível profissional, com complexidade máxima e testabilidade como prioridade absoluta.

## 🎯 Objetivo

Este projeto foi criado para servir como ambiente de testes completo para automação de QA, contendo:

- ✅ **20 produtos complexos** com dados determinísticos
- ✅ **data-testid em TODOS elementos interativos**
- ✅ **Simulação de latência de rede** em operações assíncronas
- ✅ **Estados de loading, erro e sucesso** bem definidos
- ✅ **Validação de formulários** client-side
- ✅ **Fluxos complexos** de e-commerce

## 🏗️ Arquitetura

```
quantum-market/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Layout principal
│   ├── page.tsx                  # Homepage
│   ├── globals.css               # Estilos globais com Tailwind
│   ├── product/[id]/page.tsx     # Página de detalhes do produto (PDP)
│   ├── search/page.tsx           # Busca com filtros complexos
│   ├── cart/page.tsx             # Carrinho de compras
│   ├── seller/products/new/page.tsx  # Formulário de cadastro
│   └── api/image-proxy/route.ts  # API de proxy de imagens
│
├── components/
│   ├── ui/                       # Componentes atômicos
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Select.tsx
│   │   ├── Checkbox.tsx
│   │   ├── Textarea.tsx
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   └── Slider.tsx
│   ├── layout/
│   │   ├── Header.tsx            # Cabeçalho com busca e carrinho
│   │   └── Footer.tsx            # Rodapé completo
│   ├── product/
│   │   ├── SmartImage.tsx        # ⭐ Componente CRÍTICO
│   │   └── ProductCard.tsx       # Card de produto
│   └── cart/
│       └── CartItem.tsx          # Item do carrinho
│
├── hooks/
│   └── useCart.ts                # Hook de gerenciamento do carrinho
│
├── lib/
│   ├── types.ts                  # Definições TypeScript
│   └── mock-data.ts              # 20 produtos + helpers
│
└── public/                       # Imagens salvas
```

## 🌟 Funcionalidades Principais

### 1. SmartImage Component (CRÍTICO)

Componente inteligente de imagens com sistema de fallback em 3 níveis:

```typescript
<SmartImage
  query="Drone profissional com câmera 4K"
  filename="drone-pro-01.jpg"
  alt="Drone DJI Mavic 3 Pro"
  productId="prod-001"
/>
```

**Fluxo de execução:**
1. **Verificação Local** → Tenta carregar de `/public/filename`
2. **API/Google Proxy** → Busca via `/api/image-proxy?query={query}`
3. **Geração IA (Simulado)** → Gera placeholder com Gemini simulado

**Estados visuais:**
- Loading skeleton com progress bar
- Mensagens de status em tempo real
- Badge indicando origem da imagem

### 2. Páginas Implementadas

#### 🏠 Homepage (`/`)
- Grid de produtos em destaque
- Seção de mais vendidos
- Novidades
- Categorias quick access

#### 📦 Product Detail Page (`/product/[id]`)
- Galeria de imagens com thumbnails
- Seleção de variantes (cor, tamanho)
- Preço dinâmico baseado na variante
- Status de estoque em tempo real
- Seletor de quantidade
- Especificações técnicas
- Produtos relacionados

#### 🔍 Search Page (`/search`)
**Filtros complexos:**
- Slider de faixa de preço (`data-testid="price-slider"`)
- Checkboxes múltiplas de categorias
- Checkboxes múltiplas de marcas
- Filtro de avaliação mínima
- Checkbox "Apenas em estoque"
- Ordenação por: relevância, preço, avaliação, data

#### 🛒 Cart Page (`/cart`)
- Lista de itens com imagem, variante, quantidade
- Controles de quantidade (+/-)
- Remoção de itens
- **Cupons de desconto** (`data-testid="promo-code-input"`)
- Cálculo de subtotal, desconto, frete e total
- Frete grátis acima de R$ 299

#### 📝 New Product Form (`/seller/products/new`)
**Formulário com 10+ campos:**
- Nome do produto (min 10 caracteres)
- Descrição (min 50 caracteres, max 2000)
- Categoria (select)
- Marca (select)
- Preço e preço original
- SKU
- Quantidade em estoque
- Peso e dimensões
- Garantia
- Upload de imagens (`data-testid="image-uploader"`)
- Checkbox "Produto em Destaque"
- Checkbox "Aceito termos" (obrigatório)

**Validação:**
- Validação client-side em tempo real
- Mensagens de erro específicas
- Botão submit desabilitado até formulário válido

### 3. Carrinho de Compras (useCart Hook)

```typescript
const {
  cart,                    // Estado do carrinho
  addToCart,               // Adicionar produto
  removeFromCart,          // Remover produto
  updateQuantity,          // Atualizar quantidade
  applyPromoCode,          // Aplicar cupom
  removePromoCode,         // Remover cupom
  getTotalItems            // Total de itens
} = useCart()
```

**Características:**
- Persistência em localStorage
- Simulação de latência (1-2s)
- Validação de estoque
- Cálculo automático de totais

### 4. Cupons de Desconto

Cupons válidos para testes:

| Código | Desconto | Compra Mínima | Status |
|--------|----------|---------------|--------|
| `QUANTUM10` | 10% | R$ 500 | ✅ Ativo |
| `BEMVINDO15` | 15% | R$ 1.000 | ✅ Ativo |
| `PRIMEIRACOMPRA20` | 20% | R$ 2.000 | ✅ Ativo |
| `BLACKFRIDAY30` | 30% | R$ 5.000 | ✅ Ativo |
| `EXPIREDCODE` | 50% | R$ 100 | ❌ Expirado |

## 🧪 Testabilidade

### Data-TestId Strategy

**Componentes de Produto:**
```html
data-testid="product-card-{productId}"
data-testid="product-name-{productId}"
data-testid="product-price-{productId}"
data-testid="add-to-cart-button-{productId}"
data-testid="product-rating-{productId}"
```

**Carrinho:**
```html
data-testid="cart-item-{productId}-{variantId}"
data-testid="cart-item-quantity-{productId}-{variantId}"
data-testid="cart-item-increase-{productId}-{variantId}"
data-testid="cart-item-decrease-{productId}-{variantId}"
data-testid="cart-total"
data-testid="promo-code-input"
```

**Filtros:**
```html
data-testid="price-slider"
data-testid="category-filter-{category}"
data-testid="brand-filter-{brand}"
data-testid="rating-filter-{rating}"
data-testid="in-stock-filter"
```

**Formulário:**
```html
data-testid="product-name"
data-testid="product-description"
data-testid="product-category"
data-testid="product-price"
data-testid="image-uploader"
data-testid="submit-product-button"
```

### Estados de Loading

Todos os botões e ações assíncronas têm:
- ✅ Estado de loading com spinner
- ✅ Desabilitação durante processamento
- ✅ Texto de loading customizado
- ✅ Simulação de latência (1-2s)

## 🚀 Como Executar

### Instalação

```bash
# Clone o repositório
git clone <repository-url>
cd Marketplace_test

# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm run dev
```

Acesse: http://localhost:3000

### Build para Produção

```bash
npm run build
npm start
```

## 📊 Dados Mockados

O arquivo `lib/mock-data.ts` contém:

- **20 produtos complexos** com especificações completas
- **Múltiplas variantes** por produto (cor, tamanho)
- **Dados determinísticos** (nada aleatório)
- **Funções helper** para busca e filtragem

Exemplo de produto:
```typescript
{
  id: 'prod-001',
  name: 'Drone Profissional DJI Mavic 3 Pro',
  basePrice: 8999.90,
  originalPrice: 11999.90,
  category: 'Eletrônicos',
  brand: 'DJI',
  rating: 4.8,
  reviewCount: 342,
  variants: [
    {
      id: 'var-001-01',
      color: 'Cinza Espacial',
      size: 'Standard',
      stock: 15,
      priceModifier: 0
    }
  ]
}
```

## 🎨 Stack Tecnológica

- **Framework:** Next.js 15 (App Router)
- **Linguagem:** TypeScript
- **UI Library:** React 18
- **Styling:** Tailwind CSS
- **Icons:** lucide-react
- **State:** React Hooks + localStorage

## 📈 Cenários de Teste Sugeridos

### E2E Testing
1. ✅ Buscar produto → Ver detalhes → Selecionar variante → Adicionar ao carrinho → Aplicar cupom → Finalizar
2. ✅ Filtrar por categoria → Ordenar por preço → Adicionar múltiplos produtos
3. ✅ Adicionar ao carrinho → Alterar quantidade → Remover item
4. ✅ Preencher formulário de produto → Validar campos → Upload de imagens → Submeter

### Testes de Componentes
1. ✅ SmartImage: Verificar fallback de imagens
2. ✅ ProductCard: Verificar exibição de preço, desconto, badges
3. ✅ Slider: Testar range de preço
4. ✅ Form validation: Testar todos os campos obrigatórios

### Testes de Integração
1. ✅ Carrinho: Adicionar, remover, atualizar quantidade
2. ✅ Cupons: Aplicar válidos e inválidos
3. ✅ Filtros: Combinar múltiplos filtros

## 📝 Notas Importantes

- ⚠️ **Sem Backend Real:** Todos os dados são mockados
- ⚠️ **Checkout Simulado:** Botão de finalizar apenas exibe alert
- ⚠️ **Imagens:** Sistema de fallback com placeholders
- ✅ **Latência Simulada:** Todas operações têm delay de 1-2s
- ✅ **Persistência:** Carrinho salvo em localStorage

## 🤝 Contribuição

Este é um projeto de demonstração para testes de QA. Sinta-se livre para:
- Adicionar mais cenários de teste
- Melhorar a cobertura de data-testid
- Sugerir novos fluxos complexos

## 📄 Licença

MIT License - Sinta-se livre para usar em seus projetos de teste!

---

**Desenvolvido com foco em testabilidade e automação de QA** 🚀
