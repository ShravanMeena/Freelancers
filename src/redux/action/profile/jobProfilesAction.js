import { GET_JOB_PROFILE } from "../types";

export const jobProfilesAction = (data) => {
  return {
    type: GET_JOB_PROFILE,
    payload: data,
  };
};
