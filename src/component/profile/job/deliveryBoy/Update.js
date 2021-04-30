import React, { Component } from "react";
import "../../../../style/component/profile/job/deliveryBoy/_update.scss";

import Trash from "../../../../assets/trash.svg";
import Edit from "../../../../assets/edit.svg";
import { Redirect } from "react-router-dom";

import Vehicle from "./Vehicle";
import DeleteConfirm from "./DeleteConfirm";
import UpdateBasicDetails from "./UpdateBasicDetails";
import UpdateDeliveryVehicle from "./UpdateDeliveryVehicle";

import { connect } from "react-redux";
import axios from "axios";
import { singleDeliveryBoyProfileAction } from "../../../../redux/action/profile/singleDeliveryBoyProfileAction";

class Update extends Component {
  constructor() {
    super();
    this.state = {
      vehicle: false,
      updateBasicDetails: false,
      updateDeliveryVehicle: false,
      id: "",
      deleteConfirm: false,
      getJobProfileOfDeliveryBoy_id: "",
      start_loader: false,
    };
  }

  // get particulor delivery boy data
  getJobProfile = () => {
    this.setState((prevState) => ({
      start_loader: !prevState.start_loader,
    }));
    axios({
      method: "get",
      url: `https://monorbit-alpha.herokuapp.com/api/v1/profiles/job/delivery-boy/all/?job_profile=${this.props.getJobProfilesData.data[0].id}`,
      headers: {
        Authorization: `Bearer ${this.props.getUserData.data.token}`,
      },
    })
      .then((res) => {
        this.setState((prevState) => ({
          start_loader: !prevState.start_loader,
        }));
        this.props.sendSingleDeliveryBoyProfileData(res.data.results);
      })
      .catch((err) => {
        this.setState((prevState) => ({
          start_loader: !prevState.start_loader,
        }));
        console.log("Error : " + err);
      });
  };

  vehicle = () => {
    this.setState((prevState) => ({
      vehicle: !prevState.vehicle,
    }));
    this.getJobProfile();
  };

  deleteConfirm = (id) => {
    this.setState((prevState) => ({
      deleteConfirm: !prevState.deleteConfirm,
      id: id,
    }));
    this.getJobProfile();
  };

  updateBasicDetails = () => {
    this.setState((prevState) => ({
      updateBasicDetails: !prevState.updateBasicDetails,
    }));
    this.getJobProfile();
  };

  updateDeliveryVehicle = (id) => {
    this.setState((prevState) => ({
      updateDeliveryVehicle: !prevState.updateDeliveryVehicle,
      id: id,
    }));
    this.getJobProfile();
  };

  // this will prevent memory leak
  _isMounted = false;
  componentDidMount() {
    this._isMounted = true;
    this.getJobProfile();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    // session data
    if (!(this.props.getSessionData.data === "1")) {
      return <Redirect to='./' />;
    }

    if (!this.props.getSingleDeliveryBoyProfileData.data) {
      return "loading...";
    }

    const deliveryBoyData = this.props.getSingleDeliveryBoyProfileData;
    return (
      <div className='jobUpdateContainer'>
        {/* delete confirm */}
        {this.state.deleteConfirm ? (
          <DeleteConfirm id={this.state.id} hide={this.deleteConfirm} />
        ) : null}
        {this.state.updateDeliveryVehicle ? (
          <UpdateDeliveryVehicle
            id={this.state.id}
            updateDeliveryVehicle={this.updateDeliveryVehicle}
          />
        ) : (
          <div>
            {this.state.vehicle ? (
              <Vehicle vehicle={this.vehicle} />
            ) : (
              <div>
                {this.state.updateBasicDetails ? (
                  <UpdateBasicDetails
                    hide={this.updateBasicDetails}
                    id={deliveryBoyData.data[0].id}
                  />
                ) : (
                  <div className='innerJobContainer'>
                    <div className='jobDetailsContainer'>
                      <div className='badge'>
                        <h4>Delivery Boy Profile</h4>
                        {this.state.start_loader ? "Loading" : null}
                      </div>
                      {/* mian container start */}
                      <div className='mainContainer'>
                        <div className='leftMainContainer'>
                          <div>
                            <h4>Basic Details</h4>
                            <h6>experince desc..</h6>
                          </div>
                        </div>

                        <div className='rightMainContainer'>
                          <div className='getDataByModal'>
                            {deliveryBoyData.data.map((profile, index) => {
                              return (
                                <div key={index} className='leftGetData'>
                                  <div className='innerGetData'>
                                    <h4>Name:</h4>
                                    <h6>
                                      {profile.job_profile.user.full_name}
                                    </h6>
                                  </div>
                                  <div className='innerGetData'>
                                    <h4>Email:</h4>
                                    <h6>{profile.job_profile.alt_email}</h6>
                                  </div>

                                  <div className='innerGetData'>
                                    <h4>Phone:</h4>
                                    <h6>
                                      {profile.job_profile.alt_phone_number}
                                    </h6>
                                  </div>

                                  <div className='innerGetData'>
                                    <h4>Aadhar:</h4>
                                    <h6>{profile.job_profile.adhaar_card}</h6>
                                  </div>

                                  <div className='innerGetData'>
                                    <h4>Address:</h4>
                                    <h6>
                                      {profile.job_profile.address},{" "}
                                      {profile.job_profile.landmark},{" "}
                                      {profile.job_profile.city},{" "}
                                      {profile.job_profile.state},{" "}
                                      {profile.job_profile.country},{" "}
                                      {profile.job_profile.pincode}{" "}
                                    </h6>
                                  </div>

                                  <div className='innerGetData'>
                                    <h4>About:</h4>
                                    <h6>{profile.short_bio}</h6>
                                  </div>
                                </div>
                              );
                            })}

                            <div className='rightGetData'>
                              <div
                                className='tooltip'
                                onClick={() => this.updateBasicDetails()}>
                                <img alt='monorbit work' src={Edit} />
                                <span className='tooltiptext'>Edit</span>
                              </div>
                              <div className='tooltip'>
                                <img alt='monorbit work' src={Trash} />
                                <span className='tooltiptext'>Delete</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* mian container end */}
                      {/* mian container start */}
                      <div
                        className='mainContainer'
                        style={{ borderBottom: "none" }}>
                        <div className='leftMainContainer'>
                          <div>
                            <h4>Vehicle Details</h4>
                            <h6>vehicle desc..</h6>
                          </div>
                        </div>
                        <div className='rightMainContainer'>
                          <div className='getDataByModalVehicle'>
                            <div className='addNewVehicleContainer'>
                              {!this.state.vehicle ? (
                                <button onClick={this.vehicle}>Add New</button>
                              ) : (
                                <button onClick={this.vehicle}>Close</button>
                              )}
                            </div>
                            {deliveryBoyData.data.map((profile, index) => {
                              return (
                                <div key={index} className='getData'>
                                  {profile.vehicles.map((vehicle, index) => {
                                    return (
                                      <div
                                        className='vehicleDetailsContainer'
                                        key={index}>
                                        <table>
                                          <tbody>
                                            <tr>
                                              <th>Type</th>
                                              <th>DL</th>
                                              <th>License</th>
                                              <th>Valid</th>
                                              <th>
                                                <div
                                                  className='editDeleteContainer'
                                                  onClick={() =>
                                                    this.updateDeliveryVehicle(
                                                      vehicle.id
                                                    )
                                                  }>
                                                  <img
                                                    alt='monorbit work'
                                                    src={Edit}
                                                  />
                                                </div>
                                              </th>
                                              <th>
                                                <div
                                                  className='editDeleteContainer deletBtn'
                                                  onClick={() =>
                                                    this.deleteConfirm(
                                                      vehicle.id
                                                    )
                                                  }>
                                                  <img
                                                    alt='monorbit work'
                                                    src={Trash}
                                                  />
                                                </div>
                                              </th>
                                            </tr>
                                            <tr>
                                              <td>{vehicle.type_of_vehicle}</td>
                                              <td>{vehicle.driving_license}</td>
                                              <td>{vehicle.vehicle_license}</td>
                                              <td>{vehicle.valid_upto}</td>
                                              <td></td>
                                              <td></td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    );
                                  })}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                      {/* mian container end */}
                    </div>
                  </div>
                )}
              </div>
            )}
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

    getCreateJobData: state.createJobReducer,
    getJobProfilesData: state.jobProfilesReducer,

    getSingleDeliveryBoyProfileData: state.singleDeliveryBoyProfileReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendSingleDeliveryBoyProfileData: (data) =>
      dispatch(singleDeliveryBoyProfileAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Update);
