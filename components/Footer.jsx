export default function Footer() {
  return (
    <footer className="w-full border-t mt-16">
      <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-gray-600">
        © {new Date().getFullYear()} Easy Shop
      </div>
    </footer>
  );
}
