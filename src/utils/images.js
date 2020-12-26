const {Image} = require("../models");

module.exports = {
    async popular(){
        const img = await Image.find().limit(9).sort({likes:-1}).lean();
        return img;
    }
}