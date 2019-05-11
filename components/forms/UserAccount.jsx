import React, { Component } from 'react';
import user from "../../services/userService";
import stat from "../../services/statsService";
var arraySort = require('array-sort');
import { VictoryBar, VictoryChart, VictoryGroup   } from 'victory';



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
    arraySort(mostAddedSong.data, 'timesAdded', { reverse: true });
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
    const data = [
      {name:this.state.topArtists[0],times:this.state.topArtists[1]}
  ]
  }

  render() {
    const { username, songsAdded } = this.state.user;
    var topSong=null;
    var topArtists=null;
    var maxFive;
    var data=[];
    if(this.state.topSong!==null){
       topSong=this.state.topSong;
    }
    if(this.state.topArtists!==null){
      topArtists=this.state.topArtists;
   }
    if(topSong.length>5){
      maxFive=5;
    }else{
      maxFive=topSong.length
    }

    var artistLength=topArtists.length;
    if(artistLength==0){
      //if zero
      data=null;
    }else if(artistLength<5){
      //if less than five
      for(var i=0;i<artistLength*2;i=i+2){
        data.push({artist:topArtists[i],times:topArtists[i+1]})
       }
    }else {
      //max five
      for(var i=0;i<10;i=i+2){
      data.push({artist:topArtists[i],times:topArtists[i+1]})
     }
    
  }
    
    return (
      <div>
        <div className="top-five-first-section">

        {/*<h1>{username}</h1>
        <p>Total Number of Songs added to queue: {songsAdded}</p>*/}
        <div className="top-five-title"><p>Top 5 Played Songs</p></div>
        <table className="top-five__table">
          <tbody>
            <tr className="top-five__table-header">
              <th className="top-five__table-header-rank"></th>
              <th className="top-five__table-header-img"></th>
              <th className="top-five__table-header-title"></th>
              <th className="top-five__table-header-artist"></th>
            </tr>
            {topSong.slice(0,maxFive).map((song,i) =>
                <tr className="top-five__table__content">
              <td><b>{i+1}</b></td>
              <td className="td-img"><img src={song.image} width="100%" ></img></td>          
              <td>{song.songName}</td>
              <td>{song.artistName}</td>
            </tr>
            )}
          </tbody>
        </table>
    </div>
    <div className="top-five-second-section">
      <div className="datas">
        <div className="top-five-title-artist"><p>Top 5 Listened Artists</p></div>
          <VictoryChart height={400} width={600}
            domainPadding={{ x: 50, y: [0, 20] } }
            >
              <VictoryGroup offset={20}
                colorScale={["#061e51"]}
              >
                <VictoryBar
                data={data}
                x={"artist"}
                y={"times"}
              />
            </VictoryGroup>
          </VictoryChart>
        </div>
      </div>
     </div>
    );
  }
}

export default UserAccount;