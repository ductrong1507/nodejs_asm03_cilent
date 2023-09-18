import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const { isAuth, currentUser } = useSelector((state) => state.AuthReducer);
  const { cartArr, totalItems } = useSelector(
    (state) => state.cartToolkitReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Xử lý nút log out
  const logoutClickHandle = () => {
    dispatch({
      type: "ON_LOGOUT",
    });

    navigate("/");
  };

  // xử lý nút mũi tên
  const showUserInfo = () => {
    alert(`Current user: ${currentUser.fullName}`);
  };

  return (
    <header id={styles.navbar} className="w-70">
      <div className={styles.nav_item}>
        <ul>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${styles.link} link_active` : `${styles.link}`
              }
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${styles.link} link_active` : `${styles.link}`
              }
              to="/shop"
            >
              Shop
            </NavLink>
          </li>

          {isAuth ? (
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${styles.link} link_active` : `${styles.link}`
                }
                to="/history"
              >
                History
              </NavLink>
            </li>
          ) : (
            ""
          )}
        </ul>
      </div>
      <div className={styles.nav_title}>
        <h1 onClick={() => navigate("/test")}>Boutique</h1>
      </div>
      <div className={styles.nav_item}>
        <ul>
          {isAuth ? (
            <>
              <li>
                <NavLink
                  className={({ isActive }) =>
                    isActive ? `${styles.link} link_active` : `${styles.link}`
                  }
                  to="/cart"
                >
                  <i
                    className={`fa-solid fa-cart-flatbed mr-8 ${styles.link_icon}`}
                  />
                  Cart
                </NavLink>
                <span>{isAuth ? `(${totalItems})` : ""}</span>
              </li>

              <li>
                <p className={styles.link}>
                  <i className={`fa-solid fa-user mr-8 ${styles.link_icon}`} />
                  {currentUser.fullName}
                  <i
                    onClick={showUserInfo}
                    className={`fa-sharp fa-solid fa-caret-down ${styles.link_icon_login}`}
                  />
                  <span onClick={logoutClickHandle}>{`(Logout)`}</span>
                </p>
              </li>
            </>
          ) : (
            <li>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `${styles.link} link_active` : `${styles.link}`
                }
                to="/login"
              >
                <i className={`fa-solid fa-user mr-8 ${styles.link_icon}`} />
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}
