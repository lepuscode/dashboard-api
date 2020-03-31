import { Router } from "express";

import { widgetRouter } from "./widgets/apiWidgets";

export const routerV1 = Router();

routerV1.get("/", (req, res) => {
  res.send("dashboard-api");
});

routerV1.use('/widgets', widgetRouter);
