import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Forgotpassword() {
  const [form, setForm] = useState({ email: "", new_password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const response = await axios.post("http://localhost/pepstore-api/forgot_password.php", form);
      setMessage(response.data.message);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    }
  }

  return (
    <div className="px-6 md:px-16 py-14 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-green-900 dark:text-green-400 mb-2">Reset Password</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Enter your account email and a new password below.
      </p>

      {message && <p className="bg-green-50 text-green-700 p-3 rounded-lg mb-4 text-sm">{message}</p>}
      {error && <p className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
          className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg p-3"
        />
        <input
          type="password"
          name="new_password"
          placeholder="New Password"
          value={form.new_password}
          onChange={handleChange}
          required
          className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg p-3"
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg"
        >
          Reset Password
        </button>
      </form>
    </div>
  );
}

export default Forgotpassword;