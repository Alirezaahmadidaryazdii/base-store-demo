
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="container py-14 md:py-20">
      <div className="mx-auto max-w-4xl">
        <div className="mb-14 text-center">
          <span className="text-xs font-medium tracking-widest text-[var(--color-primary)]">
            OUR STORY
          </span>
          <h1 className="mt-4 text-3xl font-bold md:text-5xl">
            درباره PARNA
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-[var(--color-muted)] md:text-base">
            استایل زیبا از انتخاب‌های ساده شروع می‌شود.
            ما در PARNA به دنبال ترکیب راحتی، کیفیت و زیبایی در پوشاک روزمره هستیم.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl bg-[var(--color-surface)]">
          <div className="grid items-center md:grid-cols-2">
            <div className="p-7 md:p-10">
              <h2 className="mb-5 text-2xl font-bold">
                داستان ما
              </h2>
              <p className="text-sm leading-8 text-[var(--color-muted)]">
                PARNA با یک ایده ساده شکل گرفت؛ فراهم کردن تجربه‌ای آسان
                برای انتخاب و خرید پوشاکی که در عین سادگی، زیبا و کاربردی
                باشند.
                <br /><br />
                ما تلاش می‌کنیم محصولاتی را ارائه دهیم که با سبک زندگی
                روزمره هماهنگ باشند و حس خوبی از انتخاب و استفاده ایجاد کنند.
              </p>
            </div>

            <div className="flex min-h-72 items-center justify-center bg-[#E8E0D8] p-8">
              <span className="text-5xl font-semibold tracking-[0.25em] text-[#7A1F2B]">
                PARNA
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-5 py-14 sm:grid-cols-3">
          {[
            {
              title: "کیفیت",
              description: "توجه به کیفیت و جزئیات محصولات",
            },
            {
              title: "راحتی",
              description: "انتخاب‌هایی متناسب با استفاده روزمره",
            },
            {
              title: "سادگی",
              description: "تجربه خریدی آسان و دلنشین",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-[var(--color-border)] p-6 text-center"
            >
              <h3 className="mb-3 font-bold">{item.title}</h3>
              <p className="text-sm leading-7 text-[var(--color-muted)]">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="rounded-xl bg-[var(--color-primary)] px-6 py-10 text-center text-white">
          <h2 className="text-xl font-bold">انتخاب بعدی شما منتظر شماست</h2>
          <p className="mt-3 text-sm text-white/80">
            مجموعه محصولات PARNA را مشاهده کنید.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex rounded-lg bg-white px-7 py-3 text-sm font-semibold text-[var(--color-primary)] transition hover:bg-white/90"
          >
            مشاهده فروشگاه
          </Link>
        </div>
      </div>
    </main>
  );
}
