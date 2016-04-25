export class Indicator {
  title: string;
  description: string;
  unit: string;
  value: any;
}

export class MainIndicator {
  title: string;
  indicators: Indicator[];
}
