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
        this.state = {team: 'Cloud9'}
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

        let mtop = 30, mright = 30, mbot = 60, mleft = 60
        let width = this.props.size[0] - mleft - mright;
        let height = this.props.size[1] - mtop - mbot

        let xScale = d3.scaleBand()
            .range([0, width])
            .domain(this.props.data
                .filter(d => {return d.TEAM == this.state.team})
                .map(d => { return d.PLAYER })
            )
            .padding(0.2)

        d3.select(node).selectAll("g").remove()

        let svg = d3.select(node).append("g")
            .attr("transform", "translate(" + mleft + "," + mtop + ")")

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(xScale))
            .selectAll("text")
                .attr("transform", "translate(0,0)rotate(0)")
                .style("font-size", "16px")

        let yScale = d3.scaleLinear()
            .domain([0, 400])
            .range([height, 0])

        svg.append("g")
            .attr("transform", "translate(0,0)")
            .call(d3.axisLeft(yScale))
            .attr("font-size", "24px")

        svg.append("g")
            .attr("class", "chartHolder")
            .attr("transform", "translate(0,0)")
            .selectAll("rect")
            .data(this.props.data.filter(d => {return d.TEAM == this.state.team}))
            .enter()
            .append("rect")

        svg.select("g.chartHolder")
            .selectAll("rect")
            .data(this.props.data.filter(d => {return d.TEAM == this.state.team}))
            .exit()
            .remove()

        svg.select("g.chartHolder")
            .selectAll("rect")
                .attr("x", d => {return xScale(d.PLAYER)})
                .attr("y", d => {return yScale(d.CS)})
                .attr("width", xScale.bandwidth())
                .attr("height", d => {return height - yScale(d.CS)})
                .attr("fill", d => { return colors[d.TEAM]})
                .attr("class", "mybar")


        /*
        // Example code for integrating D3 with React
        const dataMax = d3.max(this.props.appData)
        const yScale = d3.scaleLinear()
            .domain([0, dataMax])
            .range([0, this.props.size[1]])

        d3.select(node)
            .selectAll("rect")
            .data(this.props.appData)
            .enter()
            .append("rect")

        d3.select(node)
            .selectAll("rect")
            .data(this.props.appData)
            .exit()
            .remove()

        d3.select(node)
            .selectAll("rect")
            .data(this.props.appData)
            .style("fill", "#fe9922")
            .attr("x", (d,i) => i*25)
            .attr("y", d => this.props.size[1] - yScale(d))
            .attr("height", d => yScale(d))
            .attr("width", 25)
        */
    }

    handleClick(e) {
        console.log("PAssed: " + e)
        this.setState({team: e})
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
                <svg ref={node => this.node = node}
                    width={this.props.size[0]} height={this.props.size[1]}>
                </svg>
            </div>
        )

    }
}

export default BarChart