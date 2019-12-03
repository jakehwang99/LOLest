import React from "react";

class Parallel extends React.Component {
    constructor(props) {
        super(props)
        this.createLines = this.createLines.bind(this)
    }

    componentDidMount() {
        this.createLines()
    }

    componentDidUpdate() {
        this.createLines()
    }

    createLines() {
        const node = this.node
        const margin = {top: 30, right: 10, bottom: 10, left: 10},
            width = 960 - margin.left - margin.right,
            height = 500 - margin.top - margin.bottom;

        let x = d3.scaleOrdinal().range([0, width]),
            y = {},
            dragging = {};

        let line = d3.line(),
            axis = d3.axisLeft(),
            background,
            foreground,
            dimensions;

        function position(d) {
            let v = dragging[d]
            return v == null ? x(d) : v
        }

        function path(d) {
            return d3.line(dimensions.map(function(p) {
                return [position(p), y[p](d[p])]
            }))
        }

        let svg = d3.select(node)

        d3.select(node)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
          .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

        d3.json("https://raw.githubusercontent.com/jakehwang99/LOLest/master/scraper/data/LCS-Spring-2019.json", function(stats) {
          console.log(stats.data)
          x.domain(dimensions = d3.keys(stats.data[0]).filter(function(d) {
              return (d == "A" || d=="CS" || d=="CSPM") && (y[d] = d3.scaleLinear()
                .domain(d3.extent(stats.data, function(p) { return +p[d] }))
                .range([height, 0]));
          }))

          background = svg.append("g")
              .attr("class", "background")
            .selectAll("path")
              .data(stats.data)
            .enter().append("path")
              .attr("d", path)

          foreground = svg.append("g")
              .attr("class", "foreground")
            .selectAll("path")
              .data(stats.data)
            .enter().append("path")
              .attr("d", path)

          let g = svg.selectAll(".dimension")
              .data(dimensions)
            .enter().append("g")
              .attr("class", "dimension")
        })
    }

    render () {
      return (<svg ref={node => this.node = node}
        width={500} height={500}>
        </svg>
      )
    }
}

export default Parallel;
