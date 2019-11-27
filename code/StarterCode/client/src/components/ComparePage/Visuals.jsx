import React from "react";

import './comparepagelayout.css';


import '../../../node_modules/react-vis/dist/style.css';

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries
} from 'react-vis';

const axios = require('axios');

class Visuals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    getData = (playerData, playerNum, column) => {
      if (playerData[playerNum] == null) {
        return 0;
      } else {
        switch (column){
          case "IGN":
            return playerData[playerNum].PLAYER;
          case "Games":
            return playerData[playerNum].GAMES;
          case "Kills":
            return playerData[playerNum].K;
          case "Gold":
            return playerData[playerNum].G;
        }
      }
    }


    render() {
      const {player1, player2} = this.props
      return (
        <div>
          <div style={{margin: "10px" }}>

            <XYPlot margin={{bottom: 70}} xType="ordinal" yDomain={[0,25]} width={400} height={400}>
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis tickLabelAngle={-45} />
              <YAxis />
              <VerticalBarSeries
                data={[
                  {x: 'Games', y: this.getData(player1, 0, "Games")},
                  {x: 'Kills', y: this.getData(player1, 0, "Kills")},
                  {x: 'Gold', y: this.getData(player1, 0, "Gold")}
                ]}
                animation
                color="#D9514E"
                onSeriesMouseOver={(event)=>{
                  // does something on mouse over
                  // you can access the value of the event
                  console.log(this.getData(player1, 0, "IGN"))
                }}
              />
              <VerticalBarSeries
                data={[
                  {x: 'Games', y: this.getData(player2, 0, "Games")},
                  {x: 'Kills', y: this.getData(player2, 0, "Kills")},
                  {x: 'Gold', y: this.getData(player2, 0, "Gold")}
                ]}
                animation
                color="#2DA8D8"
                onSeriesMouseOver={(event)=>{
                  // does something on mouse over
                  // you can access the value of the event
                  console.log(this.getData(player2, 0, "IGN"))
                }}
              />
            </XYPlot>
          </div>
        </div>
        
      );
    }
}

export default Visuals;