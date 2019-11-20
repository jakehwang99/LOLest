import React from 'react'

class BarChart extends React.Component {
    constructor(props) {
        super(props)
        // Bind component as context to any new internal functions
        // (Doesn't need to be done for existing lifecycle functions)
        this.createBarChart = this.createBarChart.bind(this)
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
        const node = this.node // the element itself
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
    }

    render() {
        // Render returns an SVG element waiting for our D3 code
        // Here, node passes a reference for D3 to use
        return <svg ref={node => this.node = node}
                width={200} height={500}>
        </svg>
    }
}

export default BarChart