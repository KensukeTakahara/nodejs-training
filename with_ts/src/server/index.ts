import Express from "express";
import cors from "cors";

import config from "./config";
import session from "./session";
import webpack from "./webpack";
import routes from "./routes";
import error from "./error";
import listen from "./listen";

// import { Health } from "../types/api";

const app = Express();
app.use(cors());

config(app);
session(app);
webpack(app);
routes(app);
error(app);
listen(app);
