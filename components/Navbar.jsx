import React from "react";
import _ from "lodash";
import Link from "next/link";

const Navbar = ({ user, navs }) => (
  <div>
    <nav className="navbar navbar-expand-lg">
      <img className="navbar-brand" src="static/BJSS-280x150-white.png" />
      <ul className="navbar-nav mr-auto">
        {navs
          .filter(link => link.float === "left")
          .map(link => (
            <li className="nav-item" key={link.url}>
              <Link href={link.url}>
                <a className="nav-link">{link.title}</a>
              </Link>
            </li>
          ))}
      </ul>
      <ul className="navbar-nav ml-auto">
        {_.isEmpty(user) ?
          navs
            .filter(link => link.float === "right")
            .map(link => (
              <li className="nav-item" key={link.url}>
                <Link href={link.url}>
                  <a className="nav-link">{link.title}</a>
                </Link>
              </li>
            ))
          :
          <React.Fragment>
            <li className="nav-item">
              <Link href="/account">
                <a className="nav-link">{user.username}</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/logout">
                <a className="nav-link">Logout</a>
              </Link>
            </li>
          </React.Fragment>
        }
      </ul>
    </nav>
  </div>
);

export default Navbar;
