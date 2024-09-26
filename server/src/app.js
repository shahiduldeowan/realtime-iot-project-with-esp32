import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import { createServer } from 'http';
import { Server as socketIO } from 'socket.io';
import { initializeSocket } from './socket/index.js';

const app = express();
const server = createServer(app);
const io = new socketIO(server, {
  cors: {
    origin: "*",
  }
});

app.set("io", io);

app.use(cors({
  origin: "*",
}));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(express.json(express.json({ limit: "16kb" })));

import healthRouter from "./routes/healthRoutes.js";
import imageRouter from "./routes/imageRoutes.js";

app.use("/", imageRouter);
app.use("/server", healthRouter)

initializeSocket(io);

export { server };

