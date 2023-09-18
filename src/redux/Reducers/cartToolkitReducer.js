import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../utils/apiConfig";
import { toast } from "react-toastify";

const initialState = {
  cartArr: JSON.parse(localStorage.getItem("CART_ARR")) || [],
  totalItems:
    JSON.parse(localStorage.getItem("CART_ARR"))?.reduce(
      (sum, item) => sum + item.quantity,
      0
    ) || 0,
};

const cartToolkitReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initializeCart: (state, action) => {
      if (action.payload.items) {
        // Nạp cart list vào reducer + local
        state.cartArr = action.payload.items;
        localStorage.setItem(
          "CART_ARR",
          JSON.stringify(action.payload.items || [])
        );

        // Nạp totalItems vào reducer
        state.totalItems = action.payload.items.reduce(
          (sum, item) => sum + item.quantity,
          0
        );
      }
    },

    addCart: (state, action) => {
      state.totalItems += action.payload.quantity;
    },

    updateCart: (state, action) => {
      let index = state.cartArr.findIndex(
        (item) => item.product._id == action.payload.productId
      );

      // Kiểm tra xem sản phẩm còn hay hết, nếu quantity = 0 thì remove luôn
      if (action.payload.quantity + state.cartArr[index].quantity == 0) {
        state.cartArr.splice(index, 1);
      } else {
        state.cartArr[index].quantity += action.payload.quantity;
        state.totalItems += action.payload.quantity;
      }

      localStorage.setItem("CART_ARR", JSON.stringify(state.cartArr));
    },

    checkOutCart: (state, action) => {
      localStorage.removeItem("CART_ARR");
      state.totalItems = 0;
      state.cartArr = [];
    },
  },
});

export const { initializeCart, addCart, updateCart, checkOutCart } =
  cartToolkitReducer.actions;

export default cartToolkitReducer.reducer;

// action thunk call API lấy thông tin giỏ hàng
export const initializeCartApi = (userId, token) => {
  return async (dispatch) => {
    try {
      const responseApi = await axios({
        url: `${API_BASE_URL}/order/view/${userId}`,
        method: "GET",
        headers: {
          accessToken: token,
        },
      });
      dispatch(initializeCart(responseApi.data.result));
    } catch (error) {
      console.log("initializeCartApi error: ", error);
      toast.error(error.response.data.message);
    }
  };
};

// action thunk thêm giỏ hàng
export const addToCartApi = (productId, quantity, userId, token) => {
  return async (dispatch) => {
    try {
      const responseApi = await axios({
        url: `${API_BASE_URL}/order/add-to-cart/${userId}`,
        method: "POST",
        headers: {
          accessToken: token,
        },
        data: {
          productId,
          quantity,
        },
      });

      if (responseApi.data.status) {
        dispatch(addCart({ productId, quantity }));
      }
    } catch (error) {
      console.log("initializeCartApi error: ", error);
      toast.error(error.response.data.message);
    }
  };
};

// action thunk update giỏ hàng
export const updateCartApi = (productId, quantity, userId, token) => {
  return async (dispatch) => {
    try {
      const responseApi = await axios({
        url: `${API_BASE_URL}/order/add-to-cart/${userId}`,
        method: "POST",
        headers: {
          accessToken: token,
        },
        data: {
          productId,
          quantity,
        },
      });
      if (responseApi.data.status) {
        dispatch(updateCart({ productId, quantity }));
      }
    } catch (error) {
      console.log("initializeCartApi error: ", error);
      toast.error(error.response.data.message);
    }
  };
};

// action thunk checkout giỏ hàng
export const checkOutCartApi = (paymentStatus, paymentAt, userId, token) => {
  return async (dispatch) => {
    try {
      const responseApi = await axios({
        url: `${API_BASE_URL}/order/chekout/${userId}`,
        method: "PUT",
        headers: {
          accessToken: token,
        },
        data: {
          paymentStatus,
          paymentAt,
        },
      });

      if (responseApi.data.status) {
        toast.success(responseApi.data.message);

        dispatch(checkOutCart());
      }
    } catch (error) {
      toast.error("Thanh toán thất bại xin thử lại!");
      console.log("initializeCartApi error: ", error);
    }
  };
};
