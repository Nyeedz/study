const express = require('express');
const GenerationEngine = require('./generation/engine.js');
const dragonRouter = require('./api/dragon.js');
const generationRouter = require('./api/generations.js');

const app = express();
const engine = new GenerationEngine();

app.locals.engine = engine;

app.use('/dragon', dragonRouter);
app.use('/generation', generationRouter);

engine.start();

module.exports = app;
