import { RequestHandler } from "express";

import fetch from 'node-fetch';
import cheerio from 'cheerio';

import { WidgetCssType } from '../general/enums/widgets.enum';
import { WidgetNewsInfoModel, CheerioQueryModel, LinkModel } from "../general/models/widgets.model";

import { mockWidgetNewsInfo } from '../mock/mock';

export const apiGetWidgetNews: RequestHandler = (req, res, next) => {

  const fetchPromises: Promise<any>[] = [];

  const widgetInfo: WidgetNewsInfoModel = mockWidgetNewsInfo; // get info from Redis/Mongo

  widgetInfo.info.forEach((widget) => {
    fetchPromises.push(
      fetch(widget.url)
      .then(response => response.text())
    );
  });

  Promise.all(fetchPromises)
  .then(result => {
    const news = processResults(result);
    res.json(news);
  });

  function processResults(result: any[]): LinkModel[] {
    const links: LinkModel[] = [];
    result.forEach((body, i) => {
      links.push(processBody(body, widgetInfo.info[i]));
    });
    return links;
  }

  function processBody(body: any, info: CheerioQueryModel): LinkModel {
    const $ = cheerio.load(body);
    let label: string | undefined;
    let url: string | undefined;
    switch (info.type) {
      case WidgetCssType.titleSelf:
        label = $(info.css).first().attr('title')?.trim();
        url = $(info.css).attr("href");
      break;
      case WidgetCssType.firstParent:
        label = $(info.css).first().text().trim();
        url = $(info.css).parent().attr("href");
      break;
      case WidgetCssType.firstChild:
        label = $(info.css).first().text().trim();
        url = $(info.css).children().first().attr("href");
      break;
      default:
        label = "";
        url = "";
    }
    if (label == undefined || url == undefined) {
      url = "";
      label = "";
    } else if (info.preserve) {
      url = `${info.url}${url?.slice(info.idx)}`;
    }
    return { label, url }
  }
};
