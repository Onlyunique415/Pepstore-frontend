import { useCart } from "../context/Cartcontext";
import { Link } from "react-router-dom";

function formatNaira(amount) {
  return `₦${amount.toLocaleString()}`;
}

function Cart() {
  const { cartItems, addToCart, decreaseQuantity, removeFromCart } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.retail_price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <div className="px-6 md:px-16 py-10">
        <h1 className="text-3xl font-bold text-green-900 mb-4">Your Cart</h1>
        <p className="text-gray-600 mb-4">Your cart is empty.</p>
        <Link to="/shop" className="text-green-600 font-semibold">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-16 py-10">
      <h1 className="text-3xl font-bold text-green-900 mb-8">Your Cart</h1>

      <div className="flex flex-col gap-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-4 gap-3"
          >
            <div>
              <h3 className="font-semibold text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-500">{formatNaira(item.retail_price)} each</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => decreaseQuantity(item.id)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 font-bold text-gray-700"
              >
                −
              </button>
              <span className="w-6 text-center font-semibold">{item.quantity}</span>
              <button
                onClick={() => addToCart(item)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 font-bold text-gray-700"
              >
                +
              </button>
            </div>

            <div className="flex items-center justify-between sm:flex-col sm:items-end gap-2">
              <p className="font-bold text-gray-900">
                {formatNaira(item.retail_price * item.quantity)}
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 text-xs hover:underline"
              >
                Remove item
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-center sm:justify-end">
  <div className="w-full sm:w-80 bg-gray-50 border border-gray-200 rounded-xl p-6">
    <div className="flex justify-between text-gray-600 mb-2">
      <span>Subtotal</span>
      <span>{formatNaira(total)}</span>
    </div>
    <div className="flex justify-between text-lg font-bold text-gray-900 mb-4 border-t border-gray-200 pt-3">
      <span>Total</span>
      <span>{formatNaira(total)}</span>
    </div>
        <Link
     to="/checkout"
     className="block text-center w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg">

      Proceed to Checkout
     </Link>
  </div>
</div>
    </div>
  );
}

export default Cart;