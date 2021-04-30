import { ADD_EXPERIENCE } from "../../types";

export const experienceAction = (data) => {
  return {
    type: ADD_EXPERIENCE,
    payload: data,
  };
};
