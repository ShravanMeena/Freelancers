import { USER_INFO } from "./types";

export const userAction = (data) => {
  return {
    type: USER_INFO,
    payload: data,
  };
};
