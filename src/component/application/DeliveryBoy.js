import React, { Component } from "react";
import "../../style/pages/applications/_myApplications.scss";
import Arrow from "../../assets/arrowRight.svg";
import NoJobAvailable from "../../assets/noJobAvailable.svg";
import { Redirect } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { connect } from "react-redux";
import axios from "axios";

import { singleJobDetailsAction } from "../../redux/action/allJobProfilesAction";
import { loaderAction } from "../../redux/action/loaderAction";

class MyApplications extends Component {
  constructor() {
    super();
    this.state = {
      list_all_job_applied_by_deliver_boy: [],
      offset: 0,
      perPage: 20,
      currentPage: 1,
      loader: false,
    };
  }
  // To get all the Freelancer job applications made by a single Freelancer
  getAllDeliveryBoyAppliedJob = () => {
    axios({
      method: "get",
      url: `https://monorbit-alpha.herokuapp.com/api/v1/transactions/network/job-application/delivery-boys/all/?delivery_boy=${this.props.getSingleDeliveryBoyProfileData.data[0].id}&page=${this.state.currentPage}`,
      headers: {
        Authorization: `Bearer ${this.props.getUserData.data.token}`,
      },
    })
      .then((res) => {
        this.total_page = Math.ceil(res.data.count / this.state.perPage);

        this.setState(() => ({
          list_all_job_applied_by_deliver_boy: res.data.results,
        }));
      })
      .catch((err) => {
        console.log("Error : " + err);
      });
  };

  handlePageClick = (e) => {
    const selectedPage = e.selected + 1;
    const offset = selectedPage * this.state.perPage;

    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.getAllPermanentAppliedJob();
      }
    );
  };
  // this will prevent memory leak
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;

    this.getAllDeliveryBoyAppliedJob();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // view job details
  getSingleJobData = (id) => {
    this.props.sendLoaderData(true);
    axios({
      method: "get",
      url: `https://monorbit-alpha.herokuapp.com/api/v1/network/jobs/offerings/detail/${id}/`,
      headers: {
        Authorization: `Bearer ${this.props.getUserData.data.token}`,
      },
    })
      .then((res) => {
        this.props.sendSingleJobsData(res.data);
        this.props.history.push("./details");
      })
      .catch((err) => {
        console.log("Error : " + err);
      });
  };
  render() {
    if (!(this.props.getSessionData.data === "1")) {
      return <Redirect to='./login' />;
    }
    if (!this.state.list_all_job_applied_by_deliver_boy) {
      return "loading...";
    }
    return (
      <div style={{ width: "100%" }}>
        {!(this.state.list_all_job_applied_by_deliver_boy === 0) ? (
          <div className='singleApplicationMainContainer'>
            {this.state.list_all_job_applied_by_deliver_boy
              .reverse()
              .map((apply, index) => {
                return (
                  <div key={index} className='appliedJobsContainer'>
                    {/* header */}
                    <div className='header'>
                      <div className='leftHeader'>
                        <h4>{apply.offering.title}</h4>
                        <h6>{apply.offering.job.network.name}</h6>
                      </div>
                      <div className='rightHeader'>
                        {/* <h4>.</h4> */}
                        <h4>
                          {apply.application_status === "applied"
                            ? "Pending"
                            : apply.application_status}
                        </h4>
                      </div>
                    </div>
                    {/* footer */}
                    <div className='footer'>
                      <div className='leftFooter'>
                        <h4>Salary</h4>
                        <h6>${apply.offering.job.actual_salary}</h6>
                      </div>
                      <div
                        onClick={() => this.getSingleJobData(apply.offering.id)}
                        className='rightFooter'>
                        <h4>View More</h4>
                        <div className='arrow'>
                          <img alt='monorbit work' src={Arrow} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            <div>
              <ReactPaginate
                previousLabel={"Prev"}
                nextLabel={"Next"}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={this.total_page}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={this.handlePageClick}
                containerClassName={"pagination"}
                subContainerClassName={"pages pagination"}
                activeClassName={"active"}
              />
            </div>
          </div>
        ) : (
          <div className='singleApplicationMainContainer'>
            <div className='appliedJobsContainer'>
              <div className='noJobContainer'>
                <img alt='monorbit work' src={NoJobAvailable} />
              </div>
              <div className='findJobDesc'>
                <h4>you cannot applied any job yet!</h4>
                <button>Find Job</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getUserData: state.userReducer,
    getSessionData: state.sessionReducer,
    getSingleDeliveryBoyProfileData: state.singleDeliveryBoyProfileReducer,
    getSingleFreelancerProfileData: state.singleFreelancerProfileReducer,
    getSinglePermanentProfileData: state.singlePermanentProfileReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendSingleJobsData: (data) => dispatch(singleJobDetailsAction(data)),

    sendLoaderData: (data) => dispatch(loaderAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyApplications);
