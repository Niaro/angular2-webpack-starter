export enum ChartType {
  line = <any> 'line',
  circle = <any> 'circle',
  barV = <any> 'bar-v',
  barVLine = <any> 'bar-v-line',
  barH = <any> 'bar-h'
}

export enum ChartTime {
  year = <any> 'year',
  quarter = <any> 'quarter',
  month = <any> 'month'
}

export class AxisData {
  x: any;
  y: any;
}

export class Chart {
  unit: string;
  axisDataes: AxisData[];
}
