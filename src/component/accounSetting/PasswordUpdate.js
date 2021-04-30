import React, { Component } from "react";
import "../../style/component/accountSetting/_passwordUpdate.scss";
export default class PasswordUpdate extends Component {
  render() {
    return (
      <div className='paswordUpdateContainer'>
        <h4 className='passwordUpdateTitle'>Update Your Password</h4>
        <div className='updateField'>
          <input type='text' placeholder='Enter current password' />
        </div>

        <div className='updateField'>
          <input type='text' placeholder='New password' />
        </div>

        <div className='updateField'>
          <input type='text' placeholder='confirm password' />
        </div>

        <div className='passwordUpdateBtnBox'>
          <button>Update</button>
        </div>
      </div>
    );
  }
}
