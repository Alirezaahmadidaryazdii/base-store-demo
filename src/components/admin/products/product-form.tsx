"use client";

import { useEffect, useState } from "react";
import type { Product, ProductVariant } from "@/types/product";
import type { Category } from "@/types/category";
import { CustomSelect } from "@/components/ui/custom-select";
import { Modal } from "@/components/ui/modal";
import { Plus, Trash2 } from "lucide-react";

export type ProductFormData = Omit<Product, "id" | "createdAt">;

interface ProductFormProps {
  product?: Product | null;
  categories: Category[];
  onSubmit: (data: ProductFormData) => void;
  onClose: () => void;
}

type VariantFormData = Omit<ProductVariant, "id"> & { id?: string };

const emptyVariant: VariantFormData = {
  size: "",
  color: "",
  colorCode: "#000000",
  price: 0,
  stock: 0,
  sku: "",
};

export function ProductForm({
  product,
  categories,
  onSubmit,
  onClose,
}: ProductFormProps) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [price, setPrice] = useState("0");
  const [compareAtPrice, setCompareAtPrice] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [tags, setTags] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [isActive, setIsActive] = useState(true);
  const [variants, setVariants] = useState<VariantFormData[]>([
    { ...emptyVariant },
  ]);

  useEffect(() => {
    if (product) {
      setName(product.name);
      setSlug(product.slug);
      setDescription(product.description);
      setCategoryId(product.categoryId);
      setPrice(String(product.price));
      setCompareAtPrice(
        product.compareAtPrice !== undefined
          ? String(product.compareAtPrice)
          : ""
      );
      setThumbnail(product.thumbnail);
      setTags(product.tags.join(", "));
      setIsFeatured(product.isFeatured);
      setIsActive(product.isActive);
      setVariants(
        product.variants.length
          ? product.variants.map((variant) => ({ ...variant }))
          : [{ ...emptyVariant }]
      );
    } else {
      resetForm();
    }
  }, [product]);

  function resetForm() {
    setName("");
    setSlug("");
    setDescription("");
    setCategoryId(categories.find((category) => category.isActive)?.id ?? "");
    setPrice("0");
    setCompareAtPrice("");
    setThumbnail("");
    setTags("");
    setIsFeatured(false);
    setIsActive(true);
    setVariants([{ ...emptyVariant }]);
  }

  function updateVariant(
    index: number,
    field: keyof VariantFormData,
    value: string | number
  ) {
    setVariants((current) =>
      current.map((variant, variantIndex) =>
        variantIndex === index
          ? { ...variant, [field]: value }
          : variant
      )
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedVariants: ProductVariant[] = variants.map(
      (variant, index) => ({
        id: variant.id ?? `variant-${Date.now()}-${index}`,
        size: variant.size || undefined,
        color: variant.color || undefined,
        colorCode: variant.colorCode || undefined,
        price: Number(variant.price),
        stock: Number(variant.stock),
        sku: variant.sku.trim(),
      })
    );

    onSubmit({
      name: name.trim(),
      slug: slug.trim(),
      description: description.trim(),
      categoryId,
      price: Number(price),
      compareAtPrice: compareAtPrice ? Number(compareAtPrice) : undefined,
      thumbnail: thumbnail.trim(),
      images: [
        {
          id: product?.images[0]?.id ?? `image-${Date.now()}`,
          url: thumbnail.trim(),
          alt: name.trim(),
        },
      ],
      variants: normalizedVariants,
      tags: tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      isFeatured,
      isActive,
    });
  }

  const inputClass =
    "mt-2 h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition focus:border-primary";

  const labelClass = "block text-sm font-medium text-foreground";

  return (
    <Modal
      open
      title={product ? "ویرایش محصول" : "افزودن محصول جدید"}
      description="اطلاعات محصول و تنوع‌های آن را وارد کنید."
      onClose={onClose}
      size="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="grid gap-4 sm:grid-cols-2">
          <label className={labelClass}>
            نام محصول
            <input
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={inputClass}
              placeholder="مثلاً تیشرت اورسایز"
            />
          </label>

          <label className={labelClass}>
            شناسه آدرس (Slug)
            <input
              required
              dir="ltr"
              value={slug}
              onChange={(event) => setSlug(event.target.value)}
              className={inputClass}
              placeholder="oversized-tshirt"
            />
          </label>

          <div className={labelClass}>
            دسته‌بندی
            <CustomSelect
              value={categoryId}
              onChange={setCategoryId}
              placeholder="انتخاب دسته‌بندی"
              options={categories
                .filter((category) => category.isActive)
                .map((category) => ({
                  label: category.name,
                  value: category.id,
                }))}
              className="mt-2"
            />
          </div>

          <label className={labelClass}>
            قیمت (تومان)
            <input
              required
              min="0"
              type="number"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              className={inputClass}
            />
          </label>

          <label className={labelClass}>
            قیمت قبل از تخفیف
            <input
              min="0"
              type="number"
              value={compareAtPrice}
              onChange={(event) => setCompareAtPrice(event.target.value)}
              className={inputClass}
            />
          </label>

          <label className={labelClass}>
            آدرس تصویر اصلی
            <input
              required
              dir="ltr"
              value={thumbnail}
              onChange={(event) => setThumbnail(event.target.value)}
              className={inputClass}
              placeholder="/parna-assets/product.jpg"
            />
          </label>

          <label className={`${labelClass} sm:col-span-2`}>
            توضیحات
            <textarea
              required
              rows={3}
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              className="mt-2 w-full rounded-lg border border-border bg-background p-3 text-sm outline-none transition focus:border-primary"
              placeholder="توضیحات محصول..."
            />
          </label>

          <label className={`${labelClass} sm:col-span-2`}>
            برچسب‌ها
            <input
              value={tags}
              onChange={(event) => setTags(event.target.value)}
              className={inputClass}
              placeholder="جدید، پرفروش، تابستانی"
            />
            <span className="mt-1 block text-xs font-normal text-muted">
              برچسب‌ها را با کاما جدا کنید.
            </span>
          </label>
        </section>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground">
              تنوع‌های محصول
            </h3>

            <button
              type="button"
              onClick={() =>
                setVariants((current) => [
                  ...current,
                  { ...emptyVariant, price: Number(price) },
                ])
              }
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover"
            >
              <Plus size={16} />
              افزودن تنوع
            </button>
          </div>

          {variants.map((variant, index) => (
            <div
              key={variant.id ?? index}
              className="rounded-xl border border-border bg-surface p-4"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  تنوع {index + 1}
                </span>

                {variants.length > 1 && (
                  <button
                    type="button"
                    onClick={() =>
                      setVariants((current) =>
                        current.filter((_, itemIndex) => itemIndex !== index)
                      )
                    }
                    className="text-muted transition hover:text-red-600"
                    aria-label="حذف تنوع"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <label className={labelClass}>
                  سایز
                  <input
                    value={variant.size ?? ""}
                    onChange={(event) =>
                      updateVariant(index, "size", event.target.value)
                    }
                    className={inputClass}
                    placeholder="مثلاً L"
                  />
                </label>

                <label className={labelClass}>
                  رنگ
                  <input
                    value={variant.color ?? ""}
                    onChange={(event) =>
                      updateVariant(index, "color", event.target.value)
                    }
                    className={inputClass}
                    placeholder="مثلاً مشکی"
                  />
                </label>

                <label className={labelClass}>
                  کد رنگ
                  <input
                    type="color"
                    value={variant.colorCode || "#000000"}
                    onChange={(event) =>
                      updateVariant(index, "colorCode", event.target.value)
                    }
                    className="mt-2 h-11 w-full cursor-pointer rounded-lg border border-border bg-background p-1"
                  />
                </label>

                <label className={labelClass}>
                  قیمت تنوع
                  <input
                    required
                    min="0"
                    type="number"
                    value={variant.price}
                    onChange={(event) =>
                      updateVariant(index, "price", Number(event.target.value))
                    }
                    className={inputClass}
                  />
                </label>

                <label className={labelClass}>
                  موجودی
                  <input
                    required
                    min="0"
                    type="number"
                    value={variant.stock}
                    onChange={(event) =>
                      updateVariant(index, "stock", Number(event.target.value))
                    }
                    className={inputClass}
                  />
                </label>

                <label className={labelClass}>
                  کد محصول (SKU)
                  <input
                    required
                    value={variant.sku}
                    onChange={(event) =>
                      updateVariant(index, "sku", event.target.value)
                    }
                    className={inputClass}
                    placeholder="PRN-001"
                  />
                </label>
              </div>
            </div>
          ))}
        </section>

        <section className="flex flex-wrap gap-5">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(event) => setIsFeatured(event.target.checked)}
              className="h-4 w-4 accent-primary"
            />
            محصول ویژه
          </label>

          <label className="flex cursor-pointer items-center gap-2 text-sm text-foreground">
            <input
              type="checkbox"
              checked={isActive}
              onChange={(event) => setIsActive(event.target.checked)}
              className="h-4 w-4 accent-primary"
            />
            محصول فعال باشد
          </label>
        </section>

        <div className="flex justify-end gap-3 border-t border-border pt-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground transition hover:bg-surface"
          >
            انصراف
          </button>

          <button
            type="submit"
            className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-primary-hover"
          >
            {product ? "ذخیره تغییرات" : "ثبت محصول"}
          </button>
        </div>
      </form>
    </Modal>
  );
}