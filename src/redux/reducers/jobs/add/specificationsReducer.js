import { ADD_SPECIFICATIONS } from "../../../action/types";

const initialState = {
  data: [],
};

const specificationsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_SPECIFICATIONS:
      return {
        ...state,
        data: [...state.data, ...action.payload],
      };
    default:
      return state;
  }
};

export default specificationsReducer;
