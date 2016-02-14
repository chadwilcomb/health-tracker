import React from 'react'
import ampersandMixin from 'ampersand-react-mixin'
import d3 from 'd3'
// import d3 from 'd3-shape'
// import scale from 'd3-scale'
// import axis from 'd3-axis'
// import xAxis from '../components/x-axis'
// import yAxis from '../components/y-axis'
// import DayBar from '../components/day-bar'




export default React.createClass({
    mixins: [ampersandMixin],

    displayName: 'D3ChartPage',

    setUpChart () {
      const {margin,width,height} = this.state;
      const {days} = this.props;
      const data = days.getLastDays().reverse();

      if (!data.length) return false;

      var parseDate = d3.time.format("%m-%d-%Y").parse;

      var dates = data.map((day) => { return parseDate(day.date) });

      var yMin = d3.min(data, function (day) { return -day.drinks; });
      var yMax = d3.max(data, function (day) { return day.miles; });

      var x = this.x = d3.scale.ordinal()
        .domain(dates)
        .rangeRoundBands([0, width], .2);

      var y = this.y = d3.scale.linear()
        .domain([yMax, yMin])
        .range([0, height])
        .nice();

      var lineMax = d3.max(data, function(d) { return d.score; });

      var yLine = this.yLine = d3.scale.linear()
        .domain([lineMax,-lineMax])
        .range([0, height]);

      var line = d3.svg.line()
        .x(function(d) { return x(parseDate(d.date)); })
        .y(function(d) { return yLine(d.score); });


      var xAxis = this.xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        .tickFormat(d3.time.format("%m-%d"));

      var yAxis = this.yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

      var yLineAxis = this.yLineAxis = d3.svg.axis()
        .scale(this.yLine)
        .orient("right");

      var svg = this.svg = d3.select("#chart");

      svg.selectAll(".mile-bar")
          .data(data)
        .enter().append("rect")
          .attr("class", "mile-bar")
          .attr("y", function(d) { return y(Math.max(0, d.miles)); })
          .attr("x", function(d, i) { return x(parseDate(d.date)); })
          .attr("height", function(d) { return Math.abs(y(d.miles) - y(0)); })
          .attr("width", x.rangeBand());

      svg.selectAll(".drink-bar")
          .data(data)
        .enter().append("rect")
          .attr("class", "drink-bar")
          .attr("y", function(d) { return y(Math.max(0, -d.drinks)); })
          .attr("x", function(d, i) { return x(parseDate(d.date)); })
          .attr("height", function(d) { return Math.abs(y(-d.drinks) - y(0)); })
          .attr("width", x.rangeBand());

      svg.append("path")
          .datum(data)
          .attr("class", "trendline")
          .attr("d", line);

      svg.append("g")
          .attr("class", "y axis")
          .call(yAxis);

      svg.append("g")
          .attr("class", "y axis")
          .attr("transform", "translate(" + width + " ,0)")
          .call(yLineAxis);

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + y(0) + ")")
          .call(xAxis)
        .selectAll("text")
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", "-.55em")
          .attr("transform", "rotate(-90)" );



      this.chartInitialized = true;

    },

    updateChart () {
      const {margin,width,height} = this.state;
      const {days} = this.props;
      const data = days.getLastDays().reverse();

      const x = this.x;
      const y = this.y;
      const yLine = this.yLine;

      if (!this.chartInitialized) {
        this.setUpChart();
        return false;
      }

      x.rangeRoundBands([0, width], .2);
      y.range([0, height]);

      this.svg.selectAll(".x.axis")
        .attr("transform", "translate(0," + y(0) + ")")
        .call(this.xAxis)
        .selectAll("text")
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", "-.55em")
          .attr("transform", "rotate(-90)" );

      this.svg.selectAll(".y.axis")
        .call(this.yAxis);

      this.svg.selectAll(".mile-bar")
          .data(data)
          .attr("y", function(d) { return y(Math.max(0, d.miles)); })
          .attr("x", function(d, i) { return x(parseDate(d.date)); })
          .attr("height", function(d) { return Math.abs(y(d.miles) - y(0)); })
          .attr("width", x.rangeBand());

      this.svg.selectAll(".drink-bar")
          .data(data)
          .attr("y", function(d) { return y(Math.max(0, -d.drinks)); })
          .attr("x", function(d, i) { return x(parseDate(d.date)); })
          .attr("height", function(d) { return Math.abs(y(-d.drinks) - y(0)); })
          .attr("width", x.rangeBand());


    },

    getInitialState () {

      return {
        width: window.innerWidth * 0.9 - 50,
        height: window.innerHeight * 0.9 - 50,
        margin: {
          top: 20,
          right: 25,
          bottom: 30,
          left: 20
        },
        mileStyle: {
          fill: "steelblue"
        },
        drinkStyle: {
          fill: "darkred"
        }
      }
    },

    componentDidMount () {
      const _this = this;
      this.setUpChart();
      window.onresize = function () {
        _this.setState({
          width: window.innerWidth * 0.9,
          height: window.innerHeight * 0.9
        });
      }
    },

    componentDidUpdate () {
      this.updateChart();
    },

    render () {
      const {width,height,margin} = this.state;
      const transform = "translate(" + margin.left + "," + margin.top + ")";
      return (
        <div>
          <svg width={width + margin.left + margin.right} height={height + margin.top + margin.bottom}>
            <g id="chart" transform={transform}></g>
          </svg>
        </div>
      )

      // const {width,height,marginTop,marginRight,marginBottom,marginLeft} = this.state;
      // const {days} = this.props;
      // return (
      //   <svg width={width} height={height}>
      //     <g transform="translate(" + marginLeft + "," + marginTop + ")">
      //       <g className="x-axis" transform="translate(0," + height + ")"></g>
      //       <g className="y-axis"></g>
      //       {days && days.map((day) => {
      //         return (<DayBar day={day} width={width} height={height} prop="miles" style={mileStyle} />)
      //       })}
      //     </g>
      //   </svg>
      // )

    }
});
