import React, { Component } from "react";
import "../../../../style/component/profile/job/permanent/_update.scss";
import Header from "../../../../component/header/InnerHeader";
import Trash from "../../../../assets/trash.svg";
import Edit from "../../../../assets/edit.svg";
import { Redirect } from "react-router-dom";

import { singlePermanentProfileAction } from "../../../../redux/action/profile/singlePermanentProfileAction";

import { connect } from "react-redux";
import axios from "axios";

class Update extends Component {
  constructor() {
    super();
    this.state = {
      start_loader: false,
    };
  }

  // get particulor permanent employee data
  getJobProfile = () => {
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
    if (!(this.props.getSessionData.data === "1")) {
      return <Redirect to='./' />;
    }
    if (!this.props.getSinglePermanentProfileData.data) {
      return <h4 style={{ padding: 100 }}>Loading...</h4>;
    }

    return (
      <div className='permanentJobContainer'>
        <Header />

        <div className='innerJobContainer'>
          <div className='jobDetailsContainer'>
            {/* mian container start */}
            <div className='badge'>
              <h4>Permanent Profile</h4>
            </div>
            <div className='mainContainer'>
              <div className='leftMainContainer'>
                <div>
                  <h4>Basic Details</h4>
                  <h6>details desc..</h6>
                </div>
              </div>

              <div className='rightMainContainer'>
                {this.props.getSinglePermanentProfileData.data.map(
                  (employee, index) => {
                    return (
                      <div key={index} className='getDataByModal'>
                        <div className='leftGetData'>
                          <h6>Name : {employee.job_profile.user.full_name}</h6>
                          <h6>Email : {employee.job_profile.alt_email}</h6>
                          <h6>
                            Phone : {employee.job_profile.alt_phone_number}
                          </h6>
                          <h6>Adhaar : {employee.job_profile.adhaar_card}</h6>
                          <h6 style={{ color: "green" }}>
                            Job Type : Permanet
                          </h6>
                          <h6>
                            Address : {employee.job_profile.address},{" "}
                            {employee.job_profile.landmark},{" "}
                            {employee.job_profile.city},{" "}
                            {employee.job_profile.state},{" "}
                            {employee.job_profile.country},{" "}
                            {employee.job_profile.pincode}
                          </h6>

                          <h6>About : {employee.short_bio}</h6>
                        </div>
                        <div className='rightGetData'>
                          <div className='tooltip'>
                            <img alt='monorbit work' src={Edit} />
                            <span className='tooltiptext'>Edit</span>
                          </div>
                          <div className='tooltip'>
                            <img alt='monorbit work' src={Trash} />
                            <span className='tooltiptext'>Delete</span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                )}
              </div>
            </div>
            {/* mian container end */}
            {/* mian container start */}
            <div className='mainContainer'>
              <div className='leftMainContainer'>
                <div>
                  <h4>Experience </h4>
                  <h6>experience desc..</h6>
                </div>
              </div>

              {this.props.getSinglePermanentProfileData.data[0].experiences
                .length === 0 ? (
                <div className='rightMainContainer'>
                  <h4>Please Add Your Experience</h4>
                </div>
              ) : (
                <div className='rightMainContainer'>
                  {this.props.getSinglePermanentProfileData.data[0].experiences.map(
                    (experience, index) => {
                      return (
                        <div key={index} className='getDataByModal'>
                          <div className='leftGetData'>
                            <h4>{experience.title}</h4>
                            <h6>at {experience.organization}</h6>
                            <h6>{experience.location}</h6>
                            <h6>
                              {experience.start_date.slice(0, 10)}
                              {" - "}
                              {experience.end_date.slice(0, 10)}
                            </h6>
                            <h6>{experience.description}</h6>

                            <h6>
                              description about the experience user wants to add
                            </h6>
                          </div>
                          <div className='rightGetData'>
                            <div>
                              <img alt='monorbit work' src={Edit} />
                            </div>
                            <div>
                              <img alt='monorbit work' src={Trash} />
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            </div>
            {/* mian container end */}
            {/* mian container start */}
            <div className='mainContainer'>
              <div className='leftMainContainer'>
                <div>
                  <h4>Educations </h4>
                  <h6>edu.. desc..</h6>
                </div>
              </div>

              {this.props.getSinglePermanentProfileData.data[0].educations
                .length === 0 ? (
                <div className='rightMainContainer'>
                  <h4>Please Add Your Educations</h4>
                </div>
              ) : (
                <div className='rightMainContainer'>
                  {this.props.getSinglePermanentProfileData.data[0].educations.map(
                    (education, index) => {
                      return (
                        <div key={index} className='getDataByModal'>
                          <div className='leftGetData'>
                            <h4>{education.title}</h4>
                            <h6>at {education.organization}</h6>
                            <h6>{education.specialization}</h6>
                            <h6>{education.location}</h6>
                            <h6>
                              {education.start_date.slice(0, 10)}
                              {" - "}
                              {education.end_date.slice(0, 10)}
                            </h6>
                            <h6>{education.description}</h6>
                          </div>
                          <div className='rightGetData'>
                            <div>
                              <img alt='monorbit work' src={Edit} />
                            </div>
                            <div>
                              <img alt='monorbit work' src={Trash} />
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            </div>
            {/* mian container end */}
            {/* mian container start */}
            <div className='mainContainer'>
              <div className='leftMainContainer'>
                <div>
                  <h4>Skills </h4>
                  <h6>skills desc..</h6>
                </div>
              </div>

              {this.props.getSinglePermanentProfileData.data[0].skills
                .length === 0 ? (
                <div className='rightMainContainer'>
                  <h4>Please Add Your Skills</h4>
                </div>
              ) : (
                <div className='rightMainContainer'>
                  {this.props.getSinglePermanentProfileData.data[0].skills.map(
                    (skills, index) => {
                      return (
                        <div key={index} className='getDataByModal'>
                          <div className='leftGetData'>
                            <h4>{skills.label}</h4>
                            <h6>{skills.level}</h6>
                            <h6>{skills.description}</h6>
                          </div>
                          <div className='rightGetData'>
                            <div>
                              <img alt='monorbit work' src={Edit} />
                            </div>
                            <div>
                              <img alt='monorbit work' src={Trash} />
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            </div>
            {/* mian container end */}
            {/* mian container start */}
            <div className='mainContainer'>
              <div className='leftMainContainer'>
                <div>
                  <h4>Files </h4>
                  <h6>files desc..</h6>
                </div>
              </div>

              {this.props.getSinglePermanentProfileData.data[0].files.length ===
              0 ? (
                <div className='rightMainContainer'>
                  <h4>Please Add Your Files</h4>
                </div>
              ) : (
                <div className='rightMainContainer'>
                  {this.props.getSinglePermanentProfileData.data[0].files.map(
                    (files, index) => {
                      return (
                        <div key={index} className='getDataByModal'>
                          <div className='leftGetData'></div>
                          <div className='rightGetData'>
                            <div>
                              <img alt='monorbit work' src={Edit} />
                            </div>
                            <div>
                              <img alt='monorbit work' src={Trash} />
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            </div>
            {/* mian container end */}
            {/* mian container start */}
            <div className='mainContainer'>
              <div className='leftMainContainer'>
                <div>
                  <h4>Specifications </h4>
                  <h6>specifications desc..</h6>
                </div>
              </div>
              {this.props.getSinglePermanentProfileData.data[0].specifications
                .length === 0 ? (
                <div className='rightMainContainer'>
                  <h4>Please Add Your Specifications</h4>
                </div>
              ) : (
                <div className='rightMainContainer'>
                  {this.props.getSinglePermanentProfileData.data[0].specifications.map(
                    (specifications, index) => {
                      return (
                        <div key={index} className='getDataByModal'>
                          <div className='leftGetData'>
                            <h4>{specifications.label}</h4>
                            <h6>{specifications.spec_type}</h6>
                            <h6>{specifications.description}</h6>
                          </div>
                          <div className='rightGetData'>
                            <div>
                              <img alt='monorbit work' src={Edit} />
                            </div>
                            <div>
                              <img alt='monorbit work' src={Trash} />
                            </div>
                          </div>
                        </div>
                      );
                    }
                  )}
                </div>
              )}
            </div>
            {/* mian container end */}
            {/* <div className='saveChangesConatiner'>
              <button className='discardChanges'>Discard Changes</button>
              <button>Save Changes</button>
            </div> */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getUserData: state.userReducer,
    getJobProfilesData: state.jobProfilesReducer,
    getSinglePermanentProfileData: state.singlePermanentProfileReducer,
    getSessionData: state.sessionReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendSinglePermanentProfileData: (data) =>
      dispatch(singlePermanentProfileAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Update);
