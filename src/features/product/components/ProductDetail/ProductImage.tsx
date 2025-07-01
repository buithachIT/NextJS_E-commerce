'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';

type ProductImageProps = {
    product: {
        variants: {
            id: string;
            images: string[];
        }[];
    };
};

export default function ProductImage({ product }: ProductImageProps) {
    const allImages = useMemo(() => {
        return product?.variants?.flatMap(v => v.images) ?? [];
    }, [product]);

    const [selectedImage, setSelectedImage] = useState(allImages[0]);

    if (allImages.length === 0) return <p>No images available</p>;

    return (
        <div className="flex md:w-1/2 md:items-start md:justify-between md:aspect-[4/3] md:flex-row-reverse flex-col gap-4">
            {/* Ảnh lớn */}
            <div className="relative w-full md:w-3/4 md:h-full aspect-[4/3] rounded-2xl bg-[#f6f6f6]">
                <Image
                    src={selectedImage}
                    alt="Product Image"
                    width={400}
                    height={300}
                    className="absolute inset-0 w-full h-full rounded-2xl object-cover"
                />
            </div>

            {/* Thumbnails */}
            <div className="relative flex  max-w-full md:h-full md:w-1/4 overflow-x-auto scrollbar-hide">
                <div className="flex md:flex-col md:h-full md:w-full md:overflow-auto scrollbar-hide gap-3">
                    {allImages.map((img) => (
                        <div
                            key={img}
                            onClick={() => setSelectedImage(img)}
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
