import { CREATE_JOB } from "../types";

export const createJobAction = (data) => {
  return {
    type: CREATE_JOB,
    payload: data,
  };
};
