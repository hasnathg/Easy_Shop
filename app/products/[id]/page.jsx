import Link from "next/link";
import { headers } from "next/headers";
import ImageWithFallback from "@/components/ImageWithFallback";

async function getProduct(id) {
  const h = await headers();            //  await headers()
  const host = h.get("host");
  const protocol = process.env.VERCEL ? "https" : "http";
  const res = await fetch(`${protocol}://${host}/api/products/${id}`, { cache: "no-store" });
  if (!res.ok) return null;
  return res.json();
}

export async function generateMetadata({ params }) {
  const { id } = await params;          //  await params
  const product = await getProduct(id);
  return {
    title: product ? `${product.name} • Easy Shop` : "Product • Easy Shop",
  };
}

export default async function ProductDetails({ params }) {
  const { id } = await params;          //  await params
  const product = await getProduct(id);

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
      <p className="mt-4 text-2xl font-extrabold">£{Number(product.price).toFixed(2)}</p>

      {product.imageUrl ? (
        <ImageWithFallback
          src={product.imageUrl}
          alt={product.name}
          className="mt-8 max-h-[480px] w-full object-contain rounded bg-gray-100"
        />
      ) : (
        <div className="mt-8 h-72 w-full rounded bg-gray-100 grid place-items-center">
          <span className="text-gray-500">No image</span>
        </div>
      )}
    </main>
  );
}
