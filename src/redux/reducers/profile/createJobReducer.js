import { CREATE_JOB } from "../../action/types";

const initialState = {};

const createJobReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_JOB:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default createJobReducer;
