import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styles from "./TrendingPopup.module.css";

export default function TrendingPopup(props) {
  const modalState = useSelector((state) => state.TrendingReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // xử lý khi click vào lớp overlay bên ngoài
  const closeModalOverlayHandle = (e) => {
    if (e.target == e.currentTarget) {
      dispatch({
        type: "HIDE_POPUP",
      });
    }
  };

  // Xử lý nút close
  const closeModalBtnHandle = (e) => {
    dispatch({
      type: "HIDE_POPUP",
    });
  };

  // Xử lý nút view detail
  const viewDetailHandle = () => {
    navigate(`/detail/${modalState.productDetail._id}`);
  };

  return (
    <section
      onClick={closeModalOverlayHandle}
      style={{ display: modalState.isShowModal ? "" : "none" }}
      id={styles.modal}
    >
      <div className={styles.modal_container}>
        <div className={styles.modal_image}>
          <img src={modalState.productDetail.img1} />
        </div>
        <div className={styles.modal_content}>
          <h1>{modalState.productDetail.name}</h1>
          <h3>{Number(modalState.productDetail.price).toLocaleString()} VND</h3>
          <p>{modalState.productDetail.short_desc}</p>
          <button onClick={viewDetailHandle}>
            <i className="fa-solid fa-file-lines" />

            <span>View Detail</span>
          </button>
        </div>

        <div className={styles.modal_close_btn}>
          <button onClick={closeModalBtnHandle}>
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
      </div>
    </section>
  );
}
