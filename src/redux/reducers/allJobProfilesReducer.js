import { ALL_JOB } from "../action/types";

const initialState = {};

const allJobProfilesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_JOB:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default allJobProfilesReducer;
