import React from "react";

import MainHeader from "../MainHeader.jsx";
import Visuals from './Visuals.jsx';


import './comparepagelayout.css';

//import Button from "react-bootstrap";
//import { Image, Button } from "react-bootstrap";
import { ButtonToolbar, Dropdown, DropdownButton, Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


const axios = require('axios');

class ComparePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            leagueLeft: [],
            leagueRight: [],
            playerLeft: null,
            playerRight: null
        };
    }

    getData = (url, isLeft) => {
      axios.get(url)
          .then((response) => {
            // handle success
            if (isLeft) {
              this.setState({ leagueLeft: response.data.data });
            } else {
              this.setState({ leagueRight: response.data.data });
            }
            //console.log(response.data.data);
        })
          .catch(function (error) {
            // handle error
        console.log(error);
        })
    }

    onClickLeague = (league, isLeft) => {
      const leagueUrl = "http://localhost:5000/" + league + "_Summer_2019";
      this.getData(leagueUrl, isLeft);
    }

    onClickPlayer = (player, isLeft) => {
      if (isLeft) {
        this.setState({ playerLeft: player });
      } else {
        this.setState({ playerRight: player });
      }
    }

    render() {
      const {leagueLeft, leagueRight, playerLeft, playerRight} = this.state;

      return (
        <div>
          <MainHeader />
          
          <div>
            <ButtonToolbar>
              <DropdownButton variant="danger" title="Choose a league">
                {["LCS", "LEC", "LCK", "LPL"].map(league => (
                  <Dropdown.Item onClick={() => this.onClickLeague(league, true)}> {league} </Dropdown.Item>
                ))}
              </DropdownButton>
              <DropdownButton variant="danger" title="Choose a player" size="sm">
                {leagueLeft.map(player => (
                  <Dropdown.Item onClick={() => this.onClickPlayer(player, true)}> {player.PLAYER} </Dropdown.Item>
                ))}
              </DropdownButton>
              <DropdownButton variant="primary" title="Choose a league">
                {["LCS", "LEC", "LCK", "LPL"].map(league => (
                  <Dropdown.Item onClick={() => this.onClickLeague(league, false)}> {league} </Dropdown.Item>
                ))}
              </DropdownButton>
              <DropdownButton variant="primary" title="Choose a player" size="sm">
                {leagueRight.map(player => (
                  <Dropdown.Item onClick={() => this.onClickPlayer(player, false)}> {player.PLAYER} </Dropdown.Item>
                ))}
              </DropdownButton>
            </ButtonToolbar>
          </div>

          <div>
            <Visuals player1={playerLeft} player2={playerRight} />
          </div>
        </div>

      );
    }
}

export default ComparePage;