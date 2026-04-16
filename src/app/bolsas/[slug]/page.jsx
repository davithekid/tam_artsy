import { notFound } from "next/navigation";
import { products } from "@/lib/products";
import ProductOverview from "@/components/features/overview";

export default async function BolsaPage({ params }) {
  const { slug } = await params;


  const product = products.find(
    (p) => p.slug === slug && p.category === "bolsas"
  );

  if (!product) return notFound();

  return (
    <main className="py-16">
      <ProductOverview product={product} />
    </main>
  );
}