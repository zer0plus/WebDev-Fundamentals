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

// bookSchema.statics.getTopBooks = function(callback){
// 	this.find()
// 	.where("title").regex(/.*Games.*/)
// 	.exec(callback);
// }
module.exports = mongoose.model("books", bookSchema);