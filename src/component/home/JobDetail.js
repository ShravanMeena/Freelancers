import React, { Component } from "react";
import "../../style/component/home/_jobDetail.scss";
import Heart from "../../assets/heart.svg";
import { connect } from "react-redux";
import axios from "axios";
import { allJobProfilesAction } from "../../redux/action/allJobProfilesAction";
import { singleJobDetailsAction } from "../../redux/action/allJobProfilesAction";

import { loaderAction } from "../../redux/action/loaderAction";

import ReactPaginate from "react-paginate";
import { Redirect } from "react-router-dom";

class JobDetail extends Component {
  constructor() {
    super();
    this.state = {
      start_loader: false,
      loader: false,
      offset: 0,
      perPage: 20,
      currentPage: 1,
    };
  }
  // get all ofeering jobs created by any network
  getAllJobOffering = () => {
    this.setState((prevState) => ({
      start_loader: !prevState.start_loader,
    }));
    try {
      axios({
        method: "get",
        url: `https://monorbit-alpha.herokuapp.com/api/v1/network/jobs/offerings/all/?page=${this.state.currentPage}`,
        headers: {
          Authorization: `Bearer ${this.props.getUserData.data.token}`,
        },
      })
        .then((res) => {
          this.total_page = Math.ceil(res.data.count / this.state.perPage);

          this.setState((prevState) => ({
            start_loader: !prevState.start_loader,
          }));
          this.props.sendAllJobProfilesData(res.data);
        })
        .catch((err) => {
          console.log("Error : " + err);
          this.setState((prevState) => ({
            start_loader: !prevState.start_loader,
          }));
        });
    } catch {}
  };

  // single job details
  getSingleJobData = (id) => {
    // use loader state to other compnent
    this.props.sendLoaderData(true);
    this.setState((prevState) => ({
      start_loader: !prevState.start_loader,
      loader: true,
    }));
    axios({
      method: "get",
      url: `https://monorbit-alpha.herokuapp.com/api/v1/network/jobs/offerings/detail/${id}/`,
      headers: {
        Authorization: `Bearer ${this.props.getUserData.data.token}`,
      },
    })
      .then((res) => {
        this.setState((prevState) => ({
          start_loader: !prevState.start_loader,
          loader: false,
        }));
        this.props.sendSingleJobsData(res.data);
        this.props.history.push("./details");
      })
      .catch((err) => {
        this.setState((prevState) => ({
          start_loader: !prevState.start_loader,
          loader: false,
        }));
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
        this.getAllJobOffering();
      }
    );
  };
  // this will prevent memory leak
  _isMounted = false;

  componentDidMount() {
    this._isMounted = true;
    this.getAllJobOffering();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (!(this.props.getSessionData.data === "1")) {
      return <Redirect to='./login' />;
    }
    if (!this.props.getAllJobProfilesData.data) {
      return <h2 className='animate'>Loading...</h2>;
    }

    return (
      <div className='mainJobDetailsCOntainer'>
        {/* {this.state.start_loader ? <h4>loading...</h4> : null} */}
        {this.props.getAllJobProfilesData.data.results.map((job, index) => {
          return (
            <div
              key={index}
              onClick={() => this.getSingleJobData(job.id)}
              className='jobDetailsContainer'>
              <h4>{job.title}</h4>
              <div className='networkDetailContainer'>
                <h6>{job.job.network.name}</h6>
                <h6>
                  {job.job.network.rating} ({job.job.network.no_of_reviews}{" "}
                  reviews)
                </h6>
              </div>
              <div className='priceLocationContainer'>
                <h2>
                  {job.job.salary_lower_range} - {job.job.salary_upper_range}
                </h2>
                <h2>{job.job.job_type}</h2>
              </div>
              <h5>{job.offering_information.slice(0, 250)}...</h5>

              <div className='footerJobContainer'>
                <h4>20 days ago</h4>
                <div>
                  <img src={Heart} alt='heart' />
                </div>
              </div>
            </div>
          );
        })}

        <div>
          {!(this.props.getAllJobProfilesData.data.results.length === 0) ? (
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
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getUserData: state.userReducer,
    getAllJobProfilesData: state.allJobProfilesReducer,
    getSessionData: state.sessionReducer,
    getLoaderData: state.loaderReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // all offering job created by any netwok action
    sendAllJobProfilesData: (data) => dispatch(allJobProfilesAction(data)),

    sendSingleJobsData: (data) => dispatch(singleJobDetailsAction(data)),
    sendLoaderData: (data) => dispatch(loaderAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(JobDetail);
