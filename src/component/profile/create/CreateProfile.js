import React, { Component } from "react";
import "../../../style/component/profile/create/_createProfile.scss";
import Confirm from "./CreateConfirm";

import axios from "axios";
import { createJobAction } from "../../../redux/action/profile/createJobAction";

import { educationAction } from "../../../redux/action/jobs/add/educationAction";
import { experienceAction } from "../../../redux/action/jobs/add/experienceAction";
import { skillsAction } from "../../../redux/action/jobs/add/skillsAction";
import { specificationsAction } from "../../../redux/action/jobs/add/specificationsAction";

import { sessionUpdateAction } from "../../../redux/action/sessionAction";

import { loaderAction } from "../../../redux/action/loaderAction";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class CreateProfile extends Component {
  constructor() {
    super();
    this.state = {
      alt_email: "",
      alt_phone_number: "",
      photo_url: "",
      adhaar_card: "",
      address: "",
      landmark: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      confirm: false,
      invalid_message: "",
      start_loader: false,
      email_message: "",
      phone_message: "",
      aadhar_message: "",
      pincode_message: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  validation = () => {
    if (
      !this.state.alt_email ||
      !this.state.alt_phone_number ||
      !this.state.address ||
      !this.state.adhaar_card ||
      !this.state.city ||
      !this.state.state ||
      !this.state.pincode ||
      !this.state.landmark ||
      !this.state.country
    ) {
      this.setState(() => ({
        invalid_message: "field can't be empty",
      }));
      return;
    }
    this.setState(() => ({
      invalid_message: "",
    }));
    // email validation
    if (!this.state.alt_email) {
      this.setState(() => ({
        start_loader: false,
        email_message: "Email field can't be empty",
      }));
      return;
    }
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!re.test(String(this.state.alt_email).toLowerCase())) {
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

    const hotmail = this.state.alt_email.search("hotmail.com");
    const gmail = this.state.alt_email.search("gmail.com");
    const yahoo = this.state.alt_email.search("yahoo.com");

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

    // phone number validation
    if (isNaN(this.state.alt_phone_number)) {
      this.setState(() => ({
        start_loader: false,
        phone_message: "Please enter digits phone number  only",
      }));
      return;
    }
    if (!(this.state.alt_phone_number.length === 10)) {
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

    // aadhar card number validation
    if (isNaN(this.state.adhaar_card)) {
      this.setState(() => ({
        start_loader: false,
        aadhar_message: "Please enter digits aadhar number  only",
      }));
      return;
    } else {
      this.setState(() => ({
        start_loader: false,
        aadhar_message: "",
      }));
    }
    if (!(this.state.adhaar_card.length === 12)) {
      this.setState(() => ({
        start_loader: false,
        aadhar_message: "Pincode must be 12 digits long",
      }));
      return;
    } else {
      this.setState(() => ({
        start_loader: false,
        aadhar_message: "",
      }));
    }

    // pincode validation
    if (isNaN(this.state.pincode)) {
      this.setState(() => ({
        start_loader: false,
        pincode_message: "Please enter digits pincode only",
      }));
      return;
    } else {
      this.setState(() => ({
        start_loader: false,
        pincode_message: "",
      }));
    }

    if (!(this.state.pincode.length === 6)) {
      this.setState(() => ({
        start_loader: false,
        pincode_message: "Pincode must be 6 digits long",
      }));
      return;
    } else {
      this.setState(() => ({
        start_loader: false,
        pincode_message: "",
      }));
    }
    this.confirm();
  };

  confirm = () => {
    this.setState((prevState) => ({
      confirm: !prevState.confirm,
    }));
  };

  createJobProfile = () => {
    // this.props.sendLoaderData(true);
    this.setState({
      start_loader: true,
    });
    const data = {
      alt_email: this.state.alt_email,
      alt_phone_number: this.state.alt_phone_number,
      photo_url: this.state.photo_url,
      adhaar_card: this.state.adhaar_card,
      address: this.state.address,
      landmark: this.state.landmark,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
      pincode: this.state.pincode,
    };
    axios({
      method: "post",
      url: "https://monorbit-alpha.herokuapp.com/api/v1/profiles/job/all/",
      data: data,
      headers: {
        Authorization: `Bearer ${this.props.getUserData.data.token}`,
      },
    })
      .then((res) => {
        this.props.sendCreateJobProfileData(res.data);
        this.props.type();
        this.setState({
          start_loader: false,
        });
      })
      .catch((err) => {
        console.log("Error : " + err);

        this.setState({
          start_loader: false,
        });
      });
  };

  render() {
    // if user logged in ...then not go back to login page without logout is not allowed
    if (!(this.props.getSessionData.data === "1")) {
      return (
        <div>
          <Redirect to='/' />
        </div>
      );
    }
    return (
      <div className='mainCreateProfileContainer'>
        {this.state.confirm ? (
          <Confirm
            hide={this.confirm}
            type={this.props.type}
            createJobProfile={this.createJobProfile}
          />
        ) : null}

        <div className='createProfileContainer'>
          <p className='invalid'>{this.state.invalid_message}</p>
          {this.state.start_loader ? "processing..." : null}
          <div className='create'>
            <h4>Create Your Job Profile </h4>
          </div>
          <div className='innerCreateProfileContainer'>
            {/* field start */}
            <div className='createFieldContainer'>
              <h4>Alternative email</h4>
              <p className='invalid'>{this.state.email_message}</p>

              <input
                type='email'
                name='alt_email'
                value={this.state.alt_email}
                onChange={(event) => this.handleChange(event)}
                placeholder='Alternative email'
              />
            </div>
            {/* field end */}
            <div className='doubleInputField'>
              {/* field start */}
              <div className='createFieldContainer'>
                <h4>Alternative phone</h4>
                <p className='invalid'>{this.state.phone_message}</p>

                <input
                  type='text'
                  name='alt_phone_number'
                  value={this.state.alt_phone_number}
                  onChange={(event) => this.handleChange(event)}
                  placeholder='Alternative phone'
                />
              </div>
              {/* field end */}

              {/* field start */}
              <div className='createFieldContainer'>
                <h4>Aadhar card</h4>
                <p className='invalid'>{this.state.aadhar_message}</p>

                <input
                  type='text'
                  name='adhaar_card'
                  value={this.state.adhaar_card}
                  onChange={(event) => this.handleChange(event)}
                  placeholder='Aadhar card'
                />
              </div>
              {/* field end */}
            </div>
            {/* field start */}
            <div className='doubleInputField'>
              <div className='createFieldContainer'>
                <h4>City</h4>

                <input
                  type='text'
                  name='city'
                  value={this.state.city}
                  onChange={(event) => this.handleChange(event)}
                  placeholder='City'
                />
              </div>

              <div className='createFieldContainer'>
                <h4>State</h4>

                <input
                  type='text'
                  name='state'
                  value={this.state.state}
                  onChange={(event) => this.handleChange(event)}
                  placeholder='State'
                />
              </div>
              {/* field end */}
            </div>
            <div className='doubleInputField'>
              {/* field start */}
              <div className='createFieldContainer'>
                <h4>Landmark</h4>

                <input
                  type='text'
                  name='landmark'
                  value={this.state.landmark}
                  onChange={(event) => this.handleChange(event)}
                  placeholder='Landmark'
                />
              </div>
              {/* field end */}

              {/* field start */}
              <div className='createFieldContainer'>
                <h4>Pincode</h4>
                <p className='invalid'>{this.state.pincode_message}</p>

                <input
                  type='text'
                  name='pincode'
                  value={this.state.pincode}
                  onChange={(event) => this.handleChange(event)}
                  placeholder='Pincode'
                />
              </div>
              {/* field end */}
            </div>
            {/* field start */}
            <div className='createFieldContainer'>
              <h4>Country</h4>

              <input
                type='text'
                name='country'
                value={this.state.country}
                onChange={(event) => this.handleChange(event)}
                placeholder='e.g: India'
              />
            </div>
            {/* field end */}
            {/* field start */}
            <div className='createFieldContainer'>
              <h4>Address</h4>

              <input
                type='text'
                name='address'
                value={this.state.address}
                onChange={(event) => this.handleChange(event)}
                placeholder='Address'
              />
            </div>
            {/* field end */}
            {/* field start */}
            <div className='createFieldContainer'>
              <h4>Photo Url</h4>

              <input
                type='text'
                name='photo_url'
                value={this.state.photo_url}
                onChange={(event) => this.handleChange(event)}
                placeholder='Photo Url'
              />
            </div>
            {/* field end */}
            {/* field start */}
            <div className='createButtonContainer'>
              <button onClick={this.validation}>Next</button>
            </div>
            {/* field end */}
          </div>
        </div>
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
    sendCreateJobProfileData: (data) => dispatch(createJobAction(data)),
    sendSessionData: (data) => dispatch(sessionUpdateAction(data)),

    sendEducationData: (data) => dispatch(educationAction(data)),
    sendExperienceData: (data) => dispatch(experienceAction(data)),
    sendSkillsData: (data) => dispatch(skillsAction(data)),
    sendSpecifictionsData: (data) => dispatch(specificationsAction(data)),

    sendLoaderData: (data) => dispatch(loaderAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile);
