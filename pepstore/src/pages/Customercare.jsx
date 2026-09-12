import { useState } from "react";
import axios from "axios";

const faqs = [
  {
    question: "How long does delivery take?",
    answer: "Retail orders within the city are usually delivered within 24 hours. Wholesale orders may take 2-3 business days depending on quantity.",
  },
  {
    question: "Can I return a product?",
    answer: "Yes, damaged or wrong items can be returned within 48 hours of delivery. Contact us with your order number.",
  },
  {
    question: "Do you offer wholesale pricing?",
    answer: "Yes — visit our Wholesale page for bulk pricing on select products. Minimum order quantities apply.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept secure card and bank transfer payments through Paystack.",
  },
];

function Customercare() {
  const [openIndex, setOpenIndex] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function toggleFaq(index) {
    setOpenIndex(openIndex === index ? null : index);
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <div className="px-6 md:px-16 py-10">
      <h1 className="text-3xl font-bold text-green-900 dark:text-green-400 mb-8">Customer Care</h1>

      <div className="grid md:grid-cols-2 gap-10 max-w-5xl mx-auto">
        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
            Frequently Asked Questions
          </h2>
          {faqs.map((faq, index) => (
            <div className="border-b border-gray-200 dark:border-gray-700" key={index}>
              <button
                onClick={() => toggleFaq(index)}
                className="w-full text-left py-4 font-semibold text-gray-800 dark:text-gray-100 flex justify-between"
              >
                {faq.question}
                <span>{openIndex === index ? "−" : "+"}</span>
              </button>
              {openIndex === index && (
                <p className="pb-4 text-sm text-gray-600 dark:text-gray-300">{faq.answer}</p>
              )}
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
            Contact Us / Submit a Support Ticket
          </h2>
          {submitted && (
            <p className="bg-green-50 text-green-700 p-3 rounded-lg mb-4">
              Thanks! Your message has been received.
            </p>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg p-3"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg p-3"
            />
            <textarea
              name="message"
              placeholder="How can we help?"
              rows="6"
              value={form.message}
              onChange={handleChange}
              required
              className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg p-3"
            ></textarea>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg"
            >
              Send Message
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Customercare;