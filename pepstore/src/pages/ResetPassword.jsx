import { useState } from "react";
import axios from "axios";
import {
  useSearchParams,
  useNavigate
} from "react-router-dom";

function ResetPassword() {

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);


  async function handleSubmit(e) {

    e.preventDefault();

    setMessage("");
    setError("");


    if (!token) {
      setError("Invalid password reset link.");
      return;
    }


    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }


    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }


    setLoading(true);


    try {

      const response = await axios.post(
        "http://localhost/pepstore-api/reset_password.php",
        {
          token: token,
          new_password: password
        }
      );


      setMessage(response.data.message);

      setPassword("");
      setConfirmPassword("");


      setTimeout(() => {
        navigate("/login");
      }, 2000);


    } catch (err) {

      setError(
        err.response?.data?.error ||
        "Something went wrong. Please try again."
      );

    } finally {

      setLoading(false);
    }
  }


  return (
    <div className="px-6 md:px-16 py-14 max-w-md mx-auto">

      <h1 className="text-2xl font-bold text-green-900 dark:text-green-400 mb-2">
        Create New Password
      </h1>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Enter your new password below.
      </p>


      {message && (
        <p className="bg-green-50 text-green-700 p-3 rounded-lg mb-4 text-sm">
          {message}
        </p>
      )}


      {error && (
        <p className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
          {error}
        </p>
      )}


      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
      >

        <input
          type="password"
          placeholder="New Password (at least 8 characters)"
          minLength={8}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg p-3"
        />


        <input
          type="password"
          placeholder="Confirm New Password"
          minLength={8}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="border border-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:text-white rounded-lg p-3"
        />


        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold py-3 rounded-lg"
        >
          {loading
            ? "Resetting..."
            : "Reset Password"}
        </button>

      </form>

    </div>
  );
}

export default ResetPassword;