import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";

export const metadata = { title: "Dashboard • Easy Shop" };

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect(`/login?callbackUrl=${encodeURIComponent("/dashboard")}`);
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-2 text-gray-600">Welcome, {session.user?.name || session.user?.email}</p>

      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link href="/dashboard/add-product" className="rounded border p-6 hover:bg-gray-50">
          <h3 className="font-semibold">Add Product</h3>
          <p className="text-sm text-gray-600 mt-1">Create a new product and save to the database.</p>
        </Link>

        <Link href="/products" className="rounded border p-6 hover:bg-gray-50">
          <h3 className="font-semibold">View Products</h3>
          <p className="text-sm text-gray-600 mt-1">Browse the public catalog.</p>
        </Link>
      </section>
    </main>
  );
}
