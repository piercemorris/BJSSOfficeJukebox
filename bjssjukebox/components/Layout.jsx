import React, { Component } from "react";
import Head from "next/head";
import Navbar from "./Navbar";

class Layout extends Component {
  state = {
    links: [
      { title: "Home", url: "/" },
      { title: "About", url: "/about" },
      { title: "Queue", url: "/queue" }
    ]
  };

  render() {
    return (
      <div>
        <Head>
          <title>BJSS Jukebox</title>
          <meta charSet="utf-8" />
          <link rel="stylesheet" type="text/css" href="/static/styles.css" />
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
        <Navbar navs={this.state.links} />
        <div className="container gutter">{this.props.children}</div>
      </div>
    );
  }
}

export default Layout;
