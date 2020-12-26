const mongoose = require('mongoose');
//accedo solo al parametro database
const { database } = require('./keys');

mongoose.connect(database.URI, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
    .then(db => console.log("CONECTADO"))
    .catch(err => console.log(err));