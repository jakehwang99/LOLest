import React from "react";

const axios = require('axios');
let colors = {"Cloud9": "#ff0000", "100 Thieves": "#00ff00", "FlyQuest": "#0000ff", "Team SoloMid": "#0f0f05", "Echo Fox": "#3a0533"}

const ConsoleLog = ({children}) => {
    console.log(children);
    return false;
};

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.data = null;
        this.state = {};
//        this.getTeams();
        this.currTeam = "Cloud9"
        this.makeDataViz();
    }

    handleClickFLY = () => {
      this.oldTeam = this.currTeam;
      this.currTeam = "FlyQuest"
      this.updateTeam()
    }

    handleClick100 = () => {
      this.oldTeam = this.currTeam;
      this.currTeam = "100 Thieves"
      this.updateTeam()
    }

    handleClickC9 = () => {
      this.oldTeam = this.currTeam;
      this.currTeam = "Cloud9"
      this.updateTeam()
    }

    handleClickTSM = () => {
      this.oldTeam = this.currTeam;
      this.currTeam = "Team SoloMid"
      this.updateTeam()
    }

    handleClickFOX = () => {
      this.oldTeam = this.currTeam;
      this.currTeam = "Echo Fox"
      this.updateTeam()
    }
    
    updateTeam = () => {
      let mtop = 30, mright = 30, mbot = 140, mleft = 60;
      let width = 3220*0.30 - mleft - mright;
      let height = 2800*0.30 - mtop - mbot;
      let margin = {top:36, right:50, bottom:20, left:50}

      let svg = d3.select("#app")
        .select("svg")
        .select("g")

      let obj = this;
      let x = d3.scaleBand()
          .range([0, width])
          .domain(this.data.filter(function(d) { return d.TEAM == obj.currTeam } ).map(function(d) { return d.PLAYER }))
          .padding(0.2);
      svg//.append("g")
          .select("g")
          .transition()
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x))
          .selectAll("text")
              .attr("transform", "translate(-0,0)rotate(-0)")
              //.style("text-anchor", "end")
              .style("font-size", "16px");
      
      let y = d3.scaleLinear()
          .domain([0, 400])
          .range([height, 0]);
      //svg.append("g")
      //    .call(d3.axisLeft(y))
      //    .attr("font-size", "24px")

      let sel = svg.selectAll("mybar")
          .data(this.data.filter(function(d) { return d.TEAM == obj.currTeam }))

      console.log(sel)

      sel
          .enter()
          .append("rect")
          .transition()
            .duration(750)
              .attr("x", function(d) { return x(d.PLAYER); })
              .attr("y", function(d) { return y(d.CS); })
              .attr("width", x.bandwidth())
              .attr("height", function(d) { return height - y(d.CS) })
              .attr("fill", colors[obj.currTeam])
              .attr("class", "mybar")

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
        let width = 3220*0.30 - mleft - mright;
        let height = 2800*0.30 - mtop - mbot;
        let margin = {top:36, right:50, bottom:20, left:50}

        let svg = d3.select("#app")
          .append("svg")
              .attr("width", width + mleft + mright)
              .attr("height", height + mtop + mbot)
          .append("g")
              .attr("transform",
                  "translate(" + mleft + "," + mtop + ")");
        let obj = this;
        d3.json("https://raw.githubusercontent.com/jakehwang99/LOLest/master/scraper/data/LCS-Spring-2019.json", function(d) {
          console.log(d.data)
          let data = d.data
          obj.data = d.data
          
            let x = d3.scaleBand()
                .range([0, width])
                .domain(data.filter(function(d) { return d.TEAM == "Cloud9" } ).map(function(d) { return d.PLAYER }))
                .padding(0.2);
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x))
                .selectAll("text")
                    .attr("transform", "translate(-0,0)rotate(-0)")
                    //.style("text-anchor", "end")
                    .style("font-size", "16px");
            
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
                .filter(function(d) { return d.TEAM == "Cloud9" })
                    .attr("x", function(d) { return x(d.PLAYER); })
                    .attr("y", function(d) { return y(d.CS); })
                    .attr("width", x.bandwidth())
                    .attr("height", function(d) { return height - y(d.CS) })
                    .attr("fill", colors["Cloud9"])
                    .attr("class", "mybar")
        })
    }

    render () {
      const { team } = this.state;
      return (
        <div>
          <button onClick={this.handleClickFLY}>FlyQuest</button>
          <button onClick={this.handleClick100}>100 Thieves</button>
          <button onClick={this.handleClickC9}>Cloud 9</button>
          <button onClick={this.handleClickTSM}>TSM</button>
          <button onClick={this.handleClickFOX}>Echo Fox</button>
        </div>
      );
    }
}

export default Main;
