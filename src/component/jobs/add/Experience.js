import React, { Component } from "react";
import "../../../style/component/jobs/_addExperience.scss";
import { connect } from "react-redux";

import { experienceAction } from "../../../redux/action/jobs/add/experienceAction";

class AddExperience extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      organization: "",
      location: "",
      start_date: "",
      end_date: "",
      description: "",
      added: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  experience_data = [];

  experienceData = () => {
    let data = {
      title: this.state.title,
      organization: this.state.organization,
      location: this.state.location,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
      description: this.state.description,
      added: new Date(),
    };

    this.experience_data.push(data);
    this.props.sendExperienceData(this.experience_data);
    this.props.hide();
  };

  render() {
    return (
      <div className='modalView'>
        <div className='modalViewMain'>
          <div className='imgContainer'>
            <button onClick={this.props.hide}>
              <img
                alt='promot'
                src={require("../../../assets/closeModal.svg")}
              />
            </button>
          </div>
          <h4 className='jobTitle'>Job experience</h4>
          <div className='experienceField'>
            <h4>Title</h4>
            <input
              type='text'
              name='title'
              value={this.state.title}
              onChange={(event) => this.handleChange(event)}
              placeholder='e.g. What you have done'
            />
          </div>
          <div className='experienceField'>
            <h4>Organization</h4>
            <input
              type='text'
              name='organization'
              value={this.state.organization}
              onChange={(event) => this.handleChange(event)}
              placeholder='e.g. Monorbit'
            />
          </div>
          <div className='experienceField'>
            <h4>Location</h4>
            <input
              type='text'
              name='location'
              value={this.state.location}
              onChange={(event) => this.handleChange(event)}
              placeholder='e.g. Jaipur'
            />
          </div>
          <div className=' doubleField'>
            <div>
              <h4>Start Date</h4>
              <input
                type='date'
                name='start_date'
                value={this.state.start_date}
                onChange={(event) => this.handleChange(event)}
                placeholder='e.g. start_date'
              />
            </div>
            <div>
              <h4>End Date</h4>
              <input
                type='date'
                name='end_date'
                value={this.state.end_date}
                onChange={(event) => this.handleChange(event)}
                placeholder='e.g. end_date'
              />
            </div>
          </div>
          <div className='experienceFieldTexta'>
            <h4>Description (Optional)</h4>
            <textarea
              type='text'
              name='description'
              value={this.state.description}
              onChange={(event) => this.handleChange(event)}
              placeholder='Short description of work done (max 240 char)'
            />
          </div>
          <div className='saveContainer'>
            <button onClick={this.experienceData}>Save</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getUserData: state.userReducer,
    getExperienceData: state.experienceReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendExperienceData: (data) => dispatch(experienceAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddExperience);
