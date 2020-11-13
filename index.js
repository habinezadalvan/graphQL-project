import express  from 'express';

const app = express();
// require('./config/mongodb')();
const router = require('./routes/index');
const socketIo = require('./socket/index');


app.use(express.json());

app.use('/', router);

app.use((req,res) => {
    res.status(404).json({
        status: 404,
        message: 'Page not found'
    });
})

const port = process.env.PORT || 5050;
const server = app.listen(port, () => console.log(`server is running on port: ${port}`));

socketIo(server, global);