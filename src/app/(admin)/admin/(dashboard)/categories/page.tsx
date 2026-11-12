
"use client";

import { useEffect, useMemo, useState } from "react";
import { Plus, Folder, CheckCircle2, EyeOff } from "lucide-react";

import type { Category } from "@/types/category";
import { categories as mockCategories } from "@/data/mock/categories";

import { Modal } from "@/components/ui/modal";
import { CategoryFilters } from "@/components/admin/categories/category-filters";
import { CategoriesTable } from "@/components/admin/categories/categories-table";
import { CategoryForm } from "@/components/admin/categories/category-form";

const STORAGE_KEY = "parna-admin-categories";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [isLoaded, setIsLoaded] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const [formOpen, setFormOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<Category | null>(
    null,
  );

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);

      if (saved) {
        const parsed: unknown = JSON.parse(saved);

        if (Array.isArray(parsed)) {
          setCategories(parsed as Category[]);
        }
      }
    } catch {
      console.error("Failed to load categories from localStorage.");
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(categories));
  }, [categories, isLoaded]);

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const searchTerm = search.trim().toLowerCase();

      const matchesSearch =
        !searchTerm ||
        category.name.toLowerCase().includes(searchTerm) ||
        category.slug.toLowerCase().includes(searchTerm);

      const matchesStatus =
        status === "all" ||
        (status === "active" && category.isActive) ||
        (status === "inactive" && !category.isActive);

      return matchesSearch && matchesStatus;
    });
  }, [categories, search, status]);

  const activeCount = categories.filter((category) => category.isActive).length;
  const inactiveCount = categories.length - activeCount;

  function handleAdd() {
    setEditingCategory(null);
    setFormOpen(true);
  }

  function handleEdit(category: Category) {
    setEditingCategory(category);
    setFormOpen(true);
  }

  function handleSave(category: Category) {
    setCategories((current) => {
      const exists = current.some((item) => item.id === category.id);

      if (exists) {
        return current.map((item) =>
          item.id === category.id ? category : item,
        );
      }

      return [category, ...current];
    });

    setFormOpen(false);
    setEditingCategory(null);
  }

  function handleDelete() {
    if (!deletingCategory) return;

    setCategories((current) =>
      current.filter((item) => item.id !== deletingCategory.id),
    );

    setDeletingCategory(null);
  }

  function handleStatusChange(id: string, value: boolean) {
    setCategories((current) =>
      current.map((category) =>
        category.id === id ? { ...category, isActive: value } : category,
      ),
    );
  }

  return (
    <div className="space-y-6 pb-24 lg:pb-0">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-xl font-bold sm:text-2xl">
            مدیریت دسته‌بندی‌ها
          </h1>

          <p className="mt-2 text-sm text-muted">
            دسته‌بندی‌های فروشگاه را مدیریت کنید.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAdd}
          className="hidden h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-white transition hover:bg-primary-hover lg:inline-flex"
        >
          <Plus size={18} />
          افزودن دسته‌بندی
        </button>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-border/10 bg-background/95 p-3 pb-[calc(12px+env(safe-area-inset-bottom))] backdrop-blur lg:hidden">
        <button
          type="button"
          onClick={handleAdd}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-white shadow-soft transition hover:bg-primary-hover active:scale-[0.98]"
        >
          <Plus size={19} />
          افزودن دسته‌بندی جدید
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          title="کل دسته‌بندی‌ها"
          value={categories.length}
          icon={<Folder size={20} />}
        />

        <StatCard
          title="دسته‌بندی‌های فعال"
          value={activeCount}
          icon={<CheckCircle2 size={20} />}
        />

        <StatCard
          title="دسته‌بندی‌های غیرفعال"
          value={inactiveCount}
          icon={<EyeOff size={20} />}
        />
      </div>

      <CategoryFilters
        search={search}
        status={status}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
      />

      <CategoriesTable
        categories={filteredCategories}
        onEdit={handleEdit}
        onDelete={setDeletingCategory}
        onStatusChange={handleStatusChange}
      />

      <CategoryForm
        open={formOpen}
        category={editingCategory}
        categories={categories}
        onClose={() => {
          setFormOpen(false);
          setEditingCategory(null);
        }}
        onSubmit={handleSave}
      />

      <Modal
        open={Boolean(deletingCategory)}
        onClose={() => setDeletingCategory(null)}
        title="حذف دسته‌بندی"
        description="آیا از حذف این دسته‌بندی اطمینان دارید؟"
        size="sm"
      >
        <div className="space-y-5">
          <p className="text-sm leading-7 text-muted">
            دسته‌بندی
            <span className="mx-1 font-semibold text-foreground">
              {deletingCategory?.name}
            </span>
            حذف خواهد شد. این عملیات قابل بازگشت نیست.
          </p>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setDeletingCategory(null)}
              className="rounded-lg border border-border px-5 py-2.5 text-sm transition hover:bg-background"
            >
              انصراف
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="rounded-lg bg-red-600 px-5 py-2.5 text-sm text-white transition hover:bg-red-700"
            >
              حذف دسته‌بندی
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: number;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted">{title}</span>

        <span className="rounded-lg bg-primary/10 p-2 text-primary">
          {icon}
        </span>
      </div>

      <p className="mt-4 text-2xl font-bold tabular-nums">{value}</p>
    </div>
  );
}
