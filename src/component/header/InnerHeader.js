import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import "../../style/component/header/_header.scss";
// import Logo from "../../assets/monorbitLogo.png";
import { logoutAction } from "../../redux/action/logoutAction";

import { connect } from "react-redux";
import axios from "axios";
import ExpandLess from "../../assets/expand_less.svg";
import ExpandMore from "../../assets/expand_more.svg";
import Menu from "../../assets/menu.svg";
import MobileHeader from "./mobile/Inner";

class DropDown extends Component {
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
      <div className='dropdwnMainContainer'>
        <div className='header'>
          {/* <div className='dopdwnIcon'>
            <img alt='innerMobi' src={Account} />
          </div> */}
          <h4>Shravan Meena</h4>
          <h6>Shravanmeena47@gmail.com</h6>
        </div>
        <Link to='/applications'>
          <div className='dropdwnContainer '>
            {/* <div className='dopdwnIcon'>
            <img alt='innerMobi' src={Order} />
          </div> */}
            <h4>My Applications</h4>
          </div>
        </Link>

        <Link to='/create_profile'>
          <div className='dropdwnContainer'>
            {/* <div className='dopdwnIcon'>
            <img alt='innerMobi' src={Wishlist} />
          </div> */}
            <h4>Edit Job Profile</h4>
          </div>
        </Link>

        <Link to='./account_setting'>
          <div className='dropdwnContainer'>
            {/* <div className='dopdwnIcon'>
            <img alt='innerMobi' src={Wishlist} />
          </div> */}
            <h4>Account Setting</h4>
          </div>
        </Link>

        <div onClick={this.props.HelpAndSupport} className='dropdwnContainer'>
          {/* <div className='dopdwnIcon'>
            <img alt='innerMobi' src={Chat} />
          </div> */}
          <h4>Help Center</h4>
        </div>

        <div onClick={this.logout} className='dropdwnContainer'>
          {/* <div className='dopdwnIcon'>
            <img alt='innerMobi' src={Logout} />
          </div> */}
          <h4>Logout</h4>
        </div>
      </div>
    );
  }
}

class Header extends Component {
  constructor() {
    super();
    this.state = {
      dropdwn: false,
      menu: false,
    };
  }

  dropdwn = () => {
    this.setState((prevState) => ({
      dropdwn: !prevState.dropdwn,
      notification: false,
    }));
  };
  menu = () => {
    this.setState((prevState) => ({
      menu: !prevState.menu,
      notification: false,
    }));
  };

  render() {
    if (!this.props.getSessionData.data === "1") {
      return <Redirect to='./' />;
    }
    return (
      <div className='headerContainer'>
        {this.state.dropdwn ? (
          <DropDown
            sendLogoutData={this.props.sendLogoutData}
            hide={this.dropdwn}
          />
        ) : null}

        {this.state.menu ? (
          <MobileHeader
            AccountSettng={this.props.AccountSettng}
            HelpAndSupport={this.props.HelpAndSupport}
            PrivactPolicy={this.props.PrivactPolicy}
            PasswordUpdate={this.props.PasswordUpdate}
            Conditions={this.props.Conditions}
            hide={this.menu}
          />
        ) : null}

        <div className='leftHeaderContainer'>
          <div className='logoContainer'>
            <Link to='/home'>
              <p style={{ fontSize: 18 }}>Freelancers</p>
            </Link>
          </div>
        </div>
        <div onClick={this.menu} className='mobileMenuConatiner'>
          <div>
            <img alt='monorbit work' src={Menu} />
          </div>
        </div>
        <div className='rightHeaderContainer'>
          {/* <div className='dropDwnBtn'>
            <Link to='./home'>
              <button>Home</button>
            </Link>
          </div> */}

          <div className='dropDwnBtn'>
            <Link to='./home'>
              <button>Jobs</button>
            </Link>
          </div>

          <div className='dropDwnBtn' onClick={this.dropdwn}>
            <button>My Account</button>

            {this.state.dropdwn ? (
              <div className='expandContainerLogo'>
                <img alt='innerMobi' src={ExpandLess} />
              </div>
            ) : (
              <div className='expandContainerLogo'>
                <img alt='innerMobi' src={ExpandMore} />
              </div>
            )}
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
