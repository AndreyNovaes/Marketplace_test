#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Lê o arquivo mock-data.ts
const mockDataPath = path.join(__dirname, '../lib/mock-data.ts');
const content = fs.readFileSync(mockDataPath, 'utf8');

// Extrai produtos usando regex
const products = [];
const productRegex = /{\s*id:\s*'(prod-\d+)',\s*name:\s*'([^']+)',\s*description:\s*'([^']+)',[\s\S]*?brand:\s*'([^']+)',[\s\S]*?category:\s*'([^']+)',[\s\S]*?variants:\s*\[([\s\S]*?)\]/g;

let match;
while ((match = productRegex.exec(content)) !== null) {
  const [, id, name, description, brand, category, variantsText] = match;

  // Extrai variantes
  const variants = [];
  const variantRegex = /{\s*id:\s*'(var-[^']+)',\s*color:\s*'([^']+)',[\s\S]*?size:\s*'([^']+)',/g;

  let vMatch;
  while ((vMatch = variantRegex.exec(variantsText)) !== null) {
    variants.push({
      id: vMatch[1],
      color: vMatch[2],
      size: vMatch[3]
    });
  }

  products.push({
    id,
    name,
    description: description.substring(0, 150) + '...',
    brand,
    category,
    variants
  });
}

console.log(JSON.stringify(products, null, 2));
console.error(`\n✅ Extraídos ${products.length} produtos com ${products.reduce((acc, p) => acc + p.variants.length, 0)} variantes\n`);
