
import express from 'express';
import { createServer } from 'node:http';
import cors from 'cors';
import { Server } from 'socket.io';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000"
  }
});

const PORT = process.env.PORT || 4000;
app.use(cors());

app.get('/api', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
  console.log(`${socket.id} user just connected!`);
    socket.on('disconnect', () => {
      console.log(`${socket.id} has disconnected`);
    });
});

server.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});