import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProductItem.module.css";

export default function ProductItem(props) {
  const navigate = useNavigate();

  const clickViewDetailHandle = () => {
    navigate(`/detail/${props.productItem._id}`);
  };
  return (
    <div onClick={clickViewDetailHandle} className={styles.product_list_item}>
      <div className={styles.product_item_img}>
        <img src={props.productItem.img1} alt="ProductItem img" />
      </div>

      <div className={styles.product_item_info}>
        <h5>{props.productItem.name}</h5>
        <p>{Number(props.productItem.price).toLocaleString()} VND</p>
      </div>
    </div>
  );
}
