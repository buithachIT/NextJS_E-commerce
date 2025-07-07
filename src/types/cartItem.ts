export type CartItem = {
    id: string;
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    variant: {
        id: string;
        colorName: string;
        colorCode: string;
        size: string;
        thumbnail: string;
    };
};
