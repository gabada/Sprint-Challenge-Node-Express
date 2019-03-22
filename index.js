// play this: https://www.youtube.com/watch?v=d-diB65scQU

// code away!
const express = require('express');
const cors = require('cors');

const projectRoutes = require('./projects/projectRoutes.js');
const actionRoutes = require('./actions/actionRoutes.js');

const port = 4000;
const server = express();

server.use(express.json());
server.use(cors());
server.use('/api/projects', projectRoutes);
server.use('/api/actions', actionRoutes);

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
