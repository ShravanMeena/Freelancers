import React, { Component } from "react";
import "../../../../style/component/profile/job/permanent/_create.scss";
import Header from "../../../../component/header/InnerHeader";
import Experience from "../../../../component/jobs/add/Experience";
import Education from "../../../../component/jobs/add/Education";
import Skills from "../../../../component/jobs/add/Skills";
import Specifictions from "../../../../component/jobs/add/Specifictions";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { singlePermanentProfileAction } from "../../../../redux/action/profile/singlePermanentProfileAction";

import { connect } from "react-redux";

class Create extends Component {
  constructor() {
    super();
    this.state = {
      experience: false,
      education: false,
      skills: false,
      specifications: false,
      short_bio: "",
    };
  }

  experience = () => {
    this.setState((prevState) => ({
      experience: !prevState.experience,
    }));
  };

  education = () => {
    this.setState((prevState) => ({
      education: !prevState.education,
    }));
  };

  specifications = () => {
    this.setState((prevState) => ({
      specifications: !prevState.specifications,
    }));
  };

  skills = () => {
    this.setState((prevState) => ({
      skills: !prevState.skills,
    }));
  };

  createPermanentEmployee = () => {
    const data = {
      job_profile: this.props.getCreateJobProfileData.data.id,
      short_bio: this.state.short_bio,
      is_recharged: false,
      files: [],
      specifications: this.props.getSpecificationsData.data,
      educations: this.props.getEducationData.data,
      skills: this.props.getSkillsData.data,
      experiences: this.props.getExperienceData.data,
    };
    axios({
      method: "POST",
      url: `https://monorbit-alpha.herokuapp.com/api/v1/profiles/job/permanent/create/`,
      data: data,
      headers: {
        Authorization: `Bearer ${this.props.getUserData.data.token}`,
      },
    })
      .then((res) => {
        this.props.sendSinglePermanentProfileData(res.data);
        this.props.finish();
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
      return <Redirect to='./' />;
    }

    return (
      <div className='createPermanentContainer'>
        <Header />
        {/* add experience */}
        {this.state.experience ? <Experience hide={this.experience} /> : null}

        {/* add educations */}
        {this.state.education ? <Education hide={this.education} /> : null}

        {/* add skills */}
        {this.state.skills ? <Skills hide={this.skills} /> : null}

        {/* add specifications */}
        {this.state.specifications ? (
          <Specifictions hide={this.specifications} />
        ) : null}

        <div className='innerJobContainer'>
          <div className='jobDetailsContainer'>
            {/* mian container start */}
            <div className='mainContainer'>
              <div className='leftMainContainer'>
                <div>
                  <h4>Experience</h4>
                  <h6>experince desc..</h6>
                </div>
              </div>
              <div className='rightMainContainer'>
                {this.props.getExperienceData.data ? (
                  <div className='getDataByModal'>
                    {this.props.getExperienceData.data.map(
                      (experience, index) => {
                        return (
                          <div key={index} className='leftGetData'>
                            <h4>{experience.title}</h4>
                            <h6>at {experience.organization}</h6>
                            <h6>{experience.location}</h6>
                            <h6>
                              {/* {experience.start_date.slice(0, 4)} to{" "}
                              {experience.end_date.slice(0, 4)} */}
                            </h6>
                            <p>{experience.description}</p>
                          </div>
                        );
                      }
                    )}
                  </div>
                ) : null}
                <button onClick={this.experience}>+ add experience</button>
              </div>
            </div>
            {/* mian container end */}

            {/* mian container start */}
            <div className='mainContainer'>
              <div className='leftMainContainer'>
                <div>
                  <h4>Education</h4>
                  <h6>education desc..</h6>
                </div>
              </div>
              <div className='rightMainContainer'>
                {this.props.getEducationData.data ? (
                  <div className='getDataByModal'>
                    {this.props.getEducationData.data.map(
                      (education, index) => {
                        return (
                          <div key={index} className='leftGetData'>
                            <h4>{education.title}</h4>
                            <h6>at {education.organization}</h6>
                            <h6>at {education.specialization}</h6>
                            <h6>{education.location}</h6>
                            <h6>
                              {/* {education.start_date.slice(0, 4)} to{" "}
                              {education.end_date.slice(0, 4)} */}
                            </h6>
                            <p>{education.description}</p>
                          </div>
                        );
                      }
                    )}
                  </div>
                ) : null}
                <button onClick={this.education}>+ add education</button>
              </div>
            </div>
            {/* mian container end */}

            {/* mian container start */}
            <div className='mainContainer'>
              <div className='leftMainContainer'>
                <div>
                  <h4>Skills</h4>
                  <h6>skills desc..</h6>
                </div>
              </div>
              <div className='rightMainContainer'>
                {this.props.getSkillsData.data ? (
                  <div className='getDataByModal'>
                    {this.props.getSkillsData.data.map((skill, index) => {
                      return (
                        <div key={index} className='leftGetData'>
                          <h4>
                            {skill.label}
                            {""} ({skill.level})
                          </h4>
                          <p>{skill.description}</p>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
                <button onClick={this.skills}>+ add skills</button>
              </div>
            </div>
            {/* mian container end */}

            {/* mian container start */}
            <div className='mainContainer'>
              <div className='leftMainContainer'>
                <div>
                  <h4>Specifications</h4>
                  <h6>specifications desc..</h6>
                </div>
              </div>
              <div className='rightMainContainer'>
                {this.props.getSpecificationsData.data ? (
                  <div className='getDataByModal'>
                    {this.props.getSpecificationsData.data.map(
                      (specifications, index) => {
                        return (
                          <div key={index} className='leftGetData'>
                            <h4>{specifications.label}</h4>
                            <h6>{specifications.spec_type}</h6>
                            <p>{specifications.description}</p>
                          </div>
                        );
                      }
                    )}
                  </div>
                ) : null}
                <button onClick={this.specifications}>
                  + add specifications
                </button>
              </div>
            </div>
            {/* mian container end */}

            {/* mian container start */}
            <div className='mainContainer'>
              <div className='leftMainContainer'>
                <div>
                  <h4>Files</h4>
                  <h6>files desc..</h6>
                </div>
              </div>
              <div className='rightMainContainer'>
                <div className='getDataByModal'>
                  <div className='leftGetData'>
                    <h4> title goes here...</h4>
                    <h6>Organization name goes here...</h6>
                    <h6>2018 - 2021</h6>
                  </div>
                </div>
                <button onClick={this.experience}>+ add files</button>
              </div>
            </div>
            {/* mian container end */}

            {/* mian container start */}
            <div className='mainContainer'>
              <div className='leftMainContainer'>
                <div>
                  <h4>About you</h4>
                  <h6>about desc..</h6>
                </div>
              </div>
              <div className='rightMainContainer'>
                <div className='getDataByModal'>
                  <div className='leftGetData'>
                    <textarea
                      type='text'
                      name='short_bio'
                      value={this.state.short_bio}
                      onChange={(event) => this.handleChange(event)}
                      placeholder='Short description about you...'
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* mian container end */}

            <div className='saveChangesConatiner'>
              <button className='discardChanges'>Discard Changes</button>
              <button onClick={this.createPermanentEmployee}>
                Save Changes
              </button>
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

    getCreateJobProfileData: state.createJobReducer,
    getJobProfilesData: state.jobProfilesReducer,

    getSessionData: state.sessionReducer,
    getSingleJobProfileData: state.singleJobProfileReducer,

    getExperienceData: state.experienceReducer,
    getEducationData: state.educationReducer,
    getSkillsData: state.skillsReducer,
    getSpecificationsData: state.specificationsReducer,

    getSinglePermanentProfileData: state.singlePermanentProfileReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendSinglePermanentProfileData: (data) =>
      dispatch(singlePermanentProfileAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
