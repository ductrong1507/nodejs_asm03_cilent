import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import styles from "./ShoppingCart.module.css";
import Cookies from "js-cookie";
import { initializeCartApi } from "../../redux/Reducers/cartToolkitReducer";

export default function ShoppingCart() {
  const { currentUser } = useSelector((state) => state.AuthReducer);

  const { cartArr } = useSelector((state) => state.cartToolkitReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // chạy action thunk nạp dữ liệu giỏ hàng
    dispatch(initializeCartApi(currentUser._id, Cookies.get("accessToken")));
  }, []);

  // Xử lý nút return
  const returnShoppingPage = () => {
    navigate("/shop");
  };

  // Xử lý nút check out
  const goCheckOutPage = () => {
    navigate("/checkout");
  };

  // render danh sách sản phẩm
  const renderItemList = () => {
    if (cartArr.length !== 0) {
      return cartArr.map((item, index) => {
        const productInfo = {
          ...item.product,
          quantity: item.quantity,
        };
        return <CartItem key={item.product._id} item={productInfo} />;
      });
    } else {
      return (
        <tr>
          <td>No Items</td>
        </tr>
      );
    }
  };

  return (
    <section id={styles.shopping_cart}>
      <div className={styles.shopping_cart_banner}>
        <h1>Cart</h1>
        <h3>Cart</h3>
      </div>

      {/* Phần cart list items */}
      <div className={styles.shopping_cart_content}>
        <h1>Shopping Cart</h1>
        <div className={styles.shopping_cart_container}>
          {/* Phần danh sách sản phẩm  */}
          <div className={styles.shopping_cart_item_infor}>
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>{renderItemList()}</tbody>
            </table>
          </div>

          {/* Phần giá  */}
          <div className={styles.shopping_cart_item_total}>
            <h1>Cart Total</h1>

            <div className={styles.shopping_cart_item_sub_total_price}>
              <h3>Subtotal</h3>
              <p>
                {cartArr
                  .reduce((total, item) => {
                    return total + Number(item.product.price) * item.quantity;
                  }, 0)
                  .toLocaleString()}{" "}
                VND
              </p>
            </div>

            <div className={styles.shopping_cart_item_total_price}>
              <h3>Total</h3>
              <p>
                {cartArr
                  .reduce((total, item) => {
                    return total + Number(item.product.price) * item.quantity;
                  }, 0)
                  .toLocaleString()}{" "}
                VND
              </p>
            </div>

            <form className={styles.shopping_cart_item_total_form}>
              <input type="text" placeholder="Enter your coupon" />
              <button type="submit">
                <i className="fa-sharp fa-solid fa-gift" />
                Apply coupon
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* vị trí nút back or next */}
      <div className={styles.shopping_cart_navigation}>
        <button
          onClick={returnShoppingPage}
          className={styles.shopping_cart_navigation_previous}
        >
          <i className="fa-solid fa-arrow-left" />
          Continue Shopping
        </button>

        <button
          onClick={goCheckOutPage}
          className={styles.shopping_cart_navigation_next}
        >
          Proceed to checkout
          <i className="fa-solid fa-arrow-right" />
        </button>
      </div>
    </section>
  );
}
