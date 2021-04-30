import React, { Component } from "react";
import "../../../style/component/profile/job/_type.scss";
import Confirm from "./Confirm";

import { connect } from "react-redux";
import { jobTypeAction } from "../../../redux/action/profile/jobTypeAction";
import { loaderAction } from "../../../redux/action/loaderAction";
import { Redirect } from "react-router-dom";

class Types extends Component {
  constructor() {
    super();
    this.state = {
      confirm: false,
    };
  }

  confirm = () => {
    this.setState((prevState) => ({
      confirm: !prevState.confirm,
    }));
  };

  deliveryBoy = () => {
    this.props.sendJobTypeData("Delivery_Boy");
  };
  freelancer = () => {
    this.props.sendJobTypeData("Freelancer");
  };
  permanent = () => {
    this.props.sendJobTypeData("Permanent");
  };

  // this will prevent memory leak
  _isMounted = false;
  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }
  render() {
    if (!(this.props.getSessionData.data === "1")) {
      return <Redirect to='./' />;
    }

    const type = this.props.getJobTypeData.data;

    return (
      <div className='mainJobTypeContainer'>
        {this.state.confirm ? (
          <Confirm
            hide={this.confirm}
            deliveryBoyJobCreate={this.props.deliveryBoyJobCreate}
            permanentJobCreate={this.props.permanentJobCreate}
            freelancerJobCreate={this.props.freelancerJobCreate}
          />
        ) : null}
        <div className='jobTypeContainer'>
          <div className='type'>
            <h4>Select Job Type</h4>
          </div>
          <div className='innerjobTypeContainer'>
            {/* field start */}
            <div className='typesContainer'>
              <div
                onClick={this.deliveryBoy}
                style={
                  type === "Delivery_Boy"
                    ? { backgroundColor: "#293462" }
                    : null
                }
                className='singleTypesContainer'>
                <h4
                  style={type === "Delivery_Boy" ? { color: "#ffffff" } : null}>
                  Delivery Boy
                </h4>
              </div>

              <div
                style={
                  type === "Freelancer" ? { backgroundColor: "#293462" } : null
                }
                onClick={this.freelancer}
                className='singleTypesContainer'>
                <h4 style={type === "Freelancer" ? { color: "#ffffff" } : null}>
                  Freelancer
                </h4>
              </div>

              <div
                style={
                  type === "Permanent" ? { backgroundColor: "#293462" } : null
                }
                onClick={this.permanent}
                className='singleTypesContainer'>
                <h4 style={type === "Permanent" ? { color: "#ffffff" } : null}>
                  Permanent
                </h4>
              </div>
            </div>
            {/* field end */}

            {/* field start */}
            <div className='jobTypeButtonContainer'>
              <button onClick={this.confirm}>Next</button>
            </div>
            {/* field end */}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getJobTypeData: state.jobTypeReducer,

    getCreateJobData: state.createJobReducer,
    getJobProfilesData: state.jobProfilesReducer,

    getSessionData: state.sessionReducer,

    getLoaderData: state.loaderReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendJobTypeData: (data) => dispatch(jobTypeAction(data)),
    sendLoaderData: (data) => dispatch(loaderAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Types);
