import React from "react";
import { useDispatch } from "react-redux";
import styles from "./ShoppingCart.module.css";

export default function CartItem(props) {
  const dispatch = useDispatch();

  // xử lý nút remove
  const removeClickHandle = (id) => {
    dispatch({
      type: "DELETE_CART",
      data: {
        id,
      },
    });
  };

  // xử lý nút tăng giảm
  const updateQuantityHandle = (id, type) => {
    dispatch({
      type: "UPDATE_CART",
      data: {
        id,
        type,
      },
    });
  };

  return (
    <tr>
      <td className={styles.item_img}>
        <img src={props.item.image} alt="images" />
      </td>
      <td className={styles.item_name}>{props.item.name}</td>
      <td className={styles.item_price}>
        {Number(props.item.price).toLocaleString()} VND
      </td>
      <td className={styles.item_quantity}>
        <div className={styles.item_quantity_container}>
          <button
            onClick={() => {
              updateQuantityHandle(props.item.id, -1);
            }}
          >
            <i className="fa-solid fa-caret-left" />
          </button>
          <p>{props.item.quantity}</p>
          <button
            onClick={() => {
              updateQuantityHandle(props.item.id, 1);
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
            removeClickHandle(props.item.id);
          }}
          className="fa-solid fa-trash-can"
        />
      </td>
    </tr>
  );
}
