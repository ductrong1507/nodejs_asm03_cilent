import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../../utils/apiConfig";
import { toast } from "react-toastify";

const initialState = {
  orderList: [],
  orderDetail: null,
};

const orderReducer = createSlice({
  name: "order",
  initialState,
  reducers: {
    getOrderList: (state, action) => {
      state.orderList = action.payload;
    },

    getOrderDetail: (state, action) => {
      state.orderDetail = action.payload;
    },
  },
});

export const { getOrderList, getOrderDetail } = orderReducer.actions;

export default orderReducer.reducer;

// action thunk get order list
export const getOrderListApi = (userId, token) => {
  return async (dispatch) => {
    try {
      const responseApi = await axios({
        url: `${API_BASE_URL}/order/${userId}`,
        method: "GET",
        headers: {
          accessToken: token,
        },
      });

      if (responseApi.data.status) {
        dispatch(getOrderList(responseApi.data.result));
      }
    } catch (error) {
      console.log("initializeCartApi error: ", error);
      toast.error(error.response.data.message);
    }
  };
};

// action thunk get order detail
export const getOrderDetailApi = (userId, token, orderId) => {
  return async (dispatch) => {
    try {
      const responseApi = await axios({
        url: `${API_BASE_URL}/order/detail/${userId}?orderId=${orderId}`,
        method: "GET",
        headers: {
          accessToken: token,
        },
      });

      if (responseApi.data.status) {
        dispatch(getOrderDetail(responseApi.data.result));
      }
    } catch (error) {
      console.log("initializeCartApi error: ", error);
      toast.error(error.response.data.message);
    }
  };
};
