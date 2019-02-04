import React, { Component } from "react";
import jwtDecode from "jwt-decode";
import Head from "next/head";
import Navbar from "./Navbar";

class Layout extends Component {
  state = {
    user: {

    },
    links: [
      { title: "Home", url: "/", float: "left" },
      { title: "About", url: "/about", float: "left" },
      { title: "Queue", url: "/queue", float: "left" },
      { title: "Search", url: "/api/spotify/login", float: "left" },
      { title: "Log in", url: "/login", float: "right" },
      { title: "Sign up", url: "/signup", float: "right" }
    ]
  };

  componentDidMount() {
    try {
      const jwt = localStorage.getItem('token');
      const user = jwtDecode(jwt);
      this.setState({ user });
    }
    catch (ex) {

    }
  }

  render() {
    return (
      <div>
        <Head>
          <title>BJSS Jukebox</title>
          <meta charSet="utf-8" />
          <link rel="icon" href="static/jukebox-icon.ico" />
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
