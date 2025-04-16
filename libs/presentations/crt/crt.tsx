import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import styles from './crt.module.scss';
import clsx from 'clsx';

const Crt = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const solutions = useRef(new Set<number>());

  useEffect(() => {
    const moduli = [3, 5, 7];
    const residues = [2, 3, 2];
    const initialTimelineLength = 24;
    const zoomScaleExtent: [number, number] = [0.5, 10];

    const firstSolution = 23;
    const N = moduli.reduce((prod, n) => prod * n, 1);
    if (solutions.current.size === 0) {
      for (let i = 0; i < 100; i++) {
        solutions.current.add(firstSolution + N * i);
      }
    }

    const width = containerRef.current?.offsetWidth || 800;
    const height = 300;
    const margin = { top: 20, right: 10, bottom: 50, left: 10 };

    const svg = d3
      .select(containerRef.current)
      .append('svg')
      .attr('width', width)
      .attr('height', height);

    const xScale = d3
      .scaleLinear()
      .domain([0, initialTimelineLength])
      .range([margin.left, width - margin.right]);

    const yScale = d3
      .scaleBand()
      .domain(moduli.map((_, i) => `${i + 1}`))
      .range([margin.top, height - margin.bottom])
      .padding(0.4);

    const xAxis = d3.axisBottom(xScale);

    const zoom = d3
      .zoom()
      .scaleExtent(zoomScaleExtent)
      .translateExtent([
        [0, 0],
        [(width / 24) * 1000, height],
      ])
      .on('zoom', zoomed);

    svg
      .append('rect')
      .attr('width', width)
      .attr('height', height)
      .style('fill', 'none')
      .style('pointer-events', 'all')
      // @ts-expect-error 🤷
      .call(zoom);

    const chart = svg.append('g');
    const xAxisGroup = chart
      .append('g')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .attr('class', styles['xAxis']);

    function drawTimeline() {
      xAxisGroup.call(xAxis);
      moduli.forEach((mod, index) => {
        const residue = residues[index];
        const yPosition = yScale(`${index + 1}`);

        chart
          .append('line')
          .attr('x1', xScale(0))
          .attr('x2', xScale(initialTimelineLength))
          .attr('y1', yPosition! + yScale.bandwidth() / 2)
          .attr('y2', yPosition! + yScale.bandwidth() / 2)
          .attr('class', styles['tick']);

        for (let t = residue; t <= 1000; t += mod) {
          chart
            .append('circle')
            .attr('cx', xScale(t))
            .attr('cy', yPosition! + yScale.bandwidth() / 2)
            .attr('r', 8)
            .attr('fill', solutions.current.has(t) ? 'orange' : 'red')
            .attr('class', styles['circle'])
            .attr('data-time', t);

          chart
            .append('text')
            .attr('x', xScale(t))
            .attr('y', yPosition! + yScale.bandwidth() / 2 - 15)
            .attr('text-anchor', 'middle')
            .attr('class', clsx(styles['label'], 'label'))
            .attr('data-time', t)
            .text(t);
        }
      });

      const verticalLines = d3.range(0, 1001);
      verticalLines.forEach((x) => {
        chart
          .append('line')
          .attr('x1', xScale(x))
          .attr('y1', margin.top)
          .attr('x2', xScale(x))
          .attr('y2', height - margin.bottom)
          .attr('class', clsx(styles['vLine'], 'vertical-line'))
          .attr('data-time', x);
      });
    }

    function zoomed(event: any) {
      const newXScale = event.transform.rescaleX(xScale);
      xAxis.scale(newXScale);
      xAxisGroup.call(xAxis);

      chart.selectAll('circle').attr('cx', function () {
        return newXScale(+d3.select(this).attr('data-time'));
      });

      chart.selectAll('text.label').attr('x', function () {
        return newXScale(+d3.select(this).attr('data-time'));
      });

      chart
        .selectAll('line.vertical-line')
        .attr('x1', function () {
          return newXScale(+d3.select(this).attr('data-time'));
        })
        .attr('x2', function () {
          return newXScale(+d3.select(this).attr('data-time'));
        });
    }

    drawTimeline();

    return () => {
      d3.select(containerRef.current).selectAll('*').remove();
    };
  }, []);

  return (
    <div
      id="container"
      ref={containerRef}
      className={styles['container']}
    ></div>
  );
};

export default Crt;
