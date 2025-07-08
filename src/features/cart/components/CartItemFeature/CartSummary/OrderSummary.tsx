import { CartItem } from "@/types/cartItem";
import CartSummary from "./OrderSummarySale";
import { getCartData } from "@/lib/action/cart";

export default async function OrderSummary() {
    const { data: cartItems }: { data: CartItem[] } = await getCartData();

    const subtotal = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    console.log(subtotal)
    return (
        <div className="my-5 md:max-h-[400px] md:my-0 md:w-2/5 grid gap-6">
            <CartSummary subtotal={subtotal} />
        </div>
    )
}