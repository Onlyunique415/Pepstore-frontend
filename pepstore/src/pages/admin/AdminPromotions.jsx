import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../api";
import { Plus, Pencil, Trash2, X } from "lucide-react";

const emptyForm = {
  id: null,
  title: "",
  description: "",
  discount_percent: "",
  start_date: "",
  end_date: "",
  product_ids: [],
};

function AdminPromotions() {
  const [promotions, setPromotions] = useState([]);
  const [products, setProducts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);

  function loadPromotions() {
    api.get("http://localhost/pepstore-api/admin_promotions.php").then((res) => setPromotions(res.data));
  }

  useEffect(() => {
    loadPromotions();
    axios.get("http://localhost/pepstore-api/products.php").then((res) => setProducts(res.data));
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function toggleProduct(productId) {
    setForm((prev) => {
      const alreadySelected = prev.product_ids.includes(productId);
      return {
        ...prev,
        product_ids: alreadySelected
          ? prev.product_ids.filter((id) => id !== productId)
          : [...prev.product_ids, productId],
      };
    });
  }

  function openAdd() {
    setForm(emptyForm);
    setShowForm(true);
  }

  function openEdit(promo) {
    setForm({
      id: promo.id,
      title: promo.title,
      description: promo.description || "",
      discount_percent: promo.discount_percent,
      start_date: promo.start_date,
      end_date: promo.end_date,
      product_ids: promo.products.map((p) => p.id),
    });
    setShowForm(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.id) {
      await api.put("http://localhost/pepstore-api/admin_promotions.php", form);
    } else {
      await api.post("http://localhost/pepstore-api/admin_promotions.php", form);
    }
    setShowForm(false);
    loadPromotions();
  }

  async function handleDelete(id) {
    if (!confirm("Delete this promotion?")) return;
    await api.delete("http://localhost/pepstore-api/admin_promotions.php", { data: { id } });
    loadPromotions();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Promotions</h1>
        <button
          onClick={openAdd}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg text-sm"
        >
          <Plus size={16} /> New Promotion
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {promotions.map((promo) => (
          <div key={promo.id} className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-gray-800 dark:text-gray-100">{promo.title}</h3>
              <span className="text-xs font-bold bg-red-100 text-red-700 px-2 py-1 rounded-full">
                {promo.discount_percent}% OFF
              </span>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              {promo.start_date} → {promo.end_date}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-3">
              {promo.products.length} product(s)
            </p>
            <div className="flex gap-2">
              <button onClick={() => openEdit(promo)} className="text-blue-600 hover:bg-blue-50 p-1.5 rounded">
                <Pencil size={16} />
              </button>
              <button onClick={() => handleDelete(promo.id)} className="text-red-600 hover:bg-red-50 p-1.5 rounded">
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg text-gray-800 dark:text-gray-100">
                {form.id ? "Edit Promotion" : "New Promotion"}
              </h2>
              <button onClick={() => setShowForm(false)}>
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="title"
                placeholder="Promotion Title (e.g. Christmas Sale)"
                value={form.title}
                onChange={handleChange}
                required
                className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg p-2 text-sm"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
                rows="2"
                className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg p-2 text-sm"
              ></textarea>
              <input
                type="number"
                name="discount_percent"
                placeholder="Discount % (e.g. 10)"
                value={form.discount_percent}
                onChange={handleChange}
                required
                className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg p-2 text-sm"
              />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400">Start Date</label>
                  <input
                    type="date"
                    name="start_date"
                    value={form.start_date}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg p-2 text-sm w-full"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400">End Date</label>
                  <input
                    type="date"
                    name="end_date"
                    value={form.end_date}
                    onChange={handleChange}
                    required
                    className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg p-2 text-sm w-full"
                  />
                </div>
              </div>

              <label className="text-xs text-gray-500 dark:text-gray-400 mt-2">Select Products</label>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg max-h-40 overflow-y-auto p-2">
                {products.map((product) => (
                  <label key={product.id} className="flex items-center gap-2 py-1 text-sm text-gray-700 dark:text-gray-200">
                    <input
                      type="checkbox"
                      checked={form.product_ids.includes(product.id)}
                      onChange={() => toggleProduct(product.id)}
                    />
                    {product.name}
                  </label>
                ))}
              </div>

              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg text-sm mt-2"
              >
                {form.id ? "Save Changes" : "Create Promotion"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPromotions;