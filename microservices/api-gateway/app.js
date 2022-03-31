require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const httpProxy = require('express-http-proxy')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

const documentServiceProxy = httpProxy(process.env.DOCUMENT_SVC);
const registrationServiceProxy = httpProxy(process.env.REGISTRATION_SVC);

// Authentication
app.use((req, res, next) => {
    // TODO: my authentication logic
    next()
})

// Proxy request
app.get('/doc/*', (req, res, next) => {
    documentServiceProxy(req, res, next);
})
app.get('/user/*', (req, res, next) => {
    registrationServiceProxy(req, res, next);
})

module.exports = app;