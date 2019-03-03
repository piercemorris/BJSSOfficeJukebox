import React, { Component } from "react";
import _ from "lodash";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { changeNavbarState } from "../services/stylingScript";

class Navbar extends Component {
  render() {
    const { user, navs } = this.props;
    return (
      <div>
        <nav className="navbar-main" id="navbar-top">
          <img className="navbar-image left" src="static/img/BJSS-280x150-white.png" />
          {navs
            .filter(link => link.float === "left")
            .map(link => (
              <Link href={link.url} key={link.url}>
                <a className="left">{link.title}</a>
              </Link>
            ))}

          {_.isEmpty(user) ?
            navs
              .filter(link => link.float === "right")
              .map(link => (
                <Link href={link.url} key={link.url}>
                  <a className="right">{link.title}</a>
                </Link>
              ))
            :
            <React.Fragment>
              <Link href="/logout">
                <a className="right">Logout</a>
              </Link>
              <Link href="/account">
                <a className="right">{user.username}</a>
              </Link>
            </React.Fragment>
          }
          <a href="javascript:void(0);" className="icon" onClick={changeNavbarState}>
            <FontAwesomeIcon icon="bars" />
          </a>
        </nav>
      </div>
    );
  }
}

export default Navbar;