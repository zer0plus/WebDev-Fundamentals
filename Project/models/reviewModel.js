const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let reviewSchema = Schema({
   full:{
       type:Boolean,
       default:false,
   },

   Score:Number,
   brief:String,
   long:String,
   person:[{type:Schema.Types.ObjectId, ref: 'Person'}],
   movie:[{type:Schema.Types.ObjectId, ref: 'Movie'}]
});


module.exports = mongoose.model("Review", reviewSchema);