import { ADD_EDUCATION } from "../../../action/types";

const initialState = {
  data: [],
};

const educationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EDUCATION:
      return {
        ...state,
        data: [...state.data, ...action.payload],
      };
    default:
      return state;
  }
};

export default educationReducer;
