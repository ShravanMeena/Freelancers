import React, { Component } from "react";
import "../style/pages/_accountSetting.scss";
import Setting from "../assets/setting.svg";
import Help from "../assets/help.svg";
import Privacy from "../assets/privacy.svg";
import Conditions from "../assets/conditions.svg";
import More from "../assets/more.svg";

import AccountSettingComponent from "../component/accounSetting/AccountSetting";
import PasswordUpdate from "../component/accounSetting/PasswordUpdate";
import HelpAndSupport from "../component/accounSetting/HelpAndSupport";
import PrivacyPolicy from "../component/accounSetting/PrivacyPolicy";

import Header from "../component/header/InnerHeader";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class AccountSetting extends Component {
  constructor() {
    super();
    this.state = {
      currentSetting: "AccountSettingComponent",
    };
  }

  AccountSettng = () => {
    this.setState({
      currentSetting: "AccountSettingComponent",
    });
  };
  PasswordUpdate = () => {
    this.setState({
      currentSetting: "PasswordUpdate",
    });
  };
  HelpAndSupport = () => {
    this.setState({
      currentSetting: "HelpAndSupport",
    });
  };
  PrivactPolicy = () => {
    this.setState({
      currentSetting: "PrivacyPolicy",
    });
  };
  Conditions = () => {
    alert("nothing ");
  };

  render() {
    if (!(this.props.getSessionData.data === "1")) {
      return <Redirect to='./' />;
    }

    return (
      <div>
        <Header
          AccountSettng={this.AccountSettng}
          HelpAndSupport={this.HelpAndSupport}
          PrivactPolicy={this.PrivactPolicy}
          PasswordUpdate={this.PasswordUpdate}
          Conditions={this.Conditions}
        />
        <div className='accountSettingContainer'>
          <div className='mainAccountSettingLeft'>
            {/* single setting start */}
            <div className='accountSettingLeft'>
              {/* Account setting button start */}
              <button
                onClick={this.AccountSettng}
                className='innerAccountSettingLeft'>
                <div className='innerSettingTitleContainer'>
                  <img alt='landing' src={Setting} />
                  <h4>Account Setting</h4>
                </div>
                <img alt='landing' src={More} />
              </button>
              {/* Account setting button end */}
              {/* Account setting button start */}
              <button
                onClick={this.PasswordUpdate}
                className='innerAccountSettingLeft'>
                <div className='innerSettingTitleContainer'>
                  <img alt='landing' src={Setting} />
                  <h4>Password Update</h4>
                </div>
                <img alt='landing' src={More} />
              </button>
              {/* Account setting button end */}
              {/* Account setting button start */}
              <button
                onClick={this.HelpAndSupport}
                className='innerAccountSettingLeft'>
                <div className='innerSettingTitleContainer'>
                  <img alt='landing' src={Help} />
                  <h4>Help and support</h4>
                </div>
                <img alt='landing' src={More} />
              </button>
              {/* Account setting button end */}
              {/* Account setting button start */}
              <button
                onClick={this.PrivactPolicy}
                className='innerAccountSettingLeft'>
                <div className='innerSettingTitleContainer'>
                  <img alt='landing' src={Privacy} />
                  <h4>Privacy Policy</h4>
                </div>
                <img alt='landing' src={More} />
              </button>
              {/* Account setting button end */}
              {/* Account setting button start */}
              <button
                onClick={this.Conditions}
                className='innerAccountSettingLeft'>
                <div className='innerSettingTitleContainer'>
                  <img alt='landing' src={Conditions} />
                  <h4>Terms and Conditions</h4>
                </div>
                <img alt='landing' src={More} />
              </button>
              {/* Account setting button end */}
            </div>
            {/* single setting start */}
          </div>
          <div className='accountSettingRight'>
            {this.state.currentSetting === "AccountSettingComponent" ? (
              <AccountSettingComponent />
            ) : null}

            {this.state.currentSetting === "PasswordUpdate" ? (
              <PasswordUpdate />
            ) : null}

            {this.state.currentSetting === "HelpAndSupport" ? (
              <HelpAndSupport />
            ) : null}

            {this.state.currentSetting === "PrivacyPolicy" ? (
              <PrivacyPolicy />
            ) : null}

            {this.state.currentSetting === "Conditions" ? <Conditions /> : null}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getCurrentNetworkDetailsData: state.currentNetworkDetailsReducer,
    getSessionData: state.sessionReducer,
  };
};

export default connect(mapStateToProps, null)(AccountSetting);
