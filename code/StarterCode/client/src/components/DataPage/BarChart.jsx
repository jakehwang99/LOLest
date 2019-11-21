import React from 'react'
import RadioButtonGroup from './RadioButtonGroup.jsx'

let colors = {
    "Cloud9": "#87ceeb",
    "100 Thieves": "#8b0000",
    "Clutch Gaming": "#ff6961",
    "Counter Logic Gaming": "#0277bd",
    "Echo Fox": "#ffa500",
    "FlyQuest": "#013920",
    "Golden Guardians": "#fcc201",
    "OpTic Gaming": "#95f985",
    "Team Liquid": "#003366",
    "Team SoloMid": "#999999"
}

class BarChart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {teams: ['Cloud9']}
        // Bind component as context to any new internal functions
        // (Doesn't need to be done for existing lifecycle functions)
        this.createBarChart = this.createBarChart.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    // Fire bar chart function whenever component first mounts
    componentDidMount() {
        this.createBarChart()
    }

    // or whenever component receives new props/state
    componentDidUpdate() {
        this.createBarChart()
    }

    createBarChart() {
        console.log(this.props.data)

        // Can't create chart if data has not been selected yet
        if(this.props.data == null) {
            return
        } 
        const node = this.node // the svg element itself

        let mtop = 30, mright = 30, mbot = 100, mleft = 60
        let width = this.props.size[0] - mleft - mright;
        let height = this.props.size[1] - mtop - mbot

        // Filter for only the players that we want
        let selection = this.props.data.filter(
            d => {for(let t of this.state.teams) {
                    if (d.TEAM == t) {
                        return true 
                    }
                }
                return false
            }
        )

        // Remove all elements from previous graphs
        // TODO: make this a transition instead
        d3.select(node).selectAll("g").remove()

        // Use a g element rather than the svg directly to account for margins
        let svg = d3.select(node).append("g")
            .attr("transform", "translate(" + mleft + "," + mtop + ")")

        // Create the scales for x and y axis
        let xScale = d3.scaleBand()
            .range([0, width])
            .domain(selection.map(d => { return d.PLAYER }))
            .padding(0.2)

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale))
            .selectAll("text")
                .attr("transform", "translate(0,0)rotate(-45)")
                .attr("text-anchor", "end")
                .style("font-size", Math.floor(xScale.bandwidth()/3.5) + "px")

        let yScale = d3.scaleLinear()
            .domain([0, 400])
            .range([height, 0])

        svg.append("g")
            .attr("transform", "translate(0,0)")
            .call(d3.axisLeft(yScale))
            .attr("font-size", "24px")


        // Create the bar chart
        svg.append("g")
            .attr("class", "chartHolder")
            .attr("transform", "translate(0,0)")
            .selectAll("rect")
            .data(selection)
            .enter()
            .append("rect")

        svg.select("g.chartHolder")
            .selectAll("rect")
            .data(selection)
            .exit()
            .remove()

        svg.select("g.chartHolder")
            .selectAll("rect")
                .attr("x", d => {return xScale(d.PLAYER)})
                .attr("y", d => {return yScale(d.CS)})
                .attr("width", xScale.bandwidth())
                .attr("height", d => {return height - yScale(d.CS)})
                .attr("fill", d => { return colors[d.TEAM]})
                .on("mouseover", d => {
                    svg.select("g.chartHolder").selectAll("rect.tooltip")
                        .remove()
                    svg.select("g.chartHolder").append("rect")
                        .attr("className", "tooltip")
                        .attr("x", xScale(d.PLAYER))
                        .attr("y", yScale(d.CS))
                        .attr("width", xScale.bandwidth())
                        .attr("height", "50px")
                        .attr("fill", "#000000")
                })
                .on("mouseout", d => {
                    svg.select("g.chartHolder").selectAll(".tooltip")
                        .remove()
                })


    }

    handleClick(e) {
        this.setState({teams: e})
    }

    render() {
        // Render returns an SVG element waiting for our D3 code
        // Here, node passes a reference for D3 to use
        if(this.props.data != null) {
            let choices = []
            for(let d of this.props.data) {
                if (!choices.includes(d.TEAM)) {
                    choices.push(d.TEAM)
                } 
            }
            return (
                <div>
                    <svg ref={node => this.node = node}
                        width={this.props.size[0]} height={this.props.size[1]}>
                    </svg>
                    <p>Select team:</p>
                    <RadioButtonGroup selections={choices} default="Cloud9" handleClick={this.handleClick.bind(this)} />
                    <p>Select role:</p>
                    <RadioButtonGroup selections={choices} default="ADC" handleClick={this.handleClick.bind(this)} />
                </div>
            )
        }
        return (
            <div>
                Please select a league!
            </div>
        )

    }
}

export default BarChart