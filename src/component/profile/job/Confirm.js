import React, { Component } from "react";
import "../../../style/component/profile/create/_createConfirm.scss";
import { connect } from "react-redux";

class Confirm extends Component {
  confirm = () => {
    if (this.props.getJobTypeData.data === "Delivery_Boy") {
      this.props.deliveryBoyJobCreate();
      return;
    }
    if (this.props.getJobTypeData.data === "Permanent") {
      this.props.permanentJobCreate();
      return;
    }
    if (this.props.getJobTypeData.data === "Freelancer") {
      this.props.freelancerJobCreate();
      return;
    }
    this.props.hide();
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

const mapStateToProps = (state) => {
  return {
    getJobTypeData: state.jobTypeReducer,
  };
};

export default connect(mapStateToProps, null)(Confirm);
