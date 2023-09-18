import Axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "./ProductItem";
import styles from "./ProductList.module.css";
import { API_BASE_URL } from "../../utils/apiConfig";
import { toast } from "react-toastify";

export default function ProductList() {
  const { productListArr, category } = useSelector(
    (state) => state.ShopListReducer
  );
  const dispatch = useDispatch();

  // render danh sách sản phẩm
  const renderProductList = () => {
    return productListArr.map((product, index) => {
      return <ProductItem productItem={product} key={index} />;
    });
  };

  // xử lý việc search sản phẩm thông qua nhập tên
  const searchHandle = (e) => {
    const promise = Axios({
      url: `${API_BASE_URL}/product?page=1&perPage=10&searchWord=${e.target.value}`,
      method: "GET",
    });

    promise
      .then((res) => {
        const filterSearch = res.data.result;

        dispatch({
          type: "SEARCH_PRODUCT",
          data: {
            filterSearch,
            category: e.target.value,
          },
        });
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  // xử lý việc chọn input select
  const selectChangeHandle = (e) => {
    dispatch({
      type: "SORT_PRODUCT",
      data: e.target.value,
    });
  };

  return (
    <div id={styles.product_list}>
      {/* Phần tìm kiếm, sort sản phẩm  */}
      <div className={styles.product_list_action}>
        <div className={styles.product_list_action_search}>
          <input
            onChange={searchHandle}
            type="text"
            placeholder="Enter Search Here!"
          />
        </div>

        <div className={styles.product_list_action_sort}>
          <select onChange={selectChangeHandle}>
            <option value="default">Default sorting</option>
            <option value="price_asc">Price ascending</option>
            <option value="price_desc">Price descending</option>
          </select>
        </div>
      </div>

      {productListArr.length === 0 ? (
        <div className={styles.product_list_not_found}>
          {category + ` Not Found!!!`}
        </div>
      ) : (
        <div className={styles.product_list_container}>
          {renderProductList()}
        </div>
      )}
    </div>
  );
}
