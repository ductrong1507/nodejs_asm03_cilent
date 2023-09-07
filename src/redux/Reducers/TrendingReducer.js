const initialState = {
  isShowModal: false,
  productDetail: {},
};

const TrendingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_POPUP": {
      return {
        ...state,
        isShowModal: true,
        productDetail: action.data,
      };
    }
    case "HIDE_POPUP": {
      return {
        ...state,
        isShowModal: false,
        productDetail: {},
      };
    }
    default:
      return state;
  }
};

export default TrendingReducer;
