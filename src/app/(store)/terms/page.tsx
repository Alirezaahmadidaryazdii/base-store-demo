
const sections = [
  {
    title: "۱. شرایط عمومی",
    content:
      "استفاده از وب‌سایت PARNA به معنی پذیرش شرایط و مقررات درج‌شده در این صفحه است. کاربران موظف‌اند هنگام استفاده از خدمات، اطلاعات صحیح و معتبر ارائه دهند.",
  },
  {
    title: "۲. ثبت سفارش",
    content:
      "ثبت سفارش از طریق وب‌سایت انجام می‌شود. پس از ثبت سفارش، اطلاعات آن برای بررسی و پردازش آماده خواهد شد. ثبت سفارش به‌تنهایی به معنی تأیید نهایی موجودی یا ارسال کالا نیست.",
  },
  {
    title: "۳. قیمت و پرداخت",
    content:
      "قیمت محصولات در زمان ثبت سفارش ملاک محاسبه است. هزینه‌های جانبی مانند ارسال، در صورت وجود، پیش از نهایی‌سازی سفارش به مشتری نمایش داده می‌شوند.",
  },
  {
    title: "۴. ارسال سفارش",
    content:
      "سفارش‌ها به آدرس ثبت‌شده توسط مشتری ارسال می‌شوند. زمان تحویل با توجه به روش ارسال و مقصد متفاوت است. مسئولیت وارد کردن صحیح آدرس و شماره تماس بر عهده مشتری است.",
  },
  {
    title: "۵. لغو و مرجوعی",
    content:
      "شرایط لغو سفارش و مرجوعی کالا باید پیش از خرید در اختیار مشتری قرار گیرد. جزئیات نهایی این سیاست با توجه به نوع محصول، وضعیت کالا و قوانین جاری تعیین خواهد شد.",
  },
  {
    title: "۶. حفظ اطلاعات کاربران",
    content:
      "اطلاعات کاربران صرفاً برای ارائه خدمات، پردازش سفارش‌ها و ارتباط با مشتریان استفاده می‌شود. PARNA متعهد است در نگهداری اطلاعات کاربران دقت لازم را به کار گیرد.",
  },
  {
    title: "۷. حقوق مالکیت معنوی",
    content:
      "تمامی محتوای منتشرشده در وب‌سایت، از جمله متن‌ها، تصاویر، طراحی و نشان تجاری PARNA، متعلق به این مجموعه است و استفاده از آن بدون کسب اجازه مجاز نیست.",
  },
  {
    title: "۸. تغییر قوانین",
    content:
      "PARNA می‌تواند در صورت نیاز، مفاد این صفحه را به‌روزرسانی کند. نسخه جدید پس از انتشار در همین صفحه قابل مشاهده خواهد بود.",
  },
];

export default function TermsPage() {
  return (
    <main className="container py-14 md:py-20">
      <div className="mx-auto max-w-3xl">
        <div className="mb-12 text-center">
          <span className="text-xs font-medium tracking-widest text-[var(--color-primary)]">
            TERMS & CONDITIONS
          </span>
          <h1 className="mt-4 text-3xl font-bold md:text-4xl">
            قوانین و مقررات
          </h1>
          <p className="mt-4 text-sm text-[var(--color-muted)]">
            شرایط استفاده از خدمات و خرید از فروشگاه PARNA
          </p>
        </div>

        <div className="mb-8 rounded-xl bg-[var(--color-surface)] p-5 text-sm leading-8 text-[var(--color-muted)]">
          لطفاً پیش از ثبت سفارش، قوانین و مقررات فروشگاه را مطالعه کنید.
          استفاده از خدمات سایت به منزله پذیرش شرایط اعلام‌شده خواهد بود.
        </div>

        <div className="space-y-8">
          {sections.map((section) => (
            <section
              key={section.title}
              className="border-b border-[var(--color-border)] pb-7"
            >
              <h2 className="mb-3 text-lg font-bold">
                {section.title}
              </h2>
              <p className="text-sm leading-8 text-[var(--color-muted)]">
                {section.content}
              </p>
            </section>
          ))}
        </div>

        <p className="mt-10 text-xs text-[var(--color-muted)]">
          آخرین به‌روزرسانی: آبان ۱۴۰۵
        </p>
      </div>
    </main>
  );
}
