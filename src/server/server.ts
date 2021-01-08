import { setupRouter } from './router';
import { SERVER_PORT } from '../config/constants';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { configDatabase } from './database';

// Configure the application server
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(morgan('combined'));

// Configure the router
setupRouter(app);

// Connect to the database
configDatabase();

// Start the app
app.listen(SERVER_PORT, () => {
  console.log('Server up');
});
