import React from "react";
import Banner from "../components/Banner/Banner";
import Category from "../components/Category/Category";
import TrendingPopup from "../components/Modal/TrendingPopup";
import MoreInfo from "../components/MoreInfo/MoreInfo";
import TrendingList from "../components/TrendingProducts/TrendingList";

export default function HomePage() {
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
