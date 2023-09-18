import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import styles from "./ShoppingCart.module.css";
import { updateCartApi } from "../../redux/Reducers/cartToolkitReducer";

export default function CartItem(props) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.AuthReducer);

  // xử lý nút remove
  const removeClickHandle = (productId, maxQuantity) => {
    dispatch(
      updateCartApi(
        productId,
        -maxQuantity,
        currentUser._id,
        Cookies.get("accessToken")
      )
    );
  };

  // xử lý nút tăng giảm
  const updateQuantityHandle = (productId, quantity) => {
    dispatch(
      updateCartApi(
        productId,
        quantity,
        currentUser._id,
        Cookies.get("accessToken")
      )
    );
  };

  return (
    <tr>
      <td className={styles.item_img}>
        <img src={props.item.img1} alt="images" />
      </td>
      <td className={styles.item_name}>{props.item.name}</td>
      <td className={styles.item_price}>
        {Number(props.item.price).toLocaleString()} VND
      </td>
      <td className={styles.item_quantity}>
        <div className={styles.item_quantity_container}>
          <button
            onClick={() => {
              updateQuantityHandle(props.item._id, -1);
            }}
          >
            <i className="fa-solid fa-caret-left" />
          </button>
          <p>{props.item.quantity}</p>
          <button
            onClick={() => {
              updateQuantityHandle(props.item._id, 1);
            }}
          >
            <i className="fa-solid fa-caret-right" />
          </button>
        </div>
      </td>
      <td className={styles.item_total}>
        {(Number(props.item.price) * props.item.quantity).toLocaleString()} VND
      </td>
      <td className={styles.item_remove}>
        <i
          onClick={() => {
            removeClickHandle(props.item._id, props.item.quantity);
          }}
          className="fa-solid fa-trash-can"
        />
      </td>
    </tr>
  );
}
