import Hero from "@/components/Hero";
import Link from "next/link";

async function getProducts() {
  const base = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  const res = await fetch(`${base}/api/products`, { cache: "no-store" });
  if (!res.ok) return [];
  const all = await res.json();
  // show newest first, then take top 3
  return all.slice(0, 3);
}

export default async function Home() {
  const popular = await getProducts();

  return (
    <main className="mx-auto max-w-6xl">
      <Hero />

      <section className="bg-gray-50">
        <div className="mx-auto max-w-6xl px-4 py-12 text-black">
          <div className="flex items-end justify-between mb-6">
            <h2 className="text-2xl font-bold">Popular Products</h2>
            <Link href="/products" className="text-sm underline">See all</Link>
          </div>

          {popular.length === 0 ? (
            <p className="text-gray-600">No products yet.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {popular.map((p) => (
                <div key={p._id ?? p.id} className="rounded border border-gray-200 bg-white p-6 shadow-sm flex flex-col">
                  {/* Consistent image slot */}
                  <div className="w-full aspect-[4/3] overflow-hidden rounded bg-gray-100">
                    {p.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.imageUrl} alt={p.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full grid place-items-center text-gray-500 text-sm">No image</div>
                    )}
                  </div>

                  <h3 className="mt-4 text-lg font-semibold">{p.name}</h3>
                  <p
                    className="mt-2 text-gray-600"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {p.description}
                  </p>
                  <p className="mt-3 text-xl font-bold">£{Number(p.price).toFixed(2)}</p>

                  <div className="mt-5 flex gap-3">
                    <Link
                      href={`/products/${p._id ?? p.id}`}
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
          )}
        </div>
      </section>
    </main>
  );
}
