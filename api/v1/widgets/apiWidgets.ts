import { Router } from "express";

import { apiGetWidgets } from "./apiGetWidgets";
import { apiGetWidgetNews } from "./apiGetWidgetNewsInfo";

export const widgetRouter = Router();

widgetRouter.route("/").get(apiGetWidgets);
widgetRouter.route("/news").get(apiGetWidgetNews);
