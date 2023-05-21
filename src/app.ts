import express from "express";
import { router } from "./router";
import { errorHandler } from "./middleware/error";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use("/api", router);

app.use(errorHandler);

export { app };
