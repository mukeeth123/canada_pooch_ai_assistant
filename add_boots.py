import sys

content = open('src/mock/products.ts', 'r', encoding='utf-8').read()

imports = ""
items = ""

for i in range(1, 16):
    imports += f"import Boot{i} from '../assets/dog/Boots/boot_{i}.png';\n"
    items += f"""  {{
    id: 'b{i}',
    name: 'Protective Dog Boot {i}',
    price: 25,
    category: 'Boots & Shoes',
    rating: 4.8,
    reviewCount: {100 + i*5},
    imageUrl: Boot{i},
    colors: [],
    description: 'Durable and comfortable protective boots for all terrains.',
    recommendationReason: 'Excellent protection against hot pavement, snow, and salt.',
    recommendedFor: ['All Breeds'],
    sizes: ['S', 'M', 'L', 'XL'],
    inStock: true,
    returnRate: 0.05
  }},
"""

content = imports + '\n' + content
content = content.replace('export const PRODUCTS: Product[] = [', 'export const PRODUCTS: Product[] = [\n' + items)

open('src/mock/products.ts', 'w', encoding='utf-8').write(content)
print("Updated products.ts")
