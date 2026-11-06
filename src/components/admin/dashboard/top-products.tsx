import { storeConfig } from "@/config/store.config";
import type { TopProduct } from "@/types/dashboard";

interface TopProductsProps {
  products: TopProduct[];
}

const numberFormatter = new Intl.NumberFormat(storeConfig.locale);

export function TopProducts({ products }: TopProductsProps) {
  return (
    <section className="rounded-xl border border-border bg-surface p-5">
      <div className="mb-5">
        <h2 className="font-bold text-foreground">محصولات پرفروش</h2>
        <p className="mt-1 text-sm text-muted">
          محصولات بر اساس تعداد فروش
        </p>
      </div>

      <div className="space-y-4">
        {products.map((item, index) => (
          <div key={item.product.id} className="flex items-center gap-3">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-background text-sm font-bold text-muted">
              {numberFormatter.format(index + 1)}
            </span>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-foreground">
                {item.product.name}
              </p>

              <p className="mt-1 text-xs text-muted">
                {numberFormatter.format(item.quantitySold)} عدد فروش
              </p>
            </div>

            <p className="shrink-0 text-sm font-medium text-foreground">
              {numberFormatter.format(item.revenue)} {storeConfig.currency}
            </p>
          </div>
        ))}

        {products.length === 0 && (
          <p className="py-8 text-center text-sm text-muted">
            هنوز فروشی برای محصولات ثبت نشده است.
          </p>
        )}
      </div>
    </section>
  );
}