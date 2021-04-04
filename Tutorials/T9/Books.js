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
	cQuery.exec(function(err, result){
		if(err) throw err;
		console.log("Book names containing games:");
        ans = []
        let bool = false;
        for (let i = 0; i < result.length; i++) {
            bool = false;
            if (result[i]['ratings'].length > 10) {
                // if (bool) {
                //     console.log("toot3");
                // }
                if (ans.length < 10) {
                    ans.push(result[i]);
                }
                else{
                    let sum_i = 0;
                    for (let j = 0; j < result[i]['ratings'].length; j++) {
                        sum_i += result[i]['ratings'][j];
                    }
                    avg_rating_i = sum_i / result[i]['ratings'].length;
                    
                    // Going Through the ans array
                    if (result[i]['title'] == "An Ember in the Ashes (An Ember in the Ashes, #1)") {
                        console.log(avg_rating_i);
                    }
                    let lowest_avg_rating_a = 99;
                    let lowest_avg_rating_a_idx;
                    for (let a = 0; a < ans.length; a++) {
                        let sum_a = 0;
                        for (let j = 0; j < ans[a]['ratings'].length; j++) {
                            sum_a += ans[a]['ratings'][j];                  
                        }
                        avg_rating_a = sum_a / ans[a]['ratings'].length;
                        
                        if (avg_rating_a < lowest_avg_rating_a) {
                            lowest_avg_rating_a = avg_rating_a;
                            lowest_avg_rating_a_idx = a;
                        }
                    } 
                    if (avg_rating_i > lowest_avg_rating_a) {
                        ans.splice(lowest_avg_rating_a_idx, 1);
                        ans.push(result[i]);
                        bool = true;
                        // console.log("toot1");
                        // break;
                    }
                }
            }
        }
        for (let i = 0; i < ans.length; i++) {
            let sum = 0;
            for (let j = 0; j < ans[i]['ratings'].length; j++) {
                sum += ans[i]['ratings'][j];                  
            }
            let = avg_rating = sum / ans[i]['ratings'].length;
            console.log(ans[i]['title']);
            console.log(avg_rating);
        }
		// console.log(ans);
	});
});

// process.exit();
// books.find({title: 'The Hunger Games'}, function(err, result){
//     if(err) throw err;
//     console.log(result);
//     console.log("result");
// });