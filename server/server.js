import express from 'express';
import path from 'path';
import cors from 'cors';
import { socketIo } from './sockeIo';


const app = express();

app.use(express.static(path.join(__dirname, '../public')));

app.use(cors());

const port = process.env.PORT || 3000;

const server = app.listen(port, () => console.log(`server is running on port ${port}`));

socketIo(server);