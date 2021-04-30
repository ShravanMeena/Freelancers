import { LOADER } from "../action/types";

const initialState = {};

const loaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADER:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default loaderReducer;
