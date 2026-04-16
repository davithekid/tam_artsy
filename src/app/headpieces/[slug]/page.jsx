import { notFound } from "next/navigation";
import { headpieces } from "@/lib/headpieces";
import ProductOverview from "@/components/features/overview";

export default async function HeadpiecePage({ params }) {
  const { slug } = await params;


  const headpiece = headpieces.find(
    (p) => p.slug === slug && p.category === "headpieces"
  );

  if (!headpiece) return notFound();

  return (
    <main className="py-16">
      <ProductOverview product={headpiece} />
    </main>
  );
}