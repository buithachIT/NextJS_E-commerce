'use client';

import { createContext, useContext, useState } from 'react';
import { VariationType } from '@/types/product';

type ProductContextType = {
  selectedImage: string | null;
  setSelectedImage: (img: string) => void;
  selectedColor: string | null;
  setSelectedColor: (color: string) => void;
  selectedVariant: VariationType | null;
  setSelectedVariant: (variant: VariationType | null) => void;
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const useProductContext = () => {
  const ctx = useContext(ProductContext);
  if (!ctx)
    throw new Error('useProductContext must be used inside <ProductProvider>');
  return ctx;
};

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedVariant, setSelectedVariant] = useState<VariationType | null>(
    null
  );

  return (
    <ProductContext.Provider
      value={{
        selectedImage,
        setSelectedImage,
        selectedColor,
        setSelectedColor,
        selectedVariant,
        setSelectedVariant,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
