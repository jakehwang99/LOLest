import React from "react";

import './comparepagelayout.css';


import '../../../node_modules/react-vis/dist/style.css';

import {
  Container,
  Row,
  Col
} from 'react-bootstrap'

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  RadialChart,
  HorizontalBarSeries
} from 'react-vis';

const axios = require('axios');

class Visuals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    getData = (playerData, column) => {
      if (playerData == null) {
        return 0;
      } else {
        switch (column){
          case "IGN":
            return playerData.PLAYER;
          case "Games":
            return parseFloat(playerData.GAMES, 10);
          
          case "Kills":
            return parseFloat(playerData.K, 10);
          case "Deaths":
            return parseFloat(playerData.D, 10);
          case "KDA":
            return parseFloat(playerData.KDA, 10);
          case "CSPM":
            return parseFloat(playerData.CSPM, 10);

          case "WR":
            return parseFloat(playerData.WR, 10);
          case "KPAR":
            return parseFloat(playerData.KPAR, 10);
          case "KS":
            return parseFloat(playerData.KS, 10);
          case "GS":
            return parseFloat(playerData.GS, 10);
        }
      }
    }


    render() {
      const {player1, player2} = this.props

      return (
        <div>
          <br/>
          <Container style={{borderRadius: '25px', width: '100%', background:'#f6f6f6'}}>
            <Row style={{paddingTop: '20px'}} className="justify-content-md-center">
              <Col md='auto'>
                <h4 style={{paddingLeft: '5px'}}>Number of Games</h4>
                <RadialChart
                  data={[
                    {angle: this.getData(player2, "Games"), color: "#2DA8D8"},
                    {angle: this.getData(player1, "Games"), color: "#D9514E"}
                  ]}
                  width={200}
                  height={200}
                  colorType="literal"
                  animation
                />
              </Col>
              <Col md='auto'>
                <h4 style={{paddingLeft:'5px'}}>Average 'Unit' per Match</h4>
                <XYPlot margin={{bottom: 70}} xType="ordinal" yDomain={[0,10]} width={600} height={250}>
                  <VerticalGridLines />
                  <HorizontalGridLines />
                  <XAxis tickLabelAngle={-45} />
                  <YAxis />
                  <VerticalBarSeries
                    data={[
                      {x: 'Kills', y: (this.getData(player1, "Kills") > 10) ? 10 : this.getData(player1, "Kills")},
                      {x: 'Deaths', y: (this.getData(player1, "Deaths") > 10) ? 10 : this.getData(player1, "Deaths")},
                      {x: 'KDA', y: (this.getData(player1, "KDA") > 10) ? 10 : this.getData(player1, "KDA")},
                      {x: 'CS per min', y: (this.getData(player1, "CSPM") > 10) ? 10 : this.getData(player1, "CSPM")}
                    ]}
                    animation
                    color="#D9514E"
                    
                  />
                  <VerticalBarSeries
                    data={[
                      {x: 'Kills', y: (this.getData(player2, "Kills") > 10) ? 10 : this.getData(player2, "Kills")},
                      {x: 'Deaths', y: (this.getData(player2, "Deaths") > 10) ? 10 : this.getData(player2, "Deaths")},
                      {x: 'KDA', y: (this.getData(player2, "KDA") > 10) ? 10 : this.getData(player2, "KDA")},
                      {x: 'CS per min', y: (this.getData(player2, "CSPM") > 10) ? 10 : this.getData(player2, "CSPM")}
                    ]}
                    animation
                    color="#2DA8D8"
                  />
                </XYPlot>
              </Col>
            </Row>
          </Container>

          <br/>
          <Container style={{borderRadius: '25px', width: '100%', background:'#f6f6f6'}}>
            <Row style={{paddingTop: '20px'}} className="justify-content-md-center">
              <Col md='auto'>
                <h4 style={{paddingLeft: '5px'}}>Percentage of Stats</h4>
                <XYPlot margin={{left: 95}} yType="ordinal" xDomain={[0,100]} width={600} height={250}>
                  <VerticalGridLines />
                  <HorizontalGridLines />
                  <XAxis />
                  <YAxis />
                  <HorizontalBarSeries
                    data={[
                      {y: "Win Rate (%)", x: this.getData(player1, "WR")},
                      {y: "Kill Par. (%)", x: this.getData(player1, "KPAR")},
                      {y: "Kill Share (%)", x: this.getData(player1, "KS")},
                      {y: "Gold Share (%)", x: this.getData(player1, "GS")}
                    ]}
                    animation
                    color="#D9514E"
                  />
                  <HorizontalBarSeries
                    data={[
                      {y: "Win Rate (%)", x: this.getData(player2, "WR")},
                      {y: "Kill Par. (%)", x: this.getData(player2, "KPAR")},
                      {y: "Kill Share (%)", x: this.getData(player2, "KS")},
                      {y: "Gold Share (%)", x: this.getData(player2, "GS")}
                    ]}
                    animation
                    color="#2DA8D8"
                  />
                </XYPlot>
              </Col>
            </Row>
          </Container>
        </div>
        
      );
    }
}

export default Visuals;