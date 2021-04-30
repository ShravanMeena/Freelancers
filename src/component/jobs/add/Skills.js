import React, { Component } from "react";
import "../../../style/component/jobs/_addExperience.scss";
import { connect } from "react-redux";

import { skillsAction } from "../../../redux/action/jobs/add/skillsAction";

class Skills extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      level: "",
      description: "",
      added: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  skills_data = [];

  skillsData = () => {
    let data = {
      label: this.state.title,
      level: this.state.level,
      description: this.state.description,
      added: new Date(),
    };

    this.skills_data.push(data);
    this.props.sendSkillsData(this.skills_data);
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
          <h4 className='jobTitle'>Skills</h4>
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
            <h4>Level</h4>
            <input
              type='text'
              name='level'
              value={this.state.level}
              onChange={(event) => this.handleChange(event)}
              placeholder='should be from the choices - beginner, intermediate, expert'
            />
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
            <button onClick={this.skillsData}>Save</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getUserData: state.userReducer,
    getSkillsData: state.skillsReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendSkillsData: (data) => dispatch(skillsAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Skills);
