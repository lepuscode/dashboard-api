import { Router } from "express";

export const routerV1 = Router();

routerV1.get("/", (req, res) => {
  res.send("dashboard-api");
});
