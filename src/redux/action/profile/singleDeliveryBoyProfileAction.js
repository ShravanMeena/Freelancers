import { SINGLE_JOB_PROFILE } from "../types";

export const singleDeliveryBoyProfileAction = (data) => {
  return {
    type: SINGLE_JOB_PROFILE,
    payload: data,
  };
};
