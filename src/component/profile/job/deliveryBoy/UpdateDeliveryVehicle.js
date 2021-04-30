import React, { Component } from "react";
import "../../../../style/component/profile/job/deliveryBoy/_vehicle.scss";
import Confirm from "./UpdateConfirm";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";

class CreateProfile extends Component {
  constructor() {
    super();
    this.state = {
      confirm: false,

      driving_license: "",
      type_of_vehicle: "",
      vehicle_license: "",
      valid_upto: "",
      vehicle_photo_url: "",
    };
  }

  confirm = () => {
    this.setState((prevState) => ({
      confirm: !prevState.confirm,
    }));
  };

  // update particulor delivery boy vehicle data
  update = () => {
    const data = {
      driving_license: this.state.driving_license,
      type_of_vehicle: this.state.type_of_vehicle,
      vehicle_license: this.state.vehicle_license,
      valid_upto: this.state.valid_upto,
      vehicle_photo_url: this.state.vehicle_photo_url,
      active: true,
    };
    axios({
      method: "PATCH",
      data: data,
      url: `https://monorbit-alpha.herokuapp.com/api/v1/profiles/job/delivery-boy/vehicle/${this.props.id}/`,
      headers: {
        Authorization: `Bearer ${this.props.getUserData.data.token}`,
      },
    })
      .then((res) => {
        console.log("success");
      })
      .catch((err) => {
        console.log("Error : " + err);
      });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  // this will prevent memory leak
  _isMounted = false;
  componentDidMount() {
    this._isMounted = true;
    // return a value in arrow function missing...
    this.props.getSingleDeliveryBoyProfileData.data[0].vehicles.map((i) => {
      if (this.props.id === i.id) {
        this.setState(() => ({
          driving_license: i.driving_license,
          type_of_vehicle: i.type_of_vehicle,
          vehicle_license: i.vehicle_license,
          valid_upto: i.valid_upto,
          vehicle_photo_url: i.vehicle_photo_url,
        }));
      }
    });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

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
          <Confirm
            hide={this.props.updateDeliveryVehicle}
            update={this.update}
          />
        ) : null}

        <div className='vehicleContainer'>
          <h4 style={{ color: "#293462", marginBottom: "2vh" }}>
            Update Delivery Boy Vehicle Profile
          </h4>
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
                  placeholder='Vehicel name'
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
                <h4>Vehicel license</h4>
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
                  value={this.state.vehicle_photo_url}
                  onChange={(event) => this.handleChange(event)}
                  placeholder='Vehicle photo'
                />
              </div>
              {/* field end */}
            </div>

            {/* field start */}
            <div className='buttonContainer'>
              <button
                onClick={() => this.props.updateDeliveryVehicle()}
                style={{ background: "red", marginRight: 10 }}>
                Back
              </button>
              <button onClick={this.confirm}>Save Changes</button>
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
    getSingleDeliveryBoyProfileData: state.singleDeliveryBoyProfileReducer,
    getSessionData: state.sessionReducer,
  };
};

export default connect(mapStateToProps, null)(CreateProfile);
