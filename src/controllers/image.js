const ctrl = {};
const path = require("path");
const { randomNumber } = require('../utils/libs');
const fs = require("fs-extra");
const { Image , Comment} = require("../models");
const { request } = require("http");
const md5 = require("md5");
const { runInNewContext } = require("vm");
const sidebar = require("../utils/sidebar");
ctrl.index = async(req,res) =>{
    let viewModel = {imagen:{}, comments:{}};
    const imagen = await Image.findOne({fileName: {$regex: req.params.images_id}});
    const image = await Image.findOne({fileName: {$regex: req.params.images_id}}).lean();
    if(imagen){
        console.log(image.visitas);
        image.visitas = image.visitas+1;
        imagen.visitas = imagen.visitas+1;
        await imagen.save();
        viewModel.imagen = image;
        const comments = await Comment.find({image_id: image._id}).lean();
        viewModel.comments = comments;
        viewModel = await sidebar(viewModel);
        res.render('image',{imagen: image, comments: comments, stats: viewModel.sidebar.stats, popular: viewModel.sidebar.popular,
            comments:viewModel.sidebar.comments});
        }
    else{
        res.redirect('/');
    }
    
    
};
ctrl.create =  (req,res) =>{

    const saveImage = async() =>{
        const imageUrl = randomNumber();
        const images = await Image.find({fileName: imageUrl});
        if(images.length > 0){
            saveImage();
        }
        else{
            console.log(imageUrl);
            const ext = path.extname(req.file.originalname).toLowerCase();
            const dir_origin = req.file.path;
            const destino = path.resolve(`src/public/upload/${imageUrl}${ext}`)
            if(ext === ".png" || ext === ".jpg" || ext ===".jepg" || ext === ".gif"){
                await fs.rename(dir_origin,destino);
                const  Img = new Image({
                   title: req.body.title,
                   description: req.body.descripcion,
                   fileName: imageUrl + ext ,
                   uniqueId : imageUrl
                });
                const imagenSalvada = await Img.save();
                res.redirect('/images/' + imageUrl);
            }
            else {
                await fs.unlink(dir_origin);
                res.status(500).json({error:"No está permitida este formato de imagen"});
            }
        }
       
    };
    saveImage();
   
   
};
ctrl.like = async(req,res) =>{
    const img = await Image.findOne({fileName: {$regex:req.params.images_id}});
    const image = await Image.findOne({fileName: {$regex:req.params.images_id}}).lean();
    if(img){
        img.likes = img.likes+1;
        image.likes = image.likes+1;
        await img.save();
        res.json({likes:img.likes});
    }
    else{
        res.status(500).json({error:'Internal error'});
    }
};
ctrl.comments = async(req,res) =>{
    const image = await Image.findOne({fileName:{$regex:req.params.images_id}}).lean();
    if(image){
        const newComment = new Comment(req.body);
        newComment.gravatar = md5(newComment.email);
        newComment.image_id = image._id;
        await newComment.save();
        res.redirect('/images/'+ image.uniqueId);
    }
    else{ res.redirect('/');}
 
};
ctrl.delete = async(req,res) =>{
    const img = await Image.findOne({fileName:{$regex:req.params.images_id}});
    if(img){
        await fs.unlink(path.resolve('./src/public/upload/'+ img.fileName));
        await Comment.deleteOne({image_id:img._id});
        await img.remove();
        res.json(true);
    }
};
module.exports = ctrl;