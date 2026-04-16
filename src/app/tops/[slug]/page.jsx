import { notFound } from "next/navigation";
import { tops } from "@/lib/tops";
import ProductOverview from "@/components/features/overview";

export default async function TopPage({ params }) {
  const { slug } = await params;

  const top = tops.find(
    (p) => p.slug === slug && p.category === "tops"
  );

  if (!top) return notFound();

  return (
    <main className="py-16">
      <ProductOverview product={top} />
    </main>
  );
}