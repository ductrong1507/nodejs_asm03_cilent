const initialState = {
  productListArr: [],
  category: "",
  newCategory: "",
};

const ShopListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SHOP_SHOW_ALL": {
      return { ...state, productListArr: action.data };
    }

    case "FILTER_PRODUCT": {
      return {
        ...state,
        productListArr: action.data.filterList,
        category: action.data.category,
      };
    }

    case "SEARCH_PRODUCT": {
      return {
        ...state,
        productListArr: action.data.filterSearch,
        category: action.data.category,
      };
    }

    case "SORT_PRODUCT": {
      let newState = [...state.productListArr];

      if (action.data === "price_asc") {
        newState = newState.sort((a, b) => {
          return Number(a.price) - Number(b.price);
        });
      } else if (action.data === "price_desc") {
        newState = newState.sort((a, b) => {
          return Number(b.price) - Number(a.price);
        });
      } else {
        newState = newState.sort((a, b) => {
          return b.name - a.name;
        });
      }

      return {
        ...state,
        productListArr: newState,
      };
    }

    default:
      return state;
  }
};

export default ShopListReducer;
