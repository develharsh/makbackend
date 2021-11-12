import axios from "axios";
import cookie from "react-cookies";
import { API_URL } from "../config/keys";
import {
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  CLEAR_ERRORS,
  CLEAR_MESSAGES,
} from "../constants/userConstants";
import { CLIENT_DETAILS, NO_CLIENT } from "../constants/clientConstants";

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    const config = { headers: { Authorization: cookie.load("token") } };
    const { data } = await axios.get(
      `${API_URL}/api/v1/common/profile`,
      config
    );
    if (data.user.type === "client")
      dispatch({
        type: CLIENT_DETAILS,
        payload: data.user,
      });
    dispatch({
      type: LOAD_USER_SUCCESS,
    });
  } catch (error) {
    cookie.remove("token");
    dispatch({ type: LOAD_USER_FAIL });
  }
};

export const logOut = () => async (dispatch) => {
  try {
    dispatch({ type: LOGOUT_REQUEST });
    const config = { headers: { Authorization: cookie.load("token") } };
    const { data } = await axios.get(`${API_URL}/api/v1/common/logout`, config);
    cookie.remove("token");
    dispatch({
      type: LOGOUT_SUCCESS,
    });
    if (data.type === "client")
      dispatch({
        type: NO_CLIENT,
      });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};

export const clearMessages = () => async (dispatch) => {
  dispatch({ type: CLEAR_MESSAGES });
};
