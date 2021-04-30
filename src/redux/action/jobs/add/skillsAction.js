import { ADD_SKILLS } from "../../types";

export const skillsAction = (data) => {
  return {
    type: ADD_SKILLS,
    payload: data,
  };
};
