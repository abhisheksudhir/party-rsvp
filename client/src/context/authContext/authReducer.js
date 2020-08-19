import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_ERROR,
  CLEAR_ERROR,
  LOGOUT,
  SET_USER,
  AUTH_ERROR,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload,
        userAuth: true,
        loading: false,
        errors: null,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        userAuth: true,
        loading: false,
        errors: null,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case LOGOUT:
    case AUTH_ERROR:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        userAuth: null,
        user: null,
        loading: null,
        errors: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        errors: action.payload,
      };
    case CLEAR_ERROR:
      return {
        ...state,
        errors: null,
      };

    default:
      return state;
  }
};
