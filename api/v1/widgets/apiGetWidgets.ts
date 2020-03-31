import { RequestHandler } from "express";

import { MOCK } from '../mock/mock';

export  const apiGetWidget: RequestHandler = (req, res, next) => {
  res.json(MOCK.data.widgets.newsId);
};
