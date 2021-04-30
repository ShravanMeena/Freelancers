import React, { Component } from "react";
import "../../../../style/component/profile/job/deliveryBoy/_create.scss";
import Confirm from "./Confirm";

import axios from "axios";
import { createJobAction } from "../../../../redux/action/profile/createJobAction";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Create extends Component {
  constructor() {
    super();
    this.state = {
      confirm: false,
      short_bio: "",
      invalid_message: "",
      start_loader: false,
    };
  }

  validation = () => {
    if (!this.state.short_bio) {
      this.setState(() => ({
        invalid_message: "field can't be empty",
      }));
      return;
    }
    this.setState(() => ({
      invalid_message: "",
    }));

    this.confirm();
  };
  confirm = () => {
    this.setState((prevState) => ({
      confirm: !prevState.confirm,
    }));
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  createJobDeliveryBoy = () => {
    this.setState({
      start_loader: true,
    });

    const data = {
      job_profile:
        this.props.getCreateJobData.data && this.props.getCreateJobData.data.id,
      short_bio: this.state.short_bio,
      is_recharged: false,
    };
    axios({
      method: "post",
      url:
        "https://monorbit-alpha.herokuapp.com/api/v1/profiles/job/delivery-boy/create/",
      data: data,
      headers: {
        Authorization: `Bearer ${this.props.getUserData.data.token}`,
      },
    })
      .then((res) => {
        this.props.sendCreateJobData(res.data);
        this.props.vehicle();
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
      return <Redirect to='./' />;
    }
    return (
      <div className='mainCreateContainer'>
        {this.state.confirm ? (
          <Confirm
            hide={this.confirm}
            createJobDeliveryBoy={this.createJobDeliveryBoy}
          />
        ) : null}
        <div className='createContainer'>
          <div className='bioHeader'>
            <h4>Short Description About You</h4>
          </div>
          <div className='innerjobTypeContainer'>
            <div className='bioFieldContainer'>
              <h4>About</h4>
              {this.state.start_loader ? "processing..." : null}
              <p className='invalid'>{this.state.invalid_message}</p>
              <textarea
                type='text'
                name='short_bio'
                value={this.state.short_bio}
                onChange={(event) => this.handleChange(event)}
                placeholder='Short bio'
              />
            </div>
            <div className='buttonContainer'>
              <button onClick={this.validation}>Next</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getUserData: state.userReducer,
    getCreateJobData: state.createJobReducer,
    getJobProfilesData: state.jobProfilesReducer,
    getSessionData: state.sessionReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendCreateJobData: (data) => dispatch(createJobAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
