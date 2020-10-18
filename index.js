const express = require('express');
const app = express();
require('./config/mongodb')();
const router = require('./routes/index');
const socketIo = require('./socket/index');


app.use(express.json());

app.use('/', router);

const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`server is running on port: ${port}`));

socketIo(server, global);