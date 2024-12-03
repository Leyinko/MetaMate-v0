import express from 'express';
import ViteExpress from 'vite-express';

import dotenv from 'dotenv';
import cors from 'cors';

import { excludeRoutes } from './utils/routes-excluder.js';
import { APIRouteNotFound } from './middlewares/route-not-found.js';

// MetaMatev0
import mateRouter from './api/router/scrap.routes.js';
import './mate/communication.js';
// MetaMatev0

dotenv.config();

const PORT = process.env.PORT || 3000;
const DEPLOYMENT = process.env.VITE_API_URL;

// App Config
const app = express();
app.use(express.json()), app.use(cors());

// Routes
const routes = ['/ask-mate'];

// Routers
app.use('/api/ask-mate', mateRouter);

// Routes Error Controller
app.use('/api', excludeRoutes(APIRouteNotFound, routes));

// General Error Handler
app.use((err, req, res, next) => {
  return res.status(err.message || 500).json(err.message || 'Unexpected Error');
});

ViteExpress.listen(app, PORT, () => console.log(`MetaMate v0 ➡ ${DEPLOYMENT}`));
