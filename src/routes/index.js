const express = require('express');
const router = express.Router();
const home = require('../controllers/home');
const image = require('../controllers/image');
module.exports = app =>{
    router.get('/', home.index);
    router.get('/images/:images_id', image.index);
    router.post('/images', image.create);
    router.post('/images/:images_id/like', image.like);
    router.post('/images/:images_id/comment',image.comments);
    router.delete('/images/:images_id',image.delete);
    app.use(router);
}