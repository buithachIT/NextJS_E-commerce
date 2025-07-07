import { CartItem } from "@/types/cartItem";
import CartItemCard from "./CartItemCard";

export default function CartItemList({ cartItem }: { cartItem: CartItem[] }) {
    return (
        <div className="border rounded-2xl md:w-3/5 md:mb-20">
            {cartItem.map((c) => (
                <CartItemCard key={c.id} cartItem={c} />
            ))}
        </div>
    );
}
