import React, { Component } from "react";
import "../../style/component/home/_filter.scss";
import Collapsible from "react-collapsible";

export default class SalaryFilter extends Component {
  render() {
    return (
      <div className='filterContainer'>
        <Collapsible
          open={true}
          triggerStyle={{ color: "#293462", cursor: "pointer" }}
          triggerTagName='h4'
          trigger={
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <h4>Salary</h4>
              <h4>+</h4>
            </div>
          }
          triggerWhenOpen={
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}>
              <h4>Salary</h4>
              <h4>-</h4>
            </div>
          }
          transitionTime={400}
          transitionCloseTime={400}>
          {/* <div className='filterHeaderContainer'>
            <h4>Location</h4>
            <p>arrow</p>
          </div> */}
          <div className='filterBodyContainer'>
            <div className='innerFilterBodyContainer'>
              <input type='radio' name='job_type' value='jaipur' />
              <h4>0-5k</h4>
            </div>
            <div className='innerFilterBodyContainer'>
              <input type='radio' name='job_type' value='bhilwara' />
              <h4>5k-10k</h4>
            </div>
            <div className='innerFilterBodyContainer'>
              <input type='radio' name='job_type' value='tonk' />
              <h4>10k-15k</h4>
            </div>
            <div className='innerFilterBodyContainer'>
              <input type='radio' name='job_type' value='tonk' />
              <h4>15k-20k</h4>
            </div>
          </div>

          <div className='searchLocationContainer'>
            <div className='search'>
              <input type='text' placeholder='Minimum salary...' />
              <button>Search</button>
            </div>
          </div>
        </Collapsible>
      </div>
    );
  }
}
