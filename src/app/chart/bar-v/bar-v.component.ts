import {Component, Input, ElementRef} from 'angular2/core';
import {AppState} from '../../app.service';

import {MoneyPipe} from '../../../platform/app-pipes';

import {Chart} from '../chart';

@Component({
  selector: 'bar-v',
  template: '',
  styles: [require('./bar-v.less')]
})

export class BarVComponent {
  @Input()
  data: Chart;
  svg: any;
  detailBox: any;

  private options: any = {
    margin: { top: 20, right: 0, bottom: 20, left: 50 },

    get height() {
      return 250 - this.margin.top - this.margin.bottom;
    },

    get width() {
      return 400 - this.margin.left - this.margin.right;
    },
  };

  constructor(public appState: AppState, private _elementRef: ElementRef) {
    let barHost: any = _elementRef.nativeElement;
    let opts = this.options;
    this.svg = d3.select(barHost)
      .append('svg')
      .attr('width', opts.width + opts.margin.left + opts.margin.right)
      .attr('height', opts.height + opts.margin.top + opts.margin.bottom)
      .append('g')
      .attr('opacity', 0)
      .attr('transform', `translate(${opts.margin.left}, ${opts.margin.top})`);
  }

  render(chartData: Chart) {
    if (!chartData) return;
    let opts = this.options;
    let yAxisLabel = chartData.unit;

    let yDataFormat: any = new MoneyPipe().transform;
    if (chartData.unit === '%') {
      yDataFormat = d3.format('.0%');
      yAxisLabel = '';
    }

    let x = d3.scale.ordinal()
      .rangeRoundBands([0, opts.width], 0.1);

    let y = d3.scale.linear()
      .range([opts.height, 0]);

    let xAxis = d3.svg.axis()
      .scale(x)
      .orient('bottom');

    let yAxis = d3.svg.axis()
      .scale(y)
      .orient('left')
      .tickFormat(yDataFormat);

    let valueData = _.map(chartData.axisDataes, function(d) {
      return {
        x_axis: d.x,
        y_axis: chartData.unit === '%' ? d.y / 100 : d.y
      };
    });

    x.domain(valueData.map(d => d.x_axis));
    y.domain([0, d3.max(valueData, d => d.y_axis)]);

    let svg = this.svg;
    svg
      .transition()
      .attr('opacity', 0)
      .each('end', function() {
      svg.selectAll('.bar, g, .bar-detail').remove();

      let detailBox = svg.append('svg:text')
        .attr('dy', '-10px')
        .attr('class', 'bar-detail')
        .attr('text-anchor', 'right');

      svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', `translate(0, ${opts.height})`)
        .call(xAxis);

      svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        .append('text')
        .attr('y', 2)
        .attr('dx', '-8')
        .style('text-anchor', 'end')
        .text(yAxisLabel);

      svg.selectAll('.bar')
        .data(valueData)
        .enter().append('rect')
        .attr('class', 'bar')
        .attr('x', d => x(d.x_axis))
        .attr('width', x.rangeBand())
        .attr('y', d => y(d.y_axis))
        .attr('height', d => opts.height - y(d.y_axis))
        .on('mouseover', function(d, i, j) {

        var $bar = d3.select(this);
        let barNode: any = $bar.node();

        detailBox
          .text(yDataFormat(d.y_axis))
          .attr('x', (x.range()[i] + barNode.getBBox().width / 2) - detailBox.node().getBBox().width / 2)
          .attr('y', y(d.y_axis))
          .style('opacity', 1);

        $bar
          .style('opacity', 0.7);
      })
        .on('mouseout', function() {
        svg.select('.bar-detail')
          .style('opacity', 0);

        d3.select(this)
          .style('opacity', 1.0);
      });

      svg.transition().attr('opacity', 1);
    });
  }

  ngOnChanges() {
    this.render(this.data);
  }

  ngOnInit() { }
}
