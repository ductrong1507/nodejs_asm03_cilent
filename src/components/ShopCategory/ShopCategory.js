import React, { useEffect } from "react";
import styles from "./ShopCategory.module.css";
import SidebarCategory from "../SidebarCategory/SidebarCategory";
import ProductList from "../ProductList/ProductList";

export default function ShopCategory(props) {
  return (
    <section>
      <div id={styles.shop_category_banner}>
        <h1>Shop</h1>
        <h3>Shop</h3>
      </div>
      <div id={styles.shop_category}>
        <SidebarCategory />
        <ProductList />
      </div>
    </section>
  );
}
