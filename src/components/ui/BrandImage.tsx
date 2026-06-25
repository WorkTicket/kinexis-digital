"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type BrandImageProps = Omit<ImageProps, "className" | "loading" | "alt"> & {
  alt: string;
  className?: string;
  wrapperClassName?: string;
  loading?: "lazy" | "eager";
  /** Marketing imagery: fade on load + subtle hover scale. Logos: set false. */
  interactive?: boolean;
};

export default function BrandImage({
  alt,
  className,
  wrapperClassName,
  loading = "lazy",
  interactive = true,
  sizes,
  onLoad,
  ...props
}: BrandImageProps) {
  const [loaded, setLoaded] = useState(loading === "eager");

  return (
    <div
      className={cn(
        interactive && "motion-image",
        wrapperClassName
      )}
    >
      <Image
        alt={alt}
        loading={loading}
        sizes={sizes ?? "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"}
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
        className={cn(
          "max-w-full h-auto rounded-2xl",
          interactive && "motion-image__target",
          interactive && !loaded && "opacity-0",
          interactive && loaded && "opacity-100",
          className
        )}
        {...props}
      />
    </div>
  );
}
