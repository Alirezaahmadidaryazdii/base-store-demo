import type { Category } from "@/types/category";

export const categories: Category[] = [
  {
    id: "cat-1",
    name: "لباس مردانه",
    slug: "men",
    description: "جدیدترین پوشاک مردانه",
    image: "/parna-assets/men.png",
    isActive: true,
  },
  {
    id: "cat-2",
    name: "لباس زنانه",
    slug: "women",
    description: "استایل روزمره و خاص",
    image: "/parna-assets/accesory.png",
    isActive: true,
  },
  {
    id: "cat-3",
    name: "اکسسوری",
    slug: "accessories",
    description: "جزئیات تکمیل‌کننده استایل",
    image: "/parna-assets/women.jpg",
    isActive: true,
  },
  {
    id: "cat-4",
    name: "کفش",
    slug: "shoes",
    description: "کفش‌های روزمره و رسمی",
    image: "/parna-assets/shoes.jpg",
    isActive: true,
  },
];