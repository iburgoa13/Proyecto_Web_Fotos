const Stats = require("./estadisticas");
const Comments = require("./comments");
const Images = require("./images");
const estadisticas = require("./estadisticas");

module.exports = async function(viewModel){
    const res = await Promise.all([
        estadisticas(),
        Images.popular(),
        Comments.newest()
    ]);
    console.log("HOLI");
    console.log(res[2]);
   viewModel.sidebar = {
       stats: res[0],
       popular: res[1],
       comments: res[2]
   };
   return viewModel;
}