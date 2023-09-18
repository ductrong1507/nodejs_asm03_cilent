import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import DetailPage from "./pages/DetailPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import NotFoundPage from "./pages/NotFoundPage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import LiveChat from "./components/LiveChat/LiveChat";
import { useSelector } from "react-redux";
import HistoryPage from "./pages/HistoryPage";
import OrderDetailPage from "./pages/OrderDetailPage";

function App() {
  const { isAuth } = useSelector((state) => state.AuthReducer);
  return (
    <BrowserRouter>
      <Navbar />

      {/* chia router page */}
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/shop" element={<ShopPage />} />

        <Route path="/detail/:productId" element={<DetailPage />} />

        {/* Chuyển hướng trang giỏ hàng khi chưa hoặc đã đăng nhập */}
        <Route
          path="/cart"
          element={!isAuth ? <Navigate to="/login" replace /> : <CartPage />}
        />

        {/* Chuyển hướng trang check out khi chưa hoặc đã đăng nhập */}
        <Route
          path="/checkout"
          element={
            !isAuth ? <Navigate to="/login" replace /> : <CheckoutPage />
          }
        />

        {/* Chuyển hướng trang history và chi tiết history khi chưa hoặc đã đăng nhập */}
        <Route
          path="/history"
          element={!isAuth ? <Navigate to="/login" replace /> : <HistoryPage />}
        />

        <Route
          path="/history/:orderId"
          element={
            !isAuth ? <Navigate to="/login" replace /> : <OrderDetailPage />
          }
        />

        {/* Chuyển hướng trang login khi chưa hoặc đã đăng nhập */}
        <Route
          path="/login"
          element={isAuth ? <Navigate to="/" replace /> : <LoginPage />}
        />

        {/* Chuyển hướng trang register khi chưa hoặc đã đăng nhập */}
        <Route
          path="/register"
          element={isAuth ? <Navigate to="/" replace /> : <RegisterPage />}
        />

        {/* Chuyển hướng khi nhập url ko đúng */}
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>

      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Footer />
      <LiveChat />
    </BrowserRouter>
  );
}

export default App;
