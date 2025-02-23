import React, { Component } from "react";
import * as d3 from "d3";

class Child2 extends Component {
  componentDidUpdate() {
    const margin = { top: 50, right: 50, bottom: 50, left: 50 },
      width = 600,
      height = 300,
      innerWidth = width - margin.left - margin.right,
      innerHeight = height - margin.top - margin.bottom;

    const avgData = Array.from(
      d3.rollup(
        this.props.data2,
        (v) => d3.mean(v, (d) => d.tip),
        (d) => d.day
      ),
      ([day, avgTip]) => ({ day, avgTip })
    );

    const svg = d3.select(".child2_svg").attr("width", width).attr("height", height);
    const innerChart = svg.select(".inner_chart").attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleBand().domain(avgData.map((d) => d.day)).range([0, innerWidth]).padding(0.2);
    const yScale = d3.scaleLinear().domain([0, d3.max(avgData, (d) => d.avgTip)]).range([innerHeight, 0]);

    innerChart.selectAll(".x-axis").data([null]).join("g").attr("class", "x-axis").attr("transform", `translate(0, ${innerHeight})`).call(d3.axisBottom(xScale));
    innerChart.selectAll(".y-axis").data([null]).join("g").attr("class", "y-axis").call(d3.axisLeft(yScale));

    innerChart.selectAll("rect").data(avgData).join("rect").attr("x", (d) => xScale(d.day)).attr("y", (d) => yScale(d.avgTip)).attr("width", xScale.bandwidth()).attr("height", (d) => innerHeight - yScale(d.avgTip)).attr("fill", "#69b3a2");

    d3.select(".y-axis").selectAll(".tick line").attr("x2", innerWidth).attr("stroke-dasharray", "2,2").attr("stroke", "lightgray");
    d3.select(".x-axis").selectAll(".tick line").attr("y1", -innerHeight).attr("stroke-dasharray", "2,2").attr("stroke", "lightgray");

    innerChart.append("text").attr("transform", `translate(${innerWidth / 2},${innerHeight + 35})`).style("font-size", "18px").style("text-anchor", "middle").text("Day");
    innerChart.append("text").attr("x", -innerHeight / 2).attr("y", -30).attr("transform", "rotate(-90)").style("font-size", "18px").style("text-anchor", "middle").text("Average Tip");
    svg.append("text").attr("x", width / 2).attr("y", margin.top / 2 + 10).style("font-size", "22px").style("text-anchor", "middle").text("Average Tip by Day");
  }

  render() {
    return (
      <svg className="child2_svg">
        <g className="inner_chart"></g>
      </svg>
    );
  }
}

export default Child2;
