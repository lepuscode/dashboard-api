import { RequestHandler } from "express";

import fetch from 'node-fetch';
import big from 'big.js';

import { mockWidgetNewsInfo } from '../mock/mock';
import { RatesModel, RateModel } from "../general/models/widgets.model";

export const apiGetWidgetRates: RequestHandler = (req, res, next) => {
  const resObj: RatesModel = { rates: [], date: "" };

  const apiUrl = "https://api.exchangeratesapi.io/latest";

  fetch(apiUrl)
  .then(res => res.json())
  .then(json => {
    processResponse(json);
    res.json(resObj);
  });

  function processResponse(json: any): void {
    resObj.date = json.date;
    const EuroRates = Object.entries<number>(json.rates);
    const eurBrlExchange = big(1).div(json.rates.BRL).toString();
    EuroRates.forEach(([key, value]) => {
      let eurToBrl = parseFloat(big(1).div(big(value).times(eurBrlExchange)).toFixed(4));
      if (key === "BRL") {
        key = "EUR";
        eurToBrl = value
      }
      const rate: RateModel = {
        fiat: key,
        brl: eurToBrl
      };
      resObj.rates.push(rate);
    });
  }
};