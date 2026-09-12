import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/Cartcontext";

function formatNaira(amount) {
  return `₦${Number(amount).toLocaleString()}`;
}

function groupByCategory(items) {
  return items.reduce((groups, item) => {
    const category = item.category_name;
    if (!groups[category]) groups[category] = [];
    groups[category].push(item);
    return groups;
  }, {});
}

function Shop() {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost/pepstore-api/products.php")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="px-6 md:px-16 py-10 text-center text-gray-500">Loading products...</div>;
  }

  if (error) {
    return <div className="px-6 md:px-16 py-10 text-center text-red-600">{error}</div>;
  }

  const grouped = groupByCategory(products);

  return (
    <div className="px-6 md:px-16 py-10">
      <h1 className="text-3xl font-bold text-green-900 dark:text-green-400 mb-8">Shop</h1>

      {Object.entries(grouped).map(([category, items]) => (
        <div className="mb-10" key={category}>
          <h2 className="text-xl font-semibold text-green-600 border-b-2 border-green-100 dark:border-gray-800 pb-2 mb-5">
            {category}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {items.map((product) => (
              <div
                key={product.id}
                className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 bg-white dark:bg-gray-800 flex flex-col" >
             
                <div className="bg-green-50 dark:bg-gray-700 aspect-square rounded-lg mb-3 overflow-hidden flex items-center justify-center">
                {product.image_url ? (
            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
            ) : (
    <span className="text-xs text-gray-400">No image</span>
  )}
               </div>
                <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">
                  {product.name}
                </h3>
                <p className="font-bold text-gray-900 dark:text-gray-100">
                  Retail: {formatNaira(product.retail_price)}
                </p>
                <p className="text-xs text-green-600 mb-3">
                  Wholesale: {formatNaira(product.wholesale_price)} (min {product.wholesale_min_quantity})
                </p>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-auto bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg text-sm"
                >
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default Shop;