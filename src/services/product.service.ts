
import { products } from "@/data/mock/products";
import type { Product } from "@/types/product";

interface GetProductsParams {
  categoryId?: string;
  search?: string;
  featured?: boolean;
}

export async function getProducts(
  params: GetProductsParams = {}
): Promise<Product[]> {
  let result = products.filter((product) => product.isActive);

  if (params.categoryId) {
    result = result.filter(
      (product) => product.categoryId === params.categoryId
    );
  }

  if (params.search) {
    const search = params.search.trim().toLowerCase();

    result = result.filter(
      (product) =>
        product.name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search)
    );
  }

  if (params.featured) {
    result = result.filter((product) => product.isFeatured);
  }

  return result;
}

export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  return (
    products.find(
      (product) => product.slug === slug && product.isActive
    ) ?? null
  );
}

export async function getFeaturedProducts(): Promise<Product[]> {
  return getProducts({ featured: true });
}

export async function getProductsByCategory(
  categoryId: string
): Promise<Product[]> {
  return getProducts({ categoryId });
}
