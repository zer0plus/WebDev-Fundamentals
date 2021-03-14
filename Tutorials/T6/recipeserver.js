
//Database to store all recipe data
//This will give you 3 recipes to start with
let database = {
	"0":{
		"ingredients":
		[
			{"name":"Crab","unit":"Tsp","amount":3},
			{"name":"Peas","unit":"Cup","amount":12},
			{"name":"Basil","unit":"Tbsp","amount":10},
			{"name":"Cumin","unit":"Liter","amount":3},
			{"name":"Salt","unit":"Tbsp","amount":1}
		],

		"name":"Boiled Crab with Peas",
		"preptime":"13",
		"cooktime":"78",
		"description":"A boring recipe using Crab and Peas",
		"id":"0"
	},
	"1":{
		"ingredients":
		[
			{"name":"Peanuts","unit":"Liter","amount":10},
			{"name":"Artichoke","unit":"Tsp","amount":3},
			{"name":"Basil","unit":"Cup","amount":11},
			{"name":"Sage","unit":"Grams","amount":13},
			{"name":"Pepper","unit":"Cup","amount":1}
		],

		"name":"Boiled Peanuts with Artichoke",
		"preptime":"73",
		"cooktime":"74",
		"description":"A exciting recipe using Peanuts and Artichoke",
		"id":"1"
	},
	"2":{
		"ingredients":
		[
			{"name":"Lobster","unit":"Tsp","amount":14},
			{"name":"Brussel Sprouts","unit":"Liter","amount":14},
			{"name":"Sage","unit":"Tbsp","amount":3},
			{"name":"Thyme","unit":"Tbsp","amount":12},
			{"name":"Pepper","unit":"Tsp","amount":10},
			{"name":"Cumin","unit":"Tbsp","amount":11}
		],

		"name":"Spicy Lobster with Brussel Sprouts",
		"preptime":"86",
		"cooktime":"19",
		"description":"A tasty recipe using Lobster and Brussel Sprouts",
		"id":"2"
	}
}

let keys = Object.keys(database);
let num = keys.length;

const express = require('express');
let app = express();

app.use(express.static("public"));
app.set("view engine","pug");

//Start adding route handlers here
app.route("/recipes").post(express.json(), function (req, res) {
	let variable = req.body;
	variable.id = num.toString();
	//database[num] = variable;
	database[num] = variable;
	console.log("Object with ID "+ num + " added");
	num++;

	res.status(200).send("Recipe Saved");
})

app.get("/recipes",function(req,res){

	console.log("All recipes called")
	res.format({

		"text/html":() =>{res.render("showRecipes",{data : database});}
	});

	res.status(200);
})

app.get("/recipes/:id",function(req,res){
	console.log("Page called for ID:" + req.params.id.toString());
	let keys = Object.keys(database);
	let check =-1
	keys.forEach(k => {
		if(k == req.params.id)
		{
			check =0;
			res.format({

				"text/html":() => {res.render("showRecipe",{recipe :database[k]});}
			})
			res.status(200);
		
		}
	});
	if(check!=0){
		res.status(200).send("Wrong ID");}
})

app.listen(3000);
console.log("Server listening at http://localhost:3000");