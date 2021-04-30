import React, { Component } from "react";
import "../../style/component/jobs/_innerGraduation.scss";

class AddDiploma extends Component {
  render() {
    return (
      <div className='modalViewGraduation'>
        <div className='modalViewMainGraduation'>
          <div className='imgContainer'>
            <button onClick={this.props.hide}>
              <img alt='promot' src={require("../../assets/closeModal.svg")} />
            </button>
          </div>
          <h4 className='jobTitle'>Diploma details</h4>
          <div className='experienceField'>
            <h4>College</h4>
            <input type='text' placeholder='e.g. Hnbgu college' />
          </div>
          <div className='experienceField'>
            <h4>Location</h4>
            <input type='text' placeholder='e.g. Jaipur' />
          </div>

          <div className=' doubleField'>
            <div>
              <h4>Start year</h4>
              <input type='date' placeholder='e.g. ' />
            </div>
            <div>
              <h4>End year</h4>
              <input type='date' placeholder='e.g. ' />
            </div>
          </div>

          <div className=' doubleField'>
            <div>
              <h4>Degree</h4>
              <input type='text' placeholder='e.g. ' />
            </div>
            <div>
              <h4>Stream(Optional)</h4>
              <input type='text' placeholder='e.g. ' />
            </div>
          </div>

          <div className='saveContainer'>
            <button>Save</button>
          </div>
        </div>
      </div>
    );
  }
}

export default AddDiploma;
