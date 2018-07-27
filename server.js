const express = require("express");
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const actionRoute = require('./data/routes/actionRoute');
const projectRoute = require('./data/routes/projectRoute');


const server = express();
server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use(cors());


server.use('/actions', actionRoute);
server.use('/projects', projectRoute)

server.listen(8000, () => console.log("Yo, Node Express API is running on port 8000"));