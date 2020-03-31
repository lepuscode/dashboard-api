import { RequestHandler } from "express";

import fetch from 'node-fetch';
import cheerio from 'cheerio';

import { WidgetCssType } from '../general/enums/widgets.enum';

import { MOCK } from '../mock/mock';

export const apiGetWidgetInfo: RequestHandler = (req, res, next) => {
  const widgetId: string = req.params.id;
  // get widgetId data from Redis/Mongo
  const widgetData: any[] = MOCK.data.widgets.newsId
  const widgetInfo: any[] = [];

  let promises: Promise<any>[] = [];
  widgetData.forEach((widget) => {
    promises.push(
      fetch(widget.url)
      .then(res => res.text())
    );
  })

  Promise.all(promises)
  .then(result => {
    processResults(result);
    res.json(widgetInfo);
  });

  function processResults(result: any[]): void {
    result.forEach((body, i) => {
      widgetInfo.push(cheerioQuery(body, i));
    });
  }

  function cheerioQuery(body: any, i: number): any {
    const $ = cheerio.load(body);
    let text: string | undefined;
    let url: string | undefined;
    switch (widgetData[i].type) {
      case WidgetCssType.titleSelf:
        text = $(widgetData[i].css).first().attr('title')?.trim();
        url = $(widgetData[i].css).attr("href");
      break;
      case WidgetCssType.firstParent:
        text = $(widgetData[i].css).first().text().trim();
        url = $(widgetData[i].css).parent().attr("href");
      break;
      case WidgetCssType.firstChild:
        text = $(widgetData[i].css).first().text().trim();
        url = $(widgetData[i].css).children().first().attr("href");
      break;
      default:
        text = "";
        url = "";
    }
    if (widgetData[i].preserve) {
      url = `${widgetData[i].url}${url?.slice(widgetData[i].idx)}`;
    }
    return { text, url }
  }
};
