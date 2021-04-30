import { SINGLE_FREELANCER_PROFILE } from "../types";

export const singleFreelancerProfileAction = (data) => {
  return {
    type: SINGLE_FREELANCER_PROFILE,
    payload: data,
  };
};
