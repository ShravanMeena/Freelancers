import React, { Component } from "react";
import LocationFilter from "../../component/home/LocationFilter";
import JobTypeFilter from "../../component/home/JobTypeFilter";
import SalaryFilter from "../../component/home/SalaryFilter";
import JobDetail from "../../component/home/JobDetail";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import "../../style/pages/home/_home.scss";
import Header from "../../component/header/InnerHeader";
import Collapsible from "react-collapsible";

import { jobProfilesAction } from "../../redux/action/profile/jobProfilesAction";

import { singleDeliveryBoyProfileAction } from "../../redux/action/profile/singleDeliveryBoyProfileAction";
import { singlePermanentProfileAction } from "../../redux/action/profile/singlePermanentProfileAction";
import { singleFreelancerProfileAction } from "../../redux/action/profile/singleFreelancerProfileAction";

import { loaderAction } from "../../redux/action/loaderAction";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      arrow: true,
      all_data: [],
      start_loader: false,
      loader: false,
    };
  }

  arrow = () => {
    this.setState((prevState) => ({
      arrow: !prevState.arrow,
    }));
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
          this.getJobProfileDeliveryBoy();
          this.getJobProfilePermanentEmployee();
          this.getJobProfileFreelancer();
        })
        .catch((err) => {
          console.log("Error : " + err);
        });
    } catch {}
  };

  // get particulor delivery boy data
  getJobProfileDeliveryBoy = () => {
    axios({
      method: "get",
      url: `https://monorbit-alpha.herokuapp.com/api/v1/profiles/job/delivery-boy/all/?job_profile=${this.props.getJobProfilesData.data[0].id}`,
      headers: {
        Authorization: `Bearer ${this.props.getUserData.data.token}`,
      },
    })
      .then((res) => {
        this.props.sendSingleDeliveryBoyProfileData(res.data.results);
      })
      .catch((err) => {
        console.log("Error : " + err);
      });
  };

  // get particulor permanent employee boy data
  getJobProfilePermanentEmployee = () => {
    axios({
      method: "get",
      url: `https://monorbit-alpha.herokuapp.com/api/v1/profiles/job/permanent/all/?job_profile=${this.props.getJobProfilesData.data[0].id}`,
      headers: {
        Authorization: `Bearer ${this.props.getUserData.data.token}`,
      },
    })
      .then((res) => {
        this.props.sendSinglePermanentProfileData(res.data.results);
      })
      .catch((err) => {
        console.log("Error : " + err);
      });
  };

  // get particulor freelancer  data
  getJobProfileFreelancer = () => {
    axios({
      method: "get",
      url: `https://monorbit-alpha.herokuapp.com/api/v1/profiles/job/freelancer/all/?job_profile=${this.props.getJobProfilesData.data[0].id}`,
      headers: {
        Authorization: `Bearer ${this.props.getUserData.data.token}`,
      },
    })
      .then((res) => {
        this.props.sendSingleFreelancerProfileData(res.data.results);
      })
      .catch((err) => {
        console.log("Error : " + err);
      });
  };

  // this will prevent memory leak
  _isMounted = false;
  componentDidMount() {
    this._isMounted = true;
    this.getJobProfileData();
    this.props.sendLoaderData(false);
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    if (!(this.props.getSessionData.data === "1")) {
      return <Redirect to='./login' />;
    }
    return (
      <div className='mainHomeContainer'>
        <Header />

        {this.props.getLoaderData.data ? (
          <div className='loaderContainer'>
            <h2 className='animate'>Loading...</h2>
          </div>
        ) : (
          <div className='homeContainer'>
            <div className='leftHomeContainer'>
              <div className='innerLeftomeContainer'>
                <div className='filterLeftHeader'>
                  <h4>Filter</h4>
                </div>
                <LocationFilter />
                <JobTypeFilter />
                <SalaryFilter />
              </div>
            </div>
            <div className='rightHomeContainer'>
              {/* <div className='rightHeaderFilter'>
              <h4>1 - 20 of 403160 Jobs In India</h4>
              <div className='sortByContainer'>
                <div><img src={Filter} /></div>
                <h4>Sort by : </h4>
                <select>
                  <option>Relevance</option>
                  <option>Date</option>
                </select>
              </div>
            </div> */}
              <div className='mobileContainer'>
                <Collapsible
                  open={false}
                  triggerStyle={{ color: "#293462", cursor: "pointer" }}
                  triggerTagName='h4'
                  trigger={
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}>
                      <h4 style={{ color: "#293462" }}>Filter</h4>
                      <h4>+</h4>
                    </div>
                  }
                  triggerWhenOpen={
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}>
                      <h4>Filter</h4>
                      <h4>-</h4>
                    </div>
                  }
                  transitionTime={400}
                  transitionCloseTime={400}>
                  <div className='mobileFilterContainer'>
                    <LocationFilter />
                    <JobTypeFilter />
                    <SalaryFilter />
                  </div>
                </Collapsible>
              </div>

              <JobDetail history={this.props.history} />
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
    getJobProfilesData: state.jobProfilesReducer,
    getSessionData: state.sessionReducer,

    getLoaderData: state.loaderReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendJobProfilesData: (data) => dispatch(jobProfilesAction(data)),

    sendSingleDeliveryBoyProfileData: (data) =>
      dispatch(singleDeliveryBoyProfileAction(data)),
    sendSinglePermanentProfileData: (data) =>
      dispatch(singlePermanentProfileAction(data)),
    sendSingleFreelancerProfileData: (data) =>
      dispatch(singleFreelancerProfileAction(data)),

    sendLoaderData: (data) => dispatch(loaderAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
