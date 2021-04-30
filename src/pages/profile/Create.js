import React, { Component } from "react";
import Header from "../../component/header/InnerHeader";

import CreateProfile from "../../component/profile/create/CreateProfile";
import Type from "../../component/profile/job/Type";

import DeliverBoyJobCreate from "../../component/profile/job/deliveryBoy/Create";
import Update from "../../component/profile/job/deliveryBoy/Update";
import Vehicle from "../../component/profile/job/deliveryBoy/Vehicle";
import Finish from "../../component/profile/Finish";

import PermanentJobCreate from "../../component/profile/job/permanent/Create";
import UpdatePermanentJobProfile from "../../component/profile/job/permanent/Update";

import FreelancerJobCreate from "../../component/profile/job/freelancer/Create";
import FreelancerJobUpdate from "../../component/profile/job/freelancer/Update";

import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import axios from "axios";

import { jobProfilesAction } from "../../redux/action/profile/jobProfilesAction";
import { loaderAction } from "../../redux/action/loaderAction";

class Create extends Component {
  constructor() {
    super();
    this.state = {
      current: "CreateProfile",
      get_data: [],
      start_loader: false,
    };
  }
  createProfile = () => {
    this.setState({
      current: "CreateProfile",
    });
  };

  type = () => {
    this.setState({
      current: "Type",
    });
  };

  deliveryBoyJobCreate = () => {
    this.setState({
      current: "DeliverBoyJobCreate",
    });
  };

  vehicle = () => {
    this.setState({
      current: "Vehicle",
    });
  };

  finish = () => {
    this.setState({
      current: "Finish",
    });
  };

  permanentJobCreate = () => {
    this.setState({
      current: "PermanentJobCreate",
    });
  };

  freelancerJobCreate = () => {
    this.setState({
      current: "FreelancerJobCreate",
    });
  };

  // get particulor job profile data
  getJobProfileData = () => {
    try {
      axios({
        method: "get",
        url: `https://monorbit-alpha.herokuapp.com/api/v1/profiles/job/all/?user=${this.props.getUserData.data.user.mobile_number}`,
        headers: {
          Authorization: `Bearer ${this.props.getUserData.data.token}`,
        },
      })
        .then((res) => {
          this.props.sendJobProfilesData(res.data.results);
        })
        .catch((err) => {
          console.log("Error : " + err);
        });
    } catch {}
  };

  // this will prevent memory leak
  _isMounted = false;
  componentDidMount() {
    setTimeout(() => {
      this.props.sendLoaderData(false);
    }, 600);
    this._isMounted = true;
    this.getJobProfileData();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    if (!(this.props.getSessionData.data === "1")) {
      return <Redirect to='./' />;
    }

    if (!this.props.getJobProfilesData.data) {
      return (
        <div>
          <Header />
          <p style={{ padding: 100 }}>loading...</p>
        </div>
      );
    }

    const job_profile = this.props.getJobProfilesData.data[0];
    return (
      <div>
        <Header />

        {this.props.getLoaderData.data || this.state.loader ? (
          <div className='loaderContainer'>
            <h2 className='animate'>Loading...</h2>
          </div>
        ) : (
          <div>
            {/* conditinalyy rendering with job_profile */}
            {this.props.getJobProfilesData.data.length === 0 ? (
              <div>
                {this.state.current === "CreateProfile" ? (
                  <CreateProfile
                    createProfile={this.createProfile}
                    type={this.type}
                  />
                ) : null}
              </div>
            ) : (
              <div>
                {job_profile.is_delivery_boy ||
                job_profile.is_permanent_employee ||
                job_profile.is_freelancer ? (
                  <div>
                    <div>
                      {job_profile.is_delivery_boy ? (
                        <div>
                          {this.state.current === "CreateProfile" ? (
                            <Update
                              createProfile={this.createProfile}
                              type={this.type}
                            />
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      {job_profile.is_permanent_employee ? (
                        <div>
                          {this.state.current === "CreateProfile" ? (
                            <UpdatePermanentJobProfile />
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                    <div>
                      {job_profile.is_freelancer ? (
                        <div>
                          {this.state.current === "CreateProfile" ? (
                            <FreelancerJobUpdate />
                          ) : null}
                        </div>
                      ) : null}
                    </div>
                  </div>
                ) : (
                  <div>
                    {this.state.current === "CreateProfile" ? (
                      <CreateProfile
                        createProfile={this.createProfile}
                        type={this.type}
                      />
                    ) : null}
                  </div>
                )}
              </div>
            )}

            {this.state.current === "Type" ? (
              <Type
                deliveryBoyJobCreate={this.deliveryBoyJobCreate}
                permanentJobCreate={this.permanentJobCreate}
                freelancerJobCreate={this.freelancerJobCreate}
              />
            ) : null}

            {this.state.current === "DeliverBoyJobCreate" ? (
              <DeliverBoyJobCreate vehicle={this.vehicle} />
            ) : null}

            {this.state.current === "Vehicle" ? (
              <Vehicle finish={this.finish} />
            ) : null}

            {this.state.current === "Finish" ? <Finish /> : null}

            {/* permanent job */}
            {this.state.current === "PermanentJobCreate" ? (
              <PermanentJobCreate finish={this.finish} />
            ) : null}

            {/* freelancer job */}
            {this.state.current === "FreelancerJobCreate" ? (
              <FreelancerJobCreate finish={this.finish} />
            ) : null}
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

    getLoaderData: state.loaderReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendJobProfilesData: (data) => dispatch(jobProfilesAction(data)),

    sendLoaderData: (data) => dispatch(loaderAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
