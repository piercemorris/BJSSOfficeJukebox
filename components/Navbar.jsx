import React, { Component } from "react";
import _ from "lodash";
import Link from "next/link";
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { changeNavbarState } from "../services/stylingScript";
import SearchBar from "./search/SearchBar";

/**
 * @api {Class Component} <Navbar|user?/> Navbar.jsx
 * @apiName Navbar
 * @apiGroup Components
 * @apiParam {Object} user Currently logged in user (optional)
 * @apiDescription  This components renders the navigation bar at the top of the user's screen
 * @apiSuccessExample Layout.jsx
 *    <Navbar user={this.state.user} />
 */
class Navbar extends Component {

  state = {
    user: null,
    results: null
  }

  render() {
    const { user } = this.props;
    let links = [
      { title: "Log in", url: "/login", float: "right", user: false },
      { title: "Sign up", url: "/signup", float: "right", user: false },
      { title: "Queue", url: "/queue", float: "right", user: true },
    ];
    if (user)
      user.isDevice ? links.push({ title: "Authorise Spotify", url: "/api/spotify/login", float: "right", user: true }) : null;

    return (
      <div>
        <nav className="navbar-main" id="navbar-top">
          <Link href="/">
            <img className="navbar-image left" src="static/img/jukebox-logo-white.png" />
          </Link>
          <img className="right" id="bjss-logo" src="static/img/BJSS-280x150-white.png" />
          <div className="navbar-search left">
            <SearchBar classProp="navbar-search__input" />
          </div>
          {links
            .filter(link => link.url === "left")
            .map(link => (
              <Link href={link.url} key={link.url}>
                <a className="left">{link.title}</a>
              </Link>
            ))}

          {_.isEmpty(user) ?
            links
              .filter(link => link.float === "right")
              .map(link => (
                <Link href={link.url} key={link.url}>
                  <a className="right">{link.title}</a>
                </Link>
              ))
            :
            <>
              <Link href="/logout">
                <a className="right">Logout</a>
              </Link>
              <Link href="/account">
                <a className="right">{user.username}</a>
              </Link>
              {
                links
                  .filter(link => link.float === "right" && link.user === true)
                  .map(link => (
                    <Link href={link.url} key={link.url}>
                      <a className="right">{link.title}</a>
                    </Link>
                  ))
              }
            </>
          }
        </nav>
      </div>
    );
  }
}

/*
<a href="javascript:void(0);" className="icon" onClick={changeNavbarState}>
            <FontAwesomeIcon icon="bars" />
          </a>
*/

export default Navbar;
