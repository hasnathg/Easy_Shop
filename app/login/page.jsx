import { Suspense } from "react";
import LoginClient from "./LoginClient";

export const metadata = { title: "Login • Easy Shop" };

export default function Page() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-md px-4 py-10">Loading…</div>}>
      <LoginClient />
    </Suspense>
  );
}
