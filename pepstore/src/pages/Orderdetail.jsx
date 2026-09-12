import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";

function formatNaira(amount) {
  return `₦${Number(amount).toLocaleString()}`;
}

const trackingSteps = [
  { key: "placed", label: "Order Placed" },
  { key: "payment_confirmed", label: "Payment Confirmed" },
  { key: "processing", label: "Processing" },
  { key: "packed", label: "Packed" },
  { key: "out_for_delivery", label: "Out for Delivery" },
  { key: "delivered", label: "Delivered" },
];

function Orderdetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`http://localhost/pepstore-api/get_order.php?id=${id}`)
      .then((res) => {
        setOrder(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="px-6 md:px-16 py-10 text-center text-gray-500">Loading order...</div>;
  }

  if (!order) {
    return <div className="px-6 md:px-16 py-10 text-center text-red-600">Order not found.</div>;
  }

  const currentStepIndex = trackingSteps.findIndex((step) => step.key === order.status);

  return (
    <div className="px-6 md:px-16 py-10 max-w-3xl mx-auto">
      <Link to="/orders" className="text-sm text-green-600 hover:underline mb-4 inline-block">
        ← Back to My Orders
      </Link>

      <h1 className="text-2xl font-bold text-green-900 dark:text-green-400 mb-1">{order.order_number}</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-8">
        Placed on {new Date(order.created_at).toLocaleDateString()}
      </p>
      
      {order.delivery_code && (
    <div className="bg-green-50 dark:bg-gray-800 border border-green-200 dark:border-gray-700 rounded-xl p-4 mb-8">
    <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">Your Delivery Code</p>
    <p className="text-2xl font-bold tracking-widest text-green-700 dark:text-green-400">
      {order.delivery_code}
    </p>
    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
      Please share this code with your delivery agent when your order arrives — it helps us confirm your package reaches the right hands. 💚
    </p>
  </div>
     )}
      <div className="mb-10">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100 mb-6">Order Status</h2>
        <div className="flex flex-col gap-0">
          {trackingSteps.map((step, index) => {
            const isComplete = index <= currentStepIndex;
            return (
              <div key={step.key} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      isComplete ? "bg-green-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-400"
                    }`}
                  >
                    <CheckCircle size={16} />
                  </div>
                  {index < trackingSteps.length - 1 && (
                    <div className={`w-0.5 h-8 ${isComplete ? "bg-green-600" : "bg-gray-200 dark:bg-gray-700"}`}></div>
                  )}
                </div>
                <p className={`pb-8 ${isComplete ? "text-gray-900 dark:text-white font-medium" : "text-gray-400"}`}>
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-5">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100 mb-3">Items</h2>
        {order.items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-1">
            <span>{item.product_name} × {item.quantity}</span>
            <span>{formatNaira(item.subtotal)}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold text-gray-900 dark:text-white mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
          <span>Total</span>
          <span>{formatNaira(order.total_amount)}</span>
        </div>
      </div>
    </div>
  );
}

export default Orderdetail;