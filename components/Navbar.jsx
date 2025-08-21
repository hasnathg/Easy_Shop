export default function Navbar() {
  return (
    <nav className="w-full border-b">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <a href="/" className="text-xl font-bold">Easy Shop</a>
        <div className="flex items-center gap-4">
          <a href="/" className="hover:underline">Home</a>
          <a href="/products" className="hover:underline">Products</a>
          <a href="/login" className="rounded border px-3 py-1.5 hover:bg-gray-100">Login</a>
        </div>
      </div>
    </nav>
  );
}
