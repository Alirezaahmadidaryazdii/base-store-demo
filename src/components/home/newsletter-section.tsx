
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { siInstagram, siTelegram } from "simple-icons/icons";
import { storeConfig } from "@/config/store.config";

export function NewsletterSection() {
  const { social } = storeConfig;

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
        <div className="flex min-h-[170px] items-center justify-between gap-4 rounded-2xl bg-[var(--color-surface)] p-5 sm:p-7">
          <div className="min-w-0 flex-1 text-right">
            <h2 className="text-sm font-bold text-[var(--color-primary)] sm:text-base">
              درباره پارنا
            </h2>

            <p className="mt-2 text-[10px] leading-6 text-[var(--color-muted)] sm:text-xs">
              پارنا، جایی برای کشف استایل خاص و متفاوت. با کیفیتی بی‌نظیر و
              طراحی منحصربه‌فرد.
            </p>

            <Link
              href="/about"
              className="mt-3 inline-flex items-center gap-2 text-[10px] font-medium text-[var(--color-primary)] transition-opacity hover:opacity-70"
            >
              بیشتر بدانید
              <ArrowLeft size={13} />
            </Link>
          </div>

          <div className="relative h-[110px] w-[95px] shrink-0 overflow-hidden rounded-xl sm:h-[125px] sm:w-[110px]">
            <Image
              src="/parna-assets/clothes.jpg"
              alt="مجموعه پوشاک پارنا"
              fill
              sizes="110px"
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex min-h-[170px] flex-col justify-center rounded-2xl bg-[var(--color-surface)] p-5 sm:p-7">
          <h2 className="text-sm font-bold text-[var(--color-primary)] sm:text-base">
            با پارنا همراه باشید
          </h2>

          <p className="mt-2 text-[10px] leading-6 text-[var(--color-muted)] sm:text-xs">
            در شبکه‌های اجتماعی ما را دنبال کنید تا از جدیدترین محصولات،
            استایل‌ها و پیشنهادهای ویژه باخبر شوید.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            {social.instagram && (
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-full bg-[var(--color-primary)] px-4 text-xs font-medium text-white transition-colors hover:bg-[var(--color-primary-hover)]"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d={siInstagram.path} />
                </svg>
                اینستاگرام
                <ArrowLeft size={13} />
              </a>
            )}

            {social.telegram && (
              <a
                href={social.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--color-primary)] px-4 text-xs font-medium text-[var(--color-primary)] transition-colors hover:bg-[var(--color-primary)] hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                  <path d={siTelegram.path} />
                </svg>
                تلگرام
                <ArrowLeft size={13} />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
