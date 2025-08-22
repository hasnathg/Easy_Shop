"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [toast, setToast] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg("");
    const priceNumber = Number(price);
    if (!name || !description || Number.isNaN(priceNumber)) {
      setMsg("Please fill all fields. Price must be a number.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, description, price: priceNumber, imageUrl }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to add product");
      }

      setToast("✅ Product added!");
      setTimeout(() => {
        router.push("/products");
        router.refresh();
      }, 1500);
    } catch (err) {
      setMsg(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* toast */}
      {toast && (
        <div className="fixed top-4 right-4 z-[60] rounded bg-black text-white px-4 py-2 shadow">
          {toast}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {msg ? <p className="text-sm text-red-600">{msg}</p> : null}

        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            className="mt-1 w-full rounded border px-3 py-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            className="mt-1 w-full rounded border px-3 py-2"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Price (£)</label>
          <input
            className="mt-1 w-full rounded border px-3 py-2"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            inputMode="decimal"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Image URL (optional)</label>
          <input
            className="mt-1 w-full rounded border px-3 py-2"
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
          <p className="text-xs text-gray-500 mt-1">
            Use a direct image link (JPG/PNG/WebP).
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded bg-black text-white px-5 py-2 disabled:opacity-50"
        >
          {loading ? "Adding..." : "Add Product"}
        </button>
      </form>
    </>
  );
}
