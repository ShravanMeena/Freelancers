import { SINGLE_FREELANCER_PROFILE } from "../../action/types";

const initialState = {};

const singleFreelancerProfileReducer = (state = initialState, action) => {
  switch (action.type) {
    case SINGLE_FREELANCER_PROFILE:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default singleFreelancerProfileReducer;
