'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { GetProductByIdQuery } from '@/__generated__/types';
import { isVariableProduct } from '@/helper/isTypeProduct';
import { SimpleProduct, VariableProduct } from '@/__generated__/types';

type ProductType = NonNullable<GetProductByIdQuery['product']>;

export default function ProductImage({ product }: { product: ProductType }) {
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);

  const allImages = useMemo(() => {
    if (isVariableProduct(product)) {
      const p = product as SimpleProduct | VariableProduct;
      return p.galleryImages?.nodes.map((img) => img.sourceUrl ?? '') ?? [];
    }
    return [];
  }, [product]);

  const [selectedImage, setSelectedImage] = useState(allImages[0]);

  if (allImages.length === 0) return <p>No images available</p>;

  return (
    <div className="flex md:w-1/2 md:pr-5 md:items-start md:justify-between md:aspect-[4/3] md:flex-row-reverse flex-col gap-4">
      <div className="relative w-full md:w-3/4 md:h-full aspect-[4/3] rounded-2xl bg-[#f6f6f6]">
        <Image
          src={hoveredImage || selectedImage}
          alt="Product Image"
          width={400}
          height={300}
          className="absolute inset-0 w-full h-full rounded-2xl object-cover transition duration-300"
        />
      </div>

      <div className="relative flex  max-w-full md:h-full md:w-1/4 overflow-x-auto scrollbar-hide">
        <div className="flex md:flex-col md:h-full md:w-full md:overflow-auto scrollbar-hide gap-3">
          {allImages.map((img) => (
            <div
              key={img}
              onClick={() => setSelectedImage(img)}
              onMouseEnter={() => setHoveredImage(img)}
              onMouseLeave={() => setHoveredImage(null)}
              className={`relative w-26 h-26 md:w-full md:h-full aspect-square rounded-2xl border transition
                          ${selectedImage === img ? 'border-black' : ''}`}
            >
              <Image
                src={img}
                alt="Thumbnail"
                width={340}
                height={245}
                className="absolute inset-0 w-full h-full rounded-2xl object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
