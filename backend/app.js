import express from 'express';
import { createServer } from 'node:http';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server);

import appConfig from './src/config/app_config';

io.on('connection', (socket) => {
  console.log('a user connected');
});

server.listen(appConfig.port, () => {
  console.log(`server running at http://localhost:${appConfig.port}`);
});