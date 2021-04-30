import React, { Component } from "react";
import "../../../../style/component/profile/create/_createConfirm.scss";

class Confirm extends Component {
  confirm = () => {
    this.props.finish();
  };
  render() {
    return (
      <div className='modalViewConfirm'>
        <div className='modalViewMainConfirm'>
          <div className='confirmButtonContainer'>
            <button onClick={this.props.hide} className='cancelBtn'>
              Cancel
            </button>
            <button onClick={this.confirm} className='confirmBtn'>
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Confirm;
