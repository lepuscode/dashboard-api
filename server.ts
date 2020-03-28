import express from "express";

import { routerV1 } from "./api/v1/routerV1";

const app = express();
app.disable("x-powered-by");

app.use("/api/v1", routerV1);

app.listen(8091, () => console.log(`dashboard-api listening on http://localhost:8091`));
