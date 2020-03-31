import { Router } from "express";

import { widgetRouter } from "./widgets/apiWidgets";

import swaggerUi from 'swagger-ui-express';
import { swaggerDoc } from './swagger.json';
 
export const routerV1 = Router();


routerV1.get("/", (req, res) => {
  res.send("dashboard-api");
});

routerV1.use('/widgets', widgetRouter);

routerV1.use('/api-docs', swaggerUi.serve);
routerV1.get('/api-docs', swaggerUi.setup(swaggerDoc));
