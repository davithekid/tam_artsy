import { notFound } from "next/navigation";
import { variablesItems } from "@/lib/variables";
import ProductOverview from "@/components/features/overview";

export default async function VariablePage({ params }) {
  const { slug } = await params;

  const variable = variablesItems.find((p) => p.slug === slug);

  if (!variable) return notFound();

  return (
    <main className="py-16">
      <ProductOverview product={variable} />
    </main>
  );
}