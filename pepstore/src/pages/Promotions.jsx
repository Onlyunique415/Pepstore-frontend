const promotions = [
  {
    id: 1,
    title: "Back to School Bundle",
    description: "Get 10% off Noodles, Spaghetti, and Biscuits — perfect for stocking up.",
    discount_percent: 10,
    end_date: "2026-09-30",
  },
  {
    id: 2,
    title: "Bulk Rice Discount",
    description: "Buy 10 or more bags of Rice and get 8% off your total order.",
    discount_percent: 8,
    end_date: "2026-09-15",
  },
  {
    id: 3,
    title: "Home Care Special",
    description: "5% off all Nivea Cream and Household Items this week only.",
    discount_percent: 5,
    end_date: "2026-09-12",
  },
];

function Promotions() {
  return (
    <div className="px-6 md:px-16 py-10">
      <h1 className="text-3xl font-bold text-green-900 mb-2">Current Promotions</h1>
      <p className="text-gray-500 mb-8">Take advantage of these limited-time offers.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {promotions.map((promo) => (
          <div
            key={promo.id}
            className="relative bg-green-50 border border-green-200 rounded-xl p-5"
          >
            <span className="absolute -top-3 right-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              {promo.discount_percent}% OFF
            </span>
            <h3 className="text-green-900 font-bold mt-2 mb-2">{promo.title}</h3>
            <p className="text-sm text-gray-700">{promo.description}</p>
            <p className="text-xs text-gray-500 italic mt-3">Ends: {promo.end_date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Promotions;