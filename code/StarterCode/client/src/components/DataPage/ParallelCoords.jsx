import React from 'react'
import RadioButtonGroup from './RadioButtonGroup.jsx'

// Code heavily adapted from:
// https://www.d3-graph-gallery.com/graph/parallel_basic.html

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

class ParallelCoords extends React.Component {
    constructor(props) {
        super(props);
        // Bind component as context to any new internal functions
        // (Doesn't need to be done for existing lifecycle functions)
        this.createLineChart = this.createLineChart.bind(this);
        this.brushEnd = this.brushEnd.bind(this);
    }

    componentDidMount() {
        this.createLineChart()
    }
    
    componentDidUpdate() {
        this.createLineChart()
    }

    createLineChart() {
        if(this.props.data == null) {
            return
        }

        const node = this.node // the svg element itself

        let mtop = 30, mright = 10, mbot = 10, mleft = 0
        let width = this.props.size[0] - mleft - mright;
        let height = this.props.size[1] - mtop - mbot

        // Remove all elements from previous graphs
        // TODO: make this a transition instead
        d3.select(node).selectAll("g").remove()
        d3.select(node).selectAll("path").remove()

        // Use a g element rather than the svg directly to account for margins
        let svg = d3.select(node).append("g")
            .attr("transform", "translate(" + mleft + "," + mtop + ")")

        // Extract the list of dimensions we want to keep in the plot
        let dimensions = d3.keys(this.props.data[0]).filter(function(d) {
            return d != "PLAYER" && d != "TEAM" && d != "Champs"
                && d != "WR" && d != "KPAR" && d != "KS" && d != "GS";
        })

        // For each dimension, construct a linear scale
        let y = {}
        for(let i in dimensions) {
            let name = dimensions[i]
            y[name] = d3.scaleLinear()
                .domain(d3.extent(this.props.data, d => {return +d[name]}))
                .range([height, 0])
        }

        // Build x scale - find best position for each y axis
        let x = d3.scalePoint()
            .range([0, width])
            .padding(1)
            .domain(dimensions)
            
        function path(d) {
            return d3.line()(dimensions.map(
                function(p) { return [x(p), y[p](d[p])]; }
            ))
        }

        // draw the lines
        svg.selectAll("myPath")
            .data(this.props.data)
            .enter().append("path")
            .attr("d", path)
            .style("fill", "none")
            .style("stroke", "#cccccc")
            .style('opacity", 0.5')
            
        if(this.props.filteredData != null && this.props.filteredData != {}) {
            svg.selectAll("myPath")
                .data(this.props.filteredData)
                .enter().append("path")
                .attr("d", path)
                .style("fill", "none")
                .style("stroke", d => colors[this.props.league][d.TEAM])
                .style("stroke-width", 2)
                .style('opacity", 1.0');
        }
            
        let g = svg.selectAll(".dimension")
            .data(dimensions).enter()
            .append("g")
            .attr("class", "dimension")
            .attr("transform", function(d) {
                return "translate(" + x(d) + ")";
            })
         
        g.append("g")
            .attr("class", "axis")
            .each(function(d) { d3.select(this).call(d3.axisLeft().scale(y[d])); })
            .append("text")
                .style("text-anchor", "middle")
                .attr("y", -9)
                .text(function(d) { return d; })
                .style("fill", "black");

        let thisHolder = this;
        g.append("g")
            .attr("class", "brush")
            .attr("ref", "brush")
            .each(function(d) {
                d3.select(this)
                    .call(y[d].brush = d3.brushY()
                        .extent([[-16, -3],[16, height+3]])
                        .on("end", function() {
                            thisHolder.brushEnd(y, d);
                        })
                    ) 
            })
    }

    brushEnd(yScales, dimension) {
        let bounds = null;
        if(d3.event && d3.event.selection) {
            const [y1, y2] = d3.event.selection;
            bounds = [
                yScales[dimension].invert(y1),
                yScales[dimension].invert(y2)
            ];
        }

        let b = {};
        b[dimension] = bounds;
        this.props.onBrush(b);
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

export default ParallelCoords