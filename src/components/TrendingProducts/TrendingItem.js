import React from "react";
import { useDispatch } from "react-redux";
import styles from "./TrendingItem.module.css";

export default function TrendingItem(props) {
  const dispatch = useDispatch();

  // XỬ lý click vào sản phẩm ẩn hiện modal
  const clickTrendingProductHandle = () => {
    dispatch({
      type: "SHOW_POPUP",
      data: props.productDetail,
    });
  };

  return (
    <div onClick={clickTrendingProductHandle} className={styles.product_item}>
      <div className={styles.product_item_img}>
        <img src={props.productDetail.img1} />
      </div>

      <div className={styles.product_item_info}>
        <h5>{props.productDetail.name}</h5>
        <p>{Number(props.productDetail.price).toLocaleString()} VND</p>
      </div>
    </div>
  );
}
