import { SESSION_ACTIVE, SESSION_UPDATE } from "../action/types";

const initialState = {
  data: {},
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case SESSION_ACTIVE:
      return {
        ...state,
        // token: action.payload,
      };
    case SESSION_UPDATE:
      const newState = Object.assign({}, state);
      newState.data = action.payload;
      return newState;

    default:
      return state;
  }
};

export default sessionReducer;
