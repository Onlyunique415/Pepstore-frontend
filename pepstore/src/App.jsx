import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/home";
import Shop from "./pages/Shop";
import { CartProvider } from "./context/Cartcontext";
import Cart from "./pages/Cart";
import Wholesale from "./pages/Wholesale";
import Promotions from "./pages/Promotions";
import CustomerCare from "./pages/Customercare";
import { ThemeProvider } from "./context/Themecontext";
import Footer from "./components/Footer";
import AboutUs from "./pages/AboutUs";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import Checkout from "./pages/Checkout";
import Forgotpassword from "./pages/Forgotpassword";
import ResetPassword from "./pages/ResetPassword";
import Orderdetail from "./pages/Orderdetail";
import Myorders from "./pages/Myorders";
import AdminRoute from "./components/AdminRoute";
import AdminLayout from "./layouts/AdminLayout";
import Overview from "./pages/admin/Overview";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminPromotions from "./pages/admin/AdminPromotions";
import VerifyEmail from "./pages/VerifyEmail";




function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
    <CartProvider>
      <div>
        <div className="dark:bg-gray-950 dark:text-gray-100 min-h-screen transition-colors flex flex-col">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/wholesale" element={<Wholesale />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/customer-care" element={<CustomerCare />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<Forgotpassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/orders" element={<Myorders />} />
          <Route path="/orders/:id" element={<Orderdetail />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
     
          <Route
     path="/admin"
         element={
    <AdminRoute>
      <AdminLayout />
    </AdminRoute>
  }
 > 
  <Route index element={<Overview />} />
  <Route path="products" element={<AdminProducts />} />
 <Route path="orders" element={<AdminOrders />} />
  <Route path="customers" element={<AdminCustomers />} />
  <Route path="promotions" element={<AdminPromotions />} />
       </Route>
        </Routes>
        </div>
        <Footer />
      </div>
    </CartProvider>
    </AuthProvider>
    </ThemeProvider>
  );
}

export default App;