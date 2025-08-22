export default function Footer() {
  return (
   <footer className="border-t border-gray-200 bg-gray-50 text-gray-600">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left side: branding */}
          <p className="text-sm">&copy; {new Date().getFullYear()} Easy Shop. All rights reserved.</p>

          {/* Center: navigation */}
          <nav className="flex gap-4 text-sm">
            <a href="/" className="hover:text-black">Home</a>
            <a href="/products" className="hover:text-black">Products</a>
            <a href="/login" className="hover:text-black">Login</a>
          </nav>

          {/* Right side: socials */}
          <div className="flex gap-3">
            <a href="#" className="hover:text-black" aria-label="Twitter">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.36a9 9 0 01-2.88 1.1A4.48 4.48 0 0016.11 0c-2.63 0-4.77 2.14-4.77 4.77 0 .37.04.73.12 1.07-3.97-.2-7.5-2.1-9.85-5-.41.7-.65 1.52-.65 2.39 0 1.65.84 3.11 2.11 3.97a4.53 4.53 0 01-2.16-.6v.06c0 2.3 1.63 4.22 3.78 4.65a4.52 4.52 0 01-2.15.08c.61 1.92 2.39 3.31 4.5 3.35A9 9 0 012 19.54 12.77 12.77 0 008.29 21c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.36-.02-.54A8.36 8.36 0 0023 3z" />
              </svg>
            </a>
            <a href="#" className="hover:text-black" aria-label="GitHub">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 007.84 10.95c.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.1-3.19.69-3.86-1.54-3.86-1.54-.52-1.33-1.27-1.68-1.27-1.68-1.04-.7.08-.69.08-.69 1.15.08 1.75 1.18 1.75 1.18 1.02 1.75 2.68 1.25 3.33.95.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 015.73 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.84 1.18 3.09 0 4.41-2.68 5.38-5.24 5.66.41.35.77 1.04.77 2.09 0 1.51-.01 2.72-.01 3.09 0 .3.21.65.79.54A11.5 11.5 0 0023.5 12c0-6.35-5.15-11.5-11.5-11.5z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
