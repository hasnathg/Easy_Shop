// components/Hero.jsx
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-[58vh] min-h-[420px] md:h-[68vh] lg:h-[72vh] isolate overflow-hidden text-white flex items-center justify-center">
      
     <Image
  src="/hero.JPG"
  alt="Hero background"
  fill
  priority
  className="object-contain md:object-cover md:object-right"
/>

      
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold">Welcome to Easy Shop</h1>
        <p className="mt-4 text-lg opacity-90">Find best products with great price</p>
        <div className="mt-8 flex justify-center gap-3">
          <a href="/products" className="inline-block rounded bg-white text-black px-6 py-3 font-semibold">
            View Products
          </a>
          <a href="/login" className="inline-block rounded border border-white px-6 py-3 font-semibold">
            Login
          </a>
        </div>
      </div>
    </section>
  );
}
