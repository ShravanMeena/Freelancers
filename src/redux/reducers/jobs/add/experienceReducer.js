import { ADD_EXPERIENCE } from "../../../action/types";

const initialState = {
  data: [],
};

const experienceReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EXPERIENCE:
      return {
        ...state,
        data: [...state.data, ...action.payload],
      };
    default:
      return state;
  }
};

export default experienceReducer;
