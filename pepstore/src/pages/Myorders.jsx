import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function formatNaira(amount) {
  return `₦${Number(amount).toLocaleString()}`;
}

const statusColors = {
  placed: "bg-gray-100 text-gray-700",
  payment_confirmed: "bg-blue-100 text-blue-700",
  processing: "bg-yellow-100 text-yellow-700",
  packed: "bg-purple-100 text-purple-700",
  out_for_delivery: "bg-orange-100 text-orange-700",
  delivered: "bg-green-100 text-green-700",
};

function statusLabel(status) {
  return status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function Myorders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    axios
      .get(`http://localhost/pepstore-api/get_orders.php?user_id=${user.id}`)
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user]);

  if (!user) {
    return (
      <div className="px-6 md:px-16 py-10 text-center text-gray-500">
        Please <Link to="/login" className="text-green-600 underline">log in</Link> to view your orders.
      </div>
    );
  }

  if (loading) {
    return <div className="px-6 md:px-16 py-10 text-center text-gray-500">Loading your orders...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="px-6 md:px-16 py-10 text-center text-gray-500">
        You haven't placed any orders yet.{" "}
        <Link to="/shop" className="text-green-600 underline">Start shopping</Link>
      </div>
    );
  }

  return (
    <div className="px-6 md:px-16 py-10">
      <h1 className="text-3xl font-bold text-green-900 dark:text-green-400 mb-8">My Orders</h1>

      <div className="flex flex-col gap-4">
        {orders.map((order) => (
          <Link
            to={`/orders/${order.id}`}
            key={order.id}
            className="border border-gray-200 dark:border-gray-700 rounded-xl p-5 bg-white dark:bg-gray-800 hover:border-green-400 transition"
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
              <div>
                <p className="font-semibold text-gray-800 dark:text-gray-100">{order.order_number}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(order.created_at).toLocaleDateString()} • {order.items.length} item(s)
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[order.status]}`}>
                  {statusLabel(order.status)}
                </span>
                <span className="font-bold text-gray-900 dark:text-white">
                  {formatNaira(order.total_amount)}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Myorders;