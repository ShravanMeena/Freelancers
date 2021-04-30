import { ADD_SPECIFICATIONS } from "../../types";

export const specificationsAction = (data) => {
  return {
    type: ADD_SPECIFICATIONS,
    payload: data,
  };
};
