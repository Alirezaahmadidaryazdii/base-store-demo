
import { HeroSection } from "@/components/home/hero-section";
import { CategorySection } from "@/components/home/category-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { PromotionalBanner } from "@/components/home/promotional-banner";
import { NewsletterSection } from "@/components/home/newsletter-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <CategorySection />

      <FeaturedProducts />

      <PromotionalBanner />

      <NewsletterSection />
    </>
  );
}
