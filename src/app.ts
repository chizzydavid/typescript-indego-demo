import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import { errorHandler, notFoundHandler } from './middlewares/error'
import bodyParser from 'body-parser';
import routes from './routes/index'


const app = express()

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/api/v1', routes)

app.use(notFoundHandler)
app.use(errorHandler)

export default app;

