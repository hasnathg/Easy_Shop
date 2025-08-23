import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden text-white">
      
      <div className="h-[60svh] min-h-[420px] md:h-[70svh] lg:h-[75svh]" />

    
      <Image
        src="/hero.JPG"
        alt="Hero background"
        fill
        priority
        sizes="100vw"
        className="absolute inset-0 -z-10 object-cover object-center md:object-right"
      />

      
      <div className="absolute inset-0 -z-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 z-10 flex items-end md:items-center">
        <div className="mx-auto max-w-6xl w-full px-4 pb-8 md:pb-0">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
              Welcome to Easy Shop
            </h1>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl/relaxed opacity-90">
              Find the best products at great prices
            </p>

        
            <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/products"
                className="inline-block rounded bg-white text-black px-6 py-3 font-semibold w-full sm:w-auto"
              >
                View Products
              </a>
              <a
                href="/login"
                className="inline-block rounded border border-white px-6 py-3 font-semibold w-full sm:w-auto"
              >
                Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
