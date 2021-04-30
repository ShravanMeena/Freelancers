import React, { Component } from "react";
import "../../../style/component/header/mobile/_header.scss";
import Arrow from "../../../assets/cart.svg";
import Home from "../../../assets/heart.svg";
import Order from "../../../assets/order.svg";
import Wishlist from "../../../assets/wishlist.svg";
import Logout from "../../../assets/logout.svg";
import Cart from "../../../assets/cart.svg";
import Notification from "../../../assets/notification.svg";
import { Link } from "react-router-dom";

import { logoutAction } from "../../../redux/action/logoutAction";

import { connect } from "react-redux";

class Header extends Component {
  constructor() {
    super();
    this.wrapperRef = React.createRef();
  }

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

  render() {
    return (
      <div className='modalMobile'>
        <div ref={this.wrapperRef} className='modalMobileMain'>
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

            <Link to='./'>
              <div className='link'>
                <div className='navLogo'>
                  <div>
                    <img alt='innerMobi' src={Order} />
                  </div>
                  <h4>Find Jobs</h4>
                </div>
                <div className='arrowContainer'>
                  <img alt='innerMobi' src={Arrow} />
                </div>
              </div>
            </Link>
            <Link to='./'>
              <div className='link'>
                <div className='navLogo'>
                  <div>
                    <img alt='innerMobi' src={Wishlist} />
                  </div>
                  <h4>FAQ</h4>
                </div>
                <div className='arrowContainer'>
                  <img alt='innerMobi' src={Arrow} />
                </div>
              </div>
            </Link>

            <Link to='./'>
              <div className='link'>
                <div className='navLogo'>
                  <div>
                    <img alt='innerMobi' src={Cart} />
                  </div>
                  <h4>About Us</h4>
                </div>
                <div className='arrowContainer'>
                  <img alt='innerMobi' src={Arrow} />
                </div>
              </div>
            </Link>

            <Link to='./'>
              <div className='link'>
                <div className='navLogo'>
                  <div>
                    <img alt='innerMobi' src={Notification} />
                  </div>
                  <h4>Our Team</h4>
                </div>
                <div className='arrowContainer'>
                  <img alt='innerMobi' src={Arrow} />
                </div>
              </div>
            </Link>

            <Link to='./register'>
              <div className='link'>
                <div className='navLogo'>
                  <div>
                    <img alt='innerMobi' src={Notification} />
                  </div>
                  <h4>Register</h4>
                </div>
                <div className='arrowContainer'>
                  <img alt='innerMobi' src={Arrow} />
                </div>
              </div>
            </Link>

            <div className='link'>
              <div className='navLogo'>
                <div>
                  <img alt='innerMobi' src={Logout} />
                </div>
                <h4>Download App</h4>
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
