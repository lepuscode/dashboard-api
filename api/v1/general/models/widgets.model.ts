export interface WidgetModel {
  id: string;
  title: string;
}

export interface LinkModel {
  label: string;
  url: string;
}

export interface RatesModel {
  base: string;
  date: string;
  primary: RateModel[];
  secondary: RateModel[];
}

export interface RateModel {
  fiat: string;
  rate: number;
}

export interface WidgetNewsInfoModel {
  info: CheerioQueryModel[];
}

export interface WidgetRatesInfoModel {
  apiUrl: string;
}

export interface CheerioQueryModel {
  id: string;
  url: string;
  css: string;
  type: number;
  preserve: boolean;
  idx?: number;
}
