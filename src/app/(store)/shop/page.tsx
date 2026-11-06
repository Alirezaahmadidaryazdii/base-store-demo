
import Link from "next/link";
import { getProducts } from "@/services/product.service";
import { ShopProducts } from "@/components/product/shop-products";

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <main className="container py-12">
      {/* Products */}
      <ShopProducts products={products} />
    </main>
  );
}
