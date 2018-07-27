const express = require("express");
const helmet = require('helmet');
const morgan = require('morgan');


const server = express();
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));

server.get("/", (req, res) => {
    res.send("Hello World");
  });


server.listen(8000, () => console.log("Yo, Node Express API is running on port 8000"));