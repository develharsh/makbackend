import cookie from "react-cookies";
import {
  CLIENT_LOGIN_REQUEST,
  CLIENT_LOGIN_SUCCESS,
  CLIENT_LOGIN_FAIL,
  CLIENT_REGISTER_REQUEST,
  CLIENT_REGISTER_SUCCESS,
  CLIENT_REGISTER_FAIL,
  CLEAR_ERRORS,
  CLEAR_MESSAGES,
} from "../constants/clientConstants";
import { LOAD_USER_SUCCESS } from "../constants/userConstants";

export const signup = (name, email, phone, password) => async (dispatch) => {
  dispatch({ type: CLIENT_REGISTER_REQUEST });
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, phone, password }),
  };

  await fetch(`/api/v1/client/signup`, config)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        dispatch({
          type: LOAD_USER_SUCCESS,
        });
        dispatch({
          type: CLIENT_REGISTER_SUCCESS,
          payload: { client: data.user, message: "Registered Successfully." },
        });
        cookie.save("token", data.token);
      } else
        dispatch({
          type: CLIENT_REGISTER_FAIL,
          payload: data.message,
        });
    })
    .catch((err) => {
      dispatch({
        type: CLIENT_REGISTER_FAIL,
        payload: 'Please Try Again.',
      });
    });
};

export const login = (ID, password) => async (dispatch) => {
  dispatch({ type: CLIENT_LOGIN_REQUEST });

  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ID, password }),
  };

  await fetch(`/api/v1/client/login`, config)
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        dispatch({
          type: LOAD_USER_SUCCESS,
        });
        dispatch({
          type: CLIENT_LOGIN_SUCCESS,
          payload: { client: data.user, message: "Logged In." },
        });
        cookie.save("token", data.token);
      } else
        dispatch({
          type: CLIENT_LOGIN_FAIL,
          payload: data.message,
        });
    }).catch((err)=>{
      dispatch({
        type: CLIENT_LOGIN_FAIL,
        payload:"Please Try Again.",
      });
    });
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const clearMessages = () => async (dispatch) => {
  dispatch({ type: CLEAR_MESSAGES });
};
