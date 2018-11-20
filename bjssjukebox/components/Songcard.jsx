import React, { Component } from "react";

class Songcard extends Component {
  //this.props.info.songname
  //this.props.info.album
  //this.props.info.artist
  render() {
    return (
      <div class="card song-card">
        <div class="card-header">Header</div>
        <div class="card-body">Body</div>
      </div>
    );
  }
}

export default Songcard;
