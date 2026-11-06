
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { siInstagram, siTelegram } from "simple-icons/icons";
import { storeConfig } from "@/config/store.config";

const footerColumns = [
  {
    sections: [
      {
        title: "راهنمای خرید",
        links: [
          { label: "فروشگاه", href: "/shop" },
          { label: "سبد خرید", href: "/cart" },
          { label: "قوانین و مقررات", href: "/terms" },
        ],
      },
      {
        title: "خدمات مشتریان",
        links: [
          { label: "تماس با ما", href: "/contact" },
          { label: "درباره ما", href: "/about" },
        ],
      },
    ],
  },
  {
    sections: [
      {
        title: "دسترسی سریع",
        links: [
          { label: "همه محصولات", href: "/shop" },
          { label: "لباس مردانه", href: "/category/men" },
          { label: "لباس زنانه", href: "/category/women" },
          { label: "اکسسوری", href: "/category/accessories" },
          { label: "کفش", href: "/category/shoes" },
        ],
      },
    ],
  },
];

export function Footer() {
  const { name, logo, social } = storeConfig;

  return (
    <footer className="bg-[#171717] text-white">
      <div className="container">
        <div
          dir="ltr"
          className="grid grid-cols-2 gap-10 py-12 sm:grid-cols-2 lg:grid-cols-[1.15fr_1fr_1fr_1.2fr] lg:gap-10 lg:py-14"
        >
          <div dir="rtl">
            <Link href="/" className="inline-flex items-center">
              <Image
                src={logo}
                alt={name}
                width={120}
                height={42}
                className="h-auto w-auto max-w-[120px] object-contain"
              />
            </Link>

            <p className="mt-4 max-w-[240px] text-sm leading-7 text-[#B8ADA5]">
              استایل خاص، راحتی همیشگی.
              تجربه‌ای متفاوت از انتخاب پوشاک با PARNA.
            </p>
          </div>

          {footerColumns.map((column, index) => (
            <div
              key={index}
              dir="rtl"
              className="space-y-7"
            >
              {column.sections.map((section) => (
                <div key={section.title}>
                  <h3 className="mb-4 text-sm font-semibold text-white">
                    {section.title}
                  </h3>

                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm text-[#B8ADA5] transition-colors hover:text-white"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}

          <div dir="rtl">
            <h3 className="text-sm font-semibold text-white">
              با ما در ارتباط باشید
            </h3>

            <p className="mt-3 text-sm leading-7 text-[#B8ADA5]">
              ما را در شبکه‌های اجتماعی دنبال کنید و از جدیدترین محصولات و
              پیشنهادهای PARNA باخبر شوید.
            </p>

            <div className="mt-5 flex flex-col gap-3">
              {social.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 transition-colors hover:border-white/25 hover:bg-white/[0.07]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 shrink-0 fill-current text-[#D8CEC6]"
                  >
                    <path d={siInstagram.path} />
                  </svg>

                  <div>
                    <span className="block text-sm text-white">
                      اینستاگرام
                    </span>
                    <span className="mt-1 block text-xs text-[#B8ADA5]">
                      دنبال کردن PARNA
                    </span>
                  </div>

                  <ArrowLeft
                    size={14}
                    className="mr-auto text-[#B8ADA5]"
                  />
                </a>
              )}

              {social.telegram && (
                <a
                  href={social.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 transition-colors hover:border-white/25 hover:bg-white/[0.07]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 shrink-0 fill-current text-[#D8CEC6]"
                  >
                    <path d={siTelegram.path} />
                  </svg>

                  <div>
                    <span className="block text-sm text-white">
                      تلگرام
                    </span>
                    <span className="mt-1 block text-xs text-[#B8ADA5]">
                      همراه ما باشید
                    </span>
                  </div>

                  <ArrowLeft
                    size={14}
                    className="mr-auto text-[#B8ADA5]"
                  />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-5">
          <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-right">
            <p className="text-xs text-[#B8ADA5]">
              © 2026 {name}. تمامی حقوق محفوظ است.
            </p>

            <p className="text-xs text-[#B8ADA5]">
              طراحی و توسعه با ❤️
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
