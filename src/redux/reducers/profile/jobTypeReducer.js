import { JOB_TYPE } from "../../action/types";

const initialState = {};

const jobTypeReducer = (state = initialState, action) => {
  switch (action.type) {
    case JOB_TYPE:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default jobTypeReducer;
