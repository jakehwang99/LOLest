import React from "react";

import './comparepagelayout.css';


import '../../../node_modules/react-vis/dist/style.css';

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  VerticalBarSeries,
  RadialChart
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
            return playerData.GAMES;
          case "Kills":
            return playerData.K;
          case "Deaths":
            return playerData.D;
          case "Gold":
            return playerData.G;
        }
      }
    }


    render() {
      const {player1, player2} = this.props
      return (
        <div>
          <div style={{margin: "10px" }}>


            <RadialChart
              data={[
                {angle: this.getData(player2, "Games"), label: this.getData(player2, "IGN"), color: "#2DA8D8"},
                {angle: this.getData(player1, "Games"), label: this.getData(player1, "IGN"), color: "#D9514E"}
              ]}
              width={300}
              height={300}
              colorType="literal"
              showLabels={true}
              animation />


            <XYPlot margin={{bottom: 70}} xType="ordinal" yDomain={[0,10]} width={400} height={400}>
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis tickLabelAngle={-45} />
              <YAxis />
              <VerticalBarSeries
                data={[
                  {x: 'Kills', y: this.getData(player1, "Kills")},
                  {x: 'Deaths', y: this.getData(player1, "Deaths")}
                ]}
                animation
                color="#D9514E"
              />
              <VerticalBarSeries
                data={[
                  {x: 'Kills', y: this.getData(player2, "Kills")},
                  {x: 'Deaths', y: this.getData(player2, "Deaths")}
                ]}
                animation
                color="#2DA8D8"
              />
            </XYPlot>
          </div>
        </div>
        
      );
    }
}

export default Visuals;