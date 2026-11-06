
"use client";

import { useEffect, useState } from "react";
import { ImagePlus } from "lucide-react";

import type { Category } from "@/types/category";
import { Modal } from "@/components/ui/modal";

interface CategoryFormProps {
  open: boolean;
  category: Category | null;
  categories: Category[];
  onClose: () => void;
  onSubmit: (category: Category) => void;
}

export function CategoryForm({
  open,
  category,
  categories,
  onClose,
  onSubmit,
}: CategoryFormProps) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;

    setName(category?.name ?? "");
    setSlug(category?.slug ?? "");
    setDescription(category?.description ?? "");
    setImage(category?.image ?? "");
    setIsActive(category?.isActive ?? true);
    setError("");
  }, [open, category]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    const normalizedSlug = slug.trim().toLowerCase();

    if (!name.trim() || !normalizedSlug) {
      setError("نام و شناسه دسته‌بندی الزامی هستند.");
      return;
    }

    const duplicateSlug = categories.some(
      (item) =>
        item.slug.toLowerCase() === normalizedSlug &&
        item.id !== category?.id
    );

    if (duplicateSlug) {
      setError("این شناسه قبلاً برای دسته‌بندی دیگری ثبت شده است.");
      return;
    }

    onSubmit({
      id: category?.id ?? `cat-${Date.now()}`,
      name: name.trim(),
      slug: normalizedSlug,
      description: description.trim(),
      image: image.trim(),
      isActive,
    });
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={category ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی جدید"}
      description={
        category
          ? "اطلاعات دسته‌بندی را ویرایش کنید."
          : "اطلاعات دسته‌بندی جدید را وارد کنید."
      }
      size="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium">
              نام دسته‌بندی
            </label>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="مثلاً لباس مردانه"
              className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              شناسه (Slug)
            </label>
            <input
              dir="ltr"
              value={slug}
              onChange={(event) => setSlug(event.target.value)}
              placeholder="men"
              className="h-11 w-full rounded-lg border border-border bg-background px-3 text-left text-sm outline-none focus:border-primary"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            توضیحات
          </label>
          <textarea
            rows={3}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="توضیح کوتاهی درباره این دسته‌بندی..."
            className="w-full resize-none rounded-lg border border-border bg-background p-3 text-sm outline-none focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium">
            آدرس تصویر
          </label>
          <div className="relative">
            <ImagePlus
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted"
            />
            <input
              dir="ltr"
              value={image}
              onChange={(event) => setImage(event.target.value)}
              placeholder="/parna-assets/men.png"
              className="h-11 w-full rounded-lg border border-border bg-background pr-10 pl-3 text-left text-sm outline-none focus:border-primary"
            />
          </div>

          {image && (
            <div className="mt-3 flex items-center gap-3">
              <div className="h-16 w-16 overflow-hidden rounded-lg border border-border bg-background">
                <img
                  src={image}
                  alt="پیش‌نمایش دسته‌بندی"
                  className="h-full w-full object-cover"
                />
              </div>
              <span className="text-xs text-muted">
                پیش‌نمایش تصویر
              </span>
            </div>
          )}
        </div>

        <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-background p-3">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(event) => setIsActive(event.target.checked)}
            className="h-4 w-4 accent-primary"
          />
          <span className="text-sm">دسته‌بندی فعال باشد</span>
        </label>

        {error && (
          <p className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-3 border-t border-border pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-border px-5 py-2.5 text-sm transition hover:bg-background"
          >
            انصراف
          </button>

          <button
            type="submit"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm text-white transition hover:bg-primary-hover"
          >
            {category ? "ذخیره تغییرات" : "افزودن دسته‌بندی"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
