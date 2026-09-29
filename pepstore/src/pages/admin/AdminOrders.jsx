import { useEffect, useState } from "react";
import axios from "../../api";
import { ChevronDown, ChevronUp } from "lucide-react";

function formatNaira(amount) {
  return `₦${Number(amount).toLocaleString()}`;
}

const statusOptions = ['placed', 'payment_confirmed', 'processing', 'packed', 'out_for_delivery', 'delivered'];

function statusLabel(status) {
  return status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [codeInputs, setCodeInputs] = useState({});
  const [errors, setErrors] = useState({});

  function loadOrders() {
    axios.get("http://localhost/pepstore-api/admin_orders.php").then((res) => setOrders(res.data));
  }

  useEffect(() => {
    loadOrders();
  }, []);

  async function updateStatus(orderId, newStatus) {
    setErrors({ ...errors, [orderId]: "" });

    const payload = { id: orderId, status: newStatus };
    if (newStatus === 'delivered') {
      payload.delivery_code = codeInputs[orderId] || "";
    }

    try {
      await axios.put("http://localhost/pepstore-api/admin_orders.php", payload);
      loadOrders();
    } catch (err) {
      setErrors({ ...errors, [orderId]: err.response?.data?.error || "Failed to update status." });
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Orders</h1>

      <div className="flex flex-col gap-3">
        {orders.map((order) => (
          <div key={order.id} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-4">
            <div
              className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 cursor-pointer"
              onClick={() => setExpandedId(expandedId === order.id ? null : order.id)}
            >
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-100">{order.order_number}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {order.customer_name} • {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                  {formatNaira(order.total_amount)}
                </span>
                <select
                  value={order.status}
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => updateStatus(order.id, e.target.value)}
                  className="text-xs border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg px-2 py-1"
                >
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>{statusLabel(status)}</option>
                  ))}
                </select>
                {expandedId === order.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </div>
            </div>

            {order.status !== 'delivered' && (
              <div className="mt-2 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <input
                  type="text"
                  maxLength={4}
                  placeholder="Delivery code (for marking delivered)"
                  value={codeInputs[order.id] || ""}
                  onChange={(e) => setCodeInputs({ ...codeInputs, [order.id]: e.target.value })}
                  className="text-xs border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg px-2 py-1 w-48"
                />
              </div>
            )}
            {errors[order.id] && (
              <p className="text-xs text-red-600 mt-1">{errors[order.id]}</p>
            )}

            {expandedId === order.id && (
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 text-sm">
                <p className="text-gray-600 dark:text-gray-300 mb-1">
                  <span className="font-medium">Customer:</span> {order.customer_name} — {order.customer_email} — {order.customer_phone}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-1">
                  <span className="font-medium">Deliver to:</span> {order.delivery_name}, {order.address_line}, {order.city} — {order.delivery_phone}
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-3">
                  <span className="font-medium">Order Type:</span> {order.order_type}
                </p>
                <p className="font-medium text-gray-700 dark:text-gray-200 mb-2">Items:</p>
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-gray-600 dark:text-gray-300 mb-1">
                    <span>{item.product_name} × {item.quantity}</span>
                    <span>{formatNaira(item.subtotal)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminOrders;