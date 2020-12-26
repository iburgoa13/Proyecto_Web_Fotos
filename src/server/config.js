//configuración express
const path = require('path');
const exphbs = require('express-handlebars');
const hbs = require('handlebars');
const logger = require('morgan');
const multer = require('multer');
const express = require('express');
const routes = require('../routes/index');
const errorHandler = require('errorhandler');
module.exports = app =>{
    //settings
    app.set('port',3001);
    app.set('views',path.join(__dirname,'../views'));
    app.engine('.hbs', exphbs({
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'),'partials'),
        layoutsDir: path.join(app.get('views'),'layouts'),
        extname: '.hbs',
        helpers: require('./helpers')
    }));

    app.set('view engine','.hbs');

    //middlewares
    app.use(logger('dev'));
    app.use(multer({
        dest: path.join(__dirname, '../public/upload/temp')
    }).single('image'));

    app.use(express.urlencoded({extended:false}));
    app.use(express.json());

    //routes
    routes(app);

    //statics
    app.use('/public',express.static(path.join(__dirname,'../public')));

    //errorhandler
    if('development' === app.get('env')){
        app.use(errorHandler);
    }

    return app;
}