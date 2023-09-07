import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Category.module.css";

export default function Category() {
  const navigate = useNavigate();

  // Xử lý click vào bất kỳ hình nào trong Category
  const categoryClickHandle = () => {
    navigate("/shop");
  };

  return (
    <section id={styles.category}>
      <h3>Carefully created collections</h3>
      <h1>Browse our categories</h1>
      <div onClick={categoryClickHandle} className={styles.category_container}>
        <div className={styles.category_row}>
          <div className={styles.category_item}>
            <img src="./assets/images/product_1.png" alt="Products Category" />
          </div>

          <div className={styles.category_item}>
            <img src="./assets/images/product_2.png" alt="Products Category" />
          </div>
        </div>

        <div className={styles.category_row}>
          <div className={styles.category_item}>
            <img src="./assets/images/product_3.png" alt="Products Category" />
          </div>

          <div className={styles.category_item}>
            <img src="./assets/images/product_4.png" alt="Products Category" />
          </div>
          <div className={styles.category_item}>
            <img src="./assets/images/product_5.png" alt="Products Category" />
          </div>
        </div>
      </div>
    </section>
  );
}
