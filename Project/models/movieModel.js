const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let movieSchema = Schema({
	Title: {
		type:String, 
		//required :true
	},

	Year: {
		type:String, 
		//required :true
	},
	Rated: 
    {
        type:String
    },
    Released:
    {
        type:String
    },
    Runtime:
    {
        type:String
    },
    Genre:[String],
    Director:[{type: Schema.Types.ObjectId, ref: 'Person'}],

    Writer:[{type: Schema.Types.ObjectId, ref: 'Person'}],
    Actor:[{type: Schema.Types.ObjectId, ref: 'Person'}],
    Plot:{
        type:String
    },
    Awards:{
        type :String
    },
    Poster:{
        type:String
    },

});

module.exports = mongoose.model("Movie", movieSchema);