import { Router } from "express";

import { urlEncodedParser } from "../general/middleware/bodyParser";

import { apiGetWidgets } from "./apiGetWidgets";
import { apiGetWidgetNews } from "./apiGetWidgetNews";
import { apiGetWidgetRates } from "./apiGetWidgetRates";

export const widgetRouter = Router();

widgetRouter.route("/").get(apiGetWidgets);
widgetRouter.route("/news").get(apiGetWidgetNews);
widgetRouter.route("/rates").get(urlEncodedParser, apiGetWidgetRates);
