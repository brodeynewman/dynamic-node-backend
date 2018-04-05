import io from 'socket.io';
import helmet from 'helmet';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import initiateEvents from './sockets';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/passport', () => {
  console.log('mongoose is connected');
});

dotenv.config();

const port = process.env.PORT;
const app = express();

app.use(helmet());

const server = app.listen(port, () => {
  console.log('Server is listening on port', port);
});

const socketServer = io(server);

socketServer.on('connection', (client) => {
  initiateEvents(client);
});