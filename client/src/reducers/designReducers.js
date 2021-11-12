import {
    SHOW_MAIN_DRAWER,
    HIDE_MAIN_DRAWER,
  } from "../constants/designConstants";
  
  export const designReducer = (state = { mainDrawer: false }, action) => {
    switch (action.type) {
      case SHOW_MAIN_DRAWER:
        return { mainDrawer: true };
      case HIDE_MAIN_DRAWER:
        return { mainDrawer: false };
      default:
        return state;
    }
  };
  