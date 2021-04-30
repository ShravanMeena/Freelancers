import { SINGLE_JOB } from "../action/types";

const initialState = {};

const singleJobDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SINGLE_JOB:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default singleJobDetailsReducer;
