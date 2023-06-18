import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

interface Expense {
  category: string;
  amount: number;
  date: string;
}

interface CurrentMonthExpensesProps {
  expenses: Expense[];
}

const CurrentMonthExpenses: React.FC<CurrentMonthExpensesProps> = ({
  expenses,
}) => {
  const chartRef = useRef<SVGSVGElement>(null);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [expenseData, setData] = useState<Expense[]>([
    { category: 'Entertainment', amount: 80, date: '2023.06.1' },
    { category: 'Food', amount: 29, date: '2023.06.2' },
    { category: 'Food', amount: 244, date: '2023.06.3' },
    { category: 'Food', amount: 58, date: '2023.06.4' },
    { category: 'Food', amount: 76, date: '2023.06.5' },
    { category: 'Food', amount: 349, date: '2023.06.6' },
    { category: 'Food', amount: 87, date: '2023.06.7' },
    { category: 'Food', amount: 95, date: '2022.06.8' },
    { category: 'Food', amount: 35, date: '2022.06.9' },
    { category: 'Food', amount: 135, date: '2021.06.10' },
  ]);

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    drawChart();
    return () => {
      // Remove the chart here
      svg.selectAll('*').remove();
    };
  }, [expenseData, currentYear]);

  const drawChart = () => {
    const svg = d3
      .select(chartRef.current!)
      .attr('width', 600)
      .attr('height', 400);

    // Const variables for margins, width and height
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };
    const width = +svg.attr('width')! - margin.left - margin.right;
    const height = +svg.attr('height')! - margin.top - margin.bottom;

    // Groups whole svg and gives it margin left/top
    const group = svg
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const monthlyExpenses = d3.rollup(
      expenseData,
      (v) =>
        d3.sum(v, (d: Expense) => {
          const date = new Date(d.date);
          if (date.getFullYear() === currentYear) {
            return d.amount;
          } else {
            return 0;
          }
        }),
      (d: Expense) => d3.timeFormat('%d')(new Date(d.date))
    );

    const data = Array.from(monthlyExpenses, ([month, expense]) => ({
      month,
      expense,
    }));

    const filteredData = data.filter((d) => d.expense > 0);

    const x = d3
      .scaleBand()
      .rangeRound([0, width])
      .padding(0.1)
      .domain(filteredData.map((d) => d.month));

    const y = d3
      .scaleLinear()
      .rangeRound([height, 0])
      .domain([0, d3.max(filteredData, (d) => d.expense)!]);

    // Define a color scale for the bars
    const colorScale = d3.scaleOrdinal(d3.schemeTableau10);
    group
      .selectAll('.bar')
      .data(filteredData)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => x(d.month)!)
      .attr('y', (d) => y(d.expense)!)
      .attr('width', x.bandwidth())
      .attr('height', (d) => height - y(d.expense)!)
      .style('fill', (d) => colorScale(d.month));
    //X axis
    group
      .append('g')
      .attr('class', 'axis')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x));

    //Y axis
    group.append('g').attr('class', 'axis').call(d3.axisLeft(y).ticks(5));

    svg
      .append('text')
      .attr('x', width / 2)
      .attr('y', margin.top)
      .attr('text-anchor', 'middle')
      .attr('fill', 'rgb(203 213 225)')
      .text(
        'Expenses ' +
          new Date().toLocaleString('default', {
            month: 'long',
          })
      );
  };

  return (
    <div>
      <svg ref={chartRef} />
      <div className='flex flex-row'>
        {/* <button
          className='bg-red-500 px-4 py-2 hover:bg-red-400'
          onClick={() => {
            for (let i = 0; i < 200; i++) {
              const start = new Date(2021, 0, 1); // January 1, 2021
              const end = new Date(2023, 11, 31); // December 31, 2023
              const randomTimestamp =
                start.getTime() +
                Math.random() * (end.getTime() - start.getTime());
              const randomDate = new Date(randomTimestamp);
              const pr = Math.floor(Math.random() * (6000 - 100 + 1)) + 100;

              setData([
                ...expenseData,
                {
                  category: 'Food',
                  amount: pr,
                  date: randomDate.toDateString(),
                },
              ]);
            }
          }}
        >
          Button
        </button> */}
        <div className='flex items-center ml-8'>
          {/* <button
            className='p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none'
            onClick={() => {
              setCurrentYear(currentYear - 1);
            }}
          >
            &lt;
          </button>
          <span className='mx-4 text-xl'>{currentYear}</span>
          <button
            className='p-2 rounded-full bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none'
            onClick={() => {
              setCurrentYear(currentYear + 1);
            }}
          >
            &gt;
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default CurrentMonthExpenses;
