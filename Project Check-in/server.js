const express = require('express');
let app = express();
app.use(express.static("public"));

app.set("view engine","pug");

app.get("/people/exampleperson",function(req,res){
	res.format({
		"text/html":() =>{res.render("examplePerson");}
	});

	res.status(200);
})

app.get("/movies/exampleMovie",function(req,res){
	res.format({
		"text/html":() =>{res.render("exampleMovie");}
	});

	res.status(200);
})

app.listen(3000);
console.log("Server listening at http://localhost:3000");