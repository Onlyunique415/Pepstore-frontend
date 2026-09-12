import { Link } from "react-router-dom";
import heroBg from "../assets/hero-bg.jpg";

function Home() {
  return (
    <div>
      <section
        className="relative bg-cover bg-center text-white text-center px-6 py-20 md:py-32"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
            Quality Provisions, Straight to Your Door
          </h1>
          <p className="text-base md:text-lg mb-6 max-w-xl mx-auto">
            Buy retail for your home or wholesale for your shop — trusted quality, fair prices.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-white text-green-700 font-semibold px-8 py-3 rounded-full hover:bg-green-50"
          >
            Start Shopping
          </Link>
        </div>
      </section>

      <section className="px-6 py-12 text-center bg-white dark:bg-gray-900">
        <h2 className="text-2xl font-bold text-green-900 dark:text-green-400 mb-6">
          Shop by Category
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          <div className="bg-green-50 dark:bg-gray-800 border border-green-200 dark:border-gray-700 rounded-lg px-6 py-6 font-semibold text-gray-800 dark:text-gray-200 min-w-[140px]">
            Grains & Rice
          </div>
          <div className="bg-green-50 dark:bg-gray-800 border border-green-200 dark:border-gray-700 rounded-lg px-6 py-6 font-semibold text-gray-800 dark:text-gray-200 min-w-[140px]">
            Beverages
          </div>
          <div className="bg-green-50 dark:bg-gray-800 border border-green-200 dark:border-gray-700 rounded-lg px-6 py-6 font-semibold text-gray-800 dark:text-gray-200 min-w-[140px]">
            Household Items
          </div>
          <div className="bg-green-50 dark:bg-gray-800 border border-green-200 dark:border-gray-700 rounded-lg px-6 py-6 font-semibold text-gray-800 dark:text-gray-200 min-w-[140px]">
            Snacks
          </div>
        </div>
      </section>

      <section className="px-6 py-12 text-center bg-gray-50 dark:bg-gray-950">
        <h2 className="text-2xl font-bold text-green-900 dark:text-green-400 mb-6">
          Why PEP STORE?
        </h2>
        <div className="flex flex-wrap justify-center gap-6 text-gray-700 dark:text-gray-300 font-medium">
          <div>✅ Retail & Wholesale Pricing</div>
          <div>🚚 Fast Delivery</div>
          <div>💳 Secure Payment</div>
        </div>
      </section>
    </div>
  );
}

export default Home;