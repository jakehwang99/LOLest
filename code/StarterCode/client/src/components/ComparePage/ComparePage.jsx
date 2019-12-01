import React from "react";

import MainHeader from "../MainHeader.jsx";
import Visuals from './Visuals.jsx';

import { Container, Row, Col, ButtonToolbar, Dropdown, DropdownButton } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';


const axios = require('axios');

//fixed merge

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

    getPlayerName = (player) => {
      if (player == null) {
        return "(Pick a player)";
      } else {
        return player.PLAYER;
      }
    }

    render() {
      const {leagueLeft, leagueRight, playerLeft, playerRight} = this.state;

      return (
        <div>
          <div>
            <MainHeader />
            
          </div>
          <Container style={{borderRadius: '25px', width: '100%', background:'#f6f6f6'}}>
            <Row className="justify-content-md-center">
              <Col md="auto">
                <h3 style={{paddingTop: '5%', paddingBottom: '5%'}}>
                  {this.getPlayerName(playerLeft)} vs. {this.getPlayerName(playerRight)}
                </h3>
              </Col>
            </Row>
            <Row >
              <Col xs={6} >
                <ButtonToolbar style={{paddingLeft: '30%'}}>
                  <DropdownButton style={{paddingRight:'0.5%'}} variant="danger" title="Choose a league">
                    {["LCS", "LEC", "LCK", "LPL"].map(league => (
                      <Dropdown.Item onClick={() => this.onClickLeague(league, true)}> {league} </Dropdown.Item>
                    ))}
                  </DropdownButton>
                  <DropdownButton variant="danger" title="Choose a player" size="sm">
                    {leagueLeft.map(player => (
                      <Dropdown.Item onClick={() => this.onClickPlayer(player, true)}> {player.PLAYER} </Dropdown.Item>
                    ))}
                  </DropdownButton>
                </ButtonToolbar>
              </Col>
              <Col xs={6}>
                <ButtonToolbar style={{paddingLeft: '10%'}}>
                  <DropdownButton style={{paddingRight:'0.5%'}} variant="primary" title="Choose a league">
                    {["LCS", "LEC", "LCK", "LPL"].map(league => (
                      <Dropdown.Item onClick={() => this.onClickLeague(league, false)}> {league} </Dropdown.Item>
                    ))}
                  </DropdownButton>
                  <DropdownButton  variant="primary" title="Choose a player" size="sm">
                    {leagueRight.map(player => (
                      <Dropdown.Item onClick={() => this.onClickPlayer(player, false)}> {player.PLAYER} </Dropdown.Item>
                    ))}
                  </DropdownButton>
                </ButtonToolbar>
              </Col>
            </Row>
            <br/>
          </Container>

          <div>
            <Visuals player1={playerLeft} player2={playerRight} />
          </div>
        </div>
      );
    }
}

export default ComparePage;