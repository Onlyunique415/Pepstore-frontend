import { useState } from "react";
import axios from "axios";
import api from "../api";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [unverified, setUnverified] = useState(false);
  const [resendMessage, setResendMessage] = useState("");
  const [resending, setResending] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleResend() {
  setResendMessage("");
  setResending(true);
  try {
    const res = await axios.post("http://localhost/pepstore-api/resend_verification.php", {
      email: form.email,
    });
    setResendMessage(res.data.message);
  } catch (err) {
    setResendMessage(err.response?.data?.error || "Failed to resend email.");
  } finally {
    setResending(false);
  }
}

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setError("");
    setSubmitting(true);

    const url =
      mode === "login"
        ? "http://localhost/pepstore-api/login.php"
        : "http://localhost/pepstore-api/register.php";

    try {
      const response =
  mode === "login"
    ? await api.post(url, form)
    : await axios.post(url, form);
      setMessage(response.data.message);

      if (mode === "login") {
        login(response.data.user);
        navigate("/");
      } else {
        setMode("login");
      }
    } catch (err) {
  setError(err.response?.data?.error || "Something went wrong. Try again.");
  setUnverified(err.response?.data?.unverified || false);
   } finally {
  setSubmitting(false);
   }
  }

  return (
    <div className="px-6 md:px-16 py-14 max-w-md mx-auto">
      <div className="flex mb-6 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setMode("login")}
          className={`flex-1 py-3 font-semibold ${
            mode === "login" ? "text-green-600 border-b-2 border-green-600" : "text-gray-500"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setMode("register")}
          className={`flex-1 py-3 font-semibold ${
            mode === "register" ? "text-green-600 border-b-2 border-green-600" : "text-gray-500"
          }`}
        >
          Register
        </button>
      </div>

      {message && <p className="bg-green-50 text-green-700 p-3 rounded-lg mb-4 text-sm">{message}</p>}
      {error && (
  <div className="bg-red-50 p-3 rounded-lg mb-4 text-sm">
    <p className="text-red-600">{error}</p>
    {unverified && (
  <button
    type="button"
    onClick={handleResend}
    disabled={resending}
    className="flex items-center gap-2 text-green-700 font-semibold underline mt-1 disabled:opacity-60 disabled:no-underline"
  >
    {resending && (
      <span className="w-3.5 h-3.5 border-2 border-green-700 border-t-transparent rounded-full animate-spin"></span>
    )}
    {resending ? "Sending..." : "Resend verification email"}
  </button>
   )}
  </div>
  )}
   {resendMessage && (
  <p className="bg-green-50 text-green-700 p-3 rounded-lg mb-4 text-sm">{resendMessage}</p>
  )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {mode === "register" && (
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
            className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg p-3"
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email as in example@gmail.com"
          value={form.email}
          onChange={handleChange}
          required
          className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg p-3"
        />
        {mode === "register" && (
          <input
            type="tel"
            maxLength={11}
            name="phone"
            placeholder="Phone Number only nigerian phone number accepted"
            pattern="(070|071|080|081|090|091)\d{8}$"
            value={form.phone}
            onChange={handleChange}
            className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg p-3"
          />
        )}
        <input
          type="password"
          name="password"
          placeholder="Password up to 8 characters"
          value={form.password}
          onChange={handleChange}
          minLength={8}
          required
          className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg p-3"
        />

        {mode === "login" && (
          <Link to="/forgot-password" className="text-sm text-green-600 hover:underline -mt-2 self-end">
            Forgot password?
          </Link>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg disabled:opacity-60"
        >
          {submitting && (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
          )}
          {submitting
            ? mode === "login"
              ? "Logging in..."
              : "Creating account..."
            : mode === "login"
              ? "Login"
              : "Create Account"}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
        {mode === "login" ? (
          <>
            Don't have an account?{" "}
            <button onClick={() => setMode("register")} className="text-green-600 font-semibold hover:underline">
              Sign up
            </button>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <button onClick={() => setMode("login")} className="text-green-600 font-semibold hover:underline">
              Login
            </button>
          </>
        )}
      </p>
    </div>
  );
}

export default Login;