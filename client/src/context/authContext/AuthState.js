import React, { useReducer } from "react";
import axios from "axios";
import authReducer from "../authContext/authReducer";
import AuthContext from "../authContext/authContext";
import setToken from "../../utils/setToken";
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

const AuthState = (props) => {
  const intialState = {
    token: localStorage.getItem('token'),
    loading: true,
    user: null,
    userAuth: null,
    errors: null,
  };
  const [state, dispatch] = useReducer(authReducer, intialState);

  // Get User
  const getUser = async () => {
    if (localStorage.token) {
      setToken(localStorage.token);
    }
    try {
      const res = await axios.get("/auth");
      dispatch({
        type: SET_USER,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: AUTH_ERROR,
        payload: err,
      });
    }
  };

  //Register User
  const registerUser = async (userData) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/register", userData, config);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data,
      });
    }
  };

  //login user
  const loginUser = async (userData) => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    try {
      const res = await axios.post("/auth", userData, config);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data,
      });
    }
  };

  //set errors
  const setError = (err) => {
    dispatch({
      type: SET_ERROR,
      payload: err,
    });
  };

  // Clear Error
  const clearError = () => dispatch({ type: CLEAR_ERROR });

  // Logout
  const logout = () => dispatch({ type: LOGOUT });

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        loading: state.loading,
        user: state.user,
        userAuth: state.userAuth,
        errors: state.errors,
        getUser,
        registerUser,
        loginUser,
        setError,
        clearError,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
