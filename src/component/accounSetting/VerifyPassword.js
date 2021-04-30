import React, { Component } from "react";
import "../../style/components/accountSetting/_verify_password.scss";

export default class VerifyPassword extends Component {
  render() {
    return (
      <div className='modalVerifyPassword'>
        <div className='modalVerifyPasswordMain'>
          <div className='imgContainer'>
            <button onClick={this.props.hide}>
              <img alt='about' src={require("../../assets/closeModal.svg")} />
            </button>
          </div>

          {/* confirm password field */}
          <div className='innerAddVerifyContainerField'>
            <div className='verifyAddField'>
              <input type='text' placeholder='Password' />
            </div>
            <div className='verifyAddField'>
              <input type='text' placeholder='Confirm Password' />
            </div>
          </div>
          {/**button post */}
          <div className='verifyBtn'>
            <button onClick={this.props.update}>Verify</button>
          </div>
        </div>
      </div>
    );
  }
}
