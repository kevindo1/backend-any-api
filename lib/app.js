const express = require('express');
const req = require('express/lib/request');
const res = require('express/lib/response');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/api/v1/aot', require('./controllers/aot'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
