
import type { Product } from "@/types/product";
import { ProductCard } from "./product-card";

interface ProductGridProps {
  products: Product[];
  columns?: 2 | 3 | 4;
}

export function ProductGrid({
  products,
  columns = 4,
}: ProductGridProps) {
  const columnClasses = {
    2: "grid-cols-2",
    3: "grid-cols-2 sm:grid-cols-3",
    4: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
  };

  if (products.length === 0) {
    return (
      <div className="flex min-h-60 items-center justify-center">
        <p className="text-sm text-[var(--color-foreground)]/60">
          محصولی برای نمایش وجود ندارد.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`grid ${columnClasses[columns]} gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10`}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
