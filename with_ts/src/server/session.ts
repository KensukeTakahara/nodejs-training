import Express from "express";
import session from "express-session";
import { createClient as createRedisClient } from "redis";
import connectRedis from "connect-redis";
import { REDIS_HOST, REDIS_PORT } from "../constants";

export default (app: Express.Application) => {
  const RedisStore = connectRedis(session);
  const redisClient = createRedisClient();
  const option = {
    store: new RedisStore({
      client: redisClient,
      host: REDIS_HOST,
      port: REDIS_PORT
    }),
    secret: "keyboard cat",
    resave: false
  };
  app.use(session(option));
};
