import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useCart } from "../context/Cartcontext";
import { Search, X } from "lucide-react";

function formatNaira(amount) {
  return `₦${Number(amount).toLocaleString()}`;
}

function SearchBar({ onClose }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    timeoutRef.current = setTimeout(() => {
      axios
        .get(`http://localhost/pepstore-api/search_products.php?q=${encodeURIComponent(query)}`)
        .then((res) => {
          setResults(res.data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }, 400);

    return () => clearTimeout(timeoutRef.current);
  }, [query]);

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-2 bg-white dark:bg-gray-800">
        <Search size={18} className="text-gray-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
          autoFocus
          className="flex-1 bg-transparent outline-none text-sm dark:text-white"
        />
        {onClose && (
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={18} />
          </button>
        )}
      </div>

      {query.trim().length >= 2 && (
        <div className="mt-2 max-h-80 overflow-y-auto border border-gray-100 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
          {loading ? (
            <p className="text-sm text-gray-400 p-4">Searching...</p>
          ) : results.length === 0 ? (
            <p className="text-sm text-gray-400 p-4">No matching products in stock.</p>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-3 p-3 border-b border-gray-50 dark:border-gray-700 last:border-0"
              >
                <div className="w-12 h-12 bg-green-50 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center">
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[10px] text-gray-400">No image</span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 truncate">
                    {product.name}
                  </p>
                  <p className="text-xs text-green-600">{formatNaira(product.retail_price)}</p>
                </div>
                <button
                  onClick={() => addToCart(product)}
                  className="text-xs bg-green-600 hover:bg-green-700 text-white font-semibold px-3 py-1.5 rounded-lg flex-shrink-0"
                >
                  Add
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default SearchBar;