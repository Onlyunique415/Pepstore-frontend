import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2, X } from "lucide-react";

function formatNaira(amount) {
  return `₦${Number(amount).toLocaleString()}`;
}

function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", status: "active" });

  function loadCustomers() {
    axios.get("http://localhost/pepstore-api/admin_customers.php").then((res) => setCustomers(res.data));
  }

  useEffect(() => {
    loadCustomers();
  }, []);

  function openEdit(customer) {
    setEditing(customer.id);
    setForm({
      name: customer.name,
      email: customer.email,
      phone: customer.phone || "",
      status: customer.status,
    });
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSave(e) {
    e.preventDefault();
    await axios.put("http://localhost/pepstore-api/admin_customers.php", { id: editing, ...form });
    setEditing(null);
    loadCustomers();
  }

  async function toggleSuspend(customer) {
    const newStatus = customer.status === "active" ? "suspended" : "active";
    await axios.put("http://localhost/pepstore-api/admin_customers.php", {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      status: newStatus,
    });
    loadCustomers();
  }

  async function handleDelete(id) {
    if (!confirm("Delete this customer account? This cannot be undone.")) return;
    await axios.delete("http://localhost/pepstore-api/admin_customers.php", { data: { id } });
    loadCustomers();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6">Customers</h1>

      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Orders</th>
              <th className="p-3">Total Spent</th>
              <th className="p-3">Status</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id} className="border-b border-gray-50 dark:border-gray-800 last:border-0">
                <td className="p-3 text-gray-800 dark:text-gray-100">{customer.name}</td>
                <td className="p-3 text-gray-600 dark:text-gray-300">{customer.email}</td>
                <td className="p-3">{customer.order_count}</td>
                <td className="p-3 font-medium">{formatNaira(customer.total_spent)}</td>
                <td className="p-3">
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      customer.status === "active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {customer.status}
                  </span>
                </td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => openEdit(customer)} className="text-blue-600 hover:bg-blue-50 p-1.5 rounded">
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => toggleSuspend(customer)}
                    className="text-xs border border-gray-300 dark:border-gray-700 rounded-lg px-2 py-1"
                  >
                    {customer.status === "active" ? "Suspend" : "Reactivate"}
                  </button>
                  <button onClick={() => handleDelete(customer.id)} className="text-red-600 hover:bg-red-50 p-1.5 rounded">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-sm">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg text-gray-800 dark:text-gray-100">Edit Customer</h2>
              <button onClick={() => setEditing(null)}>
                <X size={20} className="text-gray-500" />
              </button>
            </div>
            <form onSubmit={handleSave} className="flex flex-col gap-3">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg p-2 text-sm"
              />
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Email"
                required
                className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg p-2 text-sm"
              />
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg p-2 text-sm"
              />
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg text-sm mt-2"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCustomers;