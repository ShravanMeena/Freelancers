import { ALL_JOB, SINGLE_JOB } from "./types";

export const allJobProfilesAction = (data) => {
  return {
    type: ALL_JOB,
    payload: data,
  };
};

export const singleJobDetailsAction = (data) => {
  return {
    type: SINGLE_JOB,
    payload: data,
  };
};
