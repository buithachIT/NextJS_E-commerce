export type Product = {
    id: string;
    name: string;
    price: number;
    oldPrice?: number;
    discount?: string;
    rating: number;
    createdAt: string;
    sold: number;
    image: string;
};