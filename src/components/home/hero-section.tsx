
"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useEffect, useState } from "react";
import { storeConfig } from "@/config/store.config";

const slides = [
  {
    image: "/parna-assets/banner.png",
    title: "استایل متفاوت",
    subtitle: "برای روزهای خاص",
    description: "با جدیدترین مجموعه لباس‌های زنانه و مردانه",
  },
  {
    image: "/parna-assets/banner2.jpg",
    title: "زیبایی در سادگی",
    subtitle: "انتخابی برای هر روز",
    description: "تجربه‌ای تازه از راحتی و استایل با PARNA",
  },
  {
    image: "/parna-assets/banner3.jpg",
    title: "خاص انتخاب کن",
    subtitle: "متفاوت ظاهر شو",
    description: "جدیدترین انتخاب‌ها برای ساختن استایل شخصی شما",
  },
];

export function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(nextSlide, 5000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const currentSlide = slides[activeSlide];

  return (
    <section className="bg-[var(--color-background)]">
      <div
        dir="rtl"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="mx-auto grid max-w-7xl grid-cols-1 overflow-hidden rounded-md md:min-h-[304px] md:grid-cols-[0.85fr_1.15fr]"
      >
        <div className="flex items-center justify-center bg-[var(--color-surface)] px-6 py-12 text-right sm:px-10 md:px-12 lg:px-16">
          <div key={activeSlide} className="w-full max-w-md animate-[fadeIn_500ms_ease]">
            <span className="text-sm font-medium text-[var(--color-muted)]">
              مجموعه جدید {storeConfig.name}
            </span>

            <h1 className="mt-5 text-3xl font-bold leading-[1.7] tracking-tight text-[var(--color-foreground)] sm:text-4xl lg:text-[42px]">
              {currentSlide.title}
              <br />
              {currentSlide.subtitle}
            </h1>

            <p className="mt-3 text-xs leading-7 text-[var(--color-muted)] sm:text-sm">
              {currentSlide.description}
            </p>

            <Link
              href="/shop"
              className="mt-7 inline-flex items-center gap-3 rounded-full bg-[var(--color-primary)] px-6 py-3 text-xs font-medium !text-white transition-colors duration-300 hover:bg-[var(--color-primary-hover)]"
            >
              مشاهده محصولات
              <ArrowLeft size={15} className="text-white" />
            </Link>
          </div>
        </div>

        <div className="relative min-h-[260px] overflow-hidden md:min-h-[304px]">
          {slides.map((slide, index) => (
            <div
              key={slide.image}
              className={`absolute inset-0 transition-opacity duration-700 ${
                activeSlide === index
                  ? "z-10 opacity-100"
                  : "z-0 opacity-0"
              }`}
            >
              <Image
                src={slide.image}
                alt={`${slide.title} ${slide.subtitle}`}
                fill
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover object-center"
              />
            </div>
          ))}

          <div
            dir="ltr"
            className="absolute bottom-5 left-6 z-20 flex items-center gap-3 text-white sm:bottom-7 sm:left-8"
          >
            <span className="text-sm font-medium tracking-wider">
              {String(activeSlide + 1).padStart(2, "0")}
              <span className="mx-1 text-white/50">/</span>
              <span className="text-white/65">
                {String(slides.length).padStart(2, "0")}
              </span>
            </span>

            <div className="ml-2 flex items-center gap-2">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="اسلاید قبلی"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/70 bg-black/10 transition-colors hover:bg-white/20"
              >
                <ChevronLeft size={17} />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                aria-label="اسلاید بعدی"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/70 bg-black/10 transition-colors hover:bg-white/20"
              >
                <ChevronRight size={17} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
