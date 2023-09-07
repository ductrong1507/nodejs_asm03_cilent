import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./CheckOut.module.css";
import emailjs from "@emailjs/browser";
import { useNavigate } from "react-router-dom";

export default function CheckOut() {
  const { cartArr } = useSelector((state) => state.CartReducer);
  const form = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // render danh sách order
  const renderOrderList = () => {
    return cartArr.map((item, index) => {
      return (
        <div key={item.id} className={styles.check_out_order_item}>
          <h3>{item.name}</h3>
          <p>
            {Number(item.price).toLocaleString()} VND
            <span> x {item.quantity}</span>
          </p>
        </div>
      );
    });
  };

  // Nút đặt hàng, gửi mail
  const orderButtonHandle = (e) => {
    e.preventDefault();
    // console.log(
    //   "order",
    //   cartArr
    //     .map((product) => {
    //       const totalPrice = parseInt(product.price) * product.quantity;
    //       return `- Tên sản phẩm: ${product.name}\n  Đơn giá: ${Number(
    //         product.price
    //       ).toLocaleString()} VNĐ\n  Số lượng: ${
    //         product.quantity
    //       }\n  Tổng tiền: ${totalPrice.toLocaleString()} VNĐ\n`;
    //     })
    //     .join("\n")
    // );

    emailjs
      .sendForm(
        "service_kgeu1pr",
        "template_jaqyh8u",
        form.current,
        "XZLr8O7s8587MtaDM"
      )
      .then(
        (result) => {
          console.log(result);
          console.log(result.text);
          alert(`Trạng thái đặt hàng ${result.text}`);
          dispatch({
            type: "DELETE_ALL_CART",
          });
          navigate("/");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <section id={styles.check_out}>
      {/* Phần banner trang check out */}
      <div className={styles.check_out_banner}>
        <h1>Checkout</h1>
        <h3>
          Home / Cart / <span>Checkout</span>
        </h3>
      </div>

      {/* nội dung chính của trang check out */}
      <div className={styles.check_out_content}>
        <h1>Billing Details</h1>
        <div className={styles.check_out_container}>
          {/* Phần form thông tin */}
          <form ref={form} className={styles.check_out_form}>
            <div className={styles.form_group}>
              <label htmlFor="inputFullName">Full Name</label>
              <input
                id="inputFullName"
                type="text"
                name="fullName"
                className={styles.form_control}
                placeholder="Enter Your full name here!"
              />
            </div>

            <div className={styles.form_group}>
              <label htmlFor="inputEmail">Email</label>
              <input
                id="inputEmail"
                type="email"
                name="email"
                className={styles.form_control}
                placeholder="Enter Your email here!"
              />
            </div>

            <div className={styles.form_group}>
              <label htmlFor="inputPhoneNumber">Phone Number</label>
              <input
                id="inputPhoneNumber"
                type="text"
                name="phoneNumber"
                className={styles.form_control}
                placeholder="Enter Your Phone number here!"
              />
            </div>

            <div className={styles.form_group}>
              <label htmlFor="inputAddress">Address</label>
              <input
                id="inputAddress"
                type="text"
                name="address"
                className={styles.form_control}
                placeholder="Enter Your address here!"
              />
            </div>
            <input
              type="hidden"
              name="content"
              value={cartArr
                .map((product) => {
                  const totalPrice = parseInt(product.price) * product.quantity;
                  return `- Tên sản phẩm: ${product.name}\n  Đơn giá: ${Number(
                    product.price
                  ).toLocaleString()} VNĐ\n  Số lượng: ${
                    product.quantity
                  }\n  Tổng tiền: ${totalPrice.toLocaleString()} VNĐ\n`;
                })
                .join("\n")}
            />
            <input
              type="hidden"
              name="total"
              value={cartArr
                .reduce((total, item) => {
                  return total + Number(item.price) * item.quantity;
                }, 0)
                .toLocaleString()}
            />
            <button onClick={orderButtonHandle} type="submit">
              Place order
            </button>
          </form>

          {/* Phần thông tin order */}
          <div className={styles.check_out_order}>
            <h1>Your order</h1>

            {/* Phần danh sách order */}
            {renderOrderList()}

            <div className={styles.check_out_order_total}>
              <h3>Total</h3>
              <p>
                {" "}
                {cartArr
                  .reduce((total, item) => {
                    return total + Number(item.price) * item.quantity;
                  }, 0)
                  .toLocaleString()}{" "}
                VND
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
