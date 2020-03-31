export interface WidgetModel {
  id: string;
  title: string;
}

export interface WidgetNewsInfoModel {
  info: CheerioQueryModel[];
}

export interface WidgetNewsDataModel {
  data: LinkModel[];
}

export interface CheerioQueryModel {
  id: string;
  url: string;
  css: string;
  type: number;
  preserve: boolean;
  idx?: number;
}

export interface LinkModel {
  label: string;
  url: string;
}
