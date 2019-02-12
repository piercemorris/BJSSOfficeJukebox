import React, { Component } from "react";
import _ from "lodash";
import Link from "next/link";
import Spotify from "../services/spotifyService";

class Navbar extends Component {
  state = {
    token: "",
    tokenAvailable: false
  }

  componentDidMount() {
    let token = Spotify.getSpotifyAccessToken();
    if (token === "undefined" || token === null || token === "" || token === undefined) {
      token = null;
    }
    this.setState({ token, tokenAvailable: true });
  }

  render() {
    const { user, navs } = this.props;
    return (
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
            {
              this.state.token
                ?
                <React.Fragment>
                  <li className="nav-item">
                    <Link href="/queue">
                      <a className="nav-link">Queue</a>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link href="/search">
                      <a className="nav-link">Search</a>
                    </Link>
                  </li>
                </React.Fragment>
                :
                <li className="nav-item">
                  <Link href="/api/spotify/login">
                    <a className="nav-link">Authorise Spotify</a>
                  </Link>
                </li>
            }
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
  }
}

export default Navbar;