import React, { Component } from "react";
import "../../style/pages/job/_jobSetting.scss";
import Header from "../../component/header/InnerHeader";
import AddExperience from "../../component/jobs/add/Experience";
import Education from "../../component/jobs/Education";
import Trash from "../../assets/trash.svg";
import Edit from "../../assets/edit.svg";
import { Redirect } from "react-router-dom";

import { connect } from "react-redux";

class JobSetting extends Component {
  constructor() {
    super();
    this.state = {
      experience: false,
      education: false,
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

  render() {
    if (!(this.props.getSessionData.data === "1")) {
      return <Redirect to='./' />;
    }
    return (
      <div className='jobSettingContainer'>
        <Header />
        {/* add experience */}
        {this.state.experience ? (
          <AddExperience hide={this.experience} />
        ) : null}

        {/* add education */}
        {this.state.education ? <Education hide={this.education} /> : null}
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
                <div className='getDataByModal'>
                  <div className='leftGetData'>
                    <h4>Experience title goes here...</h4>
                    <h6>Organization name goes here...</h6>
                    <h6>2018 - 2021</h6>
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
                <div className='getDataByModal'>
                  <div className='leftGetData'>
                    <h4>
                      Bachelor of Technology (B.Tech), Computer Science &
                      Engineering
                    </h4>
                    <h6>Hemwati Nandan Bahuguna Garhwal University</h6>
                    <h6>2018 - 2021</h6>
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
                <button onClick={this.education}>+ add education</button>
              </div>
            </div>
            {/* mian container end */}
            {/* mian container start */}
            <div className='mainContainer'>
              <div className='leftMainContainer'>
                <div>
                  <h4>job type</h4>
                  <h6>you can select multiple job type</h6>
                </div>
              </div>
              <div className='rightMainContainer jobType'>
                <input type='checkbox' name='job1' value='ft' checked />
                <label for='job1'>Full Time</label>
                <br />
                <input type='checkbox' name='job2' value='pt' />
                <label for='job2'>Part time</label>
                <br />
                <input type='checkbox' name='job4' value='ct' />
                <label for='job4'>Contract</label>
                <br />
                <input type='checkbox' name='job6' value='fr' />
                <label for='job5'>Freelance</label>
                <br />
                <input type='checkbox' name='job6' value='cf' />
                <label for='job6'>Co-founder</label>
              </div>
            </div>
            {/* mian container end */}
            {/* mian container start */}
            <div className='mainContainer'>
              <div className='leftMainContainer'>
                <div>
                  <h4>primary location</h4>
                  <h6>
                    this is optional. The main company headquarter if selected
                    by default
                  </h6>
                </div>
              </div>
              <div className='rightMainContainer '>
                <select id='monselect'>
                  <option value='valeur1'>Valeur 1</option>
                  <option value='valeur2' selected>
                    Jaipur, Rajasthan
                  </option>
                  <option value='valeur3'>Valeur 3</option>
                </select>

                <select id='monselect'>
                  <option value='valeur1'>Valeur 1</option>
                  <option value='valeur2' selected>
                    India
                  </option>
                  <option value='valeur3'>Valeur 3</option>
                </select>
              </div>
            </div>
            {/* mian container end */}
            {/* mian container start */}
            <div className='mainContainer'>
              <div className='leftMainContainer'>
                <div>
                  <h4>categories</h4>
                  <h6>
                    please select 1-5 categories that the job fals into. These
                    will help job seekers discover your job.
                  </h6>
                </div>
              </div>
              <div className='rightMainContainer categoryContainer '>
                <input type='text' placeholder='Select category...' />
              </div>
            </div>
            {/* mian container end */}
            {/* mian container start */}
            <div className='mainContainer'>
              <div className='leftMainContainer'>
                <div>
                  <h4>skills</h4>
                  <h6>
                    please select 1-10 specific skills that are relevant to the
                    job.
                  </h6>
                </div>
              </div>
              <div className='rightMainContainer categoryContainer '>
                <input type='text' placeholder='Select skills...' />
              </div>
            </div>
            {/* mian container end */}
            <div className='saveChangesConatiner'>
              <button className='discardChanges'>Discard Changes</button>
              <button>Save Changes</button>
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
    getSessionData: state.sessionReducer,
  };
};

export default connect(mapStateToProps, null)(JobSetting);
