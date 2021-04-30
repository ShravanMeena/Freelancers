import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../style/component/header/_header.scss";
// import Logo from "../../assets/monorbitLogo.png";

import Menu from "../../assets/menu.svg";
import MobileHeader from "./mobile/Outer";

export default class Header extends Component {
  constructor() {
    super();
    this.state = {
      menu: false,
    };
  }

  menu = () => {
    this.setState((prevState) => ({
      menu: !prevState.menu,
    }));
  };

  render() {
    return (
      <div className='headerContainer'>
        {this.state.menu ? <MobileHeader hide={this.menu} /> : null}

        <div className='leftHeaderContainer'>
          <div className='logoContainer'>
            <Link to='/'>
              <p style={{ fontSize: 18 }}>Freelancers</p>
              {/* <img alt='monorbit work' src={Logo} /> */}
            </Link>
          </div>
        </div>
        <div onClick={this.menu} className='mobileMenuConatiner'>
          <div>
            <img alt='monorbit work' src={Menu} />
          </div>
        </div>
        <div className='rightHeaderContainer'>
          {/* <Link to='./'>
            <div className='dropDwnBtn'>
              <button>Home</button>
            </div>
          </Link> */}
          {/* 
          <div className='dropDwnBtn'>
            <Link to='./register'>
              <button>Find Job</button>
            </Link>
          </div> */}
          {/* 
          <div className='dropDwnBtn'>
            <Link to='./'>
              <button>FAQ</button>
            </Link>
          </div>

          <div className='dropDwnBtn'>
            <Link to='./'>
              <button>About Us</button>
            </Link>
          </div> */}

          <div className='dropDwnBtn'>
            <Link to='./register'>
              <button>Register</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}
