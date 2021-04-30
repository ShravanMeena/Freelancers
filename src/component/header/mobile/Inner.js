import React, { Component } from "react";
import "../../../style/component/header/mobile/_header.scss";
import Arrow from "../../../assets/cart.svg";
import Home from "../../../assets/heart.svg";
import Order from "../../../assets/order.svg";
import Wishlist from "../../../assets/wishlist.svg";
import ExpandLess from "../../../assets/expand_less.svg";
import ExpandMore from "../../../assets/expand_more.svg";
import Logout from "../../../assets/logout.svg";
import Cart from "../../../assets/cart.svg";
import { Link } from "react-router-dom";
import Collapsible from "react-collapsible";

import Setting from "../../../assets/setting.svg";
import Conditions from "../../../assets/conditions.svg";

import { logoutAction } from "../../../redux/action/logoutAction";

import { connect } from "react-redux";
import axios from "axios";

class Header extends Component {
  constructor() {
    super();

    this.wrapperRef = React.createRef();
  }

  // account setting
  AccountSettng = () => {
    this.props.AccountSettng();
    this.props.hide();
  };
  PasswordUpdate = () => {
    this.props.PasswordUpdate();
    this.props.hide();
  };
  HelpAndSupport = () => {
    this.props.HelpAndSupport();
    this.props.hide();
  };
  PrivactPolicy = () => {
    this.props.PrivactPolicy();
    this.props.hide();
  };
  Conditions = () => {
    alert("nothing ");
    this.props.hide();
  };

  handleClickOutside = (event) => {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.props.hide();
    }
  };

  // this will prevent memory leak
  _isMounted = false;
  componentDidMount() {
    this._isMounted = true;
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    this._isMounted = false;
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  logout = () => {
    this.props.sendLogoutData();
    try {
      axios({
        method: "get",
        url: "https://monorbit-alpha.herokuapp.com/api/v1/accounts/logout/",
        headers: {
          Authorization: `Bearer ${this.props.getUserData.data.token}`,
        },
      })
        .then(function (response) {
          this.props.history.push("./");
        })
        .catch((err) => {
          console.log("Error: " + err);
        });
    } catch {}
  };

  render() {
    return (
      <div className='modalMobile'>
        <div ref={this.wrapperRef} className='modalMobileMain'>
          <div className='searchContainerMobile'>
            <input placeholder='Find jobs...' />
            <button>Search</button>
          </div>

          {/* modal content start here */}
          <div className='navContainerMobile'>
            <Link to='./'>
              <div className='link'>
                <div className='navLogo'>
                  <div>
                    <img alt='innerMobi' src={Home} />
                  </div>
                  <h4>Home</h4>
                </div>

                <div className='arrowContainer'>
                  <img alt='innerMobi' src={Arrow} />
                </div>
              </div>
            </Link>

            <Link to='./home'>
              <div className='link'>
                <div className='navLogo'>
                  <div>
                    <img alt='innerMobi' src={Order} />
                  </div>
                  <h4>Jobs</h4>
                </div>
                <div className='arrowContainer'>
                  <img alt='innerMobi' src={Arrow} />
                </div>
              </div>
            </Link>
            <Link to='./applications'>
              <div className='link'>
                <div className='navLogo'>
                  <div>
                    <img alt='innerMobi' src={Wishlist} />
                  </div>
                  <h4>My Applications</h4>
                </div>
                <div className='arrowContainer'>
                  <img alt='innerMobi' src={Arrow} />
                </div>
              </div>
            </Link>

            <Link to='./create_profile'>
              <div className='link'>
                <div className='navLogo'>
                  <div>
                    <img alt='innerMobi' src={Cart} />
                  </div>
                  <h4>Edit Job Profile</h4>
                </div>
                <div className='arrowContainer'>
                  <img alt='innerMobi' src={Arrow} />
                </div>
              </div>
            </Link>

            {/* for accont setting */}
            <Collapsible
              open={false}
              triggerStyle={{ color: "#293462", cursor: "pointer" }}
              triggerTagName='h4'
              trigger={
                <Link to='./account_setting'>
                  <div className='link'>
                    <div className='navLogo'>
                      <div>
                        <img alt='innerMobi' src={Setting} />
                      </div>
                      <h4>Setting</h4>
                    </div>
                    <div>
                      <img alt='innerMobi' src={ExpandMore} />
                    </div>
                  </div>
                </Link>
              }
              triggerWhenOpen={
                <div className='link'>
                  <div className='navLogo'>
                    <div>
                      <img alt='innerMobi' src={Setting} />
                    </div>
                    <h4>Setting</h4>
                  </div>
                  <div>
                    <img alt='innerMobi' src={ExpandLess} />
                  </div>
                </div>
              }
              transitionTime={400}
              transitionCloseTime={400}>
              {/* account setting */}
              <div style={{ paddingLeft: 30 }}>
                <div onClick={this.AccountSettng} className='link'>
                  <div className='navLogo'>
                    <div>
                      <img alt='innerMobi' src={Conditions} />
                    </div>
                    <h4>Account Setting</h4>
                  </div>
                  <div className='arrowContainer'>
                    <img alt='innerMobi' src={Arrow} />
                  </div>
                </div>

                <div onClick={this.PasswordUpdate} className='link'>
                  <div className='navLogo'>
                    <div>
                      <img alt='innerMobi' src={Conditions} />
                    </div>
                    <h4>Password Update</h4>
                  </div>
                  <div className='arrowContainer'>
                    <img alt='innerMobi' src={Arrow} />
                  </div>
                </div>

                <div onClick={this.HelpAndSupport} className='link'>
                  <div className='navLogo'>
                    <div>
                      <img alt='innerMobi' src={Conditions} />
                    </div>
                    <h4>Help And Support</h4>
                  </div>
                  <div className='arrowContainer'>
                    <img alt='innerMobi' src={Arrow} />
                  </div>
                </div>

                <div onClick={this.PrivactPolicy} className='link'>
                  <div className='navLogo'>
                    <div>
                      <img alt='innerMobi' src={Conditions} />
                    </div>
                    <h4>Privacy Policy</h4>
                  </div>
                  <div className='arrowContainer'>
                    <img alt='innerMobi' src={Arrow} />
                  </div>
                </div>

                <div onClick={this.Conditions} className='link'>
                  <div className='navLogo'>
                    <div>
                      <img alt='innerMobi' src={Conditions} />
                    </div>
                    <h4>Conditions</h4>
                  </div>
                  <div className='arrowContainer'>
                    <img alt='innerMobi' src={Arrow} />
                  </div>
                </div>
              </div>
            </Collapsible>

            <div onClick={this.logout} className='link'>
              <div className='navLogo'>
                <div>
                  <img alt='innerMobi' src={Logout} />
                </div>
                <h4>Logout</h4>
              </div>
              <div className='arrowContainer'>
                <img alt='innerMobi' src={Arrow} />
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
    getUserData: state.userReducer,
    getSessionData: state.sessionReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    sendLogoutData: (data) => dispatch(logoutAction(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
