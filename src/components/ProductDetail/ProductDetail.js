import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import styles from "./ProductDetail.module.css";
import { addToCartApi } from "../../redux/Reducers/cartToolkitReducer";
import { toast } from "react-toastify";

export default function ProductDetail(props) {
  const [isShow, setIsShow] = useState(false);
  const [inputValue, setInputValue] = useState(1);
  const { productId } = useParams();
  const { currentUser, isAuth } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Khi click vào sản phẩm liên quan
  const clickRelatedHandle = (product) => {
    setInputValue(1);
    navigate(`/detail/${product._id}`);
  };

  // Render phần sản phẩm liên quan
  const renderRelatedProduct = () => {
    return props.productRelated.map((product) => {
      return (
        <div
          onClick={() => {
            clickRelatedHandle(product);
          }}
          key={product._id}
          className={styles.product_detail_related_item}
        >
          <div className={styles.product_detail_related_item_img}>
            <img src={product.img1} alt="" />
          </div>

          <div className={styles.product_detail_related_item_info}>
            <h5>{product.name}</h5>
            <p>{Number(product.price).toLocaleString()} VND</p>
          </div>
        </div>
      );
    });
  };

  // Show Description
  const showDescriptionHandle = () => {
    setIsShow((prevState) => !prevState);
  };

  // xử lý ô input
  const inputChangeHandle = (e) => {
    setInputValue(+e.target.value);
  };

  // Xử lý nút tăng giảm
  const changeAmountHandle = (type) => {
    if (type > 0) {
      setInputValue((prevState) => +prevState + 1);
      return;
    }

    setInputValue((prevState) => prevState - 1);
    if (inputValue <= 1) {
      setInputValue(1);
      return;
    }
  };

  // Xử lý Add cart
  const addCartHandle = () => {
    if (isAuth) {
      dispatch(
        addToCartApi(
          productId,
          inputValue,
          currentUser._id,
          Cookies.get("accessToken")
        )
      );
      setInputValue(1);
    } else {
      toast.warning("Vui lòng đăng nhập để đặt hàng!", {
        onClose: () => {
          navigate("../login");
        },
      });
    }
  };

  return (
    <section id={styles.product_detail}>
      {/* phần tổng quan sản phẩm */}
      <div className={styles.product_detail_overview}>
        <div className={styles.product_detail_overview_image}>
          {/* Phần sub images */}
          <div className={styles.product_detail_sub_img}>
            <img
              onClick={() => {
                props.changeMainImg(props.productDetail[0].img1);
              }}
              src={props.productDetail.length && props.productDetail[0].img1}
              alt=""
            />
            <img
              onClick={() => {
                props.changeMainImg(props.productDetail[0].img2);
              }}
              src={props.productDetail.length && props.productDetail[0].img2}
              alt=""
            />
            <img
              onClick={() => {
                props.changeMainImg(props.productDetail[0].img3);
              }}
              src={props.productDetail.length && props.productDetail[0].img3}
              alt=""
            />
            <img
              onClick={() => {
                props.changeMainImg(props.productDetail[0].img4);
              }}
              src={props.productDetail.length && props.productDetail[0].img4}
              alt=""
            />
          </div>

          {/* Phần main images */}
          <div className={styles.product_detail_main_img}>
            <img src={props.mainImg} alt="" />
          </div>
        </div>

        <div className={styles.product_detail_overview_content}>
          <h1>{props.productDetail.length && props.productDetail[0].name}</h1>
          <h3>
            {props.productDetail.length &&
              Number(props.productDetail[0].price).toLocaleString()}{" "}
            VND
          </h3>
          <p>
            {props.productDetail.length && props.productDetail[0].short_desc}
          </p>
          <h4>
            Category:{" "}
            <span>
              {props.productDetail.length && props.productDetail[0].category}
            </span>
          </h4>
          <div className={styles.product_detail_overview_content_form}>
            <input
              onChange={inputChangeHandle}
              type="text"
              name="amount"
              value={inputValue === 0 ? "" : inputValue}
              placeholder="QUANTITY"
            />
            <div className={styles.product_detail_form_action}>
              <button
                onClick={() => {
                  changeAmountHandle(-1);
                }}
              >
                <i className="fa-solid fa-caret-left" />
              </button>
              <p>{inputValue === 0 ? 1 : inputValue}</p>
              <button
                onClick={() => {
                  changeAmountHandle(1);
                }}
              >
                <i className="fa-solid fa-caret-right" />
              </button>
            </div>

            <button onClick={addCartHandle}>Add to cart</button>
          </div>
        </div>
      </div>

      {/*  Phần mô tả chi tiết */}
      <div className={styles.product_detail_description}>
        <button onClick={showDescriptionHandle}>Description</button>

        {/*  Phần mô tả chi tiết nội dung ẩn/hiện */}
        <div
          style={{ display: isShow ? "block" : "none" }}
          className={styles.product_detail_description_content}
        >
          <h1>Product Description</h1>
          <p>
            {props.productDetail.length && props.productDetail[0].long_desc}
          </p>
        </div>
      </div>

      {/* Phần những sản phẩm có liên quan */}
      <div className={styles.product_detail_related}>
        <h1>Related product</h1>
        <div className={styles.product_detail_related_container}>
          {/* Phần từng sản phẩm cụ thể */}
          {renderRelatedProduct()}
        </div>
      </div>
    </section>
  );
}
