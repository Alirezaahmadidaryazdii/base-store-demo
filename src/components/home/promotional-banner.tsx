
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { banners } from "@/data/mock/banners";

export function PromotionalBanner() {
  const banner = banners.find((item) => item.isActive);

  if (!banner) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="relative isolate flex min-h-[190px] items-center overflow-hidden rounded-lg bg-[var(--color-surface)] sm:min-h-[230px] lg:min-h-[270px]">
        <Image
          src={banner.image}
          alt={banner.title}
          fill
          sizes="(max-width: 1280px) 100vw, 1280px"
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/15 to-transparent" />

        <div className="relative z-10 flex w-full flex-col items-center px-5 py-8 text-center sm:px-10 lg:w-1/2 lg:items-center lg:px-12">
          <span className="text-xs font-medium text-white/80 sm:text-sm">
            {banner.subtitle}
          </span>

          <h2 className="mt-2 text-2xl font-bold leading-relaxed text-white sm:text-3xl lg:text-4xl">
            {banner.title}
          </h2>

          <p className="mt-2 max-w-sm text-xs leading-7 text-white/80 sm:text-sm">
            {banner.description}
          </p>

          <Link
            href={banner.buttonLink}
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--color-primary)] px-5 py-2.5 text-xs font-medium text-white transition-colors duration-300 hover:bg-[var(--color-primary-hover)]"
          >
            {banner.buttonText}
            <ArrowLeft size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
