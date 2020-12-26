const { model } = require("mongoose");

const ctrl = {};
const {Image } = require('../models');
const sidebar = require("../utils/sidebar");
ctrl.index = async (req,res)=>{
    const images = await Image.find().sort({timeStamp: -1});
    console.log("HEEEE");
    console.log(images);
    let viewModel = {imagenes:[]};
    viewModel.imagenes = images;
    viewModel = await sidebar(viewModel);
    res.render('index', {imagenes: viewModel.sidebar.popular, stats: viewModel.sidebar.stats, popular: viewModel.sidebar.popular,
        comments:viewModel.sidebar.comments});
}



module.exports = ctrl;