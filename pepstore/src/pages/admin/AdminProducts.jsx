import { useEffect, useState } from "react";
import axios from "axios";
import { Plus, Pencil, Trash2, X } from "lucide-react";

function formatNaira(amount) {
  return `₦${Number(amount).toLocaleString()}`;
}

const emptyForm = {
  id: null,
  category_id: "",
  name: "",
  description: "",
  image: "",
  retail_price: "",
  wholesale_price: "",
  wholesale_min_quantity: "",
  stock_quantity: "",
};

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  function loadProducts() {
    axios.get("http://localhost/pepstore-api/products.php").then((res) => setProducts(res.data));
  }

  useEffect(() => {
    loadProducts();
    axios.get("http://localhost/pepstore-api/categories.php").then((res) => setCategories(res.data));
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function openAddForm() {
    setForm(emptyForm);
    setImageFile(null);
    setError("");
    setShowForm(true);
  }

  function openEditForm(product) {
    setForm({
      id: product.id,
      category_id: product.category_id,
      name: product.name,
      description: product.description || "",
      image: product.image || "",
      retail_price: product.retail_price,
      wholesale_price: product.wholesale_price,
      wholesale_min_quantity: product.wholesale_min_quantity,
      stock_quantity: product.stock_quantity,
    });
    setImageFile(null);
    setError("");
    setShowForm(true);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    let imageFilename = form.image;

    try {
      if (imageFile) {
        setUploading(true);
        const uploadData = new FormData();
        uploadData.append("image", imageFile);
        const uploadRes = await axios.post("http://localhost/pepstore-api/upload_image.php", uploadData);
        imageFilename = uploadRes.data.filename;
        setUploading(false);
      }

      const payload = { ...form, image: imageFilename };

      if (form.id) {
        await axios.put("http://localhost/pepstore-api/admin_products.php", payload);
      } else {
        await axios.post("http://localhost/pepstore-api/admin_products.php", payload);
      }

      setShowForm(false);
      loadProducts();
    } catch (err) {
      setUploading(false);
      setError(err.response?.data?.error || "Failed to save product.");
    }
  }

  async function handleDelete(id) {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    await axios.delete("http://localhost/pepstore-api/admin_products.php", { data: { id } });
    loadProducts();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Products</h1>
        <button
          onClick={openAddForm}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded-lg text-sm"
        >
          <Plus size={16} /> Add Product
        </button>
      </div>

      <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-800">
              <th className="p-3">Name</th>
              <th className="p-3">Retail</th>
              <th className="p-3">Wholesale</th>
              <th className="p-3">Stock</th>
              <th className="p-3"></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-50 dark:border-gray-800 last:border-0">
                <td className="p-3 text-gray-800 dark:text-gray-100">{product.name}</td>
                <td className="p-3">{formatNaira(product.retail_price)}</td>
                <td className="p-3">{formatNaira(product.wholesale_price)}</td>
                <td className="p-3">
                  <span className={product.stock_quantity <= 5 ? "text-red-600 font-semibold" : ""}>
                    {product.stock_quantity}
                  </span>
                </td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => openEditForm(product)} className="text-blue-600 hover:bg-blue-50 p-1.5 rounded">
                    <Pencil size={16} />
                  </button>
                  <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:bg-red-50 p-1.5 rounded">
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-lg text-gray-800 dark:text-gray-100">
                {form.id ? "Edit Product" : "Add Product"}
              </h2>
              <button onClick={() => setShowForm(false)}>
                <X size={20} className="text-gray-500" />
              </button>
            </div>

            {error && <p className="bg-red-50 text-red-600 p-2 rounded-lg mb-3 text-sm">{error}</p>}

            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <select
                name="category_id"
                value={form.category_id}
                onChange={handleChange}
                required
                className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg p-2 text-sm"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>

              <input
                type="text"
                name="name"
                placeholder="Product Name"
                value={form.name}
                onChange={handleChange}
                required
                className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg p-2 text-sm"
              />

              <textarea
                name="description"
                placeholder="Description (optional)"
                value={form.description}
                onChange={handleChange}
                rows="2"
                className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg p-2 text-sm"
              ></textarea>

              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="text-sm"
                />
                {form.image && !imageFile && (
                  <p className="text-xs text-gray-400 mt-1">Current: {form.image}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  name="retail_price"
                  placeholder="Retail Price"
                  value={form.retail_price}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg p-2 text-sm"
                />
                <input
                  type="number"
                  name="wholesale_price"
                  placeholder="Wholesale Price"
                  value={form.wholesale_price}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg p-2 text-sm"
                />
                <input
                  type="number"
                  name="wholesale_min_quantity"
                  placeholder="Min Wholesale Qty"
                  value={form.wholesale_min_quantity}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg p-2 text-sm"
                />
                <input
                  type="number"
                  name="stock_quantity"
                  placeholder="Stock Quantity"
                  value={form.stock_quantity}
                  onChange={handleChange}
                  required
                  className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg p-2 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={uploading}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-lg text-sm mt-2 disabled:opacity-60"
              >
                {uploading ? "Uploading image..." : form.id ? "Save Changes" : "Add Product"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProducts;