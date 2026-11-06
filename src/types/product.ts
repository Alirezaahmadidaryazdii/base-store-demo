
export interface ProductImage {
  id: string;
  url: string;
  alt: string;
}

export interface ProductVariant {
  id: string;
  size?: string;
  color?: string;
  colorCode?: string;
  price: number;
  stock: number;
  sku: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  thumbnail: string;
  images: ProductImage[];
  categoryId: string;
  variants: ProductVariant[];
  tags: string[];
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
}
