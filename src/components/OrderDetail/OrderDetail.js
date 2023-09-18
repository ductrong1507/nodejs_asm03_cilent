import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./OrderDetail.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetailApi } from "../../redux/Reducers/orderReducer";
import Cookies from "js-cookie";

export default function OrderDetail() {
  const { orderId } = useParams();
  const { currentUser } = useSelector((state) => state.AuthReducer);
  const { orderDetail } = useSelector((state) => state.orderReducer);
  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(
      getOrderDetailApi(currentUser._id, Cookies.get("accessToken"), orderId)
    );
  }, []);

  // render product item
  const renderProductItem = () => {
    if (!orderDetail || orderDetail.items.length == 0) {
      return (
        <tr>
          <td>No Items</td>
        </tr>
      );
    }
    return orderDetail.items.map((ele) => {
      return (
        <tr key={ele.product._id}>
          <td className={styles.item_text1}>{ele.product._id}</td>
          <td className={styles.item_img}>
            <img src={ele.product.img1} alt="images" />
          </td>
          <td className={styles.item_text2}>{ele.product.name}</td>
          <td className={styles.item_text2}>
            {Number(ele.product.price).toLocaleString()} VND
          </td>
          <td className={styles.item_text2}>{ele.quantity}</td>
        </tr>
      );
    });
  };

  return (
    <section id={styles.order_detail}>
      <div className={styles.order_detail_infor}>
        <h1>Information Order</h1>
        {orderDetail && (
          <>
            <p className={styles.text1}>
              ID User: <span>{orderDetail.user._id}</span>
            </p>
            <p className={styles.text1}>
              Full Name: <span>{orderDetail.user.fullName}</span>
            </p>
            <p className={styles.text1}>
              Phone: <span>{orderDetail.user.phoneNumber}</span>
            </p>
            <p className={styles.text1}>
              Total:{" "}
              <span>
                {orderDetail.items
                  .reduce(
                    (sum, current) =>
                      sum + Number(current.product.price) * current.quantity,
                    0
                  )
                  .toLocaleString()}{" "}
                VND
              </span>
            </p>
          </>
        )}
      </div>

      {/* Phần list sản phẩm */}
      <div className={styles.order_detail_item_infor}>
        <table>
          <thead>
            <tr>
              <th>ID Product</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>{renderProductItem()}</tbody>
        </table>
      </div>
    </section>
  );
}
