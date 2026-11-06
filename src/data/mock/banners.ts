export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  isActive: boolean;
}

export const banners: Banner[] = [
  {
    id: "banner-1",
    title: "استایل متفاوت",
    subtitle: "انتخاب‌های جدید",
    description: "مجموعه‌ای از محصولات منتخب برای سلیقه خاص شما",
    image: "/parna-assets/banner-footer.png",
    buttonText: "مشاهده محصولات",
    buttonLink: "/shop",
    isActive: true,
  },
];