import React, { Component } from "react";
import "../../../style/component/jobs/_addExperience.scss";
import { connect } from "react-redux";

import { educationAction } from "../../../redux/action/jobs/add/educationAction";

class Education extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      specialization: "",
      organization: "",
      location: "",
      start_date: "",
      end_date: "",
      description: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  education_data = [];

  educationData = () => {
    let data = {
      title: this.state.title,
      organization: this.state.organization,
      specialization: "",
      location: this.state.location,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
      description: this.state.description,
      added: new Date(),
    };

    this.education_data.push(data);
    this.props.sendEducationData(this.education_data);
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
          <h4 className='jobTitle'>Education Details</h4>
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
            <h4>Specialization</h4>
            <input
              type='text'
              name='specialization'
              value={this.state.specialization}
              onChange={(event) => this.handleChange(event)}
              placeholder='e.g. Python'
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
            <button onClick={this.educationData}>Save</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getUserData: state.userReducer,
    getEducationData: state.educationReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendEducationData: (data) => dispatch(educationAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Education);
