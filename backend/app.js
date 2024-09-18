const express =require('express');
const { createServer } = require('http');
const { Server } =require('socket.io');
const { scopePerRequest } = require('awilix-express');
const app = express();
const server = createServer(app);
const io = new Server(server);

const apiRoutes = require('./routes/app_route.js');
const container = require('./config/dependencie_injection');
const appConfig = require('./config/app_config');
const { connectDB } = require('./config/db');
const { errorMiddleware } = require('./middlewares/error_middleware.js');

app.use(express.json());
app.use(scopePerRequest(container));
app.use(apiRoutes);
app.use(errorMiddleware)

io.on('connection', (socket) => {
  console.log('a user connected');
});

connectDB();

server.listen(appConfig.port, () => {
  console.log(`server running at http://localhost:${appConfig.port}`);
});

module.exports= app;