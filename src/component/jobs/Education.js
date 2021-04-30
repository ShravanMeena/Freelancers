import React, { Component } from "react";
import "../../style/component/jobs/_education.scss";
import AddGraduation from "./AddGraduation";
import AddDiploma from "./AddDiploma";
import AddPostGraduation from "./AddPostGraduation";
import AddPhd from "./AddPhd";

class Education extends Component {
  constructor() {
    super();
    this.state = {
      graduation: false,
      diploma: false,
      post_graduation: false,
      phd: false,
    };
  }

  graduation = () => {
    this.setState((prevState) => ({
      graduation: !prevState.graduation,
    }));
  };
  diploma = () => {
    this.setState((prevState) => ({
      diploma: !prevState.diploma,
    }));
  };
  post_graduation = () => {
    this.setState((prevState) => ({
      post_graduation: !prevState.post_graduation,
    }));
  };
  phd = () => {
    this.setState((prevState) => ({
      phd: !prevState.phd,
    }));
  };
  render() {
    return (
      <div className='modalViewEducation'>
        {this.state.graduation ? (
          <AddGraduation hide={this.graduation} />
        ) : null}

        {this.state.post_graduation ? (
          <AddPostGraduation hide={this.post_graduation} />
        ) : null}

        {this.state.phd ? <AddPhd hide={this.phd} /> : null}

        {this.state.diploma ? <AddDiploma hide={this.diploma} /> : null}
        <div className='modalViewMainEducation'>
          <div className='imgContainer'>
            <button onClick={this.props.hide}>
              <img alt='promot' src={require("../../assets/closeModal.svg")} />
            </button>
          </div>
          <h4 className='jobTitle'>Education</h4>

          <div onClick={this.graduation} className='addField'>
            <h4>+ Add graduation</h4>
          </div>

          <div onClick={this.post_graduation} className='addField'>
            <h4>+ Add post graduation</h4>
          </div>

          <div onClick={this.diploma} className='addField'>
            <h4>+ Add diploma</h4>
          </div>

          <div onClick={this.phd} className='addField'>
            <h4>+ Add PhD</h4>
          </div>
        </div>
      </div>
    );
  }
}

export default Education;
