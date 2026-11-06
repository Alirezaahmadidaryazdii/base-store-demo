export const storeConfig = {
  name: "PARNA",
  description: "انتخابی برای استایل، راحتی و جذابیت",
  logo: "/parna-assets/logo.png",

  locale: "fa-IR",
  direction: "rtl",
  currency: "تومان",

  contact: {
    phone: "",
    email: "",
    address: "",
  },

  social: {
    instagram: "https://instagram.com/parnashop.ir",
    telegram: "https://instagram.com/parnashop.ir",
  },

  navigation: [
    { label: "خانه", href: "/" },
    { label: "فروشگاه", href: "/shop" },
    { label: "مردانه", href: "/category/men" },
    { label: "زنانه", href: "/category/women" },
    { label: "اکسسوری", href: "/category/accessories" },
  ],

  footer: {
    copyright: "تمامی حقوق محفوظ است.",
    links: [
      { label: "درباره ما", href: "/about" },
      { label: "تماس با ما", href: "/contact" },
      { label: "قوانین و مقررات", href: "/terms" },
      { label: "سؤالات متداول", href: "/faq" },
    ],
  },

  theme: {
    primary: "#7A1F2B",
    primaryHover: "#641923",
    secondary: "#292624",
    background: "#FAF9F6",
    foreground: "#252220",
    surface: "#F1EFEB",
    accent: "#B49A78",
    muted: "#827B75",
    border: "#E5E0D9",
  },
};
