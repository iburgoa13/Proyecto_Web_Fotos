const {Schema, model} = require("mongoose");
const ObjectId = Schema.ObjectId;
const CommentsSchema = new Schema({
    image_id:{type:ObjectId},
    email:{type:String},
    name:{type:String},
    gravatar: {type:String},
    comment:{type:String},
    timeStamp:{type:Date, default:Date.now}
});

CommentsSchema.virtual('image')
        .set(function(image){
            this._image = image;
        })
        .get(function(){
            return this._image;
        });
module.exports = model('Comment', CommentsSchema);