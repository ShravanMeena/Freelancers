import { ADD_SKILLS } from "../../../action/types";

const initialState = {
  data: [],
};

const skillsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SKILLS:
      return {
        ...state,
        data: [...state.data, ...action.payload],
      };
    default:
      return state;
  }
};

export default skillsReducer;
