import Link from "next/link";
import { headers } from "next/headers";
import ImageWithFallback from "@/components/ImageWithFallback";

async function getProducts() {
  const h = await headers();            
  const host = h.get("host");
  const protocol = process.env.VERCEL ? "https" : "http";
  const res = await fetch(`${protocol}://${host}/api/products`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}

export const metadata = { title: "Products • Easy Shop" };

export default async function ProductsPage() {
  const items = await getProducts();

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-end justify-between mb-6">
        <h1 className="text-3xl font-bold">All Products</h1>
        <Link href="/" className="underline text-sm">Home</Link>
      </div>

      {items.length === 0 ? (
        <p className="text-gray-600">No products yet.</p>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {items.map((p) => (
            <div key={p._id ?? p.id} className="h-full">
              <div className="rounded border bg-white p-6 shadow-sm h-full flex flex-col">
                <div className="w-full aspect-[4/3] overflow-hidden rounded bg-gray-100">
                  {p.imageUrl ? (
                    <ImageWithFallback
                      src={p.imageUrl}
                      alt={p.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full grid place-items-center text-gray-500 text-sm">
                      No image
                    </div>
                  )}
                </div>

                <h3 className="mt-4 text-lg font-semibold text-black">{p.name}</h3>

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

                <p className="mt-3 text-xl font-bold text-black">
                  £{Number(p.price).toFixed(2)}
                </p>

                <div className="mt-auto" />

                <div className="pt-5">
                  <Link
                    href={`/products/${p._id ?? p.id}`}
                    className="inline-block w-full text-center rounded bg-black text-white px-4 py-2 text-sm"
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
