import { GET_JOB_PROFILE } from "../../action/types";

const initialState = {};

const jobProfilesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_JOB_PROFILE:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
};

export default jobProfilesReducer;
