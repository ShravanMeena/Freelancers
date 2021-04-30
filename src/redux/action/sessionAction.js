import { SESSION_ACTIVE, SESSION_UPDATE } from "./types";

export const sessionAction = (data) => {
  return {
    type: SESSION_ACTIVE,
    payload: data,
  };
};

export const sessionUpdateAction = (data) => {
  return {
    type: SESSION_UPDATE,
    payload: data,
  };
};
