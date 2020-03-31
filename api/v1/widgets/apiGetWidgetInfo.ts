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
  .then(result => processResults(result));

  function processResults(result: any[]): void {
    result.forEach((body, i) => {
      const $ = cheerio.load(body);
      let text: string | undefined;
      let url: string | undefined;
      if (widgetData[i].type === WidgetCssType.titleSelf) {
        text = $(widgetData[i].css).first().attr('title')?.trim();
        url = $(widgetData[i].css).attr("href");
      } else if (widgetData[i].type === WidgetCssType.firstParent) {
        text = $(widgetData[i].css).first().text().trim();
        url = $(widgetData[i].css).parent().attr("href");
      } else {
        text = "";
        url = "";
      }
      widgetInfo.push({
        text,
        url
      });
    });
    res.json(widgetInfo);
  }
};
