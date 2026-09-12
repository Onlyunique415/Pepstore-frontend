import { useState } from "react";
import { useCart } from "../context/Cartcontext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function formatNaira(amount) {
  return `₦${Number(amount).toLocaleString()}`;
}

const PAYSTACK_PUBLIC_KEY = "pk_test_0d20eef666b2d2c93f1ff59160e336d3335c8ee9";

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    full_name: user?.name || "",
    phone: user?.phone || "",
    address_line: "",
    city: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const total = cartItems.reduce(
    (sum, item) => sum + item.retail_price * item.quantity,
    0
  );

  const deliveryFees = {
    "Nsukka": 1500,
    "Other Enugu": 2000,
  };
  const deliveryFee = deliveryFees[address.city] || 0;
  const grandTotal = total + deliveryFee;
  const orderType = cartItems.some((item) => item.is_wholesale) ? "wholesale" : "retail";
  const isUnavailable = address.city === "Outside Enugu";

  function handleChange(e) {
    setAddress({ ...address, [e.target.name]: e.target.value });
  }

  function handlePayment(e) {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    if (isUnavailable) {
      return;
    }

    setLoading(true);
    setError("");

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: user.email,
      amount: grandTotal * 100,
      currency: "NGN",
      callback: function (response) {
        verifyAndSaveOrder(response.reference);
      },
      onClose: function () {
        setLoading(false);
      },
    });

    handler.openIframe();
  }

  async function verifyAndSaveOrder(reference) {
    try {
      const res = await axios.post("http://localhost/pepstore-api/verify_payment.php", {
        reference,
        user_id: user.id,
        address,
        items: cartItems,
        total_amount: total,
        delivery_fee: deliveryFee,
        order_type: orderType,
      });

      clearCart();
      navigate(`/orders/${res.data.order_id}`);
    } catch (err) {
      setError(err.response?.data?.error || "Payment verification failed. Contact support if you were charged.");
      setLoading(false);
    }
  }

  if (cartItems.length === 0) {
    return (
      <div className="px-6 md:px-16 py-10 text-center text-gray-500">
        Your cart is empty. Add items before checking out.
      </div>
    );
  }

  return (
    <div className="px-6 md:px-16 py-10 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-green-900 dark:text-green-400 mb-8">Checkout</h1>

      {error && <p className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</p>}

      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5 mb-8">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">Order Summary</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
            <span>{item.name} × {item.quantity}</span>
            <span>{formatNaira(item.retail_price * item.quantity)}</span>
          </div>
        ))}
        <div className="flex justify-between text-gray-600 dark:text-gray-300 mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <span>Delivery Fee</span>
          <span>{deliveryFee ? formatNaira(deliveryFee) : "—"}</span>
        </div>
        <div className="flex justify-between font-bold text-gray-900 dark:text-white mt-1">
          <span>Total</span>
          <span>{formatNaira(grandTotal)}</span>
        </div>
      </div>

      <h2 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">Delivery Address</h2>

      {isUnavailable && (
        <p className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
          Sorry, we are not currently available in your city. We currently only deliver within Enugu State.
        </p>
      )}

      <form onSubmit={handlePayment} className="flex flex-col gap-4">
        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={address.full_name}
          onChange={handleChange}
          required
          className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg p-3"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={address.phone}
          onChange={handleChange}
          required
          className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg p-3"
        />
        <input
          type="text"
          name="address_line"
          placeholder="Delivery Address"
          value={address.address_line}
          onChange={handleChange}
          required
          className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg p-3"
        />
        <select
          name="city"
          value={address.city}
          onChange={handleChange}
          required
          className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg p-3"
        >
          <option value="">Select your area</option>
          <option value="Nsukka">Nsukka</option>
          <option value="Other Enugu">Other areas in Enugu</option>
          <option value="Outside Enugu">Outside Enugu</option>
        </select>

        <button
          type="submit"
          disabled={loading || isUnavailable}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg disabled:opacity-60"
        >
          {loading ? "Processing..." : isUnavailable ? "Unavailable in your area" : `Pay ${formatNaira(grandTotal)}`}
        </button>
      </form>
    </div>
  );
}

export default Checkout;