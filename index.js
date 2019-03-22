// play this: https://www.youtube.com/watch?v=d-diB65scQU

// code away!
const express = require('express');

const port = 4000;
const server = express();

server.use(express.json());

server.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
