import {
  CLIENT_LOGIN_REQUEST,
  CLIENT_LOGIN_SUCCESS,
  CLIENT_LOGIN_FAIL,
  CLIENT_REGISTER_REQUEST,
  CLIENT_REGISTER_SUCCESS,
  CLIENT_REGISTER_FAIL,
  CLIENT_DETAILS,
  NO_CLIENT,
  CLEAR_ERRORS,
  CLEAR_MESSAGES,
} from "../constants/clientConstants";

export const clientReducer = (state = {}, action) => {
  switch (action.type) {
    case CLIENT_LOGIN_REQUEST:
    case CLIENT_REGISTER_REQUEST:
      return { ...state, loading: true };

    case CLIENT_LOGIN_SUCCESS:
    case CLIENT_REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        client: action.payload.client,
        message: action.payload.message,
      };

    case CLIENT_LOGIN_FAIL:
    case CLIENT_REGISTER_FAIL:
      return {
        ...state,
        loading: false,
        client: null,
        error: action.payload,
      };
    case CLIENT_DETAILS:
      return {
        ...state,
        client: action.payload,
      };
    case NO_CLIENT:
      return {
        ...state,
        client: null,
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
