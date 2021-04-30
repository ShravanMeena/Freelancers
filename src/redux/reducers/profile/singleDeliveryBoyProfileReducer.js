import { SINGLE_JOB_PROFILE } from "../../action/types";

const initialState = {};

const singleDeliveryBoyProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SINGLE_JOB_PROFILE:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default singleDeliveryBoyProfileReducer;
