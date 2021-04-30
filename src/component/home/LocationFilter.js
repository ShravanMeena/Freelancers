import React, { Component } from "react";
import "../../style/component/home/_filter.scss";
import Collapsible from "react-collapsible";

export default class LocationFilter extends Component {
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
              <h4>Loaction</h4>
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
              <h4>Loaction</h4>
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
              <input type='radio' name='location' value='jaipur' />
              <h4>Jaipur</h4>
            </div>
            <div className='innerFilterBodyContainer'>
              <input type='radio' name='location' value='bhilwara' />
              <h4>Bhilwara</h4>
            </div>
            <div className='innerFilterBodyContainer'>
              <input type='radio' name='location' value='tonk' />
              <h4>Tonk</h4>
            </div>
            <div className='innerFilterBodyContainer'>
              <input type='radio' name='location' value='sm' />
              <h4>Sawai Madhopur</h4>
            </div>
          </div>

          <div className='searchLocationContainer'>
            <div className='search'>
              <input type='text' placeholder='location...' />
              <button>Search</button>
            </div>
          </div>
        </Collapsible>
      </div>
    );
  }
}
