export type ChartType =
    "line"
    | "circle"
    | "bar-v"
    | "bar-v line"
    | "bar-h";

export class AxisData {
  x: any;
  y: any;
}

export class Chart {
    unit: string;
    axisDataes: AxisData[];
}
