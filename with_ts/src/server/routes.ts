import Express from "express";
import createError from "http-errors";
import { Health } from "../types/api";
import { send } from "q";

export default (app: Express.Application) => {
  app.use((req, res, next) => {
    if (req.session !== undefined) {
      if (req.session.count === undefined || req.session.count === null) {
        req.session.count = 0;
      }
    }
    next();
  });
  app.get("/", (req, res, next) => {
    if (req.session) {
      const data = { count: req.session.count };
      res.render("index.ejs", data);
      return;
    }
    next(createError(401));
  });
  app.get("/ping", (req, res, next) => {
    if (req.session !== undefined && req.session.count !== undefined) {
      req.session.count++;
      const data: Health = { message: "pong", count: req.session.count };
      res.send(data);
      return;
    }
    next(createError(401));
  });
};
