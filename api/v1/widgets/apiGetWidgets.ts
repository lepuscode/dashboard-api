import { RequestHandler } from "express";

import { mockWidgets } from '../mock/mock';

export  const apiGetWidgets: RequestHandler = (req, res, next) => {
  res.json(mockWidgets);
};
