import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetail from "../components/ProductDetail/ProductDetail";
import MoreInfo from "../components/MoreInfo/MoreInfo";
import { API_BASE_URL } from "../utils/apiConfig";
import { toast } from "react-toastify";

export default function DetailPage(props) {
  const params = useParams();
  const [productDetail, setProductDetail] = useState([]);
  const [productRelated, setProductRelated] = useState([]);
  const [mainImg, setMainImg] = useState("");

  useEffect(() => {
    // lấy danh sách sản phẩm
    fetchApiProductList();
  }, [params.productId]);

  // Hàm call API lấy danh sách sản phẩm
  const fetchApiProductList = () => {
    const promise = Axios({
      url: `${API_BASE_URL}/product/${params.productId}`,
      method: "GET",
    });

    promise
      .then((res) => {
        if (res.data.status) {
          const product = res.data.result;
          toast.success(res.data.message);

          setProductDetail([product]);
          setMainImg(product.img1);
          setProductRelated(res.data.relatedProduct);
        }

        // const product = res.data.filter(
        //   (product) => product._id.$oid === params.productId
        // );
        // const related = res.data.filter(
        //   (relatedProduct) =>
        //     relatedProduct.category === product[0].category &&
        //     relatedProduct._id.$oid !== params.productId
        // );
        // setProductDetail(product);
        // setMainImg(product[0].img1);
        // setProductRelated(related);
        // return {
        //   product,
        //   total: res.data,
        // };
      })

      .catch((error) => {
        console.log("error", error);
        toast.error(error.response.data.message);
      });
  };

  // Hàm thay đổi hình ảnh khi click vào những hỉnh nhỏ
  const changeMainImg = (img) => {
    setMainImg(img);
  };

  return (
    <main className="w-70">
      <ProductDetail
        productDetail={productDetail}
        productRelated={productRelated}
        mainImg={mainImg}
        changeMainImg={changeMainImg}
      />
      <MoreInfo />
    </main>
  );
}
