
"use client";

import { useState } from "react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <main className="container py-14 md:py-20">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <span className="text-xs font-medium tracking-widest text-[var(--color-primary)]">
            CONTACT US
          </span>
          <h1 className="mt-4 text-3xl font-bold md:text-4xl">
            تماس با ما
          </h1>
          <p className="mt-4 text-sm text-[var(--color-muted)]">
            برای پرسش، پیشنهاد یا پیگیری سفارش با ما در ارتباط باشید.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-2xl bg-[var(--color-primary)] p-7 text-white md:p-9">
            <h2 className="mb-7 text-xl font-bold">راه‌های ارتباطی</h2>

            <div className="space-y-7 text-sm">
              <div>
                <p className="mb-2 text-white/60">شماره تماس</p>
                <p dir="ltr" className="text-right">09120000000</p>
              </div>

              <div>
                <p className="mb-2 text-white/60">ایمیل</p>
                <p>info@example.com</p>
              </div>

              <div>
                <p className="mb-2 text-white/60">اینستاگرام</p>
                <p dir="ltr" className="text-right">@parna.example</p>
              </div>

              <div>
                <p className="mb-2 text-white/60">آدرس</p>
                <p className="leading-8">
                  قم، خیابان نمونه، مجتمع تجاری نمونه، طبقه دوم
                </p>
              </div>

              <div>
                <p className="mb-2 text-white/60">ساعات پاسخ‌گویی</p>
                <p>شنبه تا پنجشنبه، ۹ تا ۱۸</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6 md:p-9">
            <h2 className="mb-6 text-xl font-bold">ارسال پیام</h2>

            {submitted ? (
              <div className="rounded-lg bg-green-50 p-5 text-sm leading-7 text-green-700">
                پیام شما به‌صورت آزمایشی ثبت شد. در نسخه فعلی پیام به سرور
                ارسال نمی‌شود.
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-3 block font-semibold underline"
                >
                  ارسال پیام جدید
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {[
                  { name: "name", label: "نام و نام خانوادگی", type: "text" },
                  { name: "email", label: "ایمیل", type: "email" },
                  { name: "subject", label: "موضوع پیام", type: "text" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className="mb-2 block text-sm font-medium">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name as keyof typeof form]}
                      onChange={(event) =>
                        setForm({ ...form, [field.name]: event.target.value })
                      }
                      required
                      className="h-12 w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] px-4 text-sm outline-none transition focus:border-[var(--color-primary)]"
                    />
                  </div>
                ))}

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    متن پیام
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={(event) =>
                      setForm({ ...form, message: event.target.value })
                    }
                    required
                    rows={5}
                    className="w-full resize-none rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] p-4 text-sm outline-none transition focus:border-[var(--color-primary)]"
                  />
                </div>

                <button
                  type="submit"
                  className="h-12 w-full rounded-lg bg-[var(--color-primary)] text-sm font-semibold text-white transition hover:bg-[var(--color-primary-hover)]"
                >
                  ارسال پیام
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
