import React, { Component } from 'react';
import * as d3 from 'd3';

class Child1 extends Component {
  componentDidMount() {
    console.log(this.props.data1);
  }

  componentDidUpdate() {
    const margin = { top: 50, right: 50, bottom: 50, left: 50 },
      width = 600,
      height = 300,
      innerWidth = width - margin.left - margin.right,
      innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select('.child1_svg').attr('width', width).attr('height', height);
    const innerChart = svg.select('.inner_chart').attr('transform', `translate(${margin.left}, ${margin.top})`);

    const xScale = d3.scaleLinear().domain([0, d3.max(this.props.data1, d => d.total_bill)]).range([0, innerWidth]);
    const yScale = d3.scaleLinear().domain([0, d3.max(this.props.data1, d => d.tip)]).range([innerHeight, 0]);

    innerChart.selectAll('.x-axis').data([null]).join('g').attr('class', 'x-axis').attr('transform', `translate(0, ${innerHeight})`).call(d3.axisBottom(xScale));
    innerChart.selectAll('.y-axis').data([null]).join('g').attr('class', 'y-axis').call(d3.axisLeft(yScale));

    innerChart.selectAll('circle').data(this.props.data1).join('circle').attr('r', 5).attr('fill', '#69b3a2').attr('cx', d => xScale(d.total_bill)).attr('cy', d => yScale(d.tip));

    innerChart.append('text').attr('transform', `translate(${innerWidth / 2},${innerHeight + 35})`).style('font-size', '18px').style('text-anchor', 'middle').text('Total Bill');
    innerChart.append('text').attr('x', -innerHeight / 2).attr('y', -30).attr('transform', 'rotate(-90)').style('font-size', '18px').style('text-anchor', 'middle').text('Tips');
    svg.append('text').attr('x', width / 2).attr('y', margin.top / 2 + 10).style('font-size', '22px').style('text-anchor', 'middle').text('Total Bills vs. Tips');
  }

  render() {
    return (
      <svg className='child1_svg'>
        <g className='inner_chart'></g>
      </svg>
    );
  }
}

export default Child1;