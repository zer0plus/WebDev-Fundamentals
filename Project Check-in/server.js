const express = require('express');
let app = express();
app.use(express.static("public"));

let movieData = require("./movie-data-10.json");
let movies = {};

app.set("view engine","pug");

app.get("/people/examplePerson",function(req,res){
	res.format({
		"text/html":() =>{res.render("examplePerson");}
	});
	res.status(200);
})

app.get("/movies/exampleMovie",function(req,res){
	extractData();
	res.format({
		"text/html":() =>{res.render("exampleMovie",{movie : movies["The Champ"]});}
	});
	console.log(req.query.name);
	//if(req.params.name != undefined){
	//	console.log(req.params.name);
	console.log(req.query.hello);
	res.status(200);
})

app.get("/sign/in",function(req,res){
    res.format({
        "text/html":() =>{res.render("signin");}
    });

    res.status(200);
})

app.get("/profile/my",function(req,res){
    extractData();
    let temp = movies;
    res.format({
        "text/html":() =>{res.render("ownprofile",{movie : movies});}
    });

    res.status(200);
})

app.get("/sign/up",function(req,res){
    res.format({
        "text/html":() =>{res.render("signup");}
    });

    res.status(200);
})

app.get("/user/exampleUser",function(req,res){
	res.format({
		"text/html":() =>{res.render("exampleUser");}
	});
	res.status(200);
})

app.get("/search",function(req,res){
	res.format({
		"text/html":() =>{res.render("search");}
	});
	res.status(200);
})

app.get("/searchResults",function(req,res){
	res.format({
		"text/html":() =>{res.render("searchResults");}
	});
	res.status(200);
})

app.get("/reviews/exampleReview",function(req,res){
	res.format({
		"text/html":() =>{res.render("exampleReview");}
	});
	res.status(200);
})

app.get("/contribute",function(req,res){
	res.format({
		"text/html":() =>{res.render("contribute");}
	});
	res.status(200);
})


function extractData(){	
	movies={};
	//this function will be used to extract data with certain criteria
	 
	movieData.forEach(movie => {
		movies[movie.Title] = movie;
	});
}
app.listen(3000);
console.log("Server listening at http://localhost:3000");