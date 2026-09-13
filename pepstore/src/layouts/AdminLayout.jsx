import { Link, Outlet, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingBag, Users, ArrowLeft } from "lucide-react";

const adminLinks = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/promotions", label: "Promotions", icon: Package },
];

function AdminLayout() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <aside className="w-56 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 p-5 flex-shrink-0">
        <Link to="/" className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 hover:text-green-600 mb-6">
          <ArrowLeft size={16} /> Back to Store
        </Link>

        <h2 className="text-lg font-extrabold mb-6">
          <span className="text-green-600">PEP</span>
          <span className="text-gray-900 dark:text-gray-100"> ADMIN</span>
        </h2>

        <nav className="flex flex-col gap-1">
          {adminLinks.map((link) => {
            const Icon = link.icon;
            const isActive = link.end
              ? location.pathname === link.to
              : location.pathname.startsWith(link.to);
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive
                    ? "bg-green-50 dark:bg-gray-800 text-green-700 dark:text-green-400"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                }`}
              >
                <Icon size={18} />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="flex-1 p-6 md:p-8 overflow-x-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;