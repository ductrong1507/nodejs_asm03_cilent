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
import TestComponent from "./components/TestComponent/TestComponent";

function App() {
  const { isAuth } = useSelector((state) => state.AuthReducer);
  return (
    <BrowserRouter>
      <Navbar />

      {/* chia router page */}
      <Routes>
        {/* <Route exact path="/" component={HomePage} /> */}
        <Route path="/" element={<HomePage />} />

        <Route path="/shop" element={<ShopPage />} />

        {/* <Route exact path="/detail/:productId" component={DetailPage} /> */}
        <Route path="/detail/:productId" element={<DetailPage />} />

        {/* <Route exact path="/cart" component={CartPage} /> */}
        <Route path="/cart" element={<CartPage />} />

        {/* <Route exact path="/checkout" component={CheckoutPage} /> */}
        <Route path="/checkout" element={<CheckoutPage />} />

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

        {/* tesst new redux toolkit */}
        {/* <Route path="/test" element={<TestComponent />} /> */}

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
