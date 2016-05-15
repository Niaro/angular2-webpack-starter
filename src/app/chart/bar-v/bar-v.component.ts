import {Component, Input, ElementRef, ViewEncapsulation} from 'angular2/core';
import {AppState} from '../../app.service';

import {MoneyPipe} from '../../../platform/app-pipes';

import {Chart} from '../chart';

@Component({
    selector: 'bar-v',
    template: '<div [ng2-highcharts]="chartData"></div>',
    styles: [require('./bar-v.less')],
    encapsulation: ViewEncapsulation.None
})

export class BarVComponent {
    @Input('data')
    inputData: Chart;
    chartData: any;

    constructor(public appState: AppState, private _elementRef: ElementRef) { }

    render(newData: Chart) {

        this.chartData = {
            chart: {
                type: 'column',
				 spacingBottom: 60
            },
            title: {
                style: {
                    display: 'none'
                }
            },
            xAxis: {
                type: 'category'
            },
            yAxis: {
                title: {
                    text: newData.report.yAxisTitle
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                series: {
                    borderWidth: 0,
                    dataLabels: {
                        enabled: true,
                        format: yFormatter(newData.report.unit)
                    }
                }
            },
            tooltip: {
				useHTML: true,
                pointFormat: `<b class=text-center style="display: inherit;">${yFormatter(newData.report.unit)}</b>`
            },
            series: [{
                name: 'Population',
                colorByPoint: true,
                data: newData.axisDataes.map((axisData) => {
                    return [axisData.x, parseFloat(axisData.y)];
                })
                // dataLabels: {
                //     enabled: true,
                //     rotation: -90,
                //     color: '#FFFFFF',
                //     align: 'right',
                //     format: '{point.y:.1f}', // one decimal
                //     y: 10, // 10 pixels down from the top
                //     style: {
                //         fontSize: '13px',
                //         fontFamily: 'Verdana, sans-serif'
                //     }
                // }
            }]
        }

        function yFormatter(unit: string) {
            switch (unit) {
                case '%':
                    return '{point.y:.1f}%';
                case '':
                    return '{point.y}';
                default:
                    return '{point.y:,.2f}';
            }
        }
    }


    ngOnChanges() {
        this.render(this.inputData);
    }

    ngOnInit() { }
}
