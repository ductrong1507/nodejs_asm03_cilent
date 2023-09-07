import React from "react";
import styles from "./MoreInfo.module.css";
import { toast } from "react-toastify";

export default function MoreInfo() {
  return (
    <section id={styles.more_info}>
      <div className={styles.service_info}>
        <div className={styles.service_info_item}>
          <h1>Free Shipping</h1>
          <p>Free shipping worldwide</p>
        </div>

        <div className={styles.service_info_item}>
          <h1>24 x 7 Service</h1>
          <p>Free shipping worldwide</p>
        </div>

        <div className={styles.service_info_item}>
          <h1>Festival offer</h1>
          <p>Free shipping worldwide</p>
        </div>
      </div>
      <div className={styles.subscribe_info}>
        <div className={styles.subscribe_promote}>
          <h1>Let's be friend!</h1>
          <p>Free shipping worldwide</p>
        </div>
        <div className={styles.subscribe_form}>
          <input type="text" placeholder="Enter your email address" />
          <button>Subscribe</button>
        </div>
      </div>
    </section>
  );
}
