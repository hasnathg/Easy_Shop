"use client";

import { useState } from "react";

export default function ImageWithFallback({
  src,
  alt,
  className,
  fallback = "/placeholder.png",
  ...rest
}) {
  const [currentSrc, setCurrentSrc] = useState(src || fallback);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      onError={() => setCurrentSrc(fallback)}
      {...rest}
    />
  );
}
