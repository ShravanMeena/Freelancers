import React, { Component } from "react";
import Header from "../../component/header/InnerHeader";
import "../../style/pages/_jobDetails.scss";
import { connect } from "react-redux";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { loaderAction } from "../../redux/action/loaderAction";

class JobDetails extends Component {
  constructor() {
    super();
    this.state = {
      start_loader: false,
      loader: false,
    };
  }

  // Create Delivery Boy Application (Means Apply for Job as Delivery Boy)
  applyAsDeliveryBoy = () => {
    this.setState((prevState) => ({
      start_loader: !prevState.start_loader,
      loader: true,
    }));
    const data = {
      offering: this.props.getSingleJobDetailsData.data.id,
      delivery_boy: this.props.getSingleDeliveryBoyProfileData.data[0].id,
    };

    axios({
      method: "post",
      url: `https://monorbit-alpha.herokuapp.com/api/v1/transactions/network/job-application/delivery-boys/create/`,
      data: data,
      headers: {
        Authorization: `Bearer ${this.props.getUserData.data.token}`,
      },
    })
      .then((res) => {
        this.setState((prevState) => ({
          start_loader: !prevState.start_loader,
          loader: false,
        }));
        this.props.history.push("./applications");
      })
      .catch((err) => {
        console.log("Error : " + err);
        this.setState((prevState) => ({
          start_loader: !prevState.start_loader,
          loader: false,
        }));
        alert("Yor are not eligible for this job");
      });
  };

  // Create Freelancer Application (Means Apply for Job as Freelancer)
  applyAsFreelancer = () => {
    this.setState((prevState) => ({
      start_loader: !prevState.start_loader,
      loader: true,
    }));
    const data = {
      offering: this.props.getSingleJobDetailsData.data.id,
      freelancer: this.props.getSingleFreelancerProfileData.data[0].id,
    };

    axios({
      method: "post",
      url: `https://monorbit-alpha.herokuapp.com/api/v1/transactions/network/job-application/freelancer/create/`,
      data: data,
      headers: {
        Authorization: `Bearer ${this.props.getUserData.data.token}`,
      },
    })
      .then((res) => {
        this.setState((prevState) => ({
          start_loader: !prevState.start_loader,
          loader: false,
        }));
        this.props.history.push("./applications");
      })
      .catch((err) => {
        console.log("Error : " + err);
        this.setState((prevState) => ({
          start_loader: !prevState.start_loader,
          loader: false,
        }));
        alert("Yor are not eligible for this job");
      });
  };

  // Create Permanent Employee Application (Means Apply for Job as Permanent Employee)
  applyAsPermanentEmployee = () => {
    this.setState((prevState) => ({
      start_loader: !prevState.start_loader,
      loader: true,
    }));
    const data = {
      offering: this.props.getSingleJobDetailsData.data.id,
      permanent_employee: this.props.getSinglePermanentProfileData.data[0].id,
    };

    axios({
      method: "post",
      url: `https://monorbit-alpha.herokuapp.com/api/v1/transactions/network/job-application/permanent-employee/create/`,
      data: data,
      headers: {
        Authorization: `Bearer ${this.props.getUserData.data.token}`,
      },
    })
      .then((res) => {
        this.setState((prevState) => ({
          start_loader: !prevState.start_loader,
          loader: false,
        }));
        this.props.history.push("./applications");
      })
      .catch((err) => {
        console.log("Error : " + err);
        this.setState((prevState) => ({
          start_loader: !prevState.start_loader,
          loader: false,
        }));
        alert("Yor are not eligible for this job");
      });
  };

  // componentDidMount() {
  //   const already_applied = this.props.getAllJobProfilesData.data.results.filter(
  //     (offering) => offering.id === "31TWCDNV"
  //   );
  //   if (already_applied) {
  //     return alert(already_applied);
  //   } else alert("Yor are not eligible for this job or you are already apply");
  // }

  createBeforeApply = () => {
    this.props.sendLoaderData(true);
    this.props.history.push("/create_profile");
  };

  render() {
    if (!(this.props.getSessionData.data === "1")) {
      return <Redirect to='./login' />;
    }
    if (!this.props.getSingleJobDetailsData.data) {
      return "loading...";
    }

    const job = this.props.getSingleJobDetailsData;
    console.log(JSON.stringify(this.props.getJobProfilesData.data));
    return (
      <div className='jobDetailsMainContainer'>
        <Header />
        {this.state.loader ? (
          <div className='loaderContainer'>
            <h2 className='animate'>Loading...</h2>
          </div>
        ) : (
          <div className='jobDetailsContainer'>
            <div className='leftJobDetailsContainer'>
              <div className='innerLeftJobDetails'>
                {this.state.start_loader ? "Loading..." : null}

                <div className='jobDetailsHeader'>
                  <h4>{job.data.title} </h4>
                  <h6>{job.data.job.network.name}</h6>
                  <div className='innerJobDetailsHeaderContainer'>
                    <div className='leftInnerHeader'>
                      <h5>
                        ${job.data.job.salary_lower_range} - $
                        {job.data.job.salary_upper_range}
                      </h5>
                      <h5>{job.data.job.network.landmark}</h5>
                    </div>

                    <div className='rightInnerHeader'>
                      {this.props.getJobProfilesData.data.length === 0 ? (
                        <button
                          onClick={this.createBeforeApply}
                          className='logintbn'>
                          Apply
                        </button>
                      ) : (
                        <div>
                          {this.props.getJobProfilesData.data[0]
                            .is_delivery_boy ? (
                            <button
                              onClick={this.applyAsDeliveryBoy}
                              className='logintbn'>
                              Apply
                            </button>
                          ) : null}

                          {this.props.getJobProfilesData.data[0]
                            .is_permanent_employee ? (
                            <button
                              onClick={this.applyAsPermanentEmployee}
                              className='logintbn'>
                              Apply
                            </button>
                          ) : null}

                          {this.props.getJobProfilesData.data[0]
                            .is_freelancer ? (
                            <button
                              onClick={this.applyAsFreelancer}
                              className='logintbn'>
                              Apply
                            </button>
                          ) : null}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className='jobDetailsHeader_Footer'>
                    <h4>
                      Posted : <span> {job.data.last_date}</span>
                    </h4>
                    <h4>
                      Opening : <span>{job.data.max_staff_for_job}</span>
                    </h4>
                    <h4>
                      Job Application : <span>2</span>
                    </h4>
                  </div>
                </div>
                <div className='viewAllJobDetails'>
                  <h4>Job description</h4>
                  <h6>What You Have</h6>
                  <p>{job.data.job.job_description}</p>
                  <br></br>
                  <h6>Job Requirement</h6>
                  <p>{job.data.job.job_requirements} </p>
                </div>
              </div>
            </div>
            <div className='rightJobDetailsContainer'>
              <div className='innerRightJobDetails'>
                <div className='interestedJobContainer'>
                  <h4>Jobs you might be interested in</h4>

                  <div className='jobContainer'>
                    <div className='recommendeJob'>
                      <h4>Senior Data Scientist</h4>
                      <h5>Cognizer India Private Li...</h5>
                      <h6>Jaipur</h6>
                      <div className='postedDays'>
                        <h4>Posted 25 days ago</h4>
                      </div>
                    </div>
                  </div>

                  <div className='jobContainer'>
                    <div className='recommendeJob'>
                      <h4>Junior Data Scientist</h4>
                      <h5>Cognizer India Private Li...</h5>
                      <h6>Jaipur</h6>
                      <div className='postedDays'>
                        <h4>Posted 30 days ago</h4>
                      </div>
                    </div>
                  </div>

                  <div className='jobContainer'>
                    <div className='recommendeJob'>
                      <h4>Python Developer</h4>
                      <h5>Cognizer India Private Li...</h5>
                      <h6>Jaipur</h6>
                      <div className='postedDays'>
                        <h4>Posted 2 days ago</h4>
                      </div>
                    </div>
                  </div>
                </div>
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
    getSessionData: state.sessionReducer,

    getAllJobProfilesData: state.allJobProfilesReducer,

    getUserData: state.userReducer,
    getSingleJobDetailsData: state.singleJobDetailsReducer,
    getSingleDeliveryBoyProfileData: state.singleDeliveryBoyProfileReducer,
    getSingleFreelancerProfileData: state.singleFreelancerProfileReducer,
    getSinglePermanentProfileData: state.singlePermanentProfileReducer,
    // for conditionally apply
    getJobProfilesData: state.jobProfilesReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    sendLoaderData: (data) => dispatch(loaderAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobDetails);
