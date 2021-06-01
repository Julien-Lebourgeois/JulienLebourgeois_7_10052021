/* :::::::::::::: Imports :::::::::::::: */
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const app = express();


/* :::::::::::::: Routes imports :::::::::::::: */
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message');
const commentRoutes = require('./routes/comment');


/* :::::::::::::: Adding some more securities :::::::::::::: */
app.use(helmet());


/* :::::::::::::: Manage requests through this URL :::::::::::::: */
app.use(cors({origin: 'http://localhost:8080'}));


/* :::::::::::::: Header to enter to the API and manage requests GET, POST etc... :::::::::::::: */
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Header', 'Origin, X-Request-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});


/* :::::::::::::: Translation between JS format and JSON format :::::::::::::: */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


/* :::::::::::::: Multer pictures manager :::::::::::::: */
app.use('/images', express.static(path.join(__dirname, 'images')));


/* :::::::::::::: Routes :::::::::::::: */
app.use('/api/user', userRoutes);
app.use('/api/message', messageRoutes);
app.use('/api/message', commentRoutes);

module.exports = app;