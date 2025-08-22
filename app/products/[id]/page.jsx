import Link from "next/link";
import { products } from "@/data/products";

// Make this async and await params
export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);
  return {
    title: product ? `${product.name} • Easy Shop` : "Product • Easy Shop",
  };
}

// Make the page async and await params
export default async function ProductDetails({ params }) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Link href="/products" className="underline">Back to products</Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <Link href="/products" className="underline text-sm">← Back to products</Link>

      <h1 className="mt-4 text-3xl font-bold">{product.name}</h1>
      <p className="mt-2 text-gray-600">{product.description}</p>
      <p className="mt-4 text-2xl font-extrabold">£{product.price.toFixed(2)}</p>

      <div className="mt-8 h-64 w-full rounded bg-gray-100 grid place-items-center">
        <span className="text-gray-500">Product image</span>
      </div>
    </main>
  );
}
