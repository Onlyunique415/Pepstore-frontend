import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

function AdminRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    return (
      <div className="px-6 md:px-16 py-20 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h1>
        <p className="text-gray-500">You don't have permission to view this page.</p>
      </div>
    );
  }

  return children;
}

export default AdminRoute;