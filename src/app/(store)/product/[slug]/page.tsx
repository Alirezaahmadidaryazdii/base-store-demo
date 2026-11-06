import Image from "next/image";
import { Suspense } from "react";
import { notFound } from "next/navigation";

import { getProductBySlug } from "@/services/product.service";
import { ProductDetails } from "@/components/product/product-details";

interface ProductPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  return (
    <Suspense
      fallback={
        <main className="container py-6 md:py-10">
          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
            <div className="aspect-[4/5] animate-pulse rounded-lg bg-[var(--color-surface)]" />
            <div className="space-y-4">
              <div className="h-8 w-3/4 animate-pulse rounded bg-[var(--color-surface)]" />
              <div className="h-5 w-1/2 animate-pulse rounded bg-[var(--color-surface)]" />
              <div className="h-12 w-full animate-pulse rounded bg-[var(--color-surface)]" />
            </div>
          </div>
        </main>
      }
    >
      <ProductPageContent params={params} />
    </Suspense>
  );
}

async function ProductPageContent({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const hasDiscount =
    product.compareAtPrice !== undefined &&
    product.compareAtPrice > product.price;

  const discountPercentage = hasDiscount
    ? Math.round(
        ((product.compareAtPrice! - product.price) /
          product.compareAtPrice!) *
          100
      )
    : 0;

  return (
    <main className="container py-6 md:py-10">
      <div className="mx-auto grid max-w-5xl items-start gap-6 md:grid-cols-[0.9fr_1fr] md:gap-10 lg:gap-14">
        {/* Product Images */}
        <section className="mx-auto w-full max-w-[420px] space-y-2.5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-[var(--color-surface)]">
            <Image
              src={product.thumbnail}
              alt={product.name}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 420px"
              className="object-cover"
            />

            {hasDiscount && (
              <span className="absolute right-3 top-3 rounded-full bg-[var(--color-primary)] px-2.5 py-1 text-[10px] font-medium text-white">
                {discountPercentage}٪ تخفیف
              </span>
            )}
          </div>

          {product.images.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.slice(0, 4).map((image) => (
                <div
                  key={image.id}
                  className="relative aspect-square overflow-hidden rounded-md bg-[var(--color-surface)]"
                >
                  <Image
                    src={image.url}
                    alt={image.alt || product.name}
                    fill
                    sizes="100px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Interactive Product Details */}
        <ProductDetails product={product} />
      </div>
    </main>
  );
}