import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AddProductForm from "./ui/AddProductForm";

export const metadata = { title: "Add Product • Easy Shop" };

export default async function AddProductPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    // redirect to login and come back here after login
    redirect(`/login?callbackUrl=${encodeURIComponent("/dashboard/add-product")}`);
  }

  return (
    <main className="mx-auto max-w-lg px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Add a new product</h1>
      <AddProductForm />
    </main>
  );
}
