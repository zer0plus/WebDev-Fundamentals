const mongoose = require("mongoose");
let books = require("./BookModel");

mongoose.connect('mongodb://localhost/t9', {useNewUrlParser: true});

//Get the default Mongoose connection (can then be shared across multiple files)
let db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

let cQuery = books.find()
// .where("ratings").size(11)
.select("title ratings")

//Once connected, create a document for each product1
db.once('open', function() {
    books.getTopBooks(function(err, result){
        if (err) {throw err;}
        console.log(result);
    })
});