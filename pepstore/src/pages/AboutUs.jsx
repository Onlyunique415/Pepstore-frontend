import { CheckCircle, Truck, HeartHandshake, Users } from "lucide-react";

const promises = [
  {
    icon: CheckCircle,
    title: "Quality Products",
    text: "Every item is sourced with care and checked for quality.",
  },
  {
    icon: HeartHandshake,
    title: "Fair Pricing",
    text: "Transparent pricing for both retail and wholesale customers.",
  },
  {
    icon: Truck,
    title: "Reliable Delivery",
    text: "Timely delivery you can count on, every time.",
  },
  {
    icon: Users,
    title: "Friendly Support",
    text: "Responsive customer care whenever you need help.",
  },
];

function AboutUs() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <section className="bg-green-50 dark:bg-gray-800 px-6 md:px-16 py-14 md:py-20 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-green-900 dark:text-green-400 mb-4">
          About PEP STORE
        </h1>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-base md:text-lg">
          Built on trust, quality, and fair pricing — bringing everyday
          essentials to your home or business.
        </p>
      </section>

      <section className="px-6 md:px-16 py-12 max-w-3xl mx-auto">
        <p className="text-gray-700 dark:text-gray-300 mb-5 leading-relaxed">
          PEP STORE started as a small provisions business built on trust,
          quality, and fair pricing. What began as a local shop serving the
          community has grown into an online store, making it easier for
          customers to get everyday essentials — whether buying a single item
          for the home or stocking up in bulk for a shop.
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          We believe good provisions shouldn't be hard to find or overpriced.
          That's why we offer both retail and wholesale pricing on the same
          platform, so every customer — big or small — gets a fair deal.
        </p>
      </section>

      <section className="px-6 md:px-16 py-12 bg-gray-50 dark:bg-gray-950">
        <h2 className="text-2xl md:text-3xl font-bold text-green-900 dark:text-green-400 text-center mb-10">
          Our Promise
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {promises.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl p-6 text-center shadow-sm"
              >
                <Icon className="mx-auto mb-4 text-green-600" size={32} />
                <h3 className="font-semibold text-gray-800 dark:text-gray-100 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default AboutUs;