import Cookies from "js-cookie";

const initialState = {
  isAuth: JSON.parse(localStorage.getItem("CURRENT_USER")) ? true : null,
  currentUser: JSON.parse(localStorage.getItem("CURRENT_USER")) || null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ON_LOGIN": {
      console.log("login reducer", action);
      const currentUser = {
        ...action.data.result,
        accessToken: action.data.accessToken,
      };
      console.log("currentUser reducer", currentUser);

      localStorage.setItem("CURRENT_USER", JSON.stringify(currentUser));
      Cookies.set("accessToken", action.data.accessToken, { expires: 7 });
      return {
        ...state,
        isAuth: true,
        currentUser,
      };
    }

    case "ON_LOGOUT": {
      localStorage.removeItem("CURRENT_USER");
      Cookies.remove("accessToken");
      return { ...state, isAuth: null, currentUser: null };
    }

    default:
      return { ...state };
  }
};

export default AuthReducer;
