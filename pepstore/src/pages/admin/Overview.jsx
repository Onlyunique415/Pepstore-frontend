import { useEffect, useState } from "react";
import axios from "../../api";
import { DollarSign, ShoppingBag, Users, Package, AlertTriangle } from "lucide-react";

function formatNaira(amount) {
  return `₦${Number(amount).toLocaleString()}`;
}

function Overview() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost/pepstore-api/overview_stats.php")
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-gray-500">Loading dashboard...</p>;
  if (!stats) return <p className="text-red-600">Failed to load dashboard stats.</p>;

  const cards = [
    { label: "Total Sales", value: formatNaira(stats.total_sales), icon: DollarSign, color: "bg-green-100 text-green-700" },
    { label: "Total Orders", value: stats.total_orders, icon: ShoppingBag, color: "bg-blue-100 text-blue-700" },
    { label: "Customers", value: stats.total_customers, icon: Users, color: "bg-purple-100 text-purple-700" },
    { label: "Products", value: stats.total_products, icon: Package, color: "bg-orange-100 text-orange-700" },
    { label: "Low Stock", value: stats.low_stock, icon: AlertTriangle, color: "bg-red-100 text-red-700" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Overview</h1>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div key={card.label} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-4">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${card.color}`}>
                <Icon size={18} />
              </div>
              <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{card.value}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{card.label}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-5">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100 mb-4">Recent Orders</h2>
        {stats.recent_orders.length === 0 ? (
          <p className="text-sm text-gray-500">No orders yet.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {stats.recent_orders.map((order) => (
              <div key={order.id} className="flex justify-between items-center text-sm border-b border-gray-50 dark:border-gray-800 pb-3 last:border-0">
                <div>
                  <p className="font-medium text-gray-800 dark:text-gray-100">{order.order_number}</p>
                  <p className="text-xs text-gray-500">{order.customer_name}</p>
                </div>
                <span className="font-semibold text-gray-800 dark:text-gray-100">
                  {formatNaira(order.total_amount)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Overview;