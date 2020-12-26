const express = require('express');

const config = require('./server/config')

//database
const database = require('./database')

//configura expresscl
const app = config(express());

//servidor
app.listen(app.get('port'),() =>{
    console.log('Servidor en el puerto', app.get('port'));
});