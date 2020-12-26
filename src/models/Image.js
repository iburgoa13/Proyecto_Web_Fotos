const mongoose = require("mongoose");
const path = require("path");
const { Schema } = mongoose;

const ImageSchema = new Schema({
    title: {type: String},
    description:{type: String},
    fileName: {type:String},
    visitas:{type: Number, default: 0},
    likes:{type:Number, default:0},
    uniqueId: {type:String},
    timeStamp: {type:Date, default:  Date.now}
});


module.exports = mongoose.model('Image',ImageSchema);