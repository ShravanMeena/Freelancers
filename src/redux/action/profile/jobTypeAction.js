import { JOB_TYPE } from "../types";

export const jobTypeAction = (data) => {
  return {
    type: JOB_TYPE,
    payload: data,
  };
};
