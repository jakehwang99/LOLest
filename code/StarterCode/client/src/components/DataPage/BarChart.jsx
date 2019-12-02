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
        this.state = {teams: [], stat:"CS", currLeague: "", choices: [], stats: []};
        // Bind component as context to any new internal functions
        // (Doesn't need to be done for existing lifecycle functions)
        this.createBarChart = this.createBarChart.bind(this);
        this.handleTeamClick = this.handleTeamClick.bind(this);
        this.handleStatClick = this.handleStatClick.bind(this);
    }

    // Fire bar chart function whenever component first mounts
    componentDidMount() {
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
        let mtop = 100, mright = 60, mbot = 100, mleft = 60 + 300;
        let width = this.props.size[0]+300 - mleft - mright;
        let height = this.props.size[1] - mtop - mbot;

        // Filter for only the players that we want
        let selection = this.props.data
            .sort((a, b) => 
                d3.descending(parseFloat(a[this.state.stat]), parseFloat(b[this.state.stat]))
            )
            .filter(
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
        d3.select(node).selectAll("g.g_main").remove();
        d3.select(node).selectAll("g.legend").remove();

        // Use a g element rather than the svg directly to account for margins
        let svg = d3.select(node)
            .attr("class", "viz")
            .append("g")
                .attr("transform", "translate(" + (mleft+250) + "," + mtop + ")")
                .attr("class", "g_main");

        // Create title
        svg.append("g").append("text")
            .attr("x", (width/2))
            .attr("y", 0 - (mtop/2))
            .attr("text-anchor", "middle")
            .style("font-size", "32px")
            .style("text-decoration", "underline")
            .style("font-weight", "bold")
            .text(`${this.state.stat} per Player`)

        // Create the scales, axis, and gridlines for x and y axis
        let xScale = d3.scaleBand()
            .range([0, width])
            .domain(selection.map(d => { return d.PLAYER }))
            .padding(0.05);

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale))
            .selectAll("text")
                .attr("transform", "translate(0,0)rotate(-45)")
                .attr("text-anchor", "end")
                .style("font-size", Math.min(Math.floor(xScale.bandwidth()/3.5), 20) + "px");

        let yScale = d3.scaleLinear()
            .domain([0, d3.max(this.props.data.map(d => parseFloat(d[this.state.stat])))])
            .range([height, 0])
            .nice();
    
        svg.append("g")
            .attr("transform", "translate(0,0)")
            .call(d3.axisLeft(yScale))
            .attr("font-size", "24px");

        svg.append("g")
            .attr("class", "grid")
            .call(d3.axisLeft(yScale)
                .ticks()
                .tickSize(-width)
                .tickFormat("")
            );

        // Create a legend
        let legend = d3.select(node).append("g")
            .attr("class", "legend")
            .attr("transform", `translate(0,0)`);
            
        let th = this;

        legend.selectAll("rect")
            .data(Object.keys(colors[this.props.league]))
            .enter()
            .append("rect")
                .attr("class", "legendSquare")
                .attr("fill", d => colors[this.props.league][d])
                .attr("fill-opacity", d => {
                    return this.state.teams.includes(d) ? "0.95" : "0.1";
                })
                .attr("stroke", "black")
                .attr("stroke-width", "1px")
                .attr("cursor", "pointer")
                .attr("x", (d, i) => ((i%2)*245 + 5))
                .attr("y", (d, i) => (Math.floor(i/2)*50 + 160))
                .attr("width", "25px")
                .attr("height", "25px")
                .on("click", function(d) { 
                    let temp = [];
                    for(let t of th.state.teams) {
                        temp.push(t);
                    }
                    if(!temp.includes(d)) {
                        temp.push(d);
                    }
                    else {
                        let index = temp.indexOf(d);
                        temp.splice(index, 1);
                    }
                    th.handleTeamClick(temp)
                });
                
        legend.selectAll("text")
            .data(Object.keys(colors[this.props.league]))
            .enter()
            .append("text")
                .attr("class", "legendText")
                .text(d => d)
                .style("font-size", "20px")
                .attr("x", (d, i) => ((i%2)*245 + 35))
                .attr("y", (d, i) => (Math.floor(i/2)*50 + 180));

        legend.append("text")
            .text(`Select ${this.props.league} Teams`)
            .attr("x", 250)
            .attr("y", 130)
            .attr("text-anchor", "middle")
            .style("font-size", "24px")
            .style("text-decoration", "underline")
            .style("font-weight", "bold")

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
                .attr("x", d => {return xScale(d["PLAYER"])})
                .attr("y", d => {return yScale(parseFloat(d[this.state.stat]))})
                .attr("width", xScale.bandwidth())
                .attr("height", d => {return height - yScale(parseFloat(d[this.state.stat]))})
                .attr("fill", d => { return colors[this.props.league][d.TEAM] })
                .attr("fill-opacity", d => { return this.props.hoverElement == d.PLAYER ? "0.65" : "1.0" })
                .attr("stroke-width", d => { return this.props.hoverElement == d.PLAYER ? "3" : "0.0"})
                .attr("stroke", d => {return colors[this.props.league][d.TEAM] })
                .on("mouseenter", this.props.onHover)

        if(this.props.hoverElement == null 
            || this.props.hoverElement == "none" 
            || !this.state.teams.includes(this.props.hoverFullElement.TEAM)) {
            return;
        }    

        // Create tooltip, if there is something selected
        let selected = this.props.hoverFullElement;
        let tipWidth = 100, tipHeight = 50, tipPadding = 10, tipFontSize = 16;
        let tooltip = svg.append("g")
            .attr("class", "g_tooltip")
            .attr("transform", `translate(
                ${xScale(selected["PLAYER"]) - tipWidth*0.5+ xScale.bandwidth()*0.5}, 
                ${yScale(parseFloat(selected[this.state.stat])) - tipHeight - tipPadding})`
            )
            .attr("z-index", "10");
            
        tooltip.append("rect")
                .attr("width", `${tipWidth}px`)
                .attr("height", `${tipHeight}px`)
                .attr("rx", "5px")
                .attr("ry", "5px")
                .attr("fill", colors[this.props.league][selected.TEAM])//"#dddddd")
                .attr("fill-opacity", 0.6)
                .style("position", "absolute")
        
        tooltip.append("text")
            .attr("text-anchor", "middle")
            .attr("x", `${tipWidth/2}px`)
            .attr("y", `${tipFontSize + tipPadding/2}px`)
            .style("font-size", `${tipFontSize}px`)
            .style("font-weight", "bold")
            .text(`${selected["PLAYER"]}`);

        tooltip.append("text")
            .attr("text-anchor", "middle")
            .attr("x", `${tipWidth/2}px`)
            .attr("y", `${tipFontSize*2 + tipPadding}px`)
            .style("font-size", `${tipFontSize}px`)
            .style("font-weight", "bold")
            .text(`${selected[this.state.stat]}`);

    }

    handleTeamClick(e) {
        this.setState({teams: e});
    }

    handleStatClick(e) {
        this.setState({stat: e});
    }

    render() {
        // Render returns an SVG element waiting for our D3 code
        if(this.props.data) {
            // Here, node passes a reference for D3 to use
            return (
                <div>
                    <svg ref={node => this.node = node}
                        width={this.props.size[0]+500} height={this.props.size[1]}>
                    </svg>
                    <p>Select stat:</p>
                    <RadioButtonGroup type="radio" selections={this.state.stats} default="CS" handleClick={this.handleStatClick} />
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
