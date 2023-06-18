import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import Legend from './Legend';

interface PieChartData {
  category: string;
  amount: number;
  date: string;
}

interface Props {
  data: PieChartData[];
}

const PieChart: React.FC<Props> = ({ data }) => {
  const chartRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (chartRef.current) {
      const width = chartRef.current.clientWidth;
      const height = chartRef.current.clientHeight;
      const radius = Math.min(width, height) / 2;

      const svg = d3
        .select(chartRef.current)
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`);

      const colorScale = d3.scaleOrdinal(d3.schemeTableau10);

      const pie = d3.pie<PieChartData>().value((d) => d.amount);

      const arc = d3
        .arc<d3.PieArcDatum<PieChartData>>()
        .innerRadius(0)
        .outerRadius(radius);

      const arcs = svg
        .selectAll('arc')
        .data(pie(data))
        .enter()
        .append('g')
        .attr('class', 'arc');

      arcs
        .append('path')
        .attr('d', arc)
        .attr('fill', (d) => colorScale(d.data.category));

      arcs
        .append('text')
        .attr('transform', (d) => `translate(${arc.centroid(d)})`)
        .attr('text-anchor', 'middle')
        .attr('class', 'text-sm')
        .attr('fill', 'rgb(241 245 249)')
        .text(
          (d) =>
            `${(((d.endAngle - d.startAngle) / (2 * Math.PI)) * 100).toFixed(
              2
            )}%`
        );
    }
  }, [data]);

  return (
    <div className='flex flex-row mt-4 ml-4'>
      <svg ref={chartRef} width={350} height={350}></svg>
      <Legend></Legend>
    </div>
  );
};

export default PieChart;
