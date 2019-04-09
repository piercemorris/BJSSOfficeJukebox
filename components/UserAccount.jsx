import React, { Component } from 'react';
import user from "../services/userService";
import stat from "../services/statsService";
var arraySort = require('array-sort');


class UserAccount extends Component {
  state = {
    user: {},
    topSong:[[]],
    topArtists:[]

  }

  async componentWillMount() {
    const currentUser = await user.getCurrentUser();
    const response = await user.getInfo(currentUser._id);
    this.setState({ user: response.data });
    const mostAddedSong = await stat.getStats();
    arraySort(mostAddedSong.data,'timesAdded',{reverse: true});
    
    //this.setState({ mostSong1: mostAddedSong.data[0] });
    //this.setState({ mostSong2: mostAddedSong.data[1] });
    this.setState({ topSong: mostAddedSong.data });
    

    this.state.topSong.forEach(function(item, index, array) {
      
      var found = this.state.topArtists.findIndex(function(element) {
        return element==item.artistName;
      }.bind(this));
      if(found=='-1'){
        this.state.topArtists.push(item.artistName,item.timesAdded);
      }else{
        this.state.topArtists[found]=item.artistName;
        this.state.topArtists[found+1]=this.state.topArtists[found+1]+item.timesAdded
      }
    }.bind(this));

    this.setState({ topArtists: this.state.topArtists });


  }



  render() {
    const { username, songsAdded } = this.state.user;
    var topSong=null;
    var topArtists=null;
    if(this.state.topSong!==null){
       topSong=this.state.topSong;
    }
    if(this.state.topArtists!==null){
      topArtists=this.state.topArtists;
   }



    console.log(topArtists);
    return (
      <div>
        <h1>{username}</h1>
        <p>Total Number of Songs added to queue: {songsAdded}</p>
        <table className="search-results__table">
          <tbody>
            <tr className="search-results__table-header">
              <th className="search-results__table-header-title"></th>
              <th className="search-results__table-header-img"></th>
              <th className="search-results__table-header-title"></th>
              <th className="search-results__table-header-artist"></th>
            </tr>
            {topSong.slice(0,topSong.length).map((song,i) =>
              <tr className="search-results__table__content">
                <td><b>{i+1}</b></td>
                <td><img src={song.image} width="30%"></img></td>          
                <td>{song.songName}</td>
                <td>{song.artistName}</td>
              </tr>
            )}
          </tbody>
        </table>


        <p>Most added Songs: </p>
        {topSong.slice(0,topSong.length).map((song,i)=>
          <p>{i+1}:{song.songName},{song.artistName},{song.timesAdded} </p>
        )}

        <p>{topArtists[0]}</p>
        <p>Most played artists: </p>
        {topArtists.slice(0,topArtists.length).map((song,i)=>
          <p>{i+1}:{song} </p>
        )}







      </div>
    );
  }
}

export default UserAccount;