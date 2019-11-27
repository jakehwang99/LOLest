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
          <div>

            <XYPlot margin={{bottom: 70}} xType="ordinal" width={300} height={300}>
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
              />
              <VerticalBarSeries
                data={[
                  {x: 'Games', y: this.getData(player2, 0, "Games")},
                  {x: 'Kills', y: this.getData(player2, 0, "Kills")},
                  {x: 'Gold', y: this.getData(player2, 0, "Gold")}
                ]}
              />
            </XYPlot>
          </div>
        </div>
        
      );
    }
}

export default Visuals;