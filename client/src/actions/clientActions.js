import axios from "axios";
import cookie from "react-cookies";
import { API_URL } from "../config/keys";
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
  try {
    dispatch({ type: CLIENT_REGISTER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `${API_URL}/api/v1/client/signup`,
      { name, email, phone, password },
      config
    );
    dispatch({
      type: LOAD_USER_SUCCESS,
    });
    dispatch({
      type: CLIENT_REGISTER_SUCCESS,
      payload: { client: data.user, message: "Registered Successfully." },
    });
    cookie.save("token", data.token);
  } catch (error) {
    dispatch({
      type: CLIENT_REGISTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const login = (ID, password) => async (dispatch) => {
  try {
    dispatch({ type: CLIENT_LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `${API_URL}/api/v1/client/login`,
      { ID, password },
      config
    );
    dispatch({
      type: LOAD_USER_SUCCESS,
    });
    dispatch({
      type: CLIENT_LOGIN_SUCCESS,
      payload: { client: data.user, message: "Logged In." },
    });
    cookie.save("token", data.token);
  } catch (error) {
    dispatch({
      type: CLIENT_LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const clearMessages = () => async (dispatch) => {
  dispatch({ type: CLEAR_MESSAGES });
};
