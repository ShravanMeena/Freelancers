import React, { Component } from "react";
import "../../../../style/component/profile/job/deliveryBoy/_vehicle.scss";
import Confirm from "./FinishConfirm";

import axios from "axios";
import { createJobAction } from "../../../../redux/action/profile/createJobAction";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class CreateProfile extends Component {
  constructor() {
    super();
    this.state = {
      confirm: false,
      delivery_boy: "",
      driving_license: "",
      type_of_vehicle: "",
      vehicle_license: "",
      valid_upto: "",
      vehicle_photo_url: "",
      invalid_message: "",
      start_loader: false,
    };
  }

  validation = () => {
    if (
      !this.state.driving_license ||
      !this.state.vehicle_license ||
      !this.state.type_of_vehicle ||
      !this.state.valid_upto
    ) {
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

  vehicleCreate = () => {
    this.setState({
      start_loader: true,
    });

    console.log(this.props.getCreateJobData.data);
    if (this.props.getCreateJobData.data) {
      this.setState({
        delivery_boy:
          this.props.getCreateJobData.data &&
          this.props.getCreateJobData.data.id,
      });
    }
    if (this.props.getSingleDeliveryBoyProfileData.data) {
      this.setState({
        delivery_boy:
          this.props.getSingleDeliveryBoyProfileData.data &&
          this.props.getSingleDeliveryBoyProfileData.data[0].id,
      });
    }

    const data = {
      delivery_boy:
        this.props.getCreateJobData.data && this.props.getCreateJobData.data.id,
      driving_license: this.state.driving_license,
      type_of_vehicle: this.state.type_of_vehicle,
      vehicle_license: this.state.vehicle_license,
      valid_upto: this.state.valid_upto,
      vehicle_photo_url: this.state.vehicle_photo_url,
      active: true,
    };
    axios({
      method: "post",
      url:
        "https://monorbit-alpha.herokuapp.com/api/v1/profiles/job/delivery-boy/vehicle/",
      data: data,
      headers: {
        Authorization: `Bearer ${this.props.getUserData.data.token}`,
      },
    })
      .then((res) => {
        if (this.props.finish) {
          this.props.finish();
        }

        // when new vehicle add after succesfully create job profile
        if (this.props.vehicle) {
          this.props.vehicle();
        }

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

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
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
      <div className='mainVehicleContainer'>
        {this.state.confirm ? (
          <Confirm hide={this.confirm} vehicleCreate={this.vehicleCreate} />
        ) : null}

        <div className='vehicleContainer'>
          <p className='invalid'>{this.state.invalid_message}</p>
          {this.state.start_loader ? "processing..." : null}

          <div className='vehicle'>
            <h4>Add vehicle </h4>
          </div>
          <div className='innerVehicleContainer'>
            <div className='vehicleTopContainer'>
              {/* field start */}
              <div className='vehicleFieldContainer'>
                <h4>Vehicle name</h4>
                <input
                  type='text'
                  name='type_of_vehicle'
                  value={this.state.type_of_vehicle}
                  onChange={(event) => this.handleChange(event)}
                  placeholder='Vehicel name : bicycle, motor_bike, car, semi_truck, other...'
                />
              </div>
              {/* field end */}

              {/* field start */}
              <div className='vehicleFieldContainer'>
                <h4>Vehicle license</h4>
                <input
                  type='text'
                  name='vehicle_license'
                  value={this.state.vehicle_license}
                  onChange={(event) => this.handleChange(event)}
                  placeholder='Vehicel license'
                />
              </div>
              {/* field end */}
              {/* field start */}
              <div className='vehicleFieldContainer'>
                <h4>Driving license</h4>
                <input
                  type='text'
                  name='driving_license'
                  value={this.state.driving_license}
                  onChange={(event) => this.handleChange(event)}
                  placeholder='Driving license'
                />
              </div>
              {/* field end */}

              {/* field start */}
              <div className='vehicleFieldContainer'>
                <h4>Valid date</h4>
                <input
                  type='date'
                  name='valid_upto'
                  value={this.state.valid_upto}
                  onChange={(event) => this.handleChange(event)}
                  placeholder='Valid up to date'
                />
              </div>
              {/* field end */}
              {/* field start */}
              <div className='vehicleFieldContainer'>
                <h4>Vehicle Photo</h4>
                <input
                  type='text'
                  name='vehicle_photo_url'
                  onChange={(event) => this.handleChange(event)}
                />
              </div>
              {/* field end */}
            </div>

            {/* field start */}
            <div className='buttonContainer'>
              {this.props.vehicle ? (
                <button
                  style={{ background: "red", marginRight: 10 }}
                  onClick={this.props.vehicle}>
                  Back
                </button>
              ) : null}
              <button onClick={this.validation}>Finish</button>
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
    getCreateJobData: state.createJobReducer,
    getSingleDeliveryBoyProfileData: state.singleDeliveryBoyProfileReducer,
    getSessionData: state.sessionReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendCreateJobData: (data) => dispatch(createJobAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProfile);
