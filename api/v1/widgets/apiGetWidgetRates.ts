import { RequestHandler } from "express";

import fetch from "node-fetch";
import big from "big.js";

import { WidgetRatesInfoModel, RatesModel, RateModel } from "../general/models/widgets.model";

import { mockWidgetRatesInfo } from '../mock/mock';

export const apiGetWidgetRates: RequestHandler = (req, res, next) => {
  console.log(req.query.base);
  console.log(req.query.base.split(","));

  if (!req.query.base || !req.query.primary) {
    res.status(400).send();
  }
  const base = req.query.base;
  const primary: string[] = req.query.primary.split(",");

  const widgetInfo: WidgetRatesInfoModel = mockWidgetRatesInfo; // get info from Redis/Mongo

  fetch(`${widgetInfo.apiUrl}?base=${base}`)
  .then(latestRes => latestRes.json())
  .then(latest => {
    const rates: RatesModel = processLatest(latest);
    res.json(rates);
  });

  function processLatest(latest: any): RatesModel {
    const calcRates: RatesModel = { base, date: latest.date, primary: [], secondary: [] };
    const latestRates = Object.entries<any>(latest.rates);
    latestRates.forEach(([fiat, rate]) => {
      if (fiat === base) {
        return;
      }
      if (primary.includes(fiat)) {
        fiat === primary[0] ? calcRates.primary.unshift(processRate(fiat, rate)) : calcRates.primary.push(processRate(fiat, rate));
      } else {
        calcRates.secondary.push(processRate(fiat, rate));
      }
    });
    calcRates.secondary.sort(compare);
    return calcRates;
  }

  function processRate(fiat: string, rate: number): RateModel {
    const fiatRate: RateModel = {
      fiat,
      rate: parseFloat(big(1).div(rate).toFixed(4))
    };
    return fiatRate;
  }

  function compare(a: RateModel, b: RateModel) {
    const fiatA = a.fiat;
    const fiatB = b.fiat;
    let comparison = 0;
    if (fiatA > fiatB) {
      comparison = 1;
    } else if (fiatA < fiatB) {
      comparison = -1;
    }
    return comparison;
  }
};