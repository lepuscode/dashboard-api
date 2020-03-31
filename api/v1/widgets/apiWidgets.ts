import { Router } from "express";

import { apiGetWidget } from "./apiGetWidgets";
import { apiGetWidgetInfo } from "./apiGetWidgetInfo";

export const widgetRouter = Router();

widgetRouter.route("/")
  .get(apiGetWidget);

widgetRouter.route("/:id")
  .get(apiGetWidgetInfo);
