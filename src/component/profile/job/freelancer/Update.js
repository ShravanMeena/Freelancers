import React, { Component } from "react";
import "../../../../style/component/profile/job/permanent/_update.scss";
import Header from "../../../../component/header/InnerHeader";
import Trash from "../../../../assets/trash.svg";
import Edit from "../../../../assets/edit.svg";
import { Redirect } from "react-router-dom";

import { singleFreelancerProfileAction } from "../../../../redux/action/profile/singleFreelancerProfileAction";

import { connect } from "react-redux";
import axios from "axios";

class JobSetting extends Component {
  constructor() {
    super();
    this.state = {};
  }

  // get particulor freelancer boy data
  getJobProfile = () => {
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
    this.getJobProfile();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    if (!(this.props.getSessionData.data === "1")) {
      return <Redirect to='./' />;
    }
    return (
      <div className='permanentJobContainer'>
        <Header />

        <div className='innerJobContainer'>
          <div className='jobDetailsContainer'>
            <div className='badge'>
              <h4>Freelancer Profile</h4>
            </div>
            {/* mian container start */}
            <div className='mainContainer'>
              <div className='leftMainContainer'>
                <div>
                  <h4>Basic Details</h4>
                  <h6>details desc..</h6>
                </div>
              </div>
              <div className='rightMainContainer'>
                <div className='getDataByModal'>
                  <div className='leftGetData'>
                    <h6>Name : Shravan meena</h6>
                    <h6>Email : shravanmeena47@gmail.com </h6>
                    <h6>Phone : 9876565578</h6>
                    <h6>Adhaar : 98664357956</h6>
                    <h6>
                      Address : near siddha aangan, bagaru, jaipur, rajasthan,
                      india,302928
                    </h6>

                    <h6>
                      About : If you ever worked with a JSON structure, you've
                      worked with JavaScript objects. Quite literally. JSON
                      stands for JavaScript Object Notation.
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
              <div className='rightMainContainer'>
                <div className='getDataByModal'>
                  <div className='leftGetData'>
                    <h4>Project Manager</h4>
                    <h6>at Monorbit</h6>
                    <h6>Jaipur</h6>
                    <h6>2020-10-09 - 2020-12-09</h6>
                    <h6>
                      Address : near siddha aangan, bagaru, jaipur, rajasthan,
                      india,302928
                    </h6>

                    <h6>description about the experience user wants to add</h6>
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
              </div>
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
              <div className='rightMainContainer'>
                <div className='getDataByModal'>
                  <div className='leftGetData'>
                    <h4>Bachelor of Technology</h4>
                    <h6>at Monorbit</h6>
                    <h6>Computer Science and Engineering</h6>
                    <h6>Jaipur</h6>
                    <h6>2020-10-09 - 2020-12-09</h6>
                    <h6>description about the experience user wants to add</h6>
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
              </div>
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
              <div className='rightMainContainer'>
                <div className='getDataByModal'>
                  <div className='leftGetData'>
                    <h4>Javascript</h4>
                    <h6>Expert</h6>
                    <h6>description about the experience user wants to add</h6>
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
              </div>
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
              <div className='rightMainContainer'>
                <div className='getDataByModal'>
                  <div className='leftGetData'>
                    <h4>Image</h4>
                    <h6>www.File_Url_uplaoded_by_the_permanent_profile.jpg</h6>
                    <h6>File label - tells that what file is used for</h6>
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
              </div>
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
              <div className='rightMainContainer'>
                <div className='getDataByModal'>
                  <div className='leftGetData'>
                    <h4>Link</h4>
                    <h6>Javascript</h6>
                    <h6>description about the experience user wants to add</h6>
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
              </div>
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
    getSessionData: state.sessionReducer,

    getSingleFreelancerProfileData: state.singleFreelancerProfileReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendSingleFreelancerProfileData: (data) =>
      dispatch(singleFreelancerProfileAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobSetting);
