import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "../../style/pages/onboarding/_login.scss";
import axios from "axios";
import { userAction } from "../../redux/action/userAction";
import { connect } from "react-redux";
import Header from "../../component/header/OuterHeader";
import LoginImages from "../../assets/talk.svg";
import { sessionUpdateAction } from "../../redux/action/sessionAction";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      country_code: "91",
      mobile_number: "",
      password: "",
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

  login = () => {
    var stopper = 0;
    if (!this.state.mobile_number || !this.state.password) {
      this.setState(() => ({
        invalid_message: "field can't be empty",
      }));
      stopper++;
      return;
    }

    // phone number validation
    if (!this.state.mobile_number) {
      this.setState(() => ({
        start_loader: false,
        invalid_message: "Phone number field can't be empty",
      }));
      stopper++;
      return;
    }
    if (isNaN(this.state.mobile_number)) {
      this.setState(() => ({
        invalid_message: "Please enter digits only",
      }));
      stopper++;
      return;
    }
    if (!(this.state.mobile_number.length === 10)) {
      this.setState(() => ({
        invalid_message: "Phone number must be 10 digits long",
      }));
      stopper++;
      return;
    } else {
      this.setState(() => ({
        invalid_message: "",
      }));
    }

    const data = {
      country_code: this.state.country_code,
      mobile_number: this.state.mobile_number,
      password: this.state.password,
    };

    this.setState(() => ({
      start_loader: true,
      loader: true,
    }));

    if (stopper === 0) {
      axios({
        method: "post",
        url: "https://monorbit-alpha.herokuapp.com/api/v1/accounts/login/",
        data: data,
      })
        .then((res) => {
          this.setState(() => ({
            start_loader: false,
            loader: false,
          }));
          this.props.sendUserData(res.data);
          this.props.sendSessionData("1");
        })
        .catch((err) => {
          console.log("Error : " + err);
          this.setState((prevState) => ({
            start_loader: !prevState.start_loader,
            loader: false,
            invalid_message: "Invalid phone number or password",
          }));
        });
    } else {
      this.setState(() => ({
        start_loader: false,
        loader: false,
      }));
    }
  };

  render() {
    // if user logged in ...then not go back to login page without logout is not allowed
    if (this.props.getSessionData.data === "1") {
      return (
        <div>
          <Redirect to='/home' />
        </div>
      );
    }
    return (
      <div className='loginFormMainContainer'>
        <Header />
        {this.state.loader ? (
          <div className='loaderContainer'>
            <h2 className='animate'>Loading...</h2>
          </div>
        ) : (
          <div className='loginContainer'>
            <div className='leftLoginContainer'>
              <div className='innerLeftLoginConatiner'>
                <h2>Welcome Back</h2>

                {this.state.start_loader ? "loading..." : null}
                <h6 className='invalid'>{this.state.invalid_message}</h6>

                <div className='fieldConatiner'>
                  <div className='singleFieldContainer'>
                    <h4>Mobile Number</h4>
                    <input
                      type='text'
                      name='mobile_number'
                      value={this.state.mobile_number}
                      onChange={(event) => this.handleChange(event)}
                      placeholder='Mobile Number'
                    />
                  </div>

                  <div className='singleFieldContainer'>
                    <h4>Password</h4>
                    <input
                      type='password'
                      name='password'
                      value={this.state.password}
                      onChange={(event) => this.handleChange(event)}
                      placeholder='Password'
                    />
                  </div>

                  <div className='singleForgotFieldContainer'>
                    <h4>Forgot Password?</h4>
                  </div>

                  <div className='singleFieldContainer'>
                    <button onClick={this.login}>Login</button>
                  </div>
                  <div className='singleRegisterFieldContainer'>
                    <h4>
                      Don't have an account?{" "}
                      <span>
                        <Link to='./register'>Sign up</Link>
                      </span>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div className='rightLoginContainer'>
              <div className='innerRightBodyContainer'>
                <div className='imgContainer'>
                  <img alt='ssd' src={LoginImages} />
                </div>
                <h4>{/* Any question? <span>click here</span> */}</h4>
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
    getSessionData: state.sessionReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendUserData: (data) => dispatch(userAction(data)),
    sendSessionData: (data) => dispatch(sessionUpdateAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
