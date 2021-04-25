const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let bookSchema = Schema({
	title: {
		type: String, 
		required :true
	},

	authors: {
		type: String, 
		required :true
	},
	isbn: {
		type: String, 
		required :true,
		minlength: [10,"Atleast 10 characters required"],
		validate: {
				validator: function(){
					for(let i=0; i< this.isbn.length;i++)
					{
					if(i>=9){                                                                                                           
						if(isNaN(this.isbn[i])){
							if(this.isbn[i] == "X"){
								return true;
							}
							return false;
						}
						return true;
					}						
					if(isNaN(this.isbn[i])){return false;}
				}},
				validator: function(){
						let checksum =0;
						for(let i=0; i< this.isbn.length;i++){
							if(isNaN(this.isbn[i])){
								checksum += (10-i)*10;
							}
							else{						
							checksum += (10-i)*parseInt(this.isbn[i]);}
						}
							if(checksum % 11 ==0){
								return true;
							}
							return false;
							},
				message:"Wrong ISBN number",

				
		}
							
	},
	ratings: [Number]
});

bookSchema.statics.getTopBooks = function(callback){
    let ans = [];
    let final_ans = [];
	this.find()
	.exec(function(err, result){
		if(err) throw err;
		console.log("Top 10 Books:");
        let bool = false;
        for (let i = 0; i < result.length; i++) {
            bool = false;
            if (result[i]['ratings'].length > 10) {
                
                if (ans.length < 10) {
                    ans.push(result[i]);
                }
                else{
                    let sum_i = 0;
                    for (let j = 0; j < result[i]['ratings'].length; j++) {
                        sum_i += result[i]['ratings'][j];
                    }
                    avg_rating_i = sum_i / result[i]['ratings'].length;
                    
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
            ans[i]['avg_rating'] = avg_rating
            
            final_ans.push([ans[i]['title'] , ans[i]['avg_rating']]);
        }
        let sorted = false;
        let temp;
        while(!sorted) {
            sorted = true;
            for (let i = 0; i < final_ans.length - 1; i++) {
                if (final_ans[i][1] < final_ans[i+1][1]) {
                    temp = final_ans[i];
                    final_ans[i] = final_ans[i+1];
                    final_ans[i+1] = temp;
                    sorted = false;
                }
            }
        }
        callback(err, final_ans);
	});
}

module.exports = mongoose.model("books", bookSchema);