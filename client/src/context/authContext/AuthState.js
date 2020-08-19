import React, { useReducer } from "react";
import axios from "axios";
import authReducer from "../authContext/authReducer";
import AuthContext from "../authContext/authContext";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  SET_ERROR,
  CLEAR_ERROR,
} from "../types";

const AuthState = (props) => {
  const intialState = {
    userAuth: null,
    errors: null,
  };
  const [state, dispatch] = useReducer(authReducer, intialState);

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

  return (
    <AuthContext.Provider
      value={{
        userAuth: state.userAuth,
        errors: state.errors,
        registerUser,
        loginUser,
        setError,
        clearError,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
