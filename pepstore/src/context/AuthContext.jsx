import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

 useEffect(() => {
  const savedUser = localStorage.getItem("pepstore_user");
  if (savedUser) {
    const parsedUser = JSON.parse(savedUser);
    setUser(parsedUser);

    axios
      .get(`http://localhost/pepstore-api/check_status.php?user_id=${parsedUser.id}`)
      .then((res) => {
        if (res.data.status !== "active") {
          setUser(null);
          localStorage.removeItem("pepstore_user");
        }
      })
      .catch(() => {});
  }
}, []);

  function login(userData) {
    setUser(userData);
    localStorage.setItem("pepstore_user", JSON.stringify(userData));
  }

  async function logout() {
    setUser(null);
    localStorage.removeItem("pepstore_user");
    try {
      await axios.post("http://localhost/pepstore-api/logout.php");
    } catch (err) {
      console.error("Logout request failed", err);
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}