import { SINGLE_PERMANENT_PROFILE } from "../types";

export const singlePermanentProfileAction = (data) => {
  return {
    type: SINGLE_PERMANENT_PROFILE,
    payload: data,
  };
};
