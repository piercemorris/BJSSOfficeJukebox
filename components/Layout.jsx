import React, { Component } from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import "../static/sass/main.scss";
import user from "../services/userService";
import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlayCircle as faPlayCircleRegular, faPauseCircle as faPauseCircleRegular } from '@fortawesome/free-regular-svg-icons';
import { faCoffee, faBars, faPlus, faPause, faForward, faPauseCircle, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
library.add(faCoffee, faBars, faPlus, faPause, faForward, faPauseCircle, faPlayCircle, faPauseCircleRegular, faPlayCircleRegular);

class Layout extends Component {
  state = {
    user: {},
    links: [
      { title: "Home", url: "/", float: "left" },
      { title: "About", url: "/about", float: "left" },
      { title: "Queue", url: "/queue", float: "left" },
      { title: "Search", url: "/search", float: "left" },
      { title: "Authorise Spotify", url: "/api/spotify/login", float: "left" },
      { title: "Log in", url: "/login", float: "right" },
      { title: "Sign up", url: "/signup", float: "right" },
    ]
  };

  componentDidMount() {
    const currentUser = user.getCurrentUser();
    this.setState({ user: currentUser });
  }

  render() {

    /*
          <link rel="stylesheet" href="/static/css/navbar.css" />
          <link rel="stylesheet" href="/static/css/player.css" />
          <link rel="stylesheet" href="/static/css/styles.css" />
          <link rel="stylesheet" href="/static/css/modal.css" />
          <link rel="stylesheet" href="/static/css/songcard.css" />
          <link rel="stylesheet" href="/static/css/bootstrap.min.css" />
    */
    return (
      <div>
        <Head>
          <title>BJSS Jukebox</title>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1.0" />
          <link rel="icon" href="static/img/jukebox-icon.ico" />
        </Head>
        <Navbar user={this.state.user} navs={this.state.links} />
        <div className="">{this.props.children}</div>
      </div>
    );
  }
}

export default Layout;
