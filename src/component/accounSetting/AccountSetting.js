import React, { Component } from "react";
import Edit from "../../assets/edit.svg";
import Update from "../../assets/send.svg";
import "../../style/component/accountSetting/AccountSetting.css";
import "../../style/component/accountSetting/_verify_password.scss";
import BottomBorder from "../../assets/bordBotm.svg";
import { connect } from "react-redux";
// import { userUpdateAction } from "../../redux/action/userAction";
import axios from "axios";

class AccountSetting extends Component {
  constructor() {
    super();
    this.state = {
      full_name: "",
      business_type: "",
      state: "",
      city: "",
      pincode: "",
      email: "",
      mobile_number: "",
      gender: "",
      dob: "",
      editName: false,
      editBusinessType: false,
      editState: false,
      editCity: false,
      editPincode: false,
      editGender: false,
      editAltEmail: false,
      editAltPhone: false,
      editDob: false,
      verify_modal: false,
      error_message: "",
      start_loader: false,
    };
  }

  showVerifyPassword = () => {
    this.setState((prevState) => ({
      verify_modal: !prevState.verify_modal,
    }));
  };

  hideVerifyPassword = () => {
    this.setState((prevState) => ({
      verify_modal: !prevState.verify_modal,
    }));
  };

  // name edit or update
  editName = () => {
    this.setState({
      editName: true,
    });
  };

  updateName = () => {
    this.setState({
      editName: false,
    });
  };

  // category name edit or update
  editBusinessType = () => {
    this.setState({
      editBusinessType: true,
    });
  };

  updateBusinessType = () => {
    this.setState({
      editBusinessType: false,
    });
  };

  // state edit or update
  editState = () => {
    this.setState({
      editState: true,
    });
  };

  updateState = () => {
    this.setState({
      editState: false,
    });
  };

  // City name edit or update
  editCity = () => {
    this.setState({
      editCity: true,
    });
  };

  updateCity = () => {
    this.setState({
      editCity: false,
    });
  };

  // Pincode edit or update
  editPincode = () => {
    this.setState({
      editPincode: true,
    });
  };

  updatePincode = () => {
    this.setState({
      editPincode: false,
    });
  };

  // alt email name edit or update
  editAltEmail = () => {
    this.setState({
      editAltEmail: true,
    });
  };

  updateAltEmail = () => {
    this.setState({
      editAltEmail: false,
    });
  };

  // alt phone name edit or update
  editAltPhone = () => {
    this.setState({
      editAltPhone: true,
    });
  };

  updateAltPhone = () => {
    this.setState({
      editAltPhone: false,
    });
  };

  // alt email name edit or update
  editDob = () => {
    this.setState({
      editDob: true,
    });
  };

  updateDob = () => {
    this.setState({
      editDob: false,
    });
  };

  // Gender edit or update
  editGender = () => {
    this.setState({
      editGender: true,
    });
  };

  updateGender = () => {
    this.setState({
      editGender: false,
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  inputValidation = () => {
    if (!this.state.full_name) {
      this.setState(() => ({
        error_message: "Name field can't be empty",
      }));
      return;
    }
    if (this.state.city === "select") {
      this.setState(() => ({
        error_message: "Please select your city",
      }));
      return;
    }
    if (!this.state.pincode) {
      this.setState(() => ({
        error_message: "Pincode field can't be empty",
      }));
      return;
    }
    if (!isNaN(this.state.pincode)) {
      this.setState(() => ({
        error_message: "Please enter a valid pincode number",
      }));
      return;
    }
    if (this.state.gender === "select") {
      this.setState(() => ({
        error_message: "Please select your gender",
      }));
      return;
    }
    if (!this.state.mobile_number) {
      this.setState(() => ({
        error_message: "Phone number can't be empty",
      }));
      return;
    }

    if (!isNaN(this.state.mobile_number)) {
      this.setState(() => ({
        error_message: "Please enter digits only",
      }));
      return;
    }

    if (!(this.state.mobile_number.search(".") === -1)) {
      this.setState(() => ({
        error_message: "Phone number can not cantain number",
      }));
      return;
    }

    const hotmail = this.state.email.search("hotmail.com");
    const gmail = this.state.email.search("gmail.com");
    const yahoo = this.state.email.search("yahoo.com");

    if (hotmail === -1 && gmail === -1 && yahoo === -1) {
      this.setState(() => ({
        error_message: "we only accept yahoo, gmail, hotmail email address",
      }));
      return;
    }
    if (!this.state.dob) {
      this.setState(() => ({
        error_message: "Please select your dob",
      }));
      return;
    } else {
      this.setState(() => ({
        error_message: "",
      }));
    }
  };

  update = () => {
    const password = {
      password: this.state.password,
    };
    if (!this.state.password) {
      this.setState(() => ({
        error_message: "Enter Correct Password",
      }));
      return;
    }
    this.setState(() => ({
      start_loader: true,
    }));
    axios({
      method: "POST",
      url: `https://monorbit-alpha.herokuapp.com/api/v1/accounts/sudo-mode/enter/`,
      data: password,
      headers: {
        Authorization: `Bearer ${this.props.getUserData.data.token}`,
      },
    })
      .then((res) => {
        if (res.data.status) {
          var stoper = 0;
          const data = {};

          if (
            this.state.full_name === this.props.getUserData.data.user.full_name
          ) {
          } else {
            data["full_name"] = this.state.full_name;
            stoper++;
          }
          if (this.state.city === this.props.getUserData.data.user.city) {
          } else {
            data["city"] = this.state.city;
            stoper++;
          }
          if (this.state.pincode === this.props.getUserData.data.user.pincode) {
          } else {
            data["pincode"] = this.state.pincode;
            stoper++;
          }

          if (this.state.email === this.props.getUserData.data.user.email) {
          } else {
            data["email"] = this.state.email;
            stoper++;
          }
          if (this.state.gender === this.props.getUserData.data.user.gender) {
          } else {
            data["gender"] = this.state.gender;
            stoper++;
          }

          if (this.state.dob === this.props.getUserData.data.user.dob) {
          } else {
            data["dob"] = this.state.dob;
            stoper++;
          }

          if (!(stoper === 0)) {
            axios({
              method: "patch",
              url: `https://monorbit-alpha.herokuapp.com/api/v1/accounts/user-info/${this.props.getUserData.data.user.mobile_number}/`,
              data: data,
              headers: {
                Authorization: `Bearer ${this.props.getUserData.data.token}`,
              },
            })
              .then((res) => {
                this.props.sendUserData(res.data);
                this.hideVerifyPassword();
              })
              .catch((err) => {
                console.log("Error : " + err);
              });
          }

          this.setState({
            editName: false,
            editBusinessType: false,
            editState: false,
            editCity: false,
            editPincode: false,
            editGender: false,
            editAltEmail: false,
            editAltPhone: false,
            editDob: false,
          });

          // updating name field in chatrooms
          if (data["full_name"]) {
            axios({
              method: "put",
              url: `https://cors-anywhere.herokuapp.com/https://monorbit-chat.herokuapp.com/rooms`,
              data: {
                // TODO: we will chnage this phone number to user id
                username: this.state.full_name,
                user_id: this.props.getUserData.data.user.mobile_number,
              },
              headers: {
                Authorization: `Bearer ${this.props.getUserData.data.token}`,
              },
            })
              .then((res) => {
                this.props.sendUserData(res.data);
                this.hideVerifyPassword();
              })
              .catch((err) => {
                console.log("Error : " + err);
                this.setState(() => ({
                  start_loader: true,
                }));
              });
          }
        } else {
          this.setState(() => ({
            start_loader: false,
          }));
        }
      })
      .catch((err) => {
        this.setState(() => ({
          start_loader: false,
        }));
        console.log("Error : " + err);
      });
  };

  componentDidMount() {
    this.setState({
      full_name: this.props.getUserData.data.user.full_name,
      city: this.props.getUserData.data.user.city,
      pincode: this.props.getUserData.data.user.pincode,
      email: this.props.getUserData.data.user.email,
      mobile_number: this.props.getUserData.data.user.mobile_number,
      gender: this.props.getUserData.data.user.gender,
      dob: this.props.getUserData.data.user.dob,
    });
  }

  render() {
    return (
      <div className='accountSettingBox'>
        {/* verify password Modal */}
        {this.state.verify_modal ? (
          <div className='modalVerifyPassword'>
            <div className='modalVerifyPasswordMain'>
              <div className='imgContainer'>
                <button onClick={this.hideVerifyPassword}>
                  <img
                    alt='about'
                    src={require("../../assets/closeModal.svg")}
                  />
                </button>
              </div>

              {/* confirm password field */}
              <div className='innerAddVerifyContainerField'>
                <div className='verifyAddField'>
                  <input
                    name='password'
                    onChange={(event) => this.handleChange(event)}
                    autoFocus
                    type='text'
                    placeholder='Password'
                  />
                </div>
              </div>
              {this.state.start_loader ? (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    border: "none",
                    margin: 15,
                  }}>
                  <div className='loader'></div>
                </div>
              ) : null}
              {/**button post */}
              <div className='verifyBtn'>
                <button onClick={this.update}>Verify</button>
              </div>
            </div>
          </div>
        ) : null}

        {/* editNetworkContainer Start */}
        <h4 className='accountSettingTilte'>Account Setting</h4>
        <div className='accountSettingBoxContainer'>
          {/* single Start */}
          <div className='singleAccountSetting'>
            <h4>Name</h4>
            {this.state.editName === false ? (
              <div className='singleAccountSettingBottom'>
                <h6>{this.state.full_name}</h6>
                <img alt='setting' onClick={this.editName} src={Edit} />
              </div>
            ) : (
              <div className='singleAccountSettingBottom'>
                <input
                  type='text'
                  name='full_name'
                  onChange={(event) => this.handleChange(event)}
                  autoFocus
                  value={this.state.full_name}
                />

                <img alt='setting' onClick={this.updateName} src={Update} />
              </div>
            )}
            <img alt='setting' className='borderBottom' src={BottomBorder} />
          </div>
          {/* single ende */}
          {/* single Start */}
          <div className='singleAccountSetting'>
            <h4>Business Type</h4>
            {this.state.editBusinessType === false ? (
              <div className='singleAccountSettingBottom '>
                <h6>Fashion</h6>
                <h6>disabled</h6>
                {/* <img alt='setting' src={Info} /> */}
              </div>
            ) : null}
            <img alt='setting' className='borderBottom' src={BottomBorder} />
          </div>
          {/* single ende */}

          {/* single Start */}
          <div className='singleAccountSetting'>
            <h4>City</h4>
            {this.state.editCity === false ? (
              <div className='singleAccountSettingBottom'>
                <h6>{this.state.city}</h6>
                <img alt='setting' onClick={this.editCity} src={Edit} />
              </div>
            ) : (
              <div className='singleAccountSettingBottom'>
                <input
                  type='text'
                  name='city'
                  onChange={(event) => this.handleChange(event)}
                  autoFocus
                  value={this.state.city}
                />

                <img alt='setting' onClick={this.updateCity} src={Update} />
              </div>
            )}
            <img alt='setting' className='borderBottom' src={BottomBorder} />
          </div>
          {/* single ende */}
          {/* single Start */}
          <div className='singleAccountSetting'>
            <h4>Pincode</h4>
            {this.state.editPincode === false ? (
              <div className='singleAccountSettingBottom'>
                <h6>{this.state.pincode}</h6>
                <img alt='setting' onClick={this.editPincode} src={Edit} />
              </div>
            ) : (
              <div className='singleAccountSettingBottom'>
                <input
                  type='text'
                  name='pincode'
                  onChange={(event) => this.handleChange(event)}
                  autoFocus
                  value={this.state.pincode}
                />

                <img alt='setting' onClick={this.updatePincode} src={Update} />
              </div>
            )}
            <img alt='setting' className='borderBottom' src={BottomBorder} />
          </div>
          {/* single ende */}
          {/* single Start */}
          <div className='singleAccountSetting'>
            <h4>Gender</h4>
            {this.state.editGender === false ? (
              <div className='singleAccountSettingBottom'>
                <h6>{this.state.gender}</h6>
                <img alt='setting' onClick={this.editGender} src={Edit} />
              </div>
            ) : (
              <div className='singleAccountSettingBottom'>
                <input
                  type='text'
                  name='gender'
                  onChange={(event) => this.handleChange(event)}
                  autoFocus
                  value={this.state.gender}
                />

                <img alt='setting' onClick={this.updateGender} src={Update} />
              </div>
            )}
            <img alt='setting' className='borderBottom' src={BottomBorder} />
          </div>
          {/* single ende */}
          {/* single Start */}
          <div className='singleAccountSetting'>
            <h4>Phone</h4>
            {this.state.editAltPhone === false ? (
              <div className='singleAccountSettingBottom'>
                <h6>{this.state.mobile_number + "*****"}</h6>
                <img alt='setting' onClick={this.editAltPhone} src={Edit} />
              </div>
            ) : (
              <div className='singleAccountSettingBottom'>
                <input
                  type='text'
                  maxLength={10}
                  name='mobile_number'
                  onChange={(event) => this.handleChange(event)}
                  inputMode='numeric'
                  value={this.state.mobile_number}
                />

                <img alt='setting' onClick={this.editAltPhone} src={Update} />
              </div>
            )}
            <img alt='setting' className='borderBottom' src={BottomBorder} />
          </div>
          {/* single ende */}
          {/* single Start */}
          <div className='singleAccountSetting'>
            <h4>Email</h4>
            {this.state.editAltEmail === false ? (
              <div className='singleAccountSettingBottom'>
                <h6>{this.state.email}</h6>
                <img alt='setting' onClick={this.editAltEmail} src={Edit} />
              </div>
            ) : (
              <div className='singleAccountSettingBottom'>
                <input
                  type='email'
                  name='email'
                  onChange={(event) => this.handleChange(event)}
                  autoFocus
                  value={this.state.email}
                />

                <img alt='setting' onClick={this.updateAltEmail} src={Update} />
              </div>
            )}
            <img alt='setting' className='borderBottom' src={BottomBorder} />
          </div>
          {/* single ende */}
          {/* single Start */}
          <div className='singleAccountSetting'>
            <h4>DOB</h4>
            {this.state.editDob === false ? (
              <div className='singleAccountSettingBottom'>
                <h6>{this.state.dob}</h6>
                <img alt='setting' onClick={this.editDob} src={Edit} />
              </div>
            ) : (
              <div className='singleAccountSettingBottom'>
                <input
                  type='date'
                  name='dob'
                  onChange={(event) => this.handleChange(event)}
                  autoFocus
                  value={this.state.dob}
                />
              </div>
            )}
            <img alt='setting' className='borderBottom' src={BottomBorder} />
          </div>
          {/* single ende */}

          {/* single Start */}
          <div className='singleAccountSetting'>
            <div className='updateBtnContainer'>
              <button onClick={() => this.showVerifyPassword()}>Update</button>
            </div>
          </div>
          {/* single ende */}
        </div>
        {/* editNetworkContainer end */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getUserData: state.userReducer,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     sendUserData: (data) => dispatch(userUpdateAction(data)),
//   };
// };

export default connect(mapStateToProps, null)(AccountSetting);
