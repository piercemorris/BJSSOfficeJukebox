import React, { Component } from "react";
import Songcard from "./Songcard";

class Songcards extends Component {
  state = {
    info: [
      {
        songname: "Devil in a new dress",
        album: "My Beautiful Dark Twisted Fantasy",
        author: "Kanye West"
      },
      {
        songname: "Ultralight Beam",
        album: "The Life of Pablo",
        author: "Kanye West"
      },
      {
        songname: "November",
        album: "Flower Boy",
        author: "Tyler the Creator"
      }
    ]
  };
  render() {
    return (
      <div>
        <h1>Currently Playing</h1>
        <Songcard info={this.state.info[0]} />
        <h1>Queue</h1>
        {this.state.info
          .filter(card => this.state.info.indexOf(card) != 0)
          .map(card => (
            <Songcard info={card} />
          ))}
      </div>
    );
  }
}

export default Songcards;
