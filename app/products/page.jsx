import Link from "next/link";

async function getProducts() {
  const res = await fetch(`${process.env.NEXTAUTH_URL ?? "http://localhost:3000"}/api/products`, {
    cache: "no-store",
  });
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
              <div className="rounded border border-gray-200 bg-gray-50 p-6 shadow-sm h-full flex flex-col">
                {/* Consistent image area at the top */}
                <div className="w-full aspect-[4/3] overflow-hidden rounded bg-gray-100">
                  {p.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
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

                {/* Text content */}
                <h3 className="mt-4 text-lg font-semibold text-black">{p.name}</h3>

                {/* Clamp description to 2 lines so heights match */}
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

                <p className="mt-3 text-xl font-bold text-black">£{Number(p.price).toFixed(2)}</p>

                {/* Spacer pushes the button to the bottom */}
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
