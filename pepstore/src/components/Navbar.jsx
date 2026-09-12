import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, User, Search, Menu, X, Sun, Moon } from "lucide-react";
import { useCart } from "../context/Cartcontext";
import { useTheme } from "../context/Themecontext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import SearchBar from "./SearchBar";

const links = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/shop", label: "Shop" },
  { to: "/wholesale", label: "Wholesale" },
  { to: "/promotions", label: "Promotions" },
  { to: "/customer-care", label: "Customer Care" },
];

function Navbar() {
  const { cartItems } = useCart();
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();
  const { darkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <nav className="sticky top-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b border-gray-100 dark:border-gray-800 px-6 md:px-10 py-4">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold tracking-tight">
          <span className="text-green-600">PEP</span>
          <span className="text-gray-900 dark:text-gray-100"> STORE</span>
        </Link>

        <div className="hidden md:flex gap-8 text-sm font-semibold">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`pb-1 border-b-2 transition ${
                location.pathname === link.to
                  ? "text-green-600 border-green-600"
                  : "text-gray-700 dark:text-gray-200 border-transparent hover:text-green-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-5">
          <button
            onClick={toggleTheme}
            className="text-gray-600 dark:text-gray-300 hover:text-green-600"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="hidden md:block text-gray-600 dark:text-gray-300 hover:text-green-600"
          >
            <Search size={20} />
          </button>

          <Link to="/cart" className="relative text-gray-700 dark:text-gray-300 hover:text-green-600">
            <ShoppingCart size={22} />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-[11px] font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="relative hidden md:block">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-green-600"
              >
                <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center text-sm font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </button>

              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-lg shadow-lg py-2 text-sm">
                  <div className="px-4 py-2 text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-gray-700">
                    Signed in as <br />
                    <span className="font-semibold text-gray-800 dark:text-gray-100">{user.name}</span>
                  </div>
                  <Link
                    to="/orders"
                    onClick={() => setUserMenuOpen(false)}
                    className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    My Orders
                  </Link>
                  {user.role === "admin" && (
            <Link
    to="/admin"
    onClick={() => setUserMenuOpen(false)}
    className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
    Admin Dashboard
       </Link>
        )}
                  <button
                    onClick={() => {
                      logout();
                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="hidden md:block text-gray-700 dark:text-gray-300 hover:text-green-600">
              <User size={22} />
            </Link>
          )}

          <button
            className="md:hidden text-gray-700 dark:text-gray-300"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="hidden md:block max-w-md mx-auto mt-3">
          <SearchBar onClose={() => setSearchOpen(false)} />
        </div>
      )}

      {menuOpen && (
        <div className="md:hidden flex flex-col gap-1 mt-4 pt-4 border-t border-gray-100 dark:border-gray-800 text-sm font-semibold">
          <div className="mb-3">
            <SearchBar />
          </div>

          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className={`py-2 ${
                location.pathname === link.to
                  ? "text-green-600"
                  : "text-gray-700 dark:text-gray-200"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {user ? (
            <div className="pt-2 border-t border-gray-100 dark:border-gray-800 mt-2 flex flex-col gap-1">
              <p className="text-gray-500 dark:text-gray-400 text-xs mb-1">
                Signed in as <span className="font-semibold text-gray-800 dark:text-gray-100">{user.name}</span>
              </p>
              <Link
                to="/orders"
                onClick={() => setMenuOpen(false)}
                className="py-2 text-gray-700 dark:text-gray-200"
              >
                My Orders
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="text-red-600 py-2 text-left"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="py-2 text-gray-700 dark:text-gray-200"
            >
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Navbar;