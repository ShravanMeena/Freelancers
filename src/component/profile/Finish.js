import React, { Component } from "react";
import "../../style/component/profile/_finish.scss";
import Success from "../../assets/success.svg";
import { Link } from "react-router-dom";

export default class Finish extends Component {
  render() {
    return (
      <div className='mainFinishContainer'>
        <div className='finishContainer'>
          <div className='innerFinishContainer'>
            <div className='congratsTopContainer'>
              <div className='imgContainer'>
                <img alt='monorbit work' src={Success} />
              </div>
              <h4>Your response succesfully save</h4>
              <Link to='./home'>
                <button>Find Jobs</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
