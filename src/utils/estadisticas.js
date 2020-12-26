const {Comment, Image} = require("../models");


async function imageCounter(){
    return await Image.countDocuments();
}
async function commentsCounter(){
    return await Comment.countDocuments();
}
async function imageTotalViewsCounter(){
    const res = await Image.aggregate([{$group:{
        _id: '1',
        viewsTotal: {$sum: '$visitas'}
    }}]);
    return res[0].viewsTotal;
}
async function likesTotalCounter(){
    const total = await Image.aggregate([{$group:{
        _id:'1',
        likesTotal: {$sum: '$likes'}
    }}]);
    return total[0].likesTotal;
}
module.exports = async() =>{
    //ejecuta todas en paralelo
    const res = await Promise.all([
        likesTotalCounter(),
        imageCounter(),
        commentsCounter(),
        imageTotalViewsCounter()
    ]);
    return{
        images: res[1],
        comments: res[2],
        views: res[3],
        likes: res[0]
    }
}