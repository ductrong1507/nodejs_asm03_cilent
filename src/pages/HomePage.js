import React, { useEffect } from "react";
import Banner from "../components/Banner/Banner";
import Category from "../components/Category/Category";
import TrendingPopup from "../components/Modal/TrendingPopup";
import MoreInfo from "../components/MoreInfo/MoreInfo";
import TrendingList from "../components/TrendingProducts/TrendingList";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function HomePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    const currentCookiesToken = Cookies.get("accessToken");
    const localToken = JSON.parse(localStorage.getItem("CURRENT_USER"));

    if (!currentCookiesToken && localToken) {
      dispatch({
        type: "ON_LOGOUT",
      });
      toast.warning("Vui lòng đang nhập lại!");
    }
  }, []);

  return (
    <main className="w-70">
      <Banner />
      <Category />
      <TrendingList />
      <MoreInfo />
      <TrendingPopup />
    </main>
  );
}
