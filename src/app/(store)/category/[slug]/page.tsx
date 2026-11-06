import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getProductsByCategory } from "@/services/product.service";
import { categories } from "@/data/mock/categories";
import { ShopProducts } from "@/components/product/shop-products";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return categories
    .filter((category) => category.isActive)
    .map((category) => ({
      slug: category.slug,
    }));
}

export default function CategoryPage({ params }: CategoryPageProps) {
  return (
    <Suspense
      fallback={
        <main className="container py-8 md:py-10">
          <div className="h-64 animate-pulse rounded-2xl bg-[var(--color-surface)]" />
        </main>
      }
    >
      <CategoryPageContent params={params} />
    </Suspense>
  );
}

async function CategoryPageContent({ params }: CategoryPageProps) {
  const { slug } = await params;

  const category = categories.find(
    (item) => item.slug === slug && item.isActive
  );

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(category.id);

  return (
    <main className="container py-8 md:py-10">
      <ShopProducts products={products} />
    </main>
  );
}