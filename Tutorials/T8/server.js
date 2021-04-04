//Create express app
const express = require('express');
let app = express();

//Database variables
let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let db;

//View engine
app.set("view engine", "pug");

//Set up the routes
app.use(express.static("public"));
app.get("/", sendIndex);
app.get("/cards/:cardID", sendCard);
app.get("/cardList?", sendCards)
let classC={};

function sendIndex(req, res, next){
    if (classC) {
	    res.render("index", {card_class:classC["class"], card_rarity:classC["rarity"], card_results:{}});
    }
}

function sendCard(req, res, next){
	let oid;
	try{
		oid = new mongo.ObjectID(req.params.cardID);
	}catch{
		res.status(404).send("Unknown ID");
		return;
	}

	db.collection("cards").findOne({"_id":oid}, function(err, result){
		if(err){
			res.status(500).send("Error reading database.");
			return;
		}
		if(!result){
			res.status(404).send("Unknown ID");
			return;
		}
		res.status(200).render("card", result);
	});
}


function sendCards(req, res, next){
    console.log(req.query.rarity);
    console.log(req.query.class);
    let obj1 = {};

    if (req.query.maxattack) {
        try {
            req.query.maxattack = Number(req.query.maxattack);
        } catch  {
            req.query.maxAttack = 20;
        }
        finally{
            obj1["maxAttack"] = (req.query.maxattack);
        }
    }else{ obj1["maxAttack"] = 20; }

    if (req.query.minattack) {
        obj1["minAttack"] = Number(req.query.minattack);
    }else{ obj1["minAttack"] = 0; }
        
    if (req.query.maxhealth) {
        obj1["maxHealth"] = Number(req.query.maxhealth);
    }else{ obj1["maxHealth"] = 20; }
    
    if (req.query.minhealth) {
        obj1["minHealth"] = Number(req.query.minhealth);
    }else{ obj1["minHealth"] = 0; }

    if (req.query.artist) {
        obj1["artist"] = req.query.artist;     
    }else{ obj1["artist"] = ""; }

    if (req.query.name) {
        obj1["name"] =  req.query.name;
    }else{
        obj1["name"] = ""; }
    console.log(obj1);

    db.collection("cards").find({$and:[
        {"name":{$regex: obj1["name"], $options: 'i'}},
        {"artist":{$regex: obj1["artist"], $options: 'i'}},
        {"health":{$lte:obj1["maxHealth"]}},
        {"health":{$gte:obj1["minHealth"]}},
        {"attack":{$lte:obj1["maxAttack"]}},
        {"attack":{$gte:obj1["minAttack"]}},
        {"cardClass":req.query.class},
        {"rarity":req.query.rarity}]}).toArray( function(err, result){
        if (err) {throw err;}
	    res.status(200).render("index", {card_class:classC["class"], card_rarity:classC["rarity"], card_results:result});
        console.log(result);    
    })
}


// Initialize database connection
MongoClient.connect("mongodb://localhost:27017/", function(err, client) {
  
  if(err) throw err;

  //Get the t8 database
  db = client.db('t8');

  db.collection("cards").distinct("cardClass",function(err,result){
    if(err) throw err;
    classC["class"] = result;
    //console.log(result);
  });
  db.collection("cards").distinct("rarity",function(err,result){
    if(err) throw err;
    classC["rarity"] = result;
  });
  // Start server once Mongo is initialized
  app.listen(3000);
  console.log("Listening on port 3000");
});