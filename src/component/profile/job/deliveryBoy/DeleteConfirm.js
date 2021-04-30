import React, { Component } from "react";
import "../../../../style/component/profile/create/_createConfirm.scss";
import axios from "axios";
import { connect } from "react-redux";

class DeleteConfirm extends Component {
  confirm = () => {
    this.deleteVehicle();
    this.props.hide();
  };
  deleteVehicle = () => {
    axios({
      method: "delete",
      url: `https://monorbit-alpha.herokuapp.com/api/v1/profiles/job/delivery-boy/vehicle/${this.props.id}/`,
      headers: {
        Authorization: `Bearer ${this.props.getUserData.data.token}`,
      },
    })
      .then((res) => {
        alert("successfully deleted vehicle");
      })
      .catch((err) => {
        console.log("Error : " + err);
      });
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
    getUserData: state.userReducer,
    getSessionData: state.sessionReducer,
  };
};

export default connect(mapStateToProps, null)(DeleteConfirm);
