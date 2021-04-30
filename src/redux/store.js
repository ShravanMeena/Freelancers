import { createStore, combineReducers } from "redux";
import userReducer from "./reducers/userReducer";
import allJobProfilesReducer from "./reducers/allJobProfilesReducer";
import singleJobDetailsReducer from "./reducers/singleJobDetailsReducer";
import sessionReducer from "./reducers/sessionReducer";

import jobTypeReducer from "./reducers/profile/jobTypeReducer";
import createJobReducer from "./reducers/profile/createJobReducer";
import jobProfilesReducer from "./reducers/profile/jobProfilesReducer";

import singleDeliveryBoyProfileReducer from "./reducers/profile/singleDeliveryBoyProfileReducer";
import singlePermanentProfileReducer from "./reducers/profile/singlePermanentProfileReducer";
import singleFreelancerProfileReducer from "./reducers/profile/singleFreelancerProfileReducer";

// add jobs
import experienceReducer from "./reducers/jobs/add/experienceReducer";
import educationReducer from "./reducers/jobs/add/educationReducer";
import skillsReducer from "./reducers/jobs/add/skillsReducer";
import specificationsReducer from "./reducers/jobs/add/specificationsReducer";

import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import { LOG_OUT } from "../redux/action/types";

import loaderReducer from "../redux/reducers/loaderReducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: [
    "userReducer",
    "allJobProfilesReducer",
    "singleJobDetailsReducer",
    "jobTypeReducer",
    "sessionReducer",
    "createJobReducer",
    "jobProfilesReducer",

    "singleDeliveryBoyProfileReducer",
    "singlePermanentProfileReducer",
    "singleFreelancerProfileReducer",

    "experienceReducer",
    "educationReducer",
    "skillsReducer",
    "specificationsReducer",

    "loaderReducer",
  ],
};

const rootReducer = combineReducers({
  userReducer,
  allJobProfilesReducer,
  singleJobDetailsReducer,
  jobTypeReducer,
  sessionReducer,
  createJobReducer,
  jobProfilesReducer,

  singleDeliveryBoyProfileReducer,
  singlePermanentProfileReducer,
  singleFreelancerProfileReducer,

  experienceReducer,
  educationReducer,
  skillsReducer,
  specificationsReducer,

  loaderReducer,
});

const logoutReducer = (state, action) => {
  if (action.type === LOG_OUT) {
    state = undefined;
    console.log("clear data, i m from store logout");
  }
  return rootReducer(state, action);
};

const persistedReducer = persistReducer(persistConfig, logoutReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
