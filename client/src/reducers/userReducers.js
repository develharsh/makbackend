import {
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    CLEAR_ERRORS,
    CLEAR_MESSAGES,
  } from "../constants/userConstants";
  
  export const authReducer = (state = {}, action) => {
    switch (action.type) {
      case LOAD_USER_REQUEST:
        return { ...state, loading: true };
      case LOGOUT_REQUEST:
        return { ...state, loading: true };
  
      case LOGOUT_SUCCESS:
        return {
          loading: false,
          isAuthenticated: false,
        };
      case LOAD_USER_SUCCESS:
        return {
          ...state,
          loading: false,
          isAuthenticated: true
        };
      case LOAD_USER_FAIL:
        return {
          ...state,
          loading: false,
          isAuthenticated: false
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      case CLEAR_MESSAGES:
        return {
          ...state,
          message: null,
        };
  
      default:
        return state;
    }
  };
  