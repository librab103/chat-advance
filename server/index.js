
import express from 'express';
import { createServer } from 'node:http';
import cors from 'cors';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 4000;
const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});


app.use(cors());

/* listens for new client connections to the server */
io.on('connection', (socket) => { // on() method listens for events. 'connection' is the event name that indicates a new client has connected.
  console.log(`${socket.id} has connected`);

/* Step 3. socket.on listens for a 'packet' with the event name of 'send_message' and re-emits a new 'packet' with the event name of 'recieve_message' with the same message */
  socket.on('send_message', (msg) => {
    io.emit('receive_message', msg)
  })

  socket.on('disconnect', () => {
        console.log(`${socket.id} has disconnected`);
    });
});


server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});