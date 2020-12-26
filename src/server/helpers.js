const helpers = {};
const moments = require("moment");
helpers.timeago = timeStamp =>{
    //Cuanto tiempo ha pasado desde su publicación
    return moments(timeStamp).startOf('minute').fromNow();
};

module.exports = helpers;