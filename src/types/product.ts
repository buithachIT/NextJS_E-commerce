export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  rating: number;
  image: string;
  createdAt: string;
  sold: number;
  category?: string;
  brand?: string;
  variants: Variant[];
};

export type Variant = {
  id: string;
  colorName: string;
  colorCode: string;
  sizes: string[];
  stock: number;
  price: number;
  thumbnail: string;
  images: string[];
};
