import React, { Component } from "react";
import Head from "next/head";
import Navbar from "./Navbar";
import user from "../services/userService";

class Layout extends Component {
  state = {
    user: {

    },
    links: [
      { title: "Home", url: "/", float: "left" },
      { title: "About", url: "/about", float: "left" },
      { title: "Log in", url: "/login", float: "right" },
      { title: "Sign up", url: "/signup", float: "right" },
    ]
  };

  componentDidMount() {
    const currentUser = user.getCurrentUser();
    this.setState({ user: currentUser });
  }

  render() {
    return (
      <div>
        <Head>
          <title>BJSS Jukebox</title>
          <meta charSet="utf-8" />
          <link rel="icon" href="static/jukebox-icon.ico" />
          <link rel="stylesheet" href="/static/player.css" />
          <link rel="stylesheet" href="/static/styles.css" />
          <link
            rel="stylesheet"
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
            integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO"
            crossOrigin="anonymous"
          />
          <script
            src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
            integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
            crossOrigin="anonymous"
          />
        </Head>
        <Navbar user={this.state.user} navs={this.state.links} />
        <div className="container gutter">{this.props.children}</div>
      </div>
    );
  }
}

export default Layout;
