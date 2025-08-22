import Hero from "@/components/Hero";
import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";

export default function Home() {
  return (
   <main className="mx-auto max-w-6xl">
      <Hero />
<section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-12 text-black">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl font-bold">Popular Products</h2>
            <Link href="/products" className="text-sm underline">See all</Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3 text-black bg-gray-50">
            {products.slice(0, 3).map((p) => (
              <div key={p.id} className="rounded border border-gray-200 bg=gray-50 p-6 shadow-sm">
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className="mt-2 text-gray-600">{p.description}</p>
                <p className="mt-3 text-xl font-bold">£{p.price.toFixed(2)}</p>

                <div className="mt-5 flex gap-3">
                  <Link
                    href={`/products/${p.id}`}
                    className="inline-block rounded bg-black text-white px-4 py-2 text-sm"
                  >
                    Details
                  </Link>
                  <Link
                    href="/products"
                    className="inline-block rounded border px-4 py-2 text-sm"
                  >
                    Browse More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
