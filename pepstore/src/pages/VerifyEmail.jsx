import { useEffect, useState, useRef } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("");
  const hasVerified = useRef(false);

  useEffect(() => {
    if (!token) {
      setStatus("error");
      setMessage("No verification token found.");
      return;
    }
   if (hasVerified.current) return;
  hasVerified.current = true;
    axios
      .get(`http://localhost/pepstore-api/verify_email.php?token=${token}`)
      .then((res) => {
        setStatus("success");
        setMessage(res.data.message);
      })
      .catch((err) => {
        setStatus("error");
        setMessage(err.response?.data?.error || "Verification failed.");
      });
  }, [token]);

  return (
    <div className="px-6 md:px-16 py-20 max-w-md mx-auto text-center">
      {status === "verifying" && (
        <p className="text-gray-500">Verifying your email...</p>
      )}

      {status === "success" && (
        <>
          <h1 className="text-2xl font-bold text-green-700 mb-2">Email Verified!</h1>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{message}</p>
          <Link
            to="/login"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-lg"
          >
            Go to Login
          </Link>
        </>
      )}

      {status === "error" && (
        <>
          <h1 className="text-2xl font-bold text-red-600 mb-2">Verification Failed</h1>
          <p className="text-gray-600 dark:text-gray-300">{message}</p>
        </>
      )}
    </div>
  );
}

export default VerifyEmail;