"""
Script para gerar imagens de produtos usando Google Gemini Imagen API
Este script deve ser executado UMA VEZ para gerar todas as imagens dos produtos
e salvá-las na pasta public/
"""

import os
import json
from pathlib import Path
from google import genai
from dotenv import load_dotenv

# Carrega variáveis de ambiente
load_dotenv()

# Configurações
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
MODEL_ID = "imagen-4.0-fast-generate-001"  # Usando o modelo mais rápido e barato
OUTPUT_DIR = Path(__file__).parent.parent / "public"
OUTPUT_DIR.mkdir(exist_ok=True)

# Inicializa o cliente
if not GOOGLE_API_KEY:
    raise ValueError("GOOGLE_API_KEY não encontrada no arquivo .env")

client = genai.Client(api_key=GOOGLE_API_KEY)

# Lista de produtos com suas queries de imagem
# Extraído de lib/mock-data.ts
PRODUCTS = [
    {
        "id": "prod-001",
        "name": "Drone DJI Mavic 3 Pro",
        "variants": [
            {
                "id": "var-001-01",
                "images": [
                    "Drone profissional DJI cinza com câmera 4K",
                    "DJI Mavic 3 Pro em voo"
                ]
            },
            {
                "id": "var-001-02",
                "images": [
                    "Drone DJI Mavic 3 Pro kit completo",
                    "DJI combo com acessórios"
                ]
            }
        ]
    },
    {
        "id": "prod-002",
        "name": "Notebook ASUS ROG Strix",
        "variants": [
            {
                "id": "var-002-01",
                "images": [
                    "Notebook ASUS ROG Strix gamer preto",
                    "ASUS ROG com teclado RGB iluminado"
                ]
            },
            {
                "id": "var-002-02",
                "images": [
                    "ASUS ROG Strix configuração premium",
                    "Notebook gamer ASUS alto desempenho"
                ]
            }
        ]
    },
    {
        "id": "prod-003",
        "name": "Apple Watch Series 9",
        "variants": [
            {
                "id": "var-003-01",
                "images": [
                    "Apple Watch Series 9 azul meia-noite",
                    "Apple Watch com pulseira sport"
                ]
            },
            {
                "id": "var-003-02",
                "images": [
                    "Apple Watch Series 9 dourado estelar",
                    "Apple Watch cor estelar"
                ]
            },
            {
                "id": "var-003-03",
                "images": [
                    "Apple Watch Series 9 rosa",
                    "Apple Watch feminino rosa"
                ]
            }
        ]
    },
    {
        "id": "prod-004",
        "name": "Câmera Sony Alpha A7 IV",
        "variants": [
            {
                "id": "var-004-01",
                "images": [
                    "Camera Sony Alpha A7 IV profissional",
                    "Sony A7IV mirrorless full frame"
                ]
            },
            {
                "id": "var-004-02",
                "images": [
                    "Sony A7 IV com lente kit",
                    "Camera Sony kit completo"
                ]
            }
        ]
    },
    {
        "id": "prod-005",
        "name": "PlayStation 5 Slim",
        "variants": [
            {
                "id": "var-005-01",
                "images": [
                    "PlayStation 5 Slim branco digital",
                    "PS5 console nova geração"
                ]
            },
            {
                "id": "var-005-02",
                "images": [
                    "PlayStation 5 Slim preto",
                    "PS5 edição preta"
                ]
            }
        ]
    },
    {
        "id": "prod-006",
        "name": "Fone Sony WH-1000XM5",
        "variants": [
            {
                "id": "var-006-01",
                "images": [
                    "Fone Sony WH-1000XM5 preto",
                    "Sony wireless headphone premium"
                ]
            },
            {
                "id": "var-006-02",
                "images": [
                    "Fone Sony WH-1000XM5 prata",
                    "Sony headphone cor prata"
                ]
            }
        ]
    },
    {
        "id": "prod-007",
        "name": "Samsung Galaxy S24 Ultra",
        "variants": [
            {
                "id": "var-007-01",
                "images": [
                    "Samsung Galaxy S24 Ultra preto titânio",
                    "Galaxy S24 Ultra com S Pen"
                ]
            },
            {
                "id": "var-007-02",
                "images": [
                    "Samsung Galaxy S24 Ultra violeta",
                    "S24 Ultra cor violeta"
                ]
            },
            {
                "id": "var-007-03",
                "images": [
                    "Galaxy S24 Ultra 1TB cinza",
                    "Samsung S24 Ultra premium"
                ]
            }
        ]
    },
    {
        "id": "prod-008",
        "name": "iPad Pro 12.9 M2",
        "variants": [
            {
                "id": "var-008-01",
                "images": [
                    "iPad Pro 12.9 polegadas cinza espacial",
                    "Apple iPad Pro com tela XDR"
                ]
            },
            {
                "id": "var-008-02",
                "images": [
                    "iPad Pro 12.9 prata",
                    "iPad Pro cor prata"
                ]
            },
            {
                "id": "var-008-03",
                "images": [
                    "iPad Pro 512GB premium",
                    "Apple iPad Pro alto armazenamento"
                ]
            }
        ]
    },
    {
        "id": "prod-009",
        "name": "Monitor LG UltraGear 27 4K",
        "variants": [
            {
                "id": "var-009-01",
                "images": [
                    "Monitor LG UltraGear 27 polegadas 4K",
                    "LG gaming monitor 144Hz"
                ]
            }
        ]
    },
    {
        "id": "prod-010",
        "name": "Teclado Logitech G Pro X TKL",
        "variants": [
            {
                "id": "var-010-01",
                "images": [
                    "Teclado Logitech G Pro X TKL preto",
                    "Logitech teclado mecânico wireless"
                ]
            },
            {
                "id": "var-010-02",
                "images": [
                    "Teclado Logitech switches red",
                    "G Pro X linear switches"
                ]
            },
            {
                "id": "var-010-03",
                "images": [
                    "Teclado Logitech G Pro X branco",
                    "Logitech teclado edição branca"
                ]
            }
        ]
    },
    {
        "id": "prod-011",
        "name": "Mouse Logitech G502 X Plus",
        "variants": [
            {
                "id": "var-011-01",
                "images": [
                    "Mouse Logitech G502 X Plus preto",
                    "Logitech gaming mouse wireless"
                ]
            },
            {
                "id": "var-011-02",
                "images": [
                    "Mouse Logitech G502 X Plus branco",
                    "G502 edição branca"
                ]
            }
        ]
    },
    {
        "id": "prod-012",
        "name": "Smart TV LG OLED 65 G3",
        "variants": [
            {
                "id": "var-012-01",
                "images": [
                    "Smart TV LG OLED 65 polegadas",
                    "LG OLED Evo G3 4K"
                ]
            },
            {
                "id": "var-012-02",
                "images": [
                    "Smart TV LG OLED 77 polegadas premium",
                    "LG OLED G3 77 polegadas"
                ]
            }
        ]
    },
    {
        "id": "prod-013",
        "name": "Cadeira DXRacer Formula",
        "variants": [
            {
                "id": "var-013-01",
                "images": [
                    "Cadeira gamer DXRacer preta e vermelha",
                    "DXRacer Formula Series"
                ]
            },
            {
                "id": "var-013-02",
                "images": [
                    "Cadeira gamer DXRacer preta e azul",
                    "DXRacer azul ergonômica"
                ]
            },
            {
                "id": "var-013-03",
                "images": [
                    "Cadeira gamer DXRacer toda preta",
                    "DXRacer edição black"
                ]
            }
        ]
    },
    {
        "id": "prod-014",
        "name": "Impressora HP LaserJet Pro MFP",
        "variants": [
            {
                "id": "var-014-01",
                "images": [
                    "Impressora HP LaserJet Pro multifuncional",
                    "HP MFP impressora escritório"
                ]
            }
        ]
    },
    {
        "id": "prod-015",
        "name": "Roteador ASUS ROG Rapture WiFi 6E",
        "variants": [
            {
                "id": "var-015-01",
                "images": [
                    "Roteador ASUS ROG Rapture WiFi 6E",
                    "ASUS gaming router 8 antenas"
                ]
            }
        ]
    },
    {
        "id": "prod-016",
        "name": "SSD Samsung 990 PRO",
        "variants": [
            {
                "id": "var-016-01",
                "images": [
                    "SSD Samsung 990 PRO 1TB com dissipador",
                    "Samsung NVMe M.2 SSD"
                ]
            },
            {
                "id": "var-016-02",
                "images": [
                    "SSD Samsung 990 PRO 2TB",
                    "Samsung SSD 2TB NVMe"
                ]
            },
            {
                "id": "var-016-03",
                "images": [
                    "SSD Samsung 990 PRO 4TB premium",
                    "Samsung 4TB NVMe alto armazenamento"
                ]
            }
        ]
    },
    {
        "id": "prod-017",
        "name": "Webcam Logitech Brio 4K",
        "variants": [
            {
                "id": "var-017-01",
                "images": [
                    "Webcam Logitech Brio 4K profissional",
                    "Logitech Brio ultra HD"
                ]
            }
        ]
    },
    {
        "id": "prod-018",
        "name": "Microfone Blue Yeti X",
        "variants": [
            {
                "id": "var-018-01",
                "images": [
                    "Microfone Blue Yeti X preto profissional",
                    "Blue Yeti X USB condensador"
                ]
            },
            {
                "id": "var-018-02",
                "images": [
                    "Microfone Blue Yeti X prata",
                    "Blue Yeti X cor prata"
                ]
            }
        ]
    },
    {
        "id": "prod-019",
        "name": "NVIDIA GeForce RTX 4090",
        "variants": [
            {
                "id": "var-019-01",
                "images": [
                    "Placa de vídeo NVIDIA RTX 4090",
                    "GeForce RTX 4090 24GB"
                ]
            },
            {
                "id": "var-019-02",
                "images": [
                    "ASUS ROG Strix RTX 4090 OC",
                    "RTX 4090 ASUS overclock"
                ]
            }
        ]
    },
    {
        "id": "prod-020",
        "name": "Bicicleta ProForm Horizontal",
        "variants": [
            {
                "id": "var-020-01",
                "images": [
                    "Bicicleta ergométrica ProForm horizontal",
                    "ProForm bike horizontal magnética"
                ]
            }
        ]
    }
]


def generate_image(prompt: str, filename: str) -> bool:
    """
    Gera uma imagem usando Gemini Imagen e salva no disco

    Args:
        prompt: Descrição da imagem a ser gerada
        filename: Nome do arquivo para salvar (ex: prod-001-0.jpg)

    Returns:
        True se gerou com sucesso, False caso contrário
    """
    output_path = OUTPUT_DIR / filename

    # Verifica se a imagem já existe
    if output_path.exists():
        print(f"⏭️  Pulando {filename} - já existe")
        return True

    try:
        print(f"🎨 Gerando: {prompt[:50]}...")

        # Gera a imagem
        result = client.models.generate_images(
            model=MODEL_ID,
            prompt=prompt,
            config=dict(
                number_of_images=1,
                output_mime_type="image/jpeg",
                person_generation="ALLOW_ADULT",
                aspect_ratio="1:1",
                image_size="1k"
            )
        )

        # Salva a imagem
        if result.generated_images:
            image_bytes = result.generated_images[0].image.image_bytes

            with open(output_path, 'wb') as f:
                f.write(image_bytes)

            print(f"✅ Salvo: {filename}")
            return True
        else:
            print(f"❌ Erro: Nenhuma imagem gerada para {filename}")
            return False

    except Exception as e:
        print(f"❌ Erro ao gerar {filename}: {str(e)}")
        return False


def main():
    """Função principal que gera todas as imagens"""
    print("=" * 60)
    print("🚀 QUANTUM MARKET - GERADOR DE IMAGENS COM GEMINI IMAGEN")
    print("=" * 60)
    print(f"📁 Diretório de saída: {OUTPUT_DIR}")
    print(f"🤖 Modelo: {MODEL_ID}")
    print("=" * 60)
    print()

    total_images = 0
    generated_images = 0
    skipped_images = 0
    failed_images = 0

    # Gera imagens para cada produto e variante
    for product in PRODUCTS:
        product_id = product["id"]
        product_name = product["name"]

        print(f"\n📦 Produto: {product_name} ({product_id})")
        print("-" * 60)

        for variant_idx, variant in enumerate(product["variants"]):
            variant_id = variant["id"]

            for img_idx, image_prompt in enumerate(variant["images"]):
                total_images += 1

                # Nome do arquivo: prod-001-var-001-01-0.jpg
                filename = f"{product_id}-{variant_id}-{img_idx}.jpg"

                # Gera a imagem
                success = generate_image(image_prompt, filename)

                if success:
                    if (OUTPUT_DIR / filename).stat().st_size > 0:
                        generated_images += 1
                    else:
                        skipped_images += 1
                else:
                    failed_images += 1

    # Resumo
    print()
    print("=" * 60)
    print("📊 RESUMO DA GERAÇÃO")
    print("=" * 60)
    print(f"Total de imagens: {total_images}")
    print(f"✅ Geradas: {generated_images}")
    print(f"⏭️  Puladas (já existiam): {skipped_images}")
    print(f"❌ Falhas: {failed_images}")
    print("=" * 60)

    if failed_images > 0:
        print("\n⚠️  Algumas imagens falharam. Verifique os logs acima.")
    else:
        print("\n🎉 Todas as imagens foram geradas com sucesso!")


if __name__ == "__main__":
    main()
