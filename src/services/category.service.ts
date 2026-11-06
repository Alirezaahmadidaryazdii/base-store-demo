
import { categories } from "@/data/mock/categories";
import type { Category } from "@/types/category";

export async function getCategories(): Promise<Category[]> {
  return categories.filter((category) => category.isActive);
}

export async function getCategoryBySlug(
  slug: string
): Promise<Category | null> {
  return (
    categories.find(
      (category) => category.slug === slug && category.isActive
    ) ?? null
  );
}
