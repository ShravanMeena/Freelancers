import React from "react";
import "./App.css";
import Landing from "./pages/Landing";
import Home from "./pages/home/Home";
import Login from "./pages/onboarding/Login";
import Signup from "./pages/onboarding/Signup";
import OtpValidation from "./pages/onboarding/OtpValidation";
import JobDetails from "./pages/jobs/JobDetails";
import JobSetting from "./pages/jobs/JobSetting";
import AccountSetting from "./pages/AccountSetting";
import MyApplications from "./pages/applications/MyApplications";
import Create from "./pages/profile/Create";

import { BrowserRouter, Switch, Route } from "react-router-dom";

// redux ofline or redux persist
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Switch>
            {/* landing  */}
            <Route exact path='/' component={Landing} />
            <Route path='/home' component={Home} />
            <Route path='/details' component={JobDetails} />
            <Route path='/login' component={Login} />
            <Route path='/register' component={Signup} />
            <Route path='/otp_validation' component={OtpValidation} />
            <Route path='/job_setting' component={JobSetting} />
            <Route path='/account_setting' component={AccountSetting} />
            <Route path='/applications' component={MyApplications} />
            <Route path='/create_profile' component={Create} />
          </Switch>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
