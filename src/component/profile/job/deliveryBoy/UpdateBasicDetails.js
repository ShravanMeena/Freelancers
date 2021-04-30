import React, { Component } from "react";
import "../../../../style/component/profile/create/_createProfile.scss";
import axios from "axios";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Update extends Component {
  constructor() {
    super();
    this.state = {
      alt_email: "",
      alt_phone_number: "",
      photo_url: "",
      adhaar_card: "",
      address: "",
      landmark: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      short_bio: "",
    };
  }
  // update particulor delivery boy data
  update = () => {
    const data = {
      job_profile: {
        alt_email: this.state.alt_email,
        alt_phone_number: this.state.alt_phone_number,
        photo_url: "https://content.monorbit.com/images/job_profile.jpg",
        adhaar_card: this.state.adhaar_card,
        address: this.state.address,
        landmark: this.state.landmark,
        city: this.state.city,
        state: this.state.state,
        country: this.state.country,
        pincode: this.state.pincode,
      },
      short_bio: this.state.short_bio,
      is_recharged: false,
    };
    axios({
      method: "patch",
      data: data,
      url: `https://monorbit-alpha.herokuapp.com/api/v1/profiles/job/delivery-boy/update/${this.props.getSingleDeliveryBoyProfileData.data[0].id}/`,
      headers: {
        Authorization: `Bearer ${this.props.getUserData.data.token}`,
      },
    })
      .then((res) => {
        this.props.hide();
      })
      .catch((err) => {
        console.log("Error : " + err);
      });
  };
  // this will prevent memory leak
  _isMounted = false;
  componentDidMount() {
    this._isMounted = true;
    const profile = this.props.getSingleDeliveryBoyProfileData.data[0]
      .job_profile;
    this.setState(() => ({
      alt_email: profile.alt_email,
      alt_phone_number: profile.alt_phone_number,
      photo_url: profile.photo_url,
      adhaar_card: profile.adhaar_card,
      address: profile.address,
      landmark: profile.landmark,
      city: profile.city,
      state: profile.state,
      country: profile.country,
      pincode: profile.pincode,
      short_bio: this.props.getSingleDeliveryBoyProfileData.data[0].short_bio,
    }));
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };
  render() {
    if (!(this.props.getSessionData.data === "1")) {
      return <Redirect to='./' />;
    }
    return (
      <div className='mainCreateProfileContainer'>
        <div className='createProfileContainer'>
          <h4 style={{ color: "#293462", marginBottom: "2vh" }}>
            Update Delivery Boy Job Profile
          </h4>

          <div className='innerCreateProfileContainer'>
            {/* field start */}
            <div className='createFieldContainer'>
              <h4>Aadhar card</h4>
              <input
                type='text'
                name='adhaar_card'
                value={this.state.adhaar_card}
                onChange={(event) => this.handleChange(event)}
                placeholder='Aadhar card'
              />
            </div>
            {/* field end */}

            {/* field start */}
            <div className='doubleInputField'>
              <div className='createFieldContainer'>
                <h4>Alternative email</h4>
                <input
                  type='email'
                  name='alt_email'
                  value={this.state.alt_email}
                  onChange={(event) => this.handleChange(event)}
                  placeholder='Alternative email'
                />
              </div>

              <div className='createFieldContainer'>
                <h4>Alternative phone</h4>
                <input
                  type='text'
                  name='alt_phone_number'
                  value={this.state.alt_phone_number}
                  onChange={(event) => this.handleChange(event)}
                  placeholder='Alternative phone'
                />
              </div>
              {/* field end */}
            </div>

            {/* field start */}
            <div className='doubleInputField'>
              <div className='createFieldContainer'>
                <h4>City</h4>
                <input
                  type='text'
                  name='city'
                  value={this.state.city}
                  onChange={(event) => this.handleChange(event)}
                  placeholder='City'
                />
              </div>

              <div className='createFieldContainer'>
                <h4>State</h4>
                <input
                  type='text'
                  name='state'
                  value={this.state.state}
                  onChange={(event) => this.handleChange(event)}
                  placeholder='State'
                />
              </div>
              {/* field end */}
            </div>

            {/* field start */}
            <div className='doubleInputField'>
              <div className='createFieldContainer'>
                <h4>Pincode</h4>
                <input
                  type='text'
                  name='pincode'
                  value={this.state.pincode}
                  onChange={(event) => this.handleChange(event)}
                  placeholder='pincode'
                />
              </div>

              <div className='createFieldContainer'>
                <h4>Country</h4>
                <input
                  type='text'
                  name='country'
                  value={this.state.country}
                  onChange={(event) => this.handleChange(event)}
                  placeholder='Country'
                />
              </div>
              {/* field end */}
            </div>

            {/* field start */}
            <div className='createFieldContainer'>
              <h4>Address</h4>
              <input
                type='text'
                name='address'
                value={this.state.address}
                onChange={(event) => this.handleChange(event)}
                placeholder='Address'
              />
            </div>
            {/* field end */}

            {/* field start */}
            <div className='createFieldContainer'>
              <h4>Bio</h4>
              <textarea
                type='text'
                name='short_bio'
                value={this.state.short_bio}
                onChange={(event) => this.handleChange(event)}
                placeholder='About'
              />
            </div>
            {/* field end */}

            {/* field start */}
            <div className='createButtonContainer'>
              <button onClick={this.props.hide} className='discardChanges'>
                Back
              </button>
              <button onClick={this.update} className='saveChanges'>
                Save Changes
              </button>
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
    getUserData: state.userReducer,
    getSingleDeliveryBoyProfileData: state.singleDeliveryBoyProfileReducer,
    getSessionData: state.sessionReducer,
  };
};

export default connect(mapStateToProps, null)(Update);
