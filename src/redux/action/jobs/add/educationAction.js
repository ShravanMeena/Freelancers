import { ADD_EDUCATION } from "../../types";

export const educationAction = (data) => {
  return {
    type: ADD_EDUCATION,
    payload: data,
  };
};
