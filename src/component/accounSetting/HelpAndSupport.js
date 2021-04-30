import React, { Component } from "react";
import "../../style/component/accountSetting/_helpAndSupport.scss";
import Down from "../../assets/downArrow.svg";
export default class HelpAndSupport extends Component {
  render() {
    return (
      <div className='supportMainBox'>
        {/* inner Conatiner start here */}
        <div className='innerSupportMainBox'>
          <div className='supportBoxLeft'>
            <h4 className='supportBoxTitle'>Help And Support</h4>
            {/* query input start */}
            <div className='supportField'>
              <input type='text' placeholder='What is your problem' />
            </div>
            <div className='supportTextaField'>
              <textarea type='text' placeholder='What is your problem' />
            </div>
            <div className='querySubmitBtn'>
              <button>Submit</button>
            </div>
            {/* query input end*/}
          </div>
          <div className='supportBoxRight'>
            <h4 className='supportBoxTitle'>Your queries</h4>
            {/* querysatrt here */}
            <button className='innerSupportBoxRight'>
              <div className='numberQueryBox'>
                <h4>1.</h4>
                <h4>What is KYC? Know Your Customer (KYC) refers to </h4>
              </div>
              <img alt='monorbit' src={Down} />
            </button>
            {/* query send here */}
          </div>
        </div>
        {/* inner Conatiner end here */}
        {/* Frequently Ask Questions start */}
        <div className='supportBoxBottom'>
          <h4 className='supportBoxTitle'>Frequently Ask Questions </h4>
          {/* single question start */}
          <div className='innerSupportBoxBottom'>
            <div className='frequentlyQueBox'>
              <h4>1.</h4>
              <h4>What is KYC? Know Your Customer (KYC) refers to </h4>
            </div>
            <img alt='monorbit' src={Down} />
          </div>
          {/* single question end */}
        </div>
        {/* Frequently Ask Questions end */}
      </div>
    );
  }
}
