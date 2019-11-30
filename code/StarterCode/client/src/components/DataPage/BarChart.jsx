import React from 'react'
import RadioButtonGroup from './RadioButtonGroup.jsx'

// TODO: Automate this from the data? How to get right colors?
let colors = {
    "LCS": {
        "100 Thieves": "#8b0000",
        "Cloud9": "#87ceeb",
        "Clutch Gaming": "#ff6961",
        "Counter Logic Gaming": "#0277bd",
        "Echo Fox": "#ffa500",
        "FlyQuest": "#018920",
        "Golden Guardians": "#fcc201",
        "OpTic Gaming": "#95f985",
        "Team Liquid": "#003366",
        "Team SoloMid": "#999999"
    },
    "LEC": {
        "Excel Esports": "#8b0000",
        "FC Schalke 04 Esports": "#87ceeb",
        "Fnatic": "#ff6961",
        "G2 Esports": "#0277bd",
        "Misfits Gaming": "#ffa500",
        "Origen": "#018920",
        "Rogue (European Team)": "#fcc201",
        "SK Gaming": "#95f985",
        "Splyce": "#003366",
        "Team Vitality": "#999999"
    },
    "LCK": {
        "Afreeca Freecs": "#8b0000",
        "DAMWON Gaming": "#87ceeb",
        "Gen.G": "#ff6961",
        "Griffin": "#0277bd",
        "Hanwha Life Esports": "#ffa500",
        "Jin Air Green Wings": "#018920",
        "Kingzone DragonX": "#fcc201",
        "KT Rolster": "#95f985",
        "SANDBOX Gaming": "#003366",
        "SK Telecom T1": "#999999"
    },
    "LPL": {
        "Bilibili Gaming": "#8b0000",
        "Dominus Esports": "#87ceeb",
        "EDward Gaming": "#ff6961",
        "FunPlus Phoenix": "#0277bd",
        "Invictus Gaming": "#ffa500",
        "JD Gaming": "#018920",
        "LGD Gaming": "#fcc201",
        "LNG Esports": "#95f985",
        "Oh My God": "#003366",
        "Rogue Warriors": "#999999",
        "Royal Never Give Up": "#ffa500",
        "Suning": "#018920",
        "Team WE": "#fcc201",
        "Top Esports": "#95f985",
        "Vici Gaming": "#003366",
        "Victory Five": "#999999"
    }
};

class BarChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {teams: [], currLeague: "", choices: [], stats: []};
        // Bind component as context to any new internal functions
        // (Doesn't need to be done for existing lifecycle functions)
        this.createBarChart = this.createBarChart.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    // Fire bar chart function whenever component first mounts
    componentDidMount() {
        this.createBarChart();
    }

    // or whenever component receives new props/state
    componentDidUpdate() {
        // Initialize the chart with the first team, but after that allow users to clear the chart
        if(this.props.league && this.props.data) {
            // On league change, we need to update the team and stat lists.
            if(this.state.currLeague != this.props.league) {
                let choices = [];
                let stats = [];
                for(let d of Object.keys(colors[this.props.league])) {
                    choices.push(d);
                }
                for(let stat of Object.keys(this.props.data[0])) {
                    if(stat != "TEAM" && stat != "PLAYER" && stat != "Champs") {
                        stats.push(stat);
                    }
                }

                this.setState({currLeague: this.props.league, choices: choices, stats: stats});
            }
        }
        this.createBarChart();
    }

    createBarChart() {
        //console.log(this.props.data)

        // Can't create chart if data has not been selected yet
        if(this.props.data == null) {
            return;
        } 

        const node = this.node; // the svg element itself

        // Set the margins and size of graph
        let mtop = 30, mright = 30, mbot = 100, mleft = 60;
        let width = this.props.size[0] - mleft - mright;
        let height = this.props.size[1] - mtop - mbot;

        // Filter for only the players that we want
        let selection = this.props.data.filter(
            d => {for(let t of this.state.teams) {
                    if (d.TEAM == t) {
                        return true;
                    }
                }
                return false;
            }
        );

        // Remove all elements from previous graphs
        // TODO: make this a transition instead
        d3.select(node).selectAll("g").remove();

        // Use a g element rather than the svg directly to account for margins
        let svg = d3.select(node).append("g")
            .attr("transform", "translate(" + mleft + "," + mtop + ")")
            .attr("class", "g_main");

        // Create the scales for x and y axis
        let xScale = d3.scaleBand()
            .range([0, width])
            .domain(selection.map(d => { return d.PLAYER }))
            .padding(0.2);

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale))
            .selectAll("text")
                .attr("transform", "translate(0,0)rotate(-45)")
                .attr("text-anchor", "end")
                .style("font-size", Math.min(Math.floor(xScale.bandwidth()/3.5), 20) + "px");

        let yScale = d3.scaleLinear()
            .domain([0, 400])
            .range([height, 0]);

        svg.append("g")
            .attr("transform", "translate(0,0)")
            .call(d3.axisLeft(yScale))
            .attr("font-size", "24px");


        // Create the bar chart
        svg.append("g")
            .style("height", height)
            .attr("class", "chartHolder")
            .selectAll("rect.bar")
            .data(selection)
            .enter()
            .append("rect")
                .attr("class", "bar");
/*
        svg.select("g.chartHolder")
            .selectAll("rect")
            .data(selection)
            .exit()
            .remove();
*/
        // Color the bars according to team, and add hover functionality for a tooltip
        svg.select("g.chartHolder")
            .selectAll("rect.bar")
                .attr("x", d => {return xScale(d.PLAYER)})
                .attr("y", d => {return yScale(d.CS)})
                .attr("width", xScale.bandwidth())
                .attr("height", d => {return height - yScale(d.CS)})
                .attr("fill", d => { return this.props.hoverElement == d.PLAYER ? "#000000" : colors[this.props.league][d.TEAM]})
                .on("mouseenter", this.props.onHover);
    }

    handleClick(e) {
        this.setState({teams: e});
    }

    render() {
        // Render returns an SVG element waiting for our D3 code
        if(this.props.data) {
            // Here, node passes a reference for D3 to use
            return (
                <div>
                    <svg ref={node => this.node = node}
                        width={this.props.size[0]} height={this.props.size[1]}>
                    </svg>
                    <p>Select team:</p>
                    <RadioButtonGroup selections={this.state.choices} default={this.state.choices[0]} handleClick={this.handleClick.bind(this)} />
                    <p>Select statistic to display:</p>
                    <RadioButtonGroup selections={this.state.stats} default="CS" handleClick={this.handleClick.bind(this)} />
                </div>
            );
        }
        return (
            <div>
                Please select a league!
            </div>
        );

    }
}

export default BarChart
