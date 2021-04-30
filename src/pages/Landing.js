import React, { Component } from "react";
import "../style/pages/_landing.scss";
import Header from "../component/header/OuterHeader";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Search from "../assets/search.svg";
import Team from "../assets/header-teamwork.svg";

class Landing extends Component {
  render() {
    if (this.props.getSessionData.data === "1") {
      return <Redirect to='./home' />;
    }
    return (
      <div className='mainLandingContainer'>
        <Header />
        <div className='landingContainer'>
          <div className='leftLandingContainer'>
            <div className='innerLeftLandingHeader'>
              <h4>
                Your <span>Business</span>
              </h4>
              <h5>
                Your <span>Growth</span>
              </h5>
              <p>
                Phasellus vel elit efficitur, gravida libero sit amet,
                scelerisque tortor arcu, commodo sit amet nulla sed.
              </p>

              <div className='searchContainer'>
                <input type='text' placeholder='Search something awesome..' />
                <div className='imgContainer'>
                  <img alt='ssd' src={Search} />
                </div>
              </div>
            </div>
          </div>
          <div className='rightLandingContainer'>
            <div className='innerRightContainer'>
              <div className='imgContainer'>
                <img alt='ssd' src={Team} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getSessionData: state.sessionReducer,
  };
};

export default connect(mapStateToProps, null)(Landing);
