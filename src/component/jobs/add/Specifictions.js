import React, { Component } from "react";
import "../../../style/component/jobs/_addExperience.scss";
import { connect } from "react-redux";

import { specificationsAction } from "../../../redux/action/jobs/add/specificationsAction";

class Specifictions extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      spec_type: "",
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  specifications_data = [];

  specificationsData = () => {
    let data = {
      label: this.state.title,
      spec_type: this.state.spec_type,
      description: this.state.description,
    };

    this.specifications_data.push(data);
    this.props.sendSpecifictionsData(this.specifications_data);
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
          <h4 className='jobTitle'>Job specifications</h4>
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
            <h4>Type</h4>
            <input
              type='text'
              name='spec_type'
              value={this.state.spec_type}
              onChange={(event) => this.handleChange(event)}
              placeholder='Choices are - skills, link, experience, other",'
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
            <button onClick={this.specificationsData}>Save</button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getUserData: state.userReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendSpecifictionsData: (data) => dispatch(specificationsAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specifictions);
