import { notFound } from "next/navigation";
import { unissexs } from "@/lib/unissex";
import ProductOverview from "@/components/features/overview";

export default async function UnissexPage({ params }) {
  const { slug } = await params;


  const unissex = unissexs.find(
    (p) => p.slug === slug && p.category === "unissex"
  );

  if (!unissex) return notFound();

  return (
    <main className="py-16">
      <ProductOverview product={unissex} />
    </main>
  );
}