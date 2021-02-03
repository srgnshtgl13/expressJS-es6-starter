import express from "express";
import http from "http";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
// utils
import { normalizePort, onError, onListening } from "./utils/httpServer";
// routes
import indexRouter from "./routes/index";
import usersRouter from "./routes/users";

const app = express();

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

const server = http.createServer(app);

server.listen(port);
server.on("error", onError);
server.on("listening", () => onListening(port));

export default app;
