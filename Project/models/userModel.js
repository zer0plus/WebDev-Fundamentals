const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = Schema({
    Username: {
        type :String,
        required :true,
    },
    Password : {
        type :String,
        required :true,
    },
    Name: {
        type :String,
        required :true,
    },

    Account:{
        type: Boolean,
        default:false,
    },

    pFollowing: [{type:Schema.Types.ObjectId, ref: 'Person'}],
    uFollowing: [{type:Schema.Types.ObjectId, ref: 'User'}],
    watchList: [{type:Schema.Types.ObjectId, ref: 'Movie'}],
    recommend: [{type:Schema.Types.ObjectId, ref: 'Movie'}],

});


module.exports = mongoose.model("User", userSchema);