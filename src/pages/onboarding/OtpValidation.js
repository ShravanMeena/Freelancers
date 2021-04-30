import React, { Component } from "react";
import "../../style/pages/onboarding/_otpValidation.scss";
import axios from "axios";
import { userAction } from "../../redux/action/userAction";
import { connect } from "react-redux";
import Header from "../../component/header/OuterHeader";
import Verification from "../../assets/verification.svg";

class OtpValidation extends Component {
  constructor() {
    super();
    this.state = {
      otp: "",
      invalid_message: "",
      start_loader: false,
      loader: false,
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  otpValidation = () => {
    if (!this.state.otp) {
      this.setState({
        invalid_message: "Field can't be empty",
      });
      return;
    }
    if (this.state.otp == this.props.getUserData.data.otp) {
      const otp = this.props.getUserData.data.otp;
      const data = {
        country_code: "91",
        mobile_number: this.props.getUserData.data.mobile_number,
        otp: otp.toString(),
      };

      this.setState({
        start_loader: true,
        loader: true,
      });
      axios({
        method: "post",
        url: `https://monorbit-alpha.herokuapp.com/api/v1/accounts/verify-mobile/`,
        data: data,
      })
        .then((res) => {
          this.props.sendUserData(res.data);
          this.setState({
            start_loader: false,
            loader: false,
          });
          this.props.history.push("./home");
        })
        .catch((err) => {
          console.log("Error : " + err);
          this.setState({
            start_loader: true,
            loader: false,
            invalid_message: "OTP expired",
          });
        });
    }
    this.setState({
      invalid_message: "Wrong OTP",
    });
  };

  render() {
    return (
      <div className='verifyOtpMainConatiner'>
        <Header />
        {this.state.loader ? (
          <div className='loaderContainer'>
            <h2 className='animate'>Loading...</h2>
          </div>
        ) : (
          <div className='verifyOtpConatiner'>
            <div className='verifyContainer'>
              <div className='imgContainer'>
                <img alt='ssd' src={Verification} />
              </div>
              <div className='headerVerifyContainer'>
                <h4>Verification</h4>
                <p>
                  You will get OTP via <span>SMS</span>
                </p>
                {this.props.getUserData.data.otp}
              </div>
              <div className='bottomContainer'>
                <p>{this.state.start_loader ? "loading..." : null}</p>
                <p className='invalid'>{this.state.invalid_message}</p>
                <input
                  type='text'
                  name='otp'
                  value={this.state.otp}
                  onChange={(event) => this.handleChange(event)}
                  placeholder='OTP'
                />

                <button onClick={this.otpValidation}>VERIFY</button>
                <h6>
                  Did't receive the verification otp? <span>Resend again</span>
                </h6>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getUserData: state.userReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendUserData: (data) => dispatch(userAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OtpValidation);
