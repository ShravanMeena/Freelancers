import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "../../style/pages/onboarding/_signup.scss";
import axios from "axios";
import { userAction } from "../../redux/action/userAction";
import { connect } from "react-redux";
import { sessionUpdateAction } from "../../redux/action/sessionAction";
import Header from "../../component/header/OuterHeader";
import RegisterImages from "../../assets/pro-team.svg";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      country_code: "91",
      mobile_number: "",
      password: "",
      full_name: "",
      email: "",
      registration_reference: "",
      is_agreed_to_terms: true,
      phone_message: "",
      email_message: "",
      password_message: "",
      name_message: "",
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

  validation = () => {
    this.setState(() => ({
      start_loader: true,
    }));

    // name validation
    if (!this.state.full_name) {
      this.setState(() => ({
        start_loader: false,
        name_message: "Name field can't be empty",
      }));
      return;
    } else {
      this.setState(() => ({
        start_loader: false,
        name_message: "",
      }));
    }
    // phone number validation

    if (!this.state.mobile_number) {
      this.setState(() => ({
        start_loader: false,
        phone_message: "Phone number field can't be empty",
      }));
      return;
    }
    if (isNaN(this.state.mobile_number)) {
      this.setState(() => ({
        start_loader: false,
        phone_message: "Please enter digits only",
      }));
      return;
    }
    if (!(this.state.mobile_number.length === 10)) {
      this.setState(() => ({
        start_loader: false,
        phone_message: "Phone number must be 10 digits long",
      }));
      return;
    } else {
      this.setState(() => ({
        start_loader: false,
        phone_message: "",
      }));
    }
    // email validation
    if (!this.state.email) {
      this.setState(() => ({
        start_loader: false,
        email_message: "Email field can't be empty",
      }));
      return;
    }
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(String(this.state.email).toLowerCase())) {
      this.setState(() => ({
        start_loader: false,
        email_message: "Enter valid email",
      }));
      return;
    } else {
      this.setState(() => ({
        start_loader: false,
        email_message: "",
      }));
    }

    const hotmail = this.state.email.search("hotmail.com");
    const gmail = this.state.email.search("gmail.com");
    const yahoo = this.state.email.search("yahoo.com");

    if (hotmail === -1 && gmail === -1 && yahoo === -1) {
      this.setState(() => ({
        start_loader: false,
        email_message: "we only accept yahoo, gmail, hotmail email address",
      }));
      return;
    } else {
      this.setState(() => ({
        start_loader: false,
        email_message: "",
      }));
    }

    //  password validation

    if (!this.state.password) {
      this.setState(() => ({
        start_loader: false,
        password_message: "Password field can't be empty",
      }));
      return;
    }
    if (this.state.password.length <= 5) {
      this.setState(() => ({
        start_loader: false,
        password_message: "Password must be 6 digits long",
      }));
      return;
    } else {
      this.setState(() => ({
        start_loader: false,
        password_message: "",
      }));
    }
    // registeraton api call
    this.register();
  };

  register = () => {
    this.setState(() => ({
      start_loader: true,
      loader: true,
    }));

    const data = {
      country_code: this.state.country_code,
      mobile_number: this.state.mobile_number,
      password: this.state.password,
      full_name: this.state.full_name,
      email: this.state.email,
      registration_reference: this.state.registration_reference,
      is_agreed_to_terms: this.state.is_agreed_to_terms,
    };
    axios({
      method: "post",
      url: "https://monorbit-alpha.herokuapp.com/api/v1/accounts/register/",
      data: data,
    })
      .then((res) => {
        this.setState(() => ({
          loader: false,
        }));
        this.props.sendUserData(res.data);
        this.props.sendSessionData("1");
        this.props.history.push("./otp_validation");
      })
      .catch((err) => {
        console.log("Error : " + err);
        this.setState(() => ({
          start_loader: false,
          loader: false,
          invalid_message: "You are already registered",
        }));
      });
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
      <div className='registerFormMainContainer'>
        <Header />
        {this.state.loader ? (
          <div className='loaderContainer'>
            <h2 className='animate'>Loading...</h2>
          </div>
        ) : (
          <div className='loginContainer'>
            <div className='leftLoginContainer'>
              <div className='innerLeftLoginConatiner'>
                <div className='headingContainer'>
                  <h1>Create Account</h1>
                  <h2>create a large network for managing your shop </h2>
                </div>
                <p className='invalid'>{this.state.invalid_message}</p>

                {this.state.start_loader ? (
                  <p style={{ textAlign: "center", margin: 10 }}>loading...</p>
                ) : null}

                {this.state.start_loader ? "loading..." : null}

                <div className='fieldConatiner'>
                  <div className='singleFieldContainer'>
                    <h4>Full Name</h4>
                    <p className='invalid'>{this.state.name_message}</p>

                    <input
                      type='text'
                      name='full_name'
                      value={this.state.full_name}
                      onChange={(event) => this.handleChange(event)}
                      placeholder='Enter Full Name'
                    />
                  </div>

                  <div className='singleFieldContainer'>
                    <h4>Mobile Number</h4>
                    <p className='invalid'>{this.state.phone_message}</p>

                    <input
                      type='text'
                      name='mobile_number'
                      value={this.state.mobile_number}
                      onChange={(event) => this.handleChange(event)}
                      placeholder='Enter Mobile Number'
                    />
                  </div>

                  <div className='singleFieldContainer'>
                    <h4>Email</h4>
                    <p className='invalid'>{this.state.email_message}</p>
                    <input
                      type='email'
                      name='email'
                      value={this.state.email}
                      onChange={(event) => this.handleChange(event)}
                      placeholder='Enter Email'
                    />
                  </div>

                  <div className='singleFieldContainer'>
                    <h4>Password</h4>
                    <p className='invalid'>{this.state.password_message}</p>
                    <input
                      type='password'
                      name='password'
                      value={this.state.password}
                      onChange={(event) => this.handleChange(event)}
                      placeholder='Enter Password'
                    />
                  </div>

                  <div className='singleForgotFieldContainer'>
                    <h4>
                      By creating an account you agree to our{" "}
                      <span>Terms & Privacy.</span>
                    </h4>
                  </div>

                  <div className='singleFieldContainer'>
                    <button onClick={this.validation}>Sign up</button>
                  </div>
                  <div className='singleRegisterFieldContainer'>
                    <h4>
                      Already register?{" "}
                      <span>
                        <Link to='./login'>Sign in</Link>
                      </span>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            <div className='rightLoginContainer'>
              <div className='innerRightBodyContainer'>
                <div className='imgContainer'>
                  <img alt='ssd' src={RegisterImages} />
                </div>
                {/* <h4>Secure - Safe - Grow</h4> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
