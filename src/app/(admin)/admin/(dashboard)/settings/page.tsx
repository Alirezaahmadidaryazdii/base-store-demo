
"use client";

import { useEffect, useState } from "react";
import {
  Settings,
  Store,
  Phone,
  Share2,
  Truck,
  CreditCard,
  FileText,
  Save,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

import type { StoreSettings } from "@/types/settings";
import {
  settingsService,
  defaultSettings,
} from "@/services/settings.service";

type SettingsTab =
  | "general"
  | "contact"
  | "social"
  | "shipping"
  | "payment"
  | "policies";

const tabs: {
  id: SettingsTab;
  label: string;
  icon: React.ReactNode;
}[] = [
  { id: "general", label: "عمومی", icon: <Store size={18} /> },
  { id: "contact", label: "اطلاعات تماس", icon: <Phone size={18} /> },
  { id: "social", label: "شبکه‌های اجتماعی", icon: <Share2 size={18} /> },
  { id: "shipping", label: "ارسال", icon: <Truck size={18} /> },
  { id: "payment", label: "پرداخت", icon: <CreditCard size={18} /> },
  { id: "policies", label: "قوانین", icon: <FileText size={18} /> },
];

const inputClass =
  "h-11 w-full rounded-lg border border-border bg-background px-4 text-sm outline-none transition placeholder:text-muted focus:border-primary";

const textareaClass =
  "min-h-28 w-full resize-y rounded-lg border border-border bg-background p-4 text-sm outline-none transition placeholder:text-muted focus:border-primary";

interface FieldProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "email" | "tel" | "url" | "number";
  dir?: "rtl" | "ltr";
  hint?: string;
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  dir,
  hint,
}: FieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">{label}</label>
      <input
        type={type}
        value={value}
        dir={dir}
        min={type === "number" ? 0 : undefined}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={inputClass}
      />
      {hint && <p className="text-xs text-muted">{hint}</p>}
    </div>
  );
}

interface TextareaFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function TextareaField({
  label,
  value,
  onChange,
  placeholder,
}: TextareaFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">{label}</label>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={textareaClass}
      />
    </div>
  );
}

interface ToggleProps {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function Toggle({
  title,
  description,
  checked,
  onChange,
}: ToggleProps) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-background p-4">
      <div className="min-w-0">
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-1 text-xs leading-5 text-muted">
          {description}
        </p>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked ? "bg-primary" : "bg-border"
        }`}
      >
        <span
          className={`absolute top-1 size-4 rounded-full bg-white transition-all ${
            checked ? "right-1" : "right-6"
          }`}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<StoreSettings>(defaultSettings);
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setSettings(settingsService.get());
  }, []);

  const updateSection = <K extends keyof StoreSettings>(
    section: K,
    updates: Partial<StoreSettings[K]>
  ) => {
    setSettings((previous) => ({
      ...previous,
      [section]: {
        ...previous[section],
        ...updates,
      },
    }));

    setSaved(false);
  };

  const handleSave = () => {
    settingsService.save(settings);
    setSaved(true);
  };

  const handleReset = () => {
    const confirmed = window.confirm(
      "تمام تنظیمات به مقادیر پیش‌فرض برگردند؟"
    );

    if (!confirmed) return;

    const defaults = settingsService.reset();
    setSettings(defaults);
    setSaved(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "general":
        return (
          <div className="space-y-5">
            <div>
              <h2 className="font-semibold">تنظیمات عمومی</h2>
              <p className="mt-1 text-sm text-muted">
                اطلاعات اصلی و هویت فروشگاه را مدیریت کنید.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="نام فروشگاه"
                value={settings.general.name}
                onChange={(value) =>
                  updateSection("general", { name: value })
                }
                placeholder="نام فروشگاه"
              />

              <Field
                label="عنوان سایت"
                value={settings.general.title}
                onChange={(value) =>
                  updateSection("general", { title: value })
                }
                placeholder="عنوان سایت"
              />
            </div>

            <TextareaField
              label="توضیحات فروشگاه"
              value={settings.general.description}
              onChange={(value) =>
                updateSection("general", { description: value })
              }
              placeholder="توضیح کوتاهی درباره فروشگاه..."
            />

            <Field
              label="آدرس لوگو"
              value={settings.general.logo}
              onChange={(value) =>
                updateSection("general", { logo: value })
              }
              placeholder="/parna-assets/logo.png"
              dir="ltr"
              hint="آدرس تصویر لوگو را وارد کنید."
            />
          </div>
        );

      case "contact":
        return (
          <div className="space-y-5">
            <div>
              <h2 className="font-semibold">اطلاعات تماس</h2>
              <p className="mt-1 text-sm text-muted">
                راه‌های ارتباط مشتریان با فروشگاه.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="شماره تماس"
                value={settings.contact.phone}
                onChange={(value) =>
                  updateSection("contact", { phone: value })
                }
                placeholder="09123456789"
                type="tel"
                dir="ltr"
              />

              <Field
                label="ایمیل"
                value={settings.contact.email}
                onChange={(value) =>
                  updateSection("contact", { email: value })
                }
                placeholder="info@example.com"
                type="email"
                dir="ltr"
              />
            </div>

            <TextareaField
              label="آدرس فروشگاه"
              value={settings.contact.address}
              onChange={(value) =>
                updateSection("contact", { address: value })
              }
              placeholder="آدرس کامل فروشگاه..."
            />
          </div>
        );

      case "social":
        return (
          <div className="space-y-5">
            <div>
              <h2 className="font-semibold">شبکه‌های اجتماعی</h2>
              <p className="mt-1 text-sm text-muted">
                لینک صفحات رسمی فروشگاه را وارد کنید.
              </p>
            </div>

            <Field
              label="اینستاگرام"
              value={settings.social.instagram}
              onChange={(value) =>
                updateSection("social", { instagram: value })
              }
              placeholder="https://instagram.com/..."
              type="url"
              dir="ltr"
            />

            <Field
              label="تلگرام"
              value={settings.social.telegram}
              onChange={(value) =>
                updateSection("social", { telegram: value })
              }
              placeholder="https://t.me/..."
              type="url"
              dir="ltr"
            />
          </div>
        );

      case "shipping":
        return (
          <div className="space-y-5">
            <div>
              <h2 className="font-semibold">تنظیمات ارسال</h2>
              <p className="mt-1 text-sm text-muted">
                هزینه ارسال و شرایط ارسال رایگان را مشخص کنید.
              </p>
            </div>

            <Field
              label="هزینه ارسال"
              value={settings.shipping.cost}
              onChange={(value) =>
                updateSection("shipping", {
                  cost: Math.max(0, Number(value) || 0),
                })
              }
              type="number"
              hint="مبلغ به تومان وارد شود."
            />

            <Toggle
              title="فعال‌سازی ارسال رایگان"
              description="امکان ارسال رایگان برای سفارش‌های واجد شرایط"
              checked={settings.shipping.freeShippingEnabled}
              onChange={(checked) =>
                updateSection("shipping", {
                  freeShippingEnabled: checked,
                })
              }
            />

            {settings.shipping.freeShippingEnabled && (
              <Field
                label="حداقل مبلغ سفارش برای ارسال رایگان"
                value={settings.shipping.freeShippingMinimum}
                onChange={(value) =>
                  updateSection("shipping", {
                    freeShippingMinimum: Math.max(
                      0,
                      Number(value) || 0
                    ),
                  })
                }
                type="number"
                hint="مبلغ به تومان وارد شود."
              />
            )}
          </div>
        );

      case "payment":
        return (
          <div className="space-y-5">
            <div>
              <h2 className="font-semibold">روش‌های پرداخت</h2>
              <p className="mt-1 text-sm text-muted">
                روش‌های پرداخت قابل استفاده در فروشگاه را مدیریت کنید.
              </p>
            </div>

            <Toggle
              title="پرداخت آنلاین"
              description="پرداخت از طریق درگاه بانکی"
              checked={settings.payment.onlineEnabled}
              onChange={(checked) =>
                updateSection("payment", { onlineEnabled: checked })
              }
            />

            <Toggle
              title="پرداخت در محل"
              description="پرداخت هنگام تحویل سفارش"
              checked={settings.payment.cashOnDeliveryEnabled}
              onChange={(checked) =>
                updateSection("payment", {
                  cashOnDeliveryEnabled: checked,
                })
              }
            />

            <Toggle
              title="کارت به کارت"
              description="پرداخت مستقیم به شماره کارت فروشگاه"
              checked={settings.payment.cardToCardEnabled}
              onChange={(checked) =>
                updateSection("payment", {
                  cardToCardEnabled: checked,
                })
              }
            />

            <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 text-sm leading-7 text-yellow-800">
              این تنظیمات در حال حاضر فقط وضعیت روش‌های پرداخت را ذخیره
              می‌کنند. برای پرداخت واقعی باید درگاه بانکی و اعتبارسنجی
              سمت سرور پیاده‌سازی شود.
            </div>
          </div>
        );

      case "policies":
        return (
          <div className="space-y-5">
            <div>
              <h2 className="font-semibold">قوانین و مقررات</h2>
              <p className="mt-1 text-sm text-muted">
                محتوای صفحات قوانین فروشگاه را مدیریت کنید.
              </p>
            </div>

            <TextareaField
              label="قوانین و مقررات"
              value={settings.policies.terms}
              onChange={(value) =>
                updateSection("policies", { terms: value })
              }
              placeholder="قوانین استفاده از فروشگاه..."
            />

            <TextareaField
              label="شرایط بازگشت کالا"
              value={settings.policies.returns}
              onChange={(value) =>
                updateSection("policies", { returns: value })
              }
              placeholder="شرایط تعویض و بازگشت کالا..."
            />

            <TextareaField
              label="حریم خصوصی"
              value={settings.policies.privacy}
              onChange={(value) =>
                updateSection("policies", { privacy: value })
              }
              placeholder="سیاست حفظ اطلاعات کاربران..."
            />
          </div>
        );
    }
  };

  return (
    <div className="space-y-6 pb-28 lg:pb-0">
      <div>
        <h1 className="text-xl font-bold sm:text-2xl">
          تنظیمات فروشگاه
        </h1>
        <p className="mt-1 text-sm text-muted">
          مدیریت اطلاعات و پیکربندی فروشگاه {settings.general.name}
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[230px_1fr] lg:gap-6">
        <aside className="h-fit min-w-0 rounded-xl border border-border bg-surface p-3">
          <div className="mb-3 flex items-center gap-2 px-3 py-2">
            <Settings size={19} className="shrink-0 text-primary" />
            <span className="font-semibold">بخش‌های تنظیمات</span>
          </div>

          <nav className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:pb-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex min-h-11 shrink-0 items-center gap-2.5 rounded-lg px-3 py-3 text-sm transition lg:w-full lg:gap-3 ${
                  activeTab === tab.id
                    ? "bg-primary text-white"
                    : "text-muted hover:bg-background hover:text-foreground"
                }`}
              >
                {tab.icon}
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        <section className="min-w-0 rounded-xl border border-border bg-surface p-4 sm:p-6">
          {renderContent()}

          <div className="mt-8 hidden border-t border-border pt-5 lg:flex lg:items-center lg:justify-between">
            <button
              type="button"
              onClick={handleReset}
              className="flex h-11 items-center justify-center gap-2 rounded-lg border border-border px-4 text-sm text-muted transition hover:border-red-300 hover:text-red-500"
            >
              <RotateCcw size={16} />
              بازگردانی پیش‌فرض
            </button>

            <div className="flex items-center gap-4">
              {saved && (
                <span className="flex items-center gap-1 text-sm text-green-600">
                  <CheckCircle2 size={17} />
                  تنظیمات ذخیره شد
                </span>
              )}

              <button
                type="button"
                onClick={handleSave}
                className="flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-white transition hover:bg-primary-hover"
              >
                <Save size={17} />
                ذخیره تغییرات
              </button>
            </div>
          </div>
        </section>

        <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border/10 bg-background/95 p-3 pb-[calc(12px+env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleReset}
              aria-label="بازگردانی تنظیمات به حالت پیش‌فرض"
              className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-border text-muted transition hover:border-red-300 hover:text-red-500"
            >
              <RotateCcw size={18} />
            </button>

            <button
              type="button"
              onClick={handleSave}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-white shadow-soft transition hover:bg-primary-hover active:scale-[0.98]"
            >
              <Save size={18} />
              ذخیره تغییرات
            </button>
          </div>

          {saved && (
            <p className="mt-2 flex items-center justify-center gap-1 text-xs text-green-600">
              <CheckCircle2 size={14} />
              تنظیمات ذخیره شد
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
