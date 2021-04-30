import React, { Component } from "react";
import "../../style/pages/applications/_myApplications.scss";
import Header from "../../component/header/InnerHeader";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import PermanentEmployee from "../../component/application/PermanentEmployee";
import Freelancer from "../../component/application/Freelancer";
import DeliveryBoy from "../../component/application/DeliveryBoy";

import { singleJobDetailsAction } from "../../redux/action/allJobProfilesAction";
import { loaderAction } from "../../redux/action/loaderAction";

class MyApplications extends Component {
  constructor() {
    super();
    this.state = {
      list_all_freelancer: [],
      start_loader: false,
      loader: false,
    };
  }

  // view job details
  getSingleJobData = (id) => {
    this.setState((prevState) => ({
      start_loader: !prevState.start_loader,
      loader: true,
    }));
    axios({
      method: "get",
      url: `https://monorbit-alpha.herokuapp.com/api/v1/network/jobs/offerings/detail/${id}/`,
      headers: {
        Authorization: `Bearer ${this.props.getUserData.data.token}`,
      },
    })
      .then((res) => {
        this.setState((prevState) => ({
          start_loader: !prevState.start_loader,
          loader: false,
        }));
        this.props.sendSingleJobsData(res.data);
        this.props.history.push("./details");
      })
      .catch((err) => {
        this.setState((prevState) => ({
          start_loader: !prevState.start_loader,
          loader: false,
        }));
        console.log("Error : " + err);
      });
  };
  // Jobs You Might Be Interested In
  getInterestedJob = () => {
    axios({
      method: "get",
      url: `https://monorbit-alpha.herokuapp.com/api/v1/transactions/network/job-application/freelancer/all/`,
      headers: {
        Authorization: `Bearer ${this.props.getUserData.data.token}`,
      },
    })
      .then((res) => {
        // console.log(res.data);

        this.setState(() => ({
          list_all_freelancer: res.data.results,
        }));
      })
      .catch((err) => {
        console.log("Error : " + err);
      });
  };

  // this will prevent memory leak
  _isMounted = false;
  componentDidMount() {
    this.props.sendLoaderData(false);
    this._isMounted = true;
    this.getInterestedJob();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (!(this.props.getSessionData.data === "1")) {
      return <Redirect to='./login' />;
    }
    if (!this.state.list_all_freelancer) {
      return "loading... hoon me";
    }

    const job_type = this.props.getJobProfilesData.data[0];
    return (
      <div className='mainApplicationContainer'>
        <Header />
        {this.props.getLoaderData.data || this.state.loader ? (
          <div className='loaderContainer'>
            <h2 className='animate'>Loading...</h2>
          </div>
        ) : (
          <div className='applicationsContainer'>
            <div className='leftApplicationsContainer'>
              <div className='leftTitle'>
                <h4>You have applied for</h4>
              </div>
              {!this.props.getJobProfilesData.data[0] ? (
                <div className='comleteProfileContainer'>
                  <h4>
                    Please complete your job profile{" "}
                    <Link to='./create_profile'>here</Link>
                  </h4>
                  <div className='imgContainer'>
                    <img
                      alt='no data'
                      src={require("../../assets/noJobAvailable.svg")}
                    />
                  </div>
                  <Link to='./create_profile'>
                    <button>Create</button>
                  </Link>
                </div>
              ) : (
                <div style={{ width: "100%" }}>
                  {job_type.is_delivery_boy ? (
                    <DeliveryBoy history={this.props.history} />
                  ) : null}
                  {job_type.is_permanent_employee ? (
                    <PermanentEmployee history={this.props.history} />
                  ) : null}
                  {job_type.is_freelancer ? (
                    <Freelancer history={this.props.history} />
                  ) : null}
                </div>
              )}
            </div>
            <div className='rightApplicationsContainer'>
              <div className='interestedJobsContainer'>
                <h4 className='title'>jobs you might be interested in</h4>
                {this.state.start_loader ? "Loading..." : null}
                {this.state.list_all_freelancer ? (
                  <div>
                    {this.state.list_all_freelancer
                      .reverse()
                      .map((interested, index) => {
                        return (
                          <div key={index} className='jobContainer'>
                            <div className='header'>
                              <h4>{interested.offering.title}</h4>
                              <h6>{interested.offering.job.network.name}</h6>
                            </div>

                            <div className='footer'>
                              <h4>
                                {interested.offering.job.network.landmark}
                              </h4>
                              <button
                                onClick={() =>
                                  this.getSingleJobData(interested.offering.id)
                                }>
                                View More
                              </button>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <div style={{ width: "100%" }}>
                    <h4
                      style={{
                        textAlign: "center",
                        color: "#293462",
                        marginTop: 40,
                      }}>
                      No data available
                    </h4>
                  </div>
                )}
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
    getSingleDeliveryBoyProfileData: state.singleDeliveryBoyProfileReducer,
    getSingleFreelancerProfileData: state.singleFreelancerProfileReducer,
    getSinglePermanentProfileData: state.singlePermanentProfileReducer,
    getJobProfilesData: state.jobProfilesReducer,

    getLoaderData: state.loaderReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendSingleJobsData: (data) => dispatch(singleJobDetailsAction(data)),

    sendLoaderData: (data) => dispatch(loaderAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyApplications);
