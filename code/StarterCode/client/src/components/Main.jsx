import React from "react";

const axios = require('axios');

const ConsoleLog = ({children}) => {
    console.log(children);
    return false;
};

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.getTeams();
        this.makeDataViz();
    }

    getTeams = () => {
        axios.get('http://localhost:5000/teams')
          .then((response) => {
            // handle success
            this.setState({ team: response.data });
            console.log(response.data);
        })
          .catch(function (error) {
            // handle error
        console.log(error);
        })
    }
    
    makeDataViz = () => {          
        let mtop = 30, mright = 30, mbot = 140, mleft = 60;
        let width = 3220 - mleft - mright;
        let height = 2800 - mtop - mbot;

        let svg = d3.select("#app")
          .append("svg")
              .attr("width", width + mleft + mright)
              .attr("height", height + mtop + mbot)
          .append("g")
              .attr("transform",
                  "translate(" + mleft + "," + mtop + ")");

        d3.csv("//raw.githubusercontent.com/jakehwang99/LOLest/alfredo/scraper/LCS-Summer-2019.csv", function(data) {
            let x = d3.scaleBand()
                .range([0, width])
                .domain(data.map(function(d) { return d.Player; }))
                .padding(0.2);
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x))
                .selectAll("text")
                    .attr("transform", "translate(-10,0)rotate(-45)")
                    .style("text-anchor", "end")
                    .style("font-size", "24px");
            
            let y = d3.scaleLinear()
                .domain([0, 400])
                .range([height, 0]);
            svg.append("g")
                .call(d3.axisLeft(y))
                .attr("font-size", "24px")

            svg.selectAll("mybar")
                .data(data)
                .enter()
                .append("rect")
                    .attr("x", function(d) { return x(d.Player); })
                    .attr("y", function(d) { return y(d.CS); })
                    .attr("width", x.bandwidth())
                    .attr("height", function(d) { return height - y(d.CS) })
                    .attr("fill", "#69b3a2")
        })
    }

    render () {
      const { team } = this.state;
      return (
        <div>
          {team && <div> Retrieved team from backend: {team} </div>}
        </div>      
      );
    }
}

export default Main;
