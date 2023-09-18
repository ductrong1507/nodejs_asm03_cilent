import React, { useEffect } from "react";
import styles from "./OrderList.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOrderListApi } from "../../redux/Reducers/orderReducer";
import Cookies from "js-cookie";

export default function OrderList() {
  const { currentUser } = useSelector((state) => state.AuthReducer);
  const { orderList } = useSelector((state) => state.orderReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // gọi API get order list
    dispatch(getOrderListApi(currentUser._id, Cookies.get("accessToken")));
  }, []);

  const renderOrderList = () => {
    if (orderList.length == 0) {
      return (
        <tr>
          <td>No Items</td>
        </tr>
      );
    }
    return orderList.map((order, index) => {
      const total = order.items.reduce((sum, current) => {
        return Number(current.product.price) * current.quantity + sum;
      }, 0);

      return (
        <tr key={order._id}>
          <td className={styles.item_text1}>{order._id}</td>
          <td className={styles.item_text1}>{order.user._id}</td>
          <td className={styles.item_text2}>{order.user.fullName}</td>
          <td className={styles.item_text2}>{order.user.phoneNumber}</td>
          <td className={styles.item_text2}>{total.toLocaleString()} VND</td>
          <td className={styles.item_text2}>Waiting for progressing</td>
          <td className={styles.item_text2}>
            {order.status !== "CHECKOUT" ? "Waiting for pay" : "Paid"}
          </td>

          <td className={styles.item_action}>
            <button onClick={() => navigate(`./${order._id}`)}>View</button>
          </td>
        </tr>
      );
    });
  };

  return (
    <section>
      <div id={styles.history_banner}>
        <h1>History</h1>
        <h3>History</h3>
      </div>

      {/* Phần list order */}

      <div className={styles.history_content}>
        <h1>Order list</h1>
        <div className={styles.history_container}>
          {/* Phần danh sách sản phẩm  */}
          <div className={styles.history_item_infor}>
            <table>
              <thead>
                <tr>
                  <th>ID Order</th>
                  <th>ID User</th>
                  <th>Name</th>
                  <th>Phone</th>
                  <th>Total</th>
                  <th>Delivery</th>
                  <th>Status</th>
                  <th>Detail</th>
                </tr>
              </thead>
              <tbody>{renderOrderList()}</tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
