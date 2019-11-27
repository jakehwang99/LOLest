import React from "react";

import MainHeader from "../MainHeader.jsx";
import Visuals from './Visuals.jsx';


import './comparepagelayout.css';

//import Button from "react-bootstrap";
import { Image, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


const axios = require('axios');

class ComparePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            playerD1: [null],
            playerD2: [null]
        };
    }

    getData = (url, isLeft) => {
      axios.get(url)
          .then((response) => {
            // handle success
            if (isLeft) {
              this.setState({ playerD1: response.data.data });
            } else {
              this.setState({ playerD2: response.data.data });
            }
            console.log(response.data.data);
        })
          .catch(function (error) {
            // handle error
        console.log(error);
        })
    }

    onClickPlayer1 = () => {
      //const playersUrl = "http://localhost:5000/LCS_Summer_2019/players";
      const leagueUrl = "http://localhost:5000/LCS_Summer_2019";
      //this.getPlayers(playersUrl);
      this.getData(leagueUrl, true);
      //this.setState({ player1: "playerup"});
    }

    onClickPlayer2 = () => {
      //const playersUrl = "http://localhost:5000/LEC_Summer_2019/players";
      const leagueUrl = "http://localhost:5000/LEC_Summer_2019";
      //this.getPlayers(playersUrl);
      this.getData(leagueUrl, false);
      //this.setState({ player2: "playerup"});
    }

    testdata = (d) => {
      if (d[0] == null) {
        console.log("No data");
      } else {
        //console.log(d[0].Name)
        console.log(d[0].PLAYER);
      }

    }

    render() {
      const {playerD1, playerD2} = this.state;
      this.testdata(playerD1);
      this.testdata(playerD2);
      return (
        <div>
          <MainHeader />
          
          <div>
            <Button variant="dark" onClick={this.onClickPlayer1}> player1 </Button>
            <Button variant="dark" onClick={this.onClickPlayer2}> player2 </Button>
          </div>

          <div>
            <Visuals player1={playerD1} player2={playerD2} />
          </div>
          
        </div>
        
      );
    }
}

export default ComparePage;