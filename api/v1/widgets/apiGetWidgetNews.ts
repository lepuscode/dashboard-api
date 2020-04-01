import { RequestHandler } from "express";

import fetch from 'node-fetch';
import cheerio from 'cheerio';

import { WidgetCssType } from '../general/enums/widgets.enum';

import { mockWidgetNewsInfo } from '../mock/mock';
import { WidgetNewsInfoModel, WidgetNewsDataModel, LinkModel } from "../general/models/widgets.model";

export const apiGetWidgetNews: RequestHandler = (req, res, next) => {
  let fetchPromises: Promise<any>[] = [];
  const resObj: WidgetNewsDataModel = { data: [] };
  const widgetInfo: WidgetNewsInfoModel = mockWidgetNewsInfo; // get widgetId info from Redis/Mongo

  widgetInfo.info.forEach((widget) => {
    fetchPromises.push(
      fetch(widget.url)
      .then(res => res.text())
    );
  });

  Promise.all(fetchPromises)
  .then(result => {
    processResults(result);
    res.json(resObj);
  });

  function processResults(result: any[]): void {
    result.forEach((body, i) => {
      resObj.data.push(cheerioQuery(body, i));
    });
  }

  function cheerioQuery(body: any, i: number): LinkModel {
    const $ = cheerio.load(body);
    let label: string | undefined;
    let url: string | undefined;
    switch (widgetInfo.info[i].type) {
      case WidgetCssType.titleSelf:
        label = $(widgetInfo.info[i].css).first().attr('title')?.trim();
        url = $(widgetInfo.info[i].css).attr("href");
      break;
      case WidgetCssType.firstParent:
        label = $(widgetInfo.info[i].css).first().text().trim();
        url = $(widgetInfo.info[i].css).parent().attr("href");
      break;
      case WidgetCssType.firstChild:
        label = $(widgetInfo.info[i].css).first().text().trim();
        url = $(widgetInfo.info[i].css).children().first().attr("href");
      break;
      default:
        label = "";
        url = "";
    }
    if (label == undefined || url == undefined) {
      url = "";
      label = "";
    } else if (widgetInfo.info[i].preserve) {
      url = `${widgetInfo.info[i].url}${url?.slice(widgetInfo.info[i].idx)}`;
    }
    return { label, url }
  }
};
