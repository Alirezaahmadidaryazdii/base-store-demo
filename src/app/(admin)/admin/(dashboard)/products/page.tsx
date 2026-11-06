"use client";

import { useEffect, useMemo, useState } from "react";
import { products as mockProducts } from "@/data/mock/products";
import { categories } from "@/data/mock/categories";
import { ProductFilters } from "@/components/admin/products/product-filters";
import { ProductsTable } from "@/components/admin/products/products-table";
import {
  ProductForm,
  type ProductFormData,
} from "@/components/admin/products/product-form";
import { Modal } from "@/components/ui/modal";
import type { Product } from "@/types/product";
import { storeConfig } from "@/config/store.config";
import { Plus } from "lucide-react";

const STORAGE_KEY = "parna-admin-products";

type ProductStatusFilter = "all" | "active" | "inactive";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  const [search, setSearch] = useState("");
  const [categoryId, setCategoryId] = useState("all");
  const [status, setStatus] = useState<ProductStatusFilter>("all");

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(
    null
  );

  useEffect(() => {
    try {
      const savedProducts = localStorage.getItem(STORAGE_KEY);

      if (savedProducts) {
        const parsedProducts: unknown = JSON.parse(savedProducts);
        setProducts(Array.isArray(parsedProducts) ? parsedProducts as Product[] : mockProducts);
      } else {
        setProducts(mockProducts);
      }
    } catch {
      setProducts(mockProducts);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
  }, [products, isHydrated]);

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return products.filter((product) => {
      const matchesSearch =
        !normalizedSearch ||
        product.name.toLowerCase().includes(normalizedSearch) ||
        product.slug.toLowerCase().includes(normalizedSearch);

      const matchesCategory =
        categoryId === "all" || product.categoryId === categoryId;

      const matchesStatus =
        status === "all" ||
        (status === "active" && product.isActive) ||
        (status === "inactive" && !product.isActive);

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [products, search, categoryId, status]);

  function openCreateForm() {
    setEditingProduct(null);
    setIsFormOpen(true);
  }

  function openEditForm(product: Product) {
    setEditingProduct(product);
    setIsFormOpen(true);
  }

  function closeForm() {
    setIsFormOpen(false);
    setEditingProduct(null);
  }

  function handleSubmit(data: ProductFormData) {
    if (editingProduct) {
      setProducts((current) =>
        current.map((product) =>
          product.id === editingProduct.id
            ? { ...editingProduct, ...data }
            : product
        )
      );
    } else {
      const newProduct: Product = {
        id: `prod-${Date.now()}`,
        createdAt: new Date().toISOString(),
        ...data,
      };

      setProducts((current) => [newProduct, ...current]);
    }

    closeForm();
  }

  function handleDelete() {
    if (!deletingProductId) return;

    setProducts((current) =>
      current.filter((product) => product.id !== deletingProductId)
    );

    setDeletingProductId(null);
  }

  function handleStatusChange(productId: string, value: boolean) {
    setProducts((current) =>
      current.map((product) =>
        product.id === productId
          ? { ...product, isActive: value }
          : product
      )
    );
  }

  const activeCount = products.filter((product) => product.isActive).length;
  const inactiveCount = products.length - activeCount;

  if (!isHydrated) {
    return (
      <div className="flex min-h-64 items-center justify-center text-sm text-muted">
        در حال بارگذاری محصولات...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            مدیریت محصولات
          </h1>
          <p className="mt-2 text-sm text-muted">
            مدیریت محصولات فروشگاه {storeConfig.name}
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateForm}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-medium text-white transition hover:bg-primary-hover"
        >
          <Plus size={17} />
          افزودن محصول
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="text-sm text-muted">کل محصولات</p>
          <p className="mt-2 text-2xl font-bold text-foreground">
            {products.length}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="text-sm text-muted">محصولات فعال</p>
          <p className="mt-2 text-2xl font-bold text-green-700">
            {activeCount}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-surface p-5">
          <p className="text-sm text-muted">محصولات غیرفعال</p>
          <p className="mt-2 text-2xl font-bold text-muted">
            {inactiveCount}
          </p>
        </div>
      </div>

      <ProductFilters
        search={search}
        categoryId={categoryId}
        status={status}
        categories={categories}
        onSearchChange={setSearch}
        onCategoryChange={setCategoryId}
        onStatusChange={setStatus}
      />

      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-foreground">
          فهرست محصولات
        </h2>
        <span className="text-sm text-muted">
          {filteredProducts.length} محصول
        </span>
      </div>

      <ProductsTable
        products={filteredProducts}
        categories={categories}
        onEdit={openEditForm}
        onDelete={setDeletingProductId}
        onStatusChange={handleStatusChange}
      />

      {isFormOpen && (
        <ProductForm
          product={editingProduct}
          categories={categories}
          onSubmit={handleSubmit}
          onClose={closeForm}
        />
      )}

      <Modal
        open={deletingProductId !== null}
        title="حذف محصول"
        description="این عملیات قابل بازگشت نیست."
        onClose={() => setDeletingProductId(null)}
        size="sm"
      >
        <div className="space-y-5">
          <p className="text-sm leading-7 text-foreground">
            آیا از حذف این محصول اطمینان داری؟
          </p>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setDeletingProductId(null)}
              className="rounded-lg border border-border px-4 py-2.5 text-sm transition hover:bg-surface"
            >
              انصراف
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
            >
              حذف محصول
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}