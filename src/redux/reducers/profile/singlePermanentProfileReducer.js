import { SINGLE_PERMANENT_PROFILE } from "../../action/types";

const initialState = {};

const singlePermanentProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SINGLE_PERMANENT_PROFILE:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default singlePermanentProfileReducer;
