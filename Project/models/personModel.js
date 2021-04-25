const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let peopleSchema = Schema({
	name: {
        type:String,
        required:true
    },
  Director: [{type:Schema.Types.ObjectId, ref: 'Movie'}],
  Actor: [{type:Schema.Types.ObjectId, ref: 'Movie'}],
  Writer: [{type:Schema.Types.ObjectId, ref: 'Movie'}],


});


module.exports = mongoose.model("Person", peopleSchema);