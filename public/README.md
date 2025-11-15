# Product Images

This folder contains all product images for the Quantum Market marketplace.

## Naming Convention

Images follow the pattern: `{product-id}-{variant-id}-{index}.jpg|png`

Example:
- `prod-001-var-001-01-0.jpg` - First image of variant 001-01 of product 001
- `prod-001-var-001-01-1.jpg` - Second image of variant 001-01 of product 001

## Image Count

- Total products: 20
- Total variants: Multiple per product
- Images per variant: 2 (main + alternate view)
- Total images: 48+

## Format

- JPG for products 001-010
- PNG for products 011-020
- Recommended resolution: 1024x1024px or higher
- Aspect ratio: 1:1 (square)

## Usage

Images are automatically loaded by the SmartImage component using the following fallback strategy:

1. Check local image in `/public/` folder
2. If not found, attempt API proxy
3. If all fail, show placeholder

All images are statically served from this folder and referenced in `lib/mock-data.ts`.
