import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Footer.module.css";

export default function Footer(props) {
  return (
    <footer id={styles.footer}>
      <section className={`${styles.footer_container} w-70`}>
        <div className={styles.footer_item}>
          <h1>Customer Services</h1>
          <ul>
            <li>
              <NavLink className={styles.link} to="/#">
                Help & Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink className={styles.link} to="/#">
                Return & Refunds
              </NavLink>
            </li>
            <li>
              <NavLink className={styles.link} to="/#">
                Online Stores
              </NavLink>
            </li>
            <li>
              <NavLink className={styles.link} to="/#">
                Terms & Conditions
              </NavLink>
            </li>
          </ul>
        </div>

        <div className={styles.footer_item}>
          <h1>Company</h1>
          <ul>
            <li>
              <NavLink className={styles.link} to="/#">
                What We Do
              </NavLink>
            </li>
            <li>
              <NavLink className={styles.link} to="/#">
                Available Services
              </NavLink>
            </li>
            <li>
              <NavLink className={styles.link} to="/#">
                Latest Posts
              </NavLink>
            </li>
            <li>
              <NavLink className={styles.link} to="/#">
                FAQs
              </NavLink>
            </li>
          </ul>
        </div>

        <div className={styles.footer_item}>
          <h1>Social Media</h1>
          <ul>
            <li>
              <NavLink className={styles.link} to="/#">
                Twitter
              </NavLink>
            </li>
            <li>
              <NavLink className={styles.link} to="/#">
                Instagram
              </NavLink>
            </li>
            <li>
              <NavLink className={styles.link} to="/#">
                Facebook
              </NavLink>
            </li>
            <li>
              <NavLink className={styles.link} to="/#">
                Pinterest
              </NavLink>
            </li>
          </ul>
        </div>
      </section>
    </footer>
  );
}
