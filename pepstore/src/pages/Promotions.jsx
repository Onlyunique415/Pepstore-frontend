import { useEffect, useState } from "react";
import axios from "axios";

function Promotions() {
  const [promotions, setPromotions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost/pepstore-api/promotions.php")
      .then((res) => {
        setPromotions(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="px-6 md:px-16 py-10 text-center text-gray-500">Loading promotions...</div>;
  }

  return (
    <div className="px-6 md:px-16 py-10">
      <h1 className="text-3xl font-bold text-green-900 dark:text-green-400 mb-2">Current Promotions</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Take advantage of these limited-time offers.</p>

      {promotions.length === 0 ? (
        <p className="text-gray-500">No active promotions right now — check back soon!</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="relative bg-green-50 dark:bg-gray-800 border border-green-200 dark:border-gray-700 rounded-xl p-5"
            >
              <span className="absolute -top-3 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                {promo.discount_percent}% OFF
              </span>
              <h3 className="text-green-900 dark:text-green-400 font-bold mt-2 mb-2">{promo.title}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">{promo.description}</p>
              {promo.products.length > 0 && (
                <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  Applies to: {promo.products.map((p) => p.name).join(", ")}
                </p>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400 italic">Ends: {promo.end_date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Promotions;