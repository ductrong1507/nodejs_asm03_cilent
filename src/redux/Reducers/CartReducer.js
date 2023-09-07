const initialState = {
  cartArr: JSON.parse(localStorage.getItem("CART_ARR")) || [],
};

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CART": {
      // let newCartArr = state.cartArr;
      // tìm kiếm xem sản phẩm có trong giỏ hàng chưa
      const index = state.cartArr.findIndex(
        (item) => item.id === action.data.product._id
      );

      // nếu sản phẩm có trong giỏ hàng
      if (index !== -1) {
        state.cartArr[index].quantity += action.data.amount;
      } else {
        // nếu sản phẩm chưa có trong giỏ hàng
        state.cartArr.push({
          id: action.data.product._id,
          name: action.data.product.name,
          image: action.data.product.img1,
          price: action.data.product.price,
          quantity: action.data.amount,
        });
      }

      localStorage.setItem("CART_ARR", JSON.stringify(state.cartArr));
      // return state;
      return {
        ...state,
      };
    }

    case "DELETE_CART": {
      const newCartArr = state.cartArr.filter(
        (item) => item.id !== action.data.id
      );
      localStorage.setItem("CART_ARR", JSON.stringify(newCartArr));

      if (newCartArr.length === 0) {
        localStorage.removeItem("CART_ARR");
      }
      return { ...state, cartArr: newCartArr };
    }

    case "UPDATE_CART": {
      // tìm vị trí sản phẩm trong giỏ hàng
      const index = state.cartArr.findIndex(
        (item) => item.id === action.data.id
      );

      if (action.data.type < 0) {
        state.cartArr[index].quantity -= 1;
      } else {
        state.cartArr[index].quantity += 1;
      }

      localStorage.setItem("CART_ARR", JSON.stringify(state.cartArr));
      return state;

      // return { ...state };
    }

    case "DELETE_ALL_CART": {
      localStorage.removeItem("CART_ARR");

      return { ...state, cartArr: [] };
    }

    default:
      return state;
  }
};

export default CartReducer;
