import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../style/component/_landingHeader.scss";
export default class LandingHeader extends Component {
  render() {
    return (
      <div className='landingHeaderContainer'>
        <div className='leftHeaderContainer'>
          <h4>{/* monorbit <span>work</span> */}</h4>
        </div>
        <div className='rightHeaderContainer'>
          <Link to='/register'>
            <button>Apply Now</button>
          </Link>
        </div>
      </div>
    );
  }
}
