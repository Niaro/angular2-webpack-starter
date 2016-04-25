import {Chart} from '../chart/chart.ts';

export class Report {
  title: string;
  description: string;
  unit: string;
  group: number;
  sort: number;
  chart: Chart;
  values: any;
  absolute: number;
  absoluteUnit: string;
}
