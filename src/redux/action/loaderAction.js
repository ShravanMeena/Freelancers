import { LOADER } from "./types";

export const loaderAction = (data) => {
  return {
    type: LOADER,
    payload: data,
  };
};
