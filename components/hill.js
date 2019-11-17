import React from "react";
import rd3 from "react-d3-library";
const RD3Component = rd3.Component;
import { select, event } from "d3-selection";
import { scaleLinear } from "d3-scale";
import { axisBottom, axisLeft } from "d3-axis";
import { line } from "d3-shape";
import { drag } from "d3-drag";
import { range } from "d3-array";

const config = {
  width: 1000,
  height: 300,
  margin: {
    top: 15,
    right: 200,
    bottom: 35,
    left: 60
  }
};
const fn = x => 50 * Math.sin((Math.PI / 50) * x - (1 / 2) * Math.PI) + 50;

const init = (data, cb) => {
  const node = document.createElement("div");
  node.width = width;
  node.height = height;
  const { width, height, margin } = config;

  const w = width - margin.left - margin.right;
  const h = height - margin.top - margin.bottom;

  console.log("a", w, h);

  const svg = select(node)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  console.log("qwlp");

  const xScale = scaleLinear()
    .domain([0, 100])
    .range([0, w]);

  const xScaleInv = scaleLinear()
    .domain([0, w])
    .range([0, 100]);

  console.log("qwlp0", xScale(100), data, data.map(a => xScale(a.x)));

  const xAxis = axisBottom(xScale).ticks(0);

  console.log("qwlp01", xAxis);

  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${h})`)
    .call(xAxis);

  console.log("qwlp1");

  const yScale = scaleLinear()
    .domain([0, 100])
    .range([h, 0]);

  console.log("qwlp1a");
  const yAxis = axisLeft(yScale).ticks(0);
  console.log("qwlp1b", yAxis);

  svg
    .append("g")
    .attr("class", "y axis")
    .call(yAxis);
  console.log("qwlp1c");

  const lineData = range(0, 100, 0.1).map(i => ({
    x: i,
    y: fn(i)
  }));

  console.log("qwlp2");

  const linea = line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y));

  console.log("qwlp3");
  svg
    .append("path")
    .attr("class", "line")
    .datum(lineData)
    .attr("d", linea);
  console.log("qwlp4");

  const dragIt = drag()
    .on("drag", function(d) {
      let x = event.x;
      if (x < 0) {
        x = 0;
      } else if (x > w) {
        x = w;
      }
      const inverted = xScale.invert(x);
      d.x = x;
      d.y = yScale(fn(inverted));
      select(this).attr("transform", `translate(${d.x}, ${d.y})`);
      cb(event);
    })
    .on("end", function(e) {
      console.log("drag ended", xScaleInv(e.x));
    });
  console.log("qwlp5");

  const group = svg
    .selectAll(".group")
    .data(data.map(d => ({ x: d.progress, y: fn(d.progress), color: d.color, desc: d.desc })))
    .enter()
    .append("g")
    .attr("class", "group")
    .attr("transform", d => {
      d.x = xScale(d.x);
      d.y = yScale(d.y);
      return `translate(${d.x}, ${d.y})`;
    })
    .call(dragIt);

  console.log("qwlp6");
  group
    .append("circle")
    .attr("fill", d => d.color)
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 8);
  console.log("qwlp7");

  group
    .append("text")
    .text(d => d.desc)
    .attr("x", 10)
    .attr("y", 5);
  console.log("qwlp8");

  svg
    .append("line")
    .attr("class", "middle")
    .attr("x1", xScale(50))
    .attr("y1", yScale(0))
    .attr("x2", xScale(50))
    .attr("y2", yScale(100));
  console.log("qwlp9");

  svg
    .append("text")
    .attr("class", "text")
    .text("Figuring things out")
    .attr("x", xScale(25))
    .attr("y", h + 25);
  console.log("qwlp10");

  svg
    .append("text")
    .attr("class", "text")
    .text("Making it happen")
    .attr("x", xScale(75))
    .attr("y", h + 25);

  console.log("qwlp11");
  return node;
};

//const c = init();

class Hill extends React.Component {
  constructor(props) {
    super(props);
    this.state = { d3: "" };
  }

  cb(a) {
    console.log("cb!", a);
  }

  componentDidMount() {
    const data = [
      { color: "orange", desc: "Notification: Hey menu", progress: 10 },
      { color: "red", desc: "Notification: Email", progress: 40 },
      { color: "blue", desc: "Notification: Delivery", progress: 80 }
    ];
    this.setState({ d3: init(data, this.cb) });
  }

  render() {
    return (
      <div>
        <RD3Component data={this.state.d3} />
      </div>
    );
  }
}

export default Hill;
