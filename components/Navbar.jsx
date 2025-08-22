"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import ThemeToggle from "./ThemeToggle";

function ProfileMenu() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  if (!session?.user) return null;
  const name = session.user.name || session.user.email || "User";
  const avatar = session.user.image;

  return (
    <div className="relative bg-gray-50" ref={ref}>
      <button
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 rounded px-2 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={avatar} alt={name} className="h-8 w-8 rounded-full object-cover" />
        ) : (
          <div className="h-8 w-8 rounded-full bg-gray-900 text-white grid place-items-center text-sm">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
        <span className="max-w-[140px] truncate hidden sm:inline">{name}</span>
        <svg className="h-4 w-4 opacity-70" viewBox="0 0 20 20" fill="currentColor">
          <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.25a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"/>
        </svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-2 z-50 w-56 rounded-md border bg-white text-black shadow-lg p-1 dark:bg-zinc-900 dark:text-white dark:border-zinc-800"
        >
          <Link href="/dashboard" className="block rounded px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-800" onClick={() => setOpen(false)}>
            Dashboard
          </Link>
          <Link href="/dashboard/add-product" className="block rounded px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-800" onClick={() => setOpen(false)}>
            Add Product
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full text-left rounded px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-zinc-800"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const { status } = useSession();
  const authed = status === "authenticated";
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-gray-50 text-black rounded-2xl">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">Easy Shop</Link>

        {/* Desktop nav (right side items) */}
        <nav className="hidden md:flex items-center gap-4">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/products" className="hover:underline">Products</Link>
          <ThemeToggle /> {/*  theme toggle on the right */}
          {authed ? (
            <ProfileMenu />
          ) : (
            <Link href="/login" className="rounded border px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-800">
              Login
            </Link>
          )}
        </nav>

        {/* Mobile burger */}
        <button
          aria-label="Toggle menu"
          className="md:hidden rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
          onClick={() => setMobileOpen(v => !v)}
        >
          <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
            ) : (
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer (fixed so it overlays hero) */}
      {mobileOpen && (
        <div className="md:hidden fixed top-14 inset-x-0 z-40 border-t bg-white shadow dark:bg-zinc-900 dark:border-zinc-800">
          <nav className="mx-auto max-w-6xl px-4 py-3 flex flex-col gap-2">
            <Link href="/" className="rounded px-3 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800" onClick={() => setMobileOpen(false)}>Home</Link>
            <Link href="/products" className="rounded px-3 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800" onClick={() => setMobileOpen(false)}>Products</Link>

            {/* Theme toggle in mobile */}
            <div className="mt-1 px-3">
              <ThemeToggle />
            </div>

            {authed ? (
              <>
                <Link href="/dashboard" className="rounded px-3 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800" onClick={() => setMobileOpen(false)}>Dashboard</Link>
                <Link href="/dashboard/add-product" className="rounded px-3 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800" onClick={() => setMobileOpen(false)}>Add Product</Link>
                <button
                  onClick={() => { setMobileOpen(false); signOut({ callbackUrl: "/" }); }}
                  className="text-left rounded px-3 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="rounded px-3 py-2 hover:bg-gray-100 dark:hover:bg-zinc-800" onClick={() => setMobileOpen(false)}>Login</Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
