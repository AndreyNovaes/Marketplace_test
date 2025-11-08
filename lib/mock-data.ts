/**
 * Dados mockados estáticos para o Quantum Market
 * Este arquivo contém dados determinísticos para garantir testes consistentes
 * NUNCA use dados aleatórios - todos os valores devem ser fixos
 */

import { Product, PromoCode } from './types'

/**
 * Array de 20 produtos complexos com múltiplas variantes
 * Cada produto tem dados completos para testes de automação
 */
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'Drone Profissional DJI Mavic 3 Pro com Câmera 4K HDR',
    description: 'Drone profissional de última geração com câmera Hasselblad de 20MP, gravação em 4K a 120fps, tempo de voo de 46 minutos e sistema de detecção omnidirecional de obstáculos. Ideal para fotografia aérea profissional, filmagens cinematográficas e inspeções técnicas. Inclui controle remoto com tela integrada, 3 baterias inteligentes, hub de carregamento rápido e maleta de transporte resistente.',
    shortDescription: 'Drone profissional com câmera 4K, 46min de voo e detecção de obstáculos',
    basePrice: 8999.90,
    originalPrice: 11999.90,
    category: 'Eletrônicos',
    subcategory: 'Drones e Acessórios',
    brand: 'DJI',
    rating: 4.8,
    reviewCount: 342,
    tags: ['profissional', '4k', 'drone', 'fotografia aerea', 'filmagem'],
    variants: [
      {
        id: 'var-001-01',
        color: 'Cinza Espacial',
        colorHex: '#6B7280',
        size: 'Standard',
        sku: 'DJI-MV3P-GRY-STD',
        stock: 15,
        priceModifier: 0,
        images: ['Drone profissional DJI cinza com câmera 4K', 'DJI Mavic 3 Pro em voo']
      },
      {
        id: 'var-001-02',
        color: 'Cinza Espacial',
        colorHex: '#6B7280',
        size: 'Fly More Combo',
        sku: 'DJI-MV3P-GRY-FMC',
        stock: 8,
        priceModifier: 2500,
        images: ['Drone DJI Mavic 3 Pro kit completo', 'DJI combo com acessórios']
      }
    ],
    features: [
      'Câmera Hasselblad 20MP com sensor CMOS 4/3',
      'Gravação em 5.1K a 50fps e 4K a 120fps',
      'Tempo de voo de até 46 minutos',
      'Transmissão de vídeo em Full HD até 15km',
      'Sistema APAS 5.0 de detecção omnidirecional',
      'Modos inteligentes: ActiveTrack, Point of Interest, Waypoint',
      'Gimbal de 3 eixos com estabilização mecânica',
      'Resistente a ventos de até 12 m/s'
    ],
    specifications: {
      'Peso': '895g',
      'Dimensões (dobrado)': '221×96.3×90.3 mm',
      'Velocidade Máxima': '75.6 km/h',
      'Altitude Máxima': '6000 m',
      'Temperatura Operacional': '-10°C a 40°C',
      'Formato de Vídeo': 'MP4/MOV (H.264/H.265)',
      'Capacidade da Bateria': '5000 mAh',
      'Tempo de Carregamento': '96 minutos'
    },
    seller: {
      id: 'seller-001',
      name: 'TechSky Drones',
      rating: 4.9,
      verified: true
    },
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-11-01T15:30:00Z',
    isFeatured: true,
    isNew: false,
    isBestSeller: true
  },
  {
    id: 'prod-002',
    name: 'Notebook Gamer ASUS ROG Strix G16 Intel Core i9 RTX 4070',
    description: 'Notebook gamer de alta performance com processador Intel Core i9-13980HX de 13ª geração, placa de vídeo NVIDIA GeForce RTX 4070 8GB, 32GB DDR5 RAM, SSD NVMe de 1TB, tela 16" QHD+ 240Hz com G-SYNC, teclado RGB por tecla e sistema de resfriamento avançado com metal líquido. Design premium com iluminação RGB personalizável e áudio certificado Dolby Atmos.',
    shortDescription: 'Notebook gamer i9 + RTX 4070, tela 240Hz, 32GB RAM',
    basePrice: 12499.90,
    originalPrice: 15999.90,
    category: 'Informática',
    subcategory: 'Notebooks',
    brand: 'ASUS',
    rating: 4.7,
    reviewCount: 528,
    tags: ['gamer', 'notebook', 'rtx', 'intel', 'alto desempenho'],
    variants: [
      {
        id: 'var-002-01',
        color: 'Preto Eclipse',
        colorHex: '#1F2937',
        size: '32GB RAM + 1TB SSD',
        sku: 'ASUS-ROG-G16-32GB-1TB',
        stock: 12,
        priceModifier: 0,
        images: ['Notebook ASUS ROG Strix gamer preto', 'ASUS ROG com teclado RGB iluminado']
      },
      {
        id: 'var-002-02',
        color: 'Preto Eclipse',
        colorHex: '#1F2937',
        size: '64GB RAM + 2TB SSD',
        sku: 'ASUS-ROG-G16-64GB-2TB',
        stock: 5,
        priceModifier: 3500,
        images: ['ASUS ROG Strix configuração premium', 'Notebook gamer ASUS alto desempenho']
      }
    ],
    features: [
      'Processador Intel Core i9-13980HX (24 cores, até 5.6GHz)',
      'GPU NVIDIA GeForce RTX 4070 8GB GDDR6',
      'Tela 16" QHD+ (2560x1600) 240Hz 3ms com G-SYNC',
      'Tecnologia de resfriamento com metal líquido Conductonaut Extreme',
      'Teclado RGB por tecla com switches de baixo perfil',
      'Áudio Dolby Atmos com 4 alto-falantes',
      'WiFi 6E e Bluetooth 5.3',
      'Portas: 2x USB-C Thunderbolt 4, 3x USB-A 3.2, HDMI 2.1, RJ45 2.5G'
    ],
    specifications: {
      'Processador': 'Intel Core i9-13980HX',
      'Placa de Vídeo': 'NVIDIA GeForce RTX 4070 8GB',
      'Memória RAM': '32GB DDR5 4800MHz',
      'Armazenamento': '1TB SSD NVMe PCIe 4.0',
      'Tela': '16" QHD+ 240Hz IPS',
      'Peso': '2.5 kg',
      'Bateria': '90Wh',
      'Sistema Operacional': 'Windows 11 Home'
    },
    seller: {
      id: 'seller-002',
      name: 'MegaTech Store',
      rating: 4.8,
      verified: true
    },
    createdAt: '2024-02-10T08:30:00Z',
    updatedAt: '2024-11-02T12:15:00Z',
    isFeatured: true,
    isNew: false,
    isBestSeller: true
  },
  {
    id: 'prod-003',
    name: 'Smartwatch Apple Watch Series 9 GPS + Cellular 45mm',
    description: 'Smartwatch premium da Apple com chip S9 SiP de nova geração, tela Retina Always-On mais brilhante, recursos avançados de saúde incluindo ECG, oxímetro e monitoramento de temperatura, rastreamento preciso de atividades físicas, resistência à água até 50m, bateria de até 18 horas e integração perfeita com ecossistema Apple.',
    shortDescription: 'Apple Watch Series 9 com GPS + Cellular, tela Always-On',
    basePrice: 4799.90,
    originalPrice: 5499.90,
    category: 'Eletrônicos',
    subcategory: 'Smartwatches e Wearables',
    brand: 'Apple',
    rating: 4.9,
    reviewCount: 1847,
    tags: ['smartwatch', 'apple', 'saude', 'fitness', 'cellular'],
    variants: [
      {
        id: 'var-003-01',
        color: 'Meia-Noite',
        colorHex: '#1E3A5F',
        size: '45mm',
        sku: 'APPL-AW9-MDN-45',
        stock: 23,
        priceModifier: 0,
        images: ['Apple Watch Series 9 azul meia-noite', 'Apple Watch com pulseira sport']
      },
      {
        id: 'var-003-02',
        color: 'Estelar',
        colorHex: '#E5D4C1',
        size: '45mm',
        sku: 'APPL-AW9-STR-45',
        stock: 18,
        priceModifier: 0,
        images: ['Apple Watch Series 9 dourado estelar', 'Apple Watch cor estelar']
      },
      {
        id: 'var-003-03',
        color: 'Rosa',
        colorHex: '#FFB6C1',
        size: '41mm',
        sku: 'APPL-AW9-PNK-41',
        stock: 31,
        priceModifier: -300,
        images: ['Apple Watch Series 9 rosa', 'Apple Watch feminino rosa']
      }
    ],
    features: [
      'Chip S9 SiP com CPU de 4 núcleos 30% mais rápida',
      'Tela Retina LTPO OLED Always-On até 2000 nits',
      'Sensor de temperatura para rastreamento do ciclo menstrual',
      'App ECG e notificações de ritmo cardíaco irregular',
      'Medição de oxigênio no sangue (SpO2)',
      'Detecção de queda e Detecção de acidente',
      'Resistente à água até 50 metros',
      'Conexão Cellular independente do iPhone'
    ],
    specifications: {
      'Tamanho da Caixa': '45mm',
      'Display': 'LTPO OLED Retina 396 x 484 pixels',
      'Chip': 'Apple S9 SiP',
      'Conectividade': 'GPS + Cellular, WiFi, Bluetooth 5.3',
      'Sensores': 'ECG, Ótico de frequência cardíaca, SpO2, Temperatura',
      'Resistência à Água': '50 metros (WR50)',
      'Bateria': 'Até 18 horas',
      'Compatibilidade': 'iPhone XS ou posterior com iOS 17'
    },
    seller: {
      id: 'seller-003',
      name: 'iStore Official',
      rating: 5.0,
      verified: true
    },
    createdAt: '2024-03-05T14:20:00Z',
    updatedAt: '2024-11-03T09:45:00Z',
    isFeatured: true,
    isNew: true,
    isBestSeller: true
  },
  {
    id: 'prod-004',
    name: 'Câmera Mirrorless Sony Alpha A7 IV Full Frame 33MP',
    description: 'Câmera mirrorless profissional full-frame com sensor Exmor R CMOS de 33MP retroiluminado, processador BIONZ XR, gravação em 4K 60p 10-bit 4:2:2, autofoco híbrido com 759 pontos de detecção de fase, estabilização de imagem de 5 eixos com até 5.5 stops, visor EVF de 3.69M pontos e tela LCD touchscreen articulada de 3". Perfeita para fotografia e vídeo profissional.',
    shortDescription: 'Câmera Sony A7 IV 33MP, vídeo 4K 60p, estabilização 5 eixos',
    basePrice: 14999.90,
    originalPrice: 18999.90,
    category: 'Fotografia',
    subcategory: 'Câmeras Profissionais',
    brand: 'Sony',
    rating: 4.9,
    reviewCount: 456,
    tags: ['camera', 'mirrorless', 'sony', 'full frame', 'profissional'],
    variants: [
      {
        id: 'var-004-01',
        color: 'Preto',
        colorHex: '#000000',
        size: 'Corpo',
        sku: 'SONY-A7IV-BLK-BODY',
        stock: 7,
        priceModifier: 0,
        images: ['Camera Sony Alpha A7 IV profissional', 'Sony A7IV mirrorless full frame']
      },
      {
        id: 'var-004-02',
        color: 'Preto',
        colorHex: '#000000',
        size: 'Kit com Lente 28-70mm',
        sku: 'SONY-A7IV-BLK-KIT2870',
        stock: 4,
        priceModifier: 2800,
        images: ['Sony A7 IV com lente kit', 'Camera Sony kit completo']
      }
    ],
    features: [
      'Sensor Full-Frame Exmor R CMOS 33MP retroiluminado',
      'Processador BIONZ XR com IA para processamento avançado',
      'Gravação 4K 60p 10-bit 4:2:2 sem crop',
      'Autofoco híbrido com 759 pontos e Real-time Eye AF',
      'Estabilização IBIS de 5 eixos (5.5 stops)',
      'Visor EVF OLED Quad-XGA de 3.69M pontos',
      'Tela LCD touchscreen vari-angle de 3" 1.03M pontos',
      'Gravação em S-Log3, S-Cinetone e HLG'
    ],
    specifications: {
      'Sensor': 'Full-Frame CMOS 35.7 x 23.8mm',
      'Resolução': '33 megapixels efetivos',
      'Processador': 'BIONZ XR',
      'Sensibilidade ISO': '100-51200 (expansível até 204800)',
      'Vídeo': '4K 60p 10-bit 4:2:2',
      'Velocidade de Disparo': '10 fps (obturador mecânico)',
      'Slots de Cartão': 'Dual SD UHS-II',
      'Bateria': 'NP-FZ100 (aprox. 580 fotos)'
    },
    seller: {
      id: 'seller-004',
      name: 'FotoExpress Pro',
      rating: 4.8,
      verified: true
    },
    createdAt: '2024-01-20T11:15:00Z',
    updatedAt: '2024-10-30T16:20:00Z',
    isFeatured: true,
    isNew: false,
    isBestSeller: false
  },
  {
    id: 'prod-005',
    name: 'Console PlayStation 5 Slim Digital Edition 1TB',
    description: 'Console de videogame de nova geração da Sony com design slim redesenhado 30% menor, SSD ultra-rápido de 1TB, processamento gráfico em 4K até 120fps, ray tracing em tempo real, áudio 3D Tempest, retrocompatibilidade com jogos PS4, controle DualSense com feedback háptico e gatilhos adaptativos. Versão Digital sem drive de disco.',
    shortDescription: 'PS5 Slim Digital 1TB, 4K 120fps, SSD ultra-rápido',
    basePrice: 3799.90,
    originalPrice: 4499.90,
    category: 'Games',
    subcategory: 'Consoles',
    brand: 'Sony',
    rating: 4.8,
    reviewCount: 2341,
    tags: ['console', 'playstation', 'ps5', 'games', 'next gen'],
    variants: [
      {
        id: 'var-005-01',
        color: 'Branco',
        colorHex: '#FFFFFF',
        size: '1TB',
        sku: 'SONY-PS5-SLM-DIG-1TB-WHT',
        stock: 42,
        priceModifier: 0,
        images: ['PlayStation 5 Slim branco digital', 'PS5 console nova geração']
      },
      {
        id: 'var-005-02',
        color: 'Preto',
        colorHex: '#000000',
        size: '1TB',
        sku: 'SONY-PS5-SLM-DIG-1TB-BLK',
        stock: 28,
        priceModifier: 200,
        images: ['PlayStation 5 Slim preto', 'PS5 edição preta']
      }
    ],
    features: [
      'CPU AMD Ryzen Zen 2 de 8 núcleos a 3.5GHz',
      'GPU AMD Radeon RDNA 2 com 10.28 TFLOPS',
      'SSD customizado de 1TB com velocidade de 5.5 GB/s',
      'Suporte para resolução 4K a 120Hz e 8K',
      'Ray Tracing acelerado por hardware',
      'Áudio 3D Tempest Engine',
      'Controle DualSense com feedback háptico avançado',
      'Retrocompatibilidade com 99% dos jogos PS4'
    ],
    specifications: {
      'CPU': 'AMD Ryzen Zen 2, 8 cores, 3.5GHz',
      'GPU': 'AMD Radeon RDNA 2, 10.28 TFLOPS',
      'Memória': '16GB GDDR6',
      'Armazenamento': '1TB SSD NVMe',
      'Mídia': 'Digital (sem drive de disco)',
      'Vídeo': '4K 120Hz, 8K, HDR',
      'Áudio': 'Tempest 3D AudioTech',
      'Dimensões': '358 x 96 x 216 mm'
    },
    seller: {
      id: 'seller-005',
      name: 'GameVerse Store',
      rating: 4.9,
      verified: true
    },
    createdAt: '2024-04-12T09:00:00Z',
    updatedAt: '2024-11-05T14:30:00Z',
    isFeatured: true,
    isNew: true,
    isBestSeller: true
  },
  {
    id: 'prod-006',
    name: 'Fone de Ouvido Sony WH-1000XM5 Wireless com Cancelamento de Ruído',
    description: 'Fones de ouvido premium over-ear com cancelamento de ruído líder de mercado usando 8 microfones e processador HD QN1, qualidade de áudio Hi-Res com driver de 30mm, bateria de até 30 horas, carregamento rápido (3 min = 3 horas), conexão multiponto, controles touch intuitivos e design ultra confortável com almofadas em espuma macia.',
    shortDescription: 'Sony WH-1000XM5, cancelamento de ruído premium, 30h bateria',
    basePrice: 2299.90,
    originalPrice: 2799.90,
    category: 'Áudio',
    subcategory: 'Fones de Ouvido',
    brand: 'Sony',
    rating: 4.9,
    reviewCount: 3421,
    tags: ['fone', 'wireless', 'noise cancelling', 'sony', 'premium'],
    variants: [
      {
        id: 'var-006-01',
        color: 'Preto',
        colorHex: '#000000',
        size: 'Padrão',
        sku: 'SONY-WH1000XM5-BLK',
        stock: 67,
        priceModifier: 0,
        images: ['Fone Sony WH-1000XM5 preto', 'Sony wireless headphone premium']
      },
      {
        id: 'var-006-02',
        color: 'Prata',
        colorHex: '#C0C0C0',
        size: 'Padrão',
        sku: 'SONY-WH1000XM5-SLV',
        stock: 45,
        priceModifier: 0,
        images: ['Fone Sony WH-1000XM5 prata', 'Sony headphone cor prata']
      }
    ],
    features: [
      'Cancelamento de ruído com 8 microfones e processador HD QN1',
      'Driver de 30mm para áudio Hi-Res certificado',
      'Bateria de até 30 horas com ANC ativado',
      'Carregamento rápido USB-C (3 min = 3 horas)',
      'Conexão multiponto para 2 dispositivos simultâneos',
      'Controles touch gesture no painel direito',
      'Speak-to-Chat: pausa automática ao falar',
      'Compatível com Google Assistant e Alexa'
    ],
    specifications: {
      'Driver': '30mm dome type',
      'Resposta de Frequência': '4Hz - 40kHz',
      'Bluetooth': '5.2 com LDAC, AAC, SBC',
      'Bateria': 'Até 30 horas (ANC on)',
      'Carregamento': 'USB-C rápido',
      'Peso': '250g',
      'Microfones': '8 microfones para ANC e chamadas',
      'Alcance': 'Até 10 metros'
    },
    seller: {
      id: 'seller-006',
      name: 'AudioTech Premium',
      rating: 4.9,
      verified: true
    },
    createdAt: '2024-02-28T13:45:00Z',
    updatedAt: '2024-11-04T11:20:00Z',
    isFeatured: false,
    isNew: false,
    isBestSeller: true
  },
  {
    id: 'prod-007',
    name: 'Smartphone Samsung Galaxy S24 Ultra 5G 512GB 12GB RAM',
    description: 'Smartphone flagship premium com tela Dynamic AMOLED 2X de 6.8" QHD+ 120Hz, processador Snapdragon 8 Gen 3, câmera quádrupla com sensor principal de 200MP, zoom óptico de 10x, bateria de 5000mAh com carregamento rápido de 45W, S Pen integrada, construção em titânio e recursos de IA Galaxy AI para produtividade.',
    shortDescription: 'Galaxy S24 Ultra 512GB, câmera 200MP, S Pen, tela 120Hz',
    basePrice: 7999.90,
    originalPrice: 9999.90,
    category: 'Smartphones',
    subcategory: 'Celulares Premium',
    brand: 'Samsung',
    rating: 4.8,
    reviewCount: 1567,
    tags: ['smartphone', 'samsung', 'galaxy', '5g', 'flagship'],
    variants: [
      {
        id: 'var-007-01',
        color: 'Preto Titânio',
        colorHex: '#2C2C2C',
        size: '512GB',
        sku: 'SMSNG-S24U-TBLK-512',
        stock: 34,
        priceModifier: 0,
        images: ['Samsung Galaxy S24 Ultra preto titânio', 'Galaxy S24 Ultra com S Pen']
      },
      {
        id: 'var-007-02',
        color: 'Violeta',
        colorHex: '#8B7AB8',
        size: '512GB',
        sku: 'SMSNG-S24U-VLT-512',
        stock: 21,
        priceModifier: 0,
        images: ['Samsung Galaxy S24 Ultra violeta', 'S24 Ultra cor violeta']
      },
      {
        id: 'var-007-03',
        color: 'Cinza Titânio',
        colorHex: '#757575',
        size: '1TB',
        sku: 'SMSNG-S24U-TGRY-1TB',
        stock: 12,
        priceModifier: 1500,
        images: ['Galaxy S24 Ultra 1TB cinza', 'Samsung S24 Ultra premium']
      }
    ],
    features: [
      'Tela Dynamic AMOLED 2X 6.8" QHD+ (3120x1440) 120Hz',
      'Processador Snapdragon 8 Gen 3 for Galaxy',
      'Câmera principal 200MP + ultra-wide 12MP + telephoto 50MP + periscope 10MP',
      'Zoom óptico 10x e zoom digital 100x',
      'S Pen integrada com latência ultra-baixa',
      'Galaxy AI: Circle to Search, Live Translate, Note Assist',
      'Bateria 5000mAh com carregamento 45W',
      'Construção em titânio com Gorilla Glass Armor'
    ],
    specifications: {
      'Tela': '6.8" Dynamic AMOLED 2X QHD+ 120Hz',
      'Processador': 'Snapdragon 8 Gen 3',
      'RAM': '12GB',
      'Armazenamento': '512GB',
      'Câmera Traseira': '200MP + 12MP + 50MP + 10MP',
      'Câmera Frontal': '12MP',
      'Bateria': '5000mAh',
      'Sistema': 'Android 14 com One UI 6.1'
    },
    seller: {
      id: 'seller-007',
      name: 'Samsung Official Store',
      rating: 5.0,
      verified: true
    },
    createdAt: '2024-03-18T10:30:00Z',
    updatedAt: '2024-11-06T08:15:00Z',
    isFeatured: true,
    isNew: true,
    isBestSeller: true
  },
  {
    id: 'prod-008',
    name: 'Tablet Apple iPad Pro 12.9" M2 WiFi + Cellular 256GB',
    description: 'Tablet profissional com chip M2 Apple Silicon, tela Liquid Retina XDR de 12.9" com ProMotion 120Hz e mini-LED, câmera TrueDepth frontal ultra-wide com Center Stage, suporte para Apple Pencil 2ª geração e Magic Keyboard, conectividade 5G, Face ID, quatro alto-falantes e bateria para o dia todo.',
    shortDescription: 'iPad Pro 12.9" chip M2, tela XDR 120Hz, 5G',
    basePrice: 9999.90,
    originalPrice: 12999.90,
    category: 'Tablets',
    subcategory: 'Tablets Premium',
    brand: 'Apple',
    rating: 4.9,
    reviewCount: 892,
    tags: ['tablet', 'ipad', 'apple', 'profissional', 'm2'],
    variants: [
      {
        id: 'var-008-01',
        color: 'Cinza Espacial',
        colorHex: '#5C5C60',
        size: '256GB',
        sku: 'APPL-IPDPRO129-M2-256-GRY',
        stock: 18,
        priceModifier: 0,
        images: ['iPad Pro 12.9 polegadas cinza espacial', 'Apple iPad Pro com tela XDR']
      },
      {
        id: 'var-008-02',
        color: 'Prata',
        colorHex: '#E3E4E5',
        size: '256GB',
        sku: 'APPL-IPDPRO129-M2-256-SLV',
        stock: 15,
        priceModifier: 0,
        images: ['iPad Pro 12.9 prata', 'iPad Pro cor prata']
      },
      {
        id: 'var-008-03',
        color: 'Cinza Espacial',
        colorHex: '#5C5C60',
        size: '512GB',
        sku: 'APPL-IPDPRO129-M2-512-GRY',
        stock: 9,
        priceModifier: 1800,
        images: ['iPad Pro 512GB premium', 'Apple iPad Pro alto armazenamento']
      }
    ],
    features: [
      'Chip Apple M2 com CPU de 8 núcleos e GPU de 10 núcleos',
      'Tela Liquid Retina XDR 12.9" mini-LED com ProMotion 120Hz',
      'Brilho de até 1600 nits (HDR)',
      'Câmera TrueDepth 12MP ultra-wide com Center Stage',
      'Câmera traseira 12MP wide + 10MP ultra-wide com LiDAR',
      'Suporte para Apple Pencil 2ª geração (hover)',
      'Compatível com Magic Keyboard',
      'Conectividade 5G mmWave e sub-6GHz'
    ],
    specifications: {
      'Chip': 'Apple M2',
      'Tela': '12.9" Liquid Retina XDR (2732x2048)',
      'Taxa de Atualização': '120Hz ProMotion',
      'Armazenamento': '256GB',
      'Conectividade': '5G, WiFi 6E, Bluetooth 5.3',
      'Câmeras': '12MP + 10MP traseira, 12MP frontal',
      'Bateria': 'Até 10 horas',
      'Sistema': 'iPadOS 17'
    },
    seller: {
      id: 'seller-003',
      name: 'iStore Official',
      rating: 5.0,
      verified: true
    },
    createdAt: '2024-01-25T15:00:00Z',
    updatedAt: '2024-11-02T13:45:00Z',
    isFeatured: true,
    isNew: false,
    isBestSeller: false
  },
  {
    id: 'prod-009',
    name: 'Monitor Gamer LG UltraGear 27" 4K 144Hz Nano IPS HDR600',
    description: 'Monitor gamer profissional com painel Nano IPS de 27 polegadas em resolução 4K UHD (3840x2160), taxa de atualização de 144Hz, tempo de resposta de 1ms (GtG), certificação VESA DisplayHDR 600, cobertura de 98% DCI-P3, suporte para G-SYNC e FreeSync Premium Pro, ajuste de altura e pivot.',
    shortDescription: 'Monitor LG 27" 4K 144Hz Nano IPS, HDR600, 1ms',
    basePrice: 3499.90,
    originalPrice: 4299.90,
    category: 'Informática',
    subcategory: 'Monitores',
    brand: 'LG',
    rating: 4.8,
    reviewCount: 734,
    tags: ['monitor', 'gamer', '4k', '144hz', 'hdr'],
    variants: [
      {
        id: 'var-009-01',
        color: 'Preto',
        colorHex: '#000000',
        size: '27"',
        sku: 'LG-27GN950-B',
        stock: 28,
        priceModifier: 0,
        images: ['Monitor LG UltraGear 27 polegadas 4K', 'LG gaming monitor 144Hz']
      }
    ],
    features: [
      'Painel Nano IPS 27" 4K UHD (3840x2160)',
      'Taxa de atualização de 144Hz',
      'Tempo de resposta 1ms (GtG) com Motion Blur Reduction',
      'VESA DisplayHDR 600 com pico de 600 nits',
      'Cobertura de 98% DCI-P3 e 135% sRGB',
      'NVIDIA G-SYNC Compatible e AMD FreeSync Premium Pro',
      'Black Stabilizer e Dynamic Action Sync',
      'Ajuste de altura, inclinação, pivot e swivel'
    ],
    specifications: {
      'Tamanho': '27 polegadas',
      'Resolução': '3840 x 2160 (4K UHD)',
      'Painel': 'Nano IPS',
      'Taxa de Atualização': '144Hz',
      'Tempo de Resposta': '1ms (GtG)',
      'HDR': 'DisplayHDR 600',
      'Conectividade': '2x HDMI 2.1, 1x DisplayPort 1.4, USB Hub',
      'Ergonomia': 'Altura, Inclinação, Pivot, Swivel'
    },
    seller: {
      id: 'seller-008',
      name: 'Display Pro Store',
      rating: 4.7,
      verified: true
    },
    createdAt: '2024-02-15T11:30:00Z',
    updatedAt: '2024-10-28T14:00:00Z',
    isFeatured: false,
    isNew: false,
    isBestSeller: false
  },
  {
    id: 'prod-010',
    name: 'Teclado Mecânico Logitech G Pro X TKL Wireless com Switches GX',
    description: 'Teclado mecânico gamer sem fio em formato tenkeyless (sem teclado numérico) com switches mecânicos GX Blue/Red/Brown intercambiáveis, tecnologia LIGHTSPEED wireless de 1ms, iluminação RGB LIGHTSYNC personalizável por tecla, construção premium em alumínio, bateria de até 48 horas e compatibilidade com software G HUB.',
    shortDescription: 'Teclado Logitech G Pro X TKL wireless, switches intercambiáveis',
    basePrice: 1199.90,
    originalPrice: 1499.90,
    category: 'Periféricos',
    subcategory: 'Teclados',
    brand: 'Logitech',
    rating: 4.7,
    reviewCount: 1243,
    tags: ['teclado', 'mecanico', 'wireless', 'gamer', 'rgb'],
    variants: [
      {
        id: 'var-010-01',
        color: 'Preto',
        colorHex: '#000000',
        size: 'GX Blue (Clicky)',
        sku: 'LGTC-GPROX-TKL-BLU',
        stock: 45,
        priceModifier: 0,
        images: ['Teclado Logitech G Pro X TKL preto', 'Logitech teclado mecânico wireless']
      },
      {
        id: 'var-010-02',
        color: 'Preto',
        colorHex: '#000000',
        size: 'GX Red (Linear)',
        sku: 'LGTC-GPROX-TKL-RED',
        stock: 52,
        priceModifier: 0,
        images: ['Teclado Logitech switches red', 'G Pro X linear switches']
      },
      {
        id: 'var-010-03',
        color: 'Branco',
        colorHex: '#FFFFFF',
        size: 'GX Brown (Tactile)',
        sku: 'LGTC-GPROX-TKL-BRN-WHT',
        stock: 31,
        priceModifier: 150,
        images: ['Teclado Logitech G Pro X branco', 'Logitech teclado edição branca']
      }
    ],
    features: [
      'Switches mecânicos GX intercambiáveis (Blue/Red/Brown)',
      'Conexão LIGHTSPEED wireless de 1ms',
      'Formato TKL compacto para mais espaço ao mouse',
      'Iluminação RGB LIGHTSYNC personalizável por tecla',
      'Construção premium com placa superior em alumínio',
      'Bateria de lítio recarregável (até 48 horas)',
      'Memória onboard para até 3 perfis',
      'Software Logitech G HUB para personalização'
    ],
    specifications: {
      'Formato': 'Tenkeyless (TKL)',
      'Switches': 'Logitech GX Mecânicos',
      'Conectividade': 'LIGHTSPEED Wireless 2.4GHz + USB-C com fio',
      'Latência': '1ms (wireless)',
      'Iluminação': 'RGB LIGHTSYNC por tecla',
      'Bateria': 'Até 48 horas',
      'Material': 'Alumínio + ABS',
      'Dimensões': '361 x 153 x 34 mm'
    },
    seller: {
      id: 'seller-009',
      name: 'GamerGear Hub',
      rating: 4.8,
      verified: true
    },
    createdAt: '2024-03-22T09:15:00Z',
    updatedAt: '2024-11-01T10:30:00Z',
    isFeatured: false,
    isNew: false,
    isBestSeller: true
  },
  {
    id: 'prod-011',
    name: 'Mouse Gamer Logitech G502 X Plus Wireless RGB HERO 25K',
    description: 'Mouse gamer sem fio de alta performance com sensor HERO 25K (até 25.600 DPI), tecnologia LIGHTSPEED wireless de 1ms, switches híbridos óptico-mecânicos LIGHTFORCE, 13 botões programáveis, sistema de ajuste de peso, iluminação RGB LIGHTSYNC e bateria de até 120 horas. Design ergonômico consagrado.',
    shortDescription: 'Mouse Logitech G502 X Plus wireless, sensor 25K DPI, 13 botões',
    basePrice: 799.90,
    originalPrice: 999.90,
    category: 'Periféricos',
    subcategory: 'Mouses',
    brand: 'Logitech',
    rating: 4.9,
    reviewCount: 2847,
    tags: ['mouse', 'gamer', 'wireless', 'rgb', 'alta precisao'],
    variants: [
      {
        id: 'var-011-01',
        color: 'Preto',
        colorHex: '#000000',
        size: 'Padrão',
        sku: 'LGTC-G502XPLUS-BLK',
        stock: 87,
        priceModifier: 0,
        images: ['Mouse Logitech G502 X Plus preto', 'Logitech gaming mouse wireless']
      },
      {
        id: 'var-011-02',
        color: 'Branco',
        colorHex: '#FFFFFF',
        size: 'Padrão',
        sku: 'LGTC-G502XPLUS-WHT',
        stock: 63,
        priceModifier: 100,
        images: ['Mouse Logitech G502 X Plus branco', 'G502 edição branca']
      }
    ],
    features: [
      'Sensor HERO 25K com até 25.600 DPI',
      'Tecnologia LIGHTSPEED wireless de 1ms',
      'Switches híbridos LIGHTFORCE óptico-mecânicos',
      '13 botões programáveis',
      'Sistema de ajuste de peso removível',
      'Scroll wheel duplo modo (livre e por etapas)',
      'Iluminação RGB LIGHTSYNC com 8 zonas',
      'Bateria de até 120 horas'
    ],
    specifications: {
      'Sensor': 'HERO 25K',
      'DPI': '100 - 25.600',
      'IPS': '400+',
      'Aceleração': '40G',
      'Conectividade': 'LIGHTSPEED 2.4GHz + USB-C com fio',
      'Botões': '13 programáveis',
      'Bateria': 'Até 120 horas',
      'Peso': '102g (sem pesos)'
    },
    seller: {
      id: 'seller-009',
      name: 'GamerGear Hub',
      rating: 4.8,
      verified: true
    },
    createdAt: '2024-04-05T14:20:00Z',
    updatedAt: '2024-11-05T09:00:00Z',
    isFeatured: false,
    isNew: false,
    isBestSeller: true
  },
  {
    id: 'prod-012',
    name: 'Smart TV LG OLED Evo 65" 4K G3 120Hz com WebOS 23',
    description: 'Smart TV OLED de 65 polegadas com tecnologia OLED Evo de terceira geração, processador α9 Gen 6 com IA, resolução 4K (3840x2160), taxa de atualização de 120Hz, suporte para Dolby Vision IQ, Dolby Atmos, 4 portas HDMI 2.1 com VRR/ALLM, webOS 23 com ThinQ AI, One Wall Design para instalação flush to wall.',
    shortDescription: 'Smart TV LG OLED 65" 4K 120Hz, Dolby Vision, webOS 23',
    basePrice: 12999.90,
    originalPrice: 16999.90,
    category: 'TV e Home Theater',
    subcategory: 'Smart TVs',
    brand: 'LG',
    rating: 4.9,
    reviewCount: 1456,
    tags: ['tv', 'oled', 'smart tv', '4k', '120hz'],
    variants: [
      {
        id: 'var-012-01',
        color: 'Preto',
        colorHex: '#000000',
        size: '65"',
        sku: 'LG-OLED65G3-BLK',
        stock: 14,
        priceModifier: 0,
        images: ['Smart TV LG OLED 65 polegadas', 'LG OLED Evo G3 4K']
      },
      {
        id: 'var-012-02',
        color: 'Preto',
        colorHex: '#000000',
        size: '77"',
        sku: 'LG-OLED77G3-BLK',
        stock: 6,
        priceModifier: 8000,
        images: ['Smart TV LG OLED 77 polegadas premium', 'LG OLED G3 77 polegadas']
      }
    ],
    features: [
      'Painel OLED Evo de 3ª geração com Brightness Booster Max',
      'Processador α9 Gen 6 AI 4K com Deep Learning',
      'Dolby Vision IQ, Dolby Atmos, Filmmaker Mode',
      '4x HDMI 2.1 com 4K 120Hz, VRR, ALLM, eARC',
      'webOS 23 com ThinQ AI e Magic Remote',
      'Gallery Design com One Wall Design',
      'NVIDIA G-SYNC, AMD FreeSync, HGiG',
      'Assistentes de voz: Google Assistant e Alexa'
    ],
    specifications: {
      'Tamanho': '65 polegadas',
      'Resolução': '3840 x 2160 (4K)',
      'Tecnologia': 'OLED Evo',
      'Taxa de Atualização': '120Hz',
      'HDR': 'Dolby Vision IQ, HDR10, HLG',
      'Sistema': 'webOS 23',
      'HDMI': '4x HDMI 2.1',
      'Áudio': '60W 4.2ch, Dolby Atmos'
    },
    seller: {
      id: 'seller-010',
      name: 'SmartHome Electronics',
      rating: 4.9,
      verified: true
    },
    createdAt: '2024-01-30T16:45:00Z',
    updatedAt: '2024-11-03T12:30:00Z',
    isFeatured: true,
    isNew: false,
    isBestSeller: false
  },
  {
    id: 'prod-013',
    name: 'Cadeira Gamer DXRacer Formula Series Ergonômica com Almofadas',
    description: 'Cadeira gamer ergonômica profissional com design inspirado em assentos de corrida, estrutura em aço reforçado, espuma de alta densidade, revestimento em couro PU premium, ajuste de altura a gás classe 4, braços 4D ajustáveis, reclinação de até 135°, almofadas lombar e cervical inclusas, suporta até 150kg.',
    shortDescription: 'Cadeira DXRacer ergonômica, reclinação 135°, até 150kg',
    basePrice: 2199.90,
    originalPrice: 2799.90,
    category: 'Móveis',
    subcategory: 'Cadeiras Gamer',
    brand: 'DXRacer',
    rating: 4.6,
    reviewCount: 978,
    tags: ['cadeira', 'gamer', 'ergonomica', 'escritorio', 'dxracer'],
    variants: [
      {
        id: 'var-013-01',
        color: 'Preto e Vermelho',
        colorHex: '#DC2626',
        size: 'Padrão',
        sku: 'DXR-FRM-BLKRED',
        stock: 23,
        priceModifier: 0,
        images: ['Cadeira gamer DXRacer preta e vermelha', 'DXRacer Formula Series']
      },
      {
        id: 'var-013-02',
        color: 'Preto e Azul',
        colorHex: '#2563EB',
        size: 'Padrão',
        sku: 'DXR-FRM-BLKBLU',
        stock: 18,
        priceModifier: 0,
        images: ['Cadeira gamer DXRacer preta e azul', 'DXRacer azul ergonômica']
      },
      {
        id: 'var-013-03',
        color: 'Totalmente Preta',
        colorHex: '#000000',
        size: 'Padrão',
        sku: 'DXR-FRM-BLK',
        stock: 27,
        priceModifier: 200,
        images: ['Cadeira gamer DXRacer toda preta', 'DXRacer edição black']
      }
    ],
    features: [
      'Estrutura em aço carbono reforçado',
      'Espuma de alta densidade de 55kg/m³',
      'Revestimento em couro PU premium resistente',
      'Pistão a gás classe 4 certificado',
      'Braços 4D com ajuste em 4 direções',
      'Reclinação de 90° a 135° com sistema de travamento',
      'Rodízios de 65mm com revestimento em nylon',
      'Almofadas lombar e cervical em memory foam'
    ],
    specifications: {
      'Capacidade': 'Até 150kg',
      'Altura do Assento': '44 - 54 cm',
      'Largura do Assento': '53 cm',
      'Profundidade do Assento': '54 cm',
      'Reclinação': '90° - 135°',
      'Material': 'Aço + Espuma HD + Couro PU',
      'Braços': '4D ajustáveis',
      'Garantia': '2 anos'
    },
    seller: {
      id: 'seller-011',
      name: 'FurnitureMax',
      rating: 4.7,
      verified: true
    },
    createdAt: '2024-02-20T10:00:00Z',
    updatedAt: '2024-10-25T16:45:00Z',
    isFeatured: false,
    isNew: false,
    isBestSeller: false
  },
  {
    id: 'prod-014',
    name: 'Impressora Multifuncional HP LaserJet Pro MFP M428fdw',
    description: 'Impressora multifuncional laser monocromática profissional com impressão duplex automática, scanner ADF de 50 folhas, velocidade de até 40ppm, conectividade WiFi, Ethernet e USB, tela touchscreen colorida de 2.7", segurança avançada com JetIntelligence, bandeja para 350 folhas, ideal para escritórios de médio porte.',
    shortDescription: 'Impressora HP LaserJet Pro MFP, 40ppm, duplex, WiFi',
    basePrice: 3299.90,
    originalPrice: 4199.90,
    category: 'Informática',
    subcategory: 'Impressoras',
    brand: 'HP',
    rating: 4.7,
    reviewCount: 645,
    tags: ['impressora', 'multifuncional', 'laser', 'hp', 'escritorio'],
    variants: [
      {
        id: 'var-014-01',
        color: 'Branco',
        colorHex: '#FFFFFF',
        size: 'Padrão',
        sku: 'HP-LJPM428FDW-WHT',
        stock: 31,
        priceModifier: 0,
        images: ['Impressora HP LaserJet Pro multifuncional', 'HP MFP impressora escritório']
      }
    ],
    features: [
      'Impressão laser monocromática até 40ppm',
      'Impressão duplex automática',
      'Scanner ADF de 50 folhas',
      'Tela touchscreen colorida de 2.7"',
      'Conectividade WiFi, Ethernet, USB 2.0',
      'HP Smart App para impressão mobile',
      'Segurança JetIntelligence com proteção contra ameaças',
      'Bandeja de entrada para 350 folhas + bypass de 100 folhas'
    ],
    specifications: {
      'Tecnologia': 'Laser Monocromático',
      'Velocidade': '40 ppm (preto)',
      'Resolução': '1200 x 1200 dpi',
      'Duplex': 'Automático',
      'Scanner': 'Flatbed + ADF 50 folhas',
      'Conectividade': 'WiFi, Ethernet, USB',
      'Capacidade': '350 folhas',
      'Ciclo Mensal': 'Até 80.000 páginas'
    },
    seller: {
      id: 'seller-012',
      name: 'Office Solutions Pro',
      rating: 4.8,
      verified: true
    },
    createdAt: '2024-03-10T13:30:00Z',
    updatedAt: '2024-11-04T11:00:00Z',
    isFeatured: false,
    isNew: false,
    isBestSeller: false
  },
  {
    id: 'prod-015',
    name: 'Roteador WiFi 6E ASUS ROG Rapture GT-AXE16000 Quad-Band',
    description: 'Roteador gamer topo de linha com suporte WiFi 6E tri-band, velocidades combinadas de até 16 Gbps, porta WAN 10G Multi-Gig, 4 portas LAN Gigabit + 1 porta 2.5G, processador quad-core de 2.0GHz, 2GB RAM, 8 antenas externas, AiMesh support, Game Boost, VPN Fusion e segurança AiProtection Pro powered by Trend Micro.',
    shortDescription: 'Roteador ASUS ROG WiFi 6E, 16 Gbps, porta 10G',
    basePrice: 4999.90,
    originalPrice: 6499.90,
    category: 'Redes',
    subcategory: 'Roteadores',
    brand: 'ASUS',
    rating: 4.8,
    reviewCount: 287,
    tags: ['roteador', 'wifi 6e', 'gamer', 'asus', 'alta velocidade'],
    variants: [
      {
        id: 'var-015-01',
        color: 'Preto',
        colorHex: '#000000',
        size: 'Padrão',
        sku: 'ASUS-ROG-GTAXE16K-BLK',
        stock: 9,
        priceModifier: 0,
        images: ['Roteador ASUS ROG Rapture WiFi 6E', 'ASUS gaming router 8 antenas']
      }
    ],
    features: [
      'WiFi 6E Quad-Band (6GHz + 5GHz-2 + 5GHz-1 + 2.4GHz)',
      'Velocidades até 16 Gbps combinadas',
      'Porta WAN 10G Multi-Gigabit',
      '4 portas LAN Gigabit + 1 porta LAN 2.5G',
      'Processador Quad-Core 2.0GHz com 2GB RAM',
      'Game Boost para priorização de tráfego gaming',
      'VPN Fusion para conexões VPN e normais simultâneas',
      'AiProtection Pro com segurança comercial'
    ],
    specifications: {
      'Padrão WiFi': 'WiFi 6E (802.11ax)',
      'Bandas': 'Quad-Band (6/5/5/2.4 GHz)',
      'Velocidade': '4804 + 4804 + 4804 + 1148 Mbps',
      'Portas WAN': '1x 10G',
      'Portas LAN': '4x 1G + 1x 2.5G',
      'CPU': 'Quad-core 2.0GHz',
      'RAM': '2GB',
      'Antenas': '8 externas'
    },
    seller: {
      id: 'seller-013',
      name: 'NetworkPro Tech',
      rating: 4.9,
      verified: true
    },
    createdAt: '2024-04-18T09:45:00Z',
    updatedAt: '2024-11-06T10:20:00Z',
    isFeatured: false,
    isNew: true,
    isBestSeller: false
  },
  {
    id: 'prod-016',
    name: 'SSD NVMe Samsung 990 PRO 2TB PCIe 4.0 com Dissipador',
    description: 'SSD NVMe M.2 de alto desempenho com interface PCIe 4.0 x4, controlador Samsung Pascal, memória V-NAND TLC de 8ª geração, velocidades sequenciais de leitura até 7.450 MB/s e escrita até 6.900 MB/s, dissipador de calor incluído, tecnologia Dynamic Thermal Guard, garantia de 5 anos.',
    shortDescription: 'SSD Samsung 990 PRO 2TB NVMe, 7.450 MB/s leitura',
    basePrice: 1299.90,
    originalPrice: 1699.90,
    category: 'Hardware',
    subcategory: 'Armazenamento',
    brand: 'Samsung',
    rating: 4.9,
    reviewCount: 1532,
    tags: ['ssd', 'nvme', 'samsung', 'pcie 4.0', 'alto desempenho'],
    variants: [
      {
        id: 'var-016-01',
        color: 'Preto',
        colorHex: '#000000',
        size: '1TB',
        sku: 'SMSNG-990PRO-1TB-HS',
        stock: 74,
        priceModifier: -500,
        images: ['SSD Samsung 990 PRO 1TB com dissipador', 'Samsung NVMe M.2 SSD']
      },
      {
        id: 'var-016-02',
        color: 'Preto',
        colorHex: '#000000',
        size: '2TB',
        sku: 'SMSNG-990PRO-2TB-HS',
        stock: 52,
        priceModifier: 0,
        images: ['SSD Samsung 990 PRO 2TB', 'Samsung SSD 2TB NVMe']
      },
      {
        id: 'var-016-03',
        color: 'Preto',
        colorHex: '#000000',
        size: '4TB',
        sku: 'SMSNG-990PRO-4TB-HS',
        stock: 18,
        priceModifier: 1400,
        images: ['SSD Samsung 990 PRO 4TB premium', 'Samsung 4TB NVMe alto armazenamento']
      }
    ],
    features: [
      'Interface PCIe 4.0 x4, NVMe 2.0',
      'Controlador Samsung Pascal',
      'Memória V-NAND TLC 8ª geração',
      'Leitura sequencial até 7.450 MB/s',
      'Escrita sequencial até 6.900 MB/s',
      'Dissipador de calor incluído',
      'Tecnologia Dynamic Thermal Guard para controle térmico',
      'Samsung Magician Software'
    ],
    specifications: {
      'Interface': 'PCIe 4.0 x4, NVMe 2.0',
      'Form Factor': 'M.2 2280',
      'Capacidade': '2TB',
      'Leitura Sequencial': '7.450 MB/s',
      'Escrita Sequencial': '6.900 MB/s',
      'MTBF': '1.5 milhões de horas',
      'TBW': '1.200 TB',
      'Garantia': '5 anos'
    },
    seller: {
      id: 'seller-014',
      name: 'Hardware Central',
      rating: 4.9,
      verified: true
    },
    createdAt: '2024-03-25T11:00:00Z',
    updatedAt: '2024-11-05T15:30:00Z',
    isFeatured: false,
    isNew: false,
    isBestSeller: true
  },
  {
    id: 'prod-017',
    name: 'Webcam Logitech Brio 4K Pro Ultra HD com HDR',
    description: 'Webcam profissional 4K com sensor Sony Exmor de 13MP, gravação em 4K a 30fps ou 1080p a 60fps, HDR com RightLight 3, autofoco avançado, campo de visão ajustável (65°/78°/90°), microfones duplos com redução de ruído, suporte para Windows Hello, certificação para Microsoft Teams e Zoom.',
    shortDescription: 'Webcam Logitech Brio 4K, HDR, autofoco, microfone duplo',
    basePrice: 1399.90,
    originalPrice: 1799.90,
    category: 'Periféricos',
    subcategory: 'Webcams',
    brand: 'Logitech',
    rating: 4.7,
    reviewCount: 892,
    tags: ['webcam', '4k', 'logitech', 'streaming', 'home office'],
    variants: [
      {
        id: 'var-017-01',
        color: 'Preto',
        colorHex: '#000000',
        size: 'Padrão',
        sku: 'LGTC-BRIO4K-BLK',
        stock: 43,
        priceModifier: 0,
        images: ['Webcam Logitech Brio 4K profissional', 'Logitech Brio ultra HD']
      }
    ],
    features: [
      'Sensor Sony Exmor de 13 megapixels',
      'Gravação em 4K (3840x2160) a 30fps',
      'Gravação em 1080p a 60fps ou 720p a 90fps',
      'HDR com tecnologia RightLight 3',
      'Autofoco com detecção de rosto',
      'Campo de visão ajustável: 65°/78°/90°',
      'Microfones duplos omnidirecionais com redução de ruído',
      'Suporte para Windows Hello'
    ],
    specifications: {
      'Resolução': '4K Ultra HD (3840x2160)',
      'Frame Rate': '30fps (4K), 60fps (1080p), 90fps (720p)',
      'Campo de Visão': '65°/78°/90° ajustável',
      'Foco': 'Autofoco avançado',
      'Microfone': 'Dual omnidirecional',
      'Conexão': 'USB 3.0',
      'Compatibilidade': 'Windows, macOS, Chrome OS',
      'Montagem': 'Clip universal + rosca para tripé'
    },
    seller: {
      id: 'seller-015',
      name: 'StreamGear Pro',
      rating: 4.8,
      verified: true
    },
    createdAt: '2024-04-02T14:15:00Z',
    updatedAt: '2024-11-02T13:00:00Z',
    isFeatured: false,
    isNew: false,
    isBestSeller: false
  },
  {
    id: 'prod-018',
    name: 'Microfone Blue Yeti X Profissional USB Condensador',
    description: 'Microfone condensador USB profissional com cápsula de quatro diafragmas, medidor LED multi-função, quatro padrões polares (cardioide, omnidirecional, bidirecional, estéreo), botão de mute inteligente, controle de ganho, saída para fone com controle de volume, suporte de amortecimento incluso.',
    shortDescription: 'Microfone Blue Yeti X USB, 4 padrões polares, LED meter',
    basePrice: 1699.90,
    originalPrice: 2199.90,
    category: 'Áudio',
    subcategory: 'Microfones',
    brand: 'Blue Microphones',
    rating: 4.8,
    reviewCount: 1245,
    tags: ['microfone', 'usb', 'streaming', 'podcast', 'profissional'],
    variants: [
      {
        id: 'var-018-01',
        color: 'Preto',
        colorHex: '#000000',
        size: 'Padrão',
        sku: 'BLUE-YETIX-BLK',
        stock: 36,
        priceModifier: 0,
        images: ['Microfone Blue Yeti X preto profissional', 'Blue Yeti X USB condensador']
      },
      {
        id: 'var-018-02',
        color: 'Prata',
        colorHex: '#C0C0C0',
        size: 'Padrão',
        sku: 'BLUE-YETIX-SLV',
        stock: 24,
        priceModifier: 0,
        images: ['Microfone Blue Yeti X prata', 'Blue Yeti X cor prata']
      }
    ],
    features: [
      'Cápsula de quatro diafragmas condensadores',
      'Medidor LED multi-função de 11 segmentos',
      'Quatro padrões polares: cardioide, omnidirecional, bidirecional, estéreo',
      'Botão de mute inteligente com LED indicador',
      'Controle de ganho high-res',
      'Saída para fone de 3.5mm com controle de volume',
      'Software Blue VO!CE para efeitos avançados',
      'Suporte de amortecimento custom incluso'
    ],
    specifications: {
      'Tipo': 'Condensador',
      'Padrões Polares': '4 (Cardioide, Omni, Bi, Estéreo)',
      'Resposta de Frequência': '20Hz - 20kHz',
      'Taxa de Amostragem': '48kHz / 24-bit',
      'Sensibilidade': '4.5mV/Pa (1kHz)',
      'Máx SPL': '120dB',
      'Conexão': 'USB-C',
      'Peso': '1.27kg'
    },
    seller: {
      id: 'seller-015',
      name: 'StreamGear Pro',
      rating: 4.8,
      verified: true
    },
    createdAt: '2024-02-25T10:30:00Z',
    updatedAt: '2024-11-01T09:45:00Z',
    isFeatured: false,
    isNew: false,
    isBestSeller: false
  },
  {
    id: 'prod-019',
    name: 'Placa de Vídeo NVIDIA GeForce RTX 4090 24GB GDDR6X',
    description: 'Placa de vídeo topo de linha com arquitetura Ada Lovelace, 24GB de memória GDDR6X, 16384 CUDA Cores, clock boost de até 2.52GHz, suporte para Ray Tracing de 3ª geração, DLSS 3 com geração de frames por IA, PCIe 4.0, três conectores DisplayPort 1.4a e um HDMI 2.1, sistema de resfriamento triplo com vapor chamber.',
    shortDescription: 'RTX 4090 24GB, arquitetura Ada Lovelace, DLSS 3',
    basePrice: 14999.90,
    originalPrice: 18999.90,
    category: 'Hardware',
    subcategory: 'Placas de Vídeo',
    brand: 'NVIDIA',
    rating: 4.9,
    reviewCount: 678,
    tags: ['gpu', 'rtx', 'nvidia', 'alta performance', '4090'],
    variants: [
      {
        id: 'var-019-01',
        color: 'Preto',
        colorHex: '#000000',
        size: 'Founders Edition',
        sku: 'NVD-RTX4090-24GB-FE',
        stock: 3,
        priceModifier: 0,
        images: ['Placa de vídeo NVIDIA RTX 4090', 'GeForce RTX 4090 24GB']
      },
      {
        id: 'var-019-02',
        color: 'Preto',
        colorHex: '#000000',
        size: 'ASUS ROG Strix OC',
        sku: 'ASUS-RTX4090-24GB-STRIX',
        stock: 5,
        priceModifier: 2500,
        images: ['ASUS ROG Strix RTX 4090 OC', 'RTX 4090 ASUS overclock']
      }
    ],
    features: [
      'Arquitetura NVIDIA Ada Lovelace',
      '16384 CUDA Cores',
      '24GB GDDR6X com barramento de 384-bit',
      'Clock Boost até 2.52GHz',
      'Ray Tracing Cores de 3ª geração',
      'Tensor Cores de 4ª geração com DLSS 3',
      'Suporte para DirectX 12 Ultimate',
      'NVIDIA Reflex para latência ultra-baixa'
    ],
    specifications: {
      'Arquitetura': 'Ada Lovelace',
      'CUDA Cores': '16384',
      'Memória': '24GB GDDR6X',
      'Barramento': '384-bit',
      'Clock Base': '2.23 GHz',
      'Clock Boost': '2.52 GHz',
      'TDP': '450W',
      'Conectores': '3x DisplayPort 1.4a, 1x HDMI 2.1'
    },
    seller: {
      id: 'seller-014',
      name: 'Hardware Central',
      rating: 4.9,
      verified: true
    },
    createdAt: '2024-01-28T12:00:00Z',
    updatedAt: '2024-11-06T14:15:00Z',
    isFeatured: true,
    isNew: false,
    isBestSeller: false
  },
  {
    id: 'prod-020',
    name: 'Bicicleta Ergométrica Horizontal Magnética ProForm com Display LCD',
    description: 'Bicicleta ergométrica horizontal profissional com sistema de resistência magnética de 16 níveis, assento anatômico ajustável com encosto reclinável, pedais com cinta de segurança, display LCD multifuncional, monitor cardíaco, capacidade para até 150kg, rodas de transporte, ideal para reabilitação e exercícios de baixo impacto.',
    shortDescription: 'Bicicleta ProForm horizontal magnética, 16 níveis, até 150kg',
    basePrice: 2899.90,
    originalPrice: 3599.90,
    category: 'Esportes',
    subcategory: 'Fitness',
    brand: 'ProForm',
    rating: 4.6,
    reviewCount: 543,
    tags: ['bicicleta', 'ergometrica', 'fitness', 'exercicio', 'horizontal'],
    variants: [
      {
        id: 'var-020-01',
        color: 'Preto e Prata',
        colorHex: '#6B7280',
        size: 'Padrão',
        sku: 'PRFRM-ERGO-HRZ-BLKSLV',
        stock: 16,
        priceModifier: 0,
        images: ['Bicicleta ergométrica ProForm horizontal', 'ProForm bike horizontal magnética']
      }
    ],
    features: [
      'Sistema de resistência magnética de 16 níveis',
      'Assento anatômico ajustável com encosto reclinável',
      'Display LCD com medição de tempo, distância, velocidade e calorias',
      'Monitor cardíaco integrado nos pegadores',
      'Pedais com cinta de segurança ajustável',
      'Estrutura em aço carbono reforçado',
      'Rodas de transporte para mobilidade',
      'Suporta até 150kg'
    ],
    specifications: {
      'Tipo': 'Horizontal (Recumbent)',
      'Resistência': 'Magnética 16 níveis',
      'Display': 'LCD multifuncional',
      'Capacidade': '150kg',
      'Dimensões': '155 x 65 x 105 cm',
      'Peso': '45kg',
      'Assento': 'Anatômico ajustável com encosto',
      'Garantia': '2 anos'
    },
    seller: {
      id: 'seller-016',
      name: 'FitPro Equipment',
      rating: 4.7,
      verified: true
    },
    createdAt: '2024-04-08T15:30:00Z',
    updatedAt: '2024-10-29T12:00:00Z',
    isFeatured: false,
    isNew: false,
    isBestSeller: false
  }
]

/**
 * Códigos promocionais válidos para testes
 */
export const PROMO_CODES: PromoCode[] = [
  {
    code: 'QUANTUM10',
    discount: 10,
    minPurchase: 500,
    validUntil: '2025-12-31',
    isActive: true
  },
  {
    code: 'BEMVINDO15',
    discount: 15,
    minPurchase: 1000,
    validUntil: '2025-12-31',
    isActive: true
  },
  {
    code: 'PRIMEIRACOMPRA20',
    discount: 20,
    minPurchase: 2000,
    validUntil: '2025-12-31',
    isActive: true
  },
  {
    code: 'BLACKFRIDAY30',
    discount: 30,
    minPurchase: 5000,
    validUntil: '2024-11-30',
    isActive: true
  },
  {
    code: 'EXPIREDCODE',
    discount: 50,
    minPurchase: 100,
    validUntil: '2023-01-01',
    isActive: false
  }
]

/**
 * Categorias disponíveis no marketplace
 */
export const CATEGORIES = [
  'Eletrônicos',
  'Informática',
  'Smartphones',
  'Tablets',
  'Fotografia',
  'Games',
  'Áudio',
  'TV e Home Theater',
  'Redes',
  'Hardware',
  'Periféricos',
  'Móveis',
  'Esportes'
]

/**
 * Marcas disponíveis no marketplace
 */
export const BRANDS = [
  'DJI',
  'ASUS',
  'Apple',
  'Sony',
  'Samsung',
  'LG',
  'Logitech',
  'DXRacer',
  'HP',
  'NVIDIA',
  'Blue Microphones',
  'ProForm'
]

/**
 * Helper functions para manipular os dados mockados
 */

export function getProductById(id: string): Product | undefined {
  return MOCK_PRODUCTS.find(product => product.id === id)
}

export function getProductsByCategory(category: string): Product[] {
  return MOCK_PRODUCTS.filter(product => product.category === category)
}

export function getProductsByBrand(brand: string): Product[] {
  return MOCK_PRODUCTS.filter(product => product.brand === brand)
}

export function getFeaturedProducts(): Product[] {
  return MOCK_PRODUCTS.filter(product => product.isFeatured)
}

export function getBestSellerProducts(): Product[] {
  return MOCK_PRODUCTS.filter(product => product.isBestSeller)
}

export function getNewProducts(): Product[] {
  return MOCK_PRODUCTS.filter(product => product.isNew)
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase()
  return MOCK_PRODUCTS.filter(
    product =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery) ||
      product.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
      product.brand.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery)
  )
}

export function filterProducts(
  products: Product[],
  filters: {
    minPrice?: number
    maxPrice?: number
    brands?: string[]
    categories?: string[]
    rating?: number
    inStock?: boolean
  }
): Product[] {
  return products.filter(product => {
    // Filtro de preço
    if (filters.minPrice !== undefined && product.basePrice < filters.minPrice) {
      return false
    }
    if (filters.maxPrice !== undefined && product.basePrice > filters.maxPrice) {
      return false
    }

    // Filtro de marca
    if (filters.brands && filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
      return false
    }

    // Filtro de categoria
    if (filters.categories && filters.categories.length > 0 && !filters.categories.includes(product.category)) {
      return false
    }

    // Filtro de avaliação
    if (filters.rating !== undefined && product.rating < filters.rating) {
      return false
    }

    // Filtro de estoque
    if (filters.inStock) {
      const hasStock = product.variants.some(variant => variant.stock > 0)
      if (!hasStock) {
        return false
      }
    }

    return true
  })
}

export function sortProducts(
  products: Product[],
  sortBy: 'price-asc' | 'price-desc' | 'rating' | 'newest' | 'popular'
): Product[] {
  const sorted = [...products]

  switch (sortBy) {
    case 'price-asc':
      return sorted.sort((a, b) => a.basePrice - b.basePrice)
    case 'price-desc':
      return sorted.sort((a, b) => b.basePrice - a.basePrice)
    case 'rating':
      return sorted.sort((a, b) => b.rating - a.rating)
    case 'newest':
      return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    case 'popular':
      return sorted.sort((a, b) => b.reviewCount - a.reviewCount)
    default:
      return sorted
  }
}

export function validatePromoCode(code: string, cartTotal: number): { valid: boolean; discount?: number; message: string } {
  const promo = PROMO_CODES.find(p => p.code === code)

  if (!promo) {
    return { valid: false, message: 'Código promocional inválido' }
  }

  if (!promo.isActive) {
    return { valid: false, message: 'Código promocional expirado' }
  }

  if (new Date(promo.validUntil) < new Date()) {
    return { valid: false, message: 'Código promocional expirado' }
  }

  if (promo.minPurchase && cartTotal < promo.minPurchase) {
    return {
      valid: false,
      message: `Compra mínima de R$ ${promo.minPurchase.toFixed(2)} necessária`
    }
  }

  return {
    valid: true,
    discount: promo.discount,
    message: `Desconto de ${promo.discount}% aplicado!`
  }
}
