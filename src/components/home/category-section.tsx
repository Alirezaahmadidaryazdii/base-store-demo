
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getCategories } from "@/services/category.service";

export async function CategorySection() {
  const categories = (await getCategories()).filter(
    (category) => category.isActive
  );

  const cardLayouts = [
    "lg:col-span-6 lg:row-span-2",
    "lg:col-span-6",
    "lg:col-span-3",
    "lg:col-span-3",
  ];

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-12">
      <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
        <div>

          <h2 className="mt-3 text-2xl font-bold text-[var(--color-foreground)] sm:text-3xl">
            دسته‌بندی محصولات
          </h2>

          <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">
            مجموعه‌ای از انتخاب‌ها برای استایل منحصربه‌فرد تو
          </p>
        </div>

        <Link
          href="/shop"
          className="group flex shrink-0 items-center gap-2 pb-1 text-xs font-medium text-[var(--color-primary)] transition-colors hover:text-[var(--color-primary-hover)] sm:text-sm"
        >
          مشاهده همه
          <ArrowLeft
            size={16}
            className="transition-transform duration-300 group-hover:-translate-x-1"
          />
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-12 lg:grid-rows-[220px_220px] lg:gap-5">
        {categories.map((category, index) => (
          <Link
            key={category.id}
            href={`/category/${category.slug}`}
            className={`group relative block overflow-hidden rounded-xl bg-[var(--color-surface)] ${
              cardLayouts[index % cardLayouts.length]
            } ${index === 0 ? "col-span-2 aspect-[16/9] lg:aspect-auto" : "aspect-[4/5] lg:aspect-auto"}`}
          >
            <Image
              src={category.image}
              alt={category.name}
              fill
              sizes={
                index === 0
                  ? "(max-width: 1024px) 100vw, 50vw"
                  : "(max-width: 640px) 50vw, 25vw"
              }
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent transition-opacity duration-500 group-hover:from-black/75" />

            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-4 sm:p-5 lg:p-6">
              <div className="min-w-0">
                <span className="mb-2 block text-[9px] tracking-[0.2em] text-white/65 sm:text-[10px]">
                  COLLECTION 0{index + 1}
                </span>

                <h3 className="text-base font-semibold text-white sm:text-lg lg:text-xl">
                  {category.name}
                </h3>

                {category.description && (
                  <p className="mt-1 line-clamp-1 text-[10px] leading-6 text-white/75 sm:text-xs">
                    {category.description}
                  </p>
                )}
              </div>

              <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/50 text-white transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-[var(--color-primary)]">
                <ArrowLeft size={16} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
