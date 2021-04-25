const express = require('express');
const session = require('express-session');
const mongoose = require("mongoose");
// let bodyParser = require('body-parser');
let app = express();
const Person = require("./models/personModel");
const Movie = require("./models/movieModel") ;
const User = require("./models/userModel");
mongoose.connect('mongodb://localhost/movieDatabase', {useNewUrlParser: true});
let db = mongoose.connection;

app.use(express.static("public"));
 
// let movieData = require("./movie-data-10.json");
const e = require('express');
let movies = {};
let loginObj = {
    "username" : true,
    "password" : true
};

app.use(express.urlencoded({extended:true}));
app.use(session({secret: 'some secret here'}));
app.set("view engine", "pug");
app.post("/login", login);

function addPersonToMovie(personName, movie, position){
	//console.log(movie);
  //If our people object does not contain this name (i.e., this is a new person)
    Person.findOne({name: personName}, function(err, result) {
        if (err) {
            throw err;
        }
        if (result) {
            console.log("Empty array");
            console.log(result);
            return;
        }
        else{
            //Create a new Person document, set initial state
            let newPerson = new Person();

            //This is a key piece of functionality
            //We can use Mongoose to generate ObjectIDs OUTSIDE of the database
            //So we can use these IDs before we have actually inserted anything    
            newPerson._id = mongoose.Types.ObjectId();
            newPerson.name = personName;
            newPerson.director = [];
            newPerson.actor = [];
            newPerson.writer = [];
            newPerson[position] = movie._id;
            console.log("New Person:");
            console.log(newPerson);
            movie[position].push(newPerson._id);
            // console.log("New Movie:");
            // console.log(movie);
            // Movie.insertMany
            
            //Add new Person document to our array of all people
            //Update the people object (name -> person document)
        }
    })
  //At this point, we know the movie and person are defined documents
  //Retrieve the current person using their name, update the movie and person
}



//  Post request to process a contribution
// app.put("/contribute?", async function (req, res) {
//     console.log("Inside logged in contribute");
//     let newMovie = new Movie();
//     console.log(req.query.title);
//     newMovie._id = mongoose.Types.ObjectId();
//     newMovie.Title = req.query.title;
//     newMovie.Runtime = req.query.runtime;
//     newMovie.Year = req.query.year;
//     newMovie.Genre = req.query.genre.split(',');
//     let bool = false;
//     // if (true) {
//         req.query.actor.split(',').forEach(ac1 =>{
//             await addPersonToMovie(ac1, newMovie, "Actor"); 
//         })
//         req.query.director.split(',').forEach(ac1 =>{
//             await addPersonToMovie(ac1, newMovie, "Director"); 
//         })
//         req.query.writer.split(',').forEach(ac1 =>{
//             await addPersonToMovie(ac1, newMovie, "Writer"); 
//         })
//     //     bool = true;
//     // }

//     // if (bool) {
//     Movie.insertMany(newMovie, function (err, result) {
//         if (err) {
//             console.log(err)
//             return;
//         }
//     });
//     console.log("LOG THIS");
//     console.log(req.query.writer.split(','));
//     console.log(newMovie);
//     // }   
    
// })

//  POST request to unfollow a celebrity/person
app.post("/people/unfollow/:examplePerson", function (req, res) {

    let tempArr=[];
    req.session.user.pFollowing.forEach(actor=>{
        if(actor._id != req.params.examplePerson){
            tempArr.push(actor);
        }
    })
    // console.log(tempArr);
    // console.log(req.session.user.pFollowing);
    req.session.user.pFollowing = tempArr;
    // User.replaceOne()
    res.redirect("/user/" + req.session.user._id);
    res.send();
})

// POST request to unfollow another user
app.post("/user/unfollow/:examplePerson", function (req, res) {
    let url = req.url;
    url = url.slice(15);
    let tempArr=[];
    req.session.user.uFollowing.forEach(user=>{
        if(user._id != url){
            tempArr.push(user);
        }
    })
    req.session.user.uFollowing = tempArr;
    // console.log(req.session.user.uFollowing);

    // User.update({_id : req.session.user._id}, req.session.user);
    
    res.redirect("/user/" + req.session.user._id)
    res.send();
})

// Need to check follow
app.put("people/follow/:examplePerson",function(req,res){
    url = req.url;
    url = url.slice[17];   

    Person.findOne({_id:url},function(err,result){
    if(err)
      throw err;  
    req.session.user.pFollowing.push(result);
  })
})

//Post Request function to handle login attempts
function login(req, res){
    // console.log(req.body.username);
    if (req.session.loggedIn) {
        req.status(200).send("Already logged in.")
        return;
    }
    User.findOne({"Username":req.body.username}).populate("pFollowing uFollowing watchList recommend").exec(function(err, result){
        // console.log("Inside Login POST");
       
        if (err) {
            throw err;
        }
        if (!result) {
            loginObj.username = false;
            loginObj.password = false;
            res.status(200).redirect("/login");
            return;
        }
        else{
            if (result.Password === req.body.password) { //
                req.session.loggedin = true;
                req.session.user = result;
                res.status(200)
                res.redirect("/user/" + req.session.user._id);
            }
            else{
                // ("Not authorized. Invalid password.");
                loginObj.username = true;
                loginObj.password = false;
                res.status(200).redirect("/login");
            }
        }
    });
}

//Post Request function to handle Register attempts
app.post("/register", function (req, res) {
    let newUser = new User();
	newUser._id = mongoose.Types.ObjectId();
    newUser.Name = req.body.firstName + " " +req.body.lastName;
    newUser.Username = req.body.username;
    newUser.Password = req.body.password;
    User.insertMany(newUser, function (err, result) {
        if (err) {
            throw (err);
        }
    });
    res.redirect("/login");
});

function freqCollabActors(req,res,data1, follow)
{
    Movie.find({$or:[{Actor:data1._id},{Director:data1._id},{Writer:data1._id}]}).limit(2).sort("Year").
    select("Actor Director Writer").
    populate("Actor Director Writer").exec(function(err,result){
        if(err)
        {
            throw err;
        }

        res.format({
            "text/html":() =>{res.status(200).render("examplePerson", {data: data1, actors:result[0], following: follow})}
        });
    }) 
}

app.get("/people/:examplePerson",function(req,res){
    let following;
    Person.findOne({_id:req.params.examplePerson}).populate("Director Actor Writer").exec(function (err, result) {
        if (err) {
            throw err;
        }
        Person.find({_id:req.session.user._id}, {watchList:result._id}, function (err, result) {
            if (err) {
                throw err;
            }
            if (result.length == 0) {
                following = false;
            }
            else {following = true;}
        })

        freqCollabActors(req, res, result, following);
    })
})

function getSimilarMovie(req,res,data1)
{
    // console.log(data1);
    Movie.find({Genre:{$all:data1.Genre}}).limit(4).exec(function(err,result){
        if(err)
        {throw err;}
        res.format({
            "text/html":() =>{res.status(200).render("exampleMovie", {data:data1, similar:result});}
        });
    })
}

// Loads different movie pages
app.get("/movies/:exampleMovie",function(req,res){

    Movie.findOne({_id:req.params.exampleMovie}).populate("Director Writer Actor").exec(function (err, result) {
        if (err) {
            throw err;
        }
        getSimilarMovie(req,res,result);
    })
})

//To Remove or add a movie to watchlist
app.post("/movies/a/:exampleMovie", function (req, res) {
    req.session.user.watchList = [];
    req.session.user.watchList.forEach(movie=>{
        if (movie._id != req.params.exampleMovie) {
            req.session.user.watchList.push(movie);
        }
    })
    // console.log(req.session.user.watchList);
    res.redirect("/user/" + req.session.user._id);
    res.send();
})


app.get("/login", function(req, res){
    if (req.session.loggedIn) {
        req.status(200);
        res.redirect("/user/" + req.session.user._id)
        send(res);
        return;
    }
    res.setHeader('content-type', 'text/html');
    res.format({
        "text/html":() =>{res.status(200).render("login",{check: loginObj});}
    });
    // res.status(200);
})

app.get("/register",function(req,res){

    res.format({
        "text/html":() =>{res.status(200).render("register");}
    });

})

app.post("/account",function(req,res){
    req.session.user.Account = !req.session.user.Account
    res.redirect("/user/profile");

})

function getRecommended(req,res)
{
    let genres=[];
    req.session.user.recommend = [];  
    if(req.session.user.pFollowing.length == 0 && req.session.user.watchList.length == 0)
    {
        Movie.find().skip(10).limit(4).exec(function(err,result){
            if(err){
                throw err;
            }
            res.format({
                "text/html":() =>{res.status(200).render("ownprofile", {person: req.session.user,rec:result});}
            });
        })
    }

    else if(req.session.user.watchList.length ==0)
    {
        req.session.user.pFollowing.forEach(person=>{
            Movie.find({Actor:person._id}).limit(2).exec(function(err,result){
                if(err){
                    throw err;
                }
                res.format({
                    "text/html":() =>{res.status(200).render("ownprofile", {person: req.session.user,rec:result});}
                });
            })
        })
    }

    else
    {
        let check = false;
        req.session.user.watchList.forEach(movie=>{
            movie.Genre.forEach(gen=>{
                check = false;
                genres.forEach(genr=>{
                    if(genr == gen)
                    {
                        check == true;
                    }
                })
                if(!check)
                {
                    genres.push(gen);
                }
            })
        })
            
        Movie.find({$or:[{Genre:genres[0]},{Genre:genres[1]}]}).limit(2).exec(function(err,result){
            if(err){
                throw err;
            }
            res.format({
                "text/html":() =>{res.status(200).render("ownprofile", {person: req.session.user,rec:result});}
            });
            })
    }
}

app.get("/user/:exampleUser", function(req, res){
    let following;
    if (req.session.loggedin) {
       if (req.session.user._id == req.params.exampleUser || req.params.exampleUser == "profile") {
            getRecommended(req, res);
        }
        else{
            User.findOne({_id: req.params.exampleUser}).populate("pFollowing uFollowing watchList recommend").exec(function(err, result){
                if(err)
                    throw err;
                User.find({_id:req.session.user._id}, {uFollowing:result._id}, function (err, result1) {
                    if(err)
                        throw err;
                    // console.log(result1); 

                    if (result1.uFollowing === req.params.exampleUser) {
                        following = true;
                        // console.log(following);
                        res.format({
                            "text/html":() =>{res.status(200).render("exampleUser", {data: result, follow: following});}
                        });
                    }
                    else{
                        following = false;
                        // console.log(following);
                        res.format({
                            "text/html":() =>{res.status(200).render("exampleUser", {data: result, follow: following});}
                        });
                    }
                })
            })
        }
    }
    else{
        res.redirect("/login");
    }
})

app.get("/search",function(req,res){
	res.format({
		"text/html":() =>{res.status(200).render("search");}
	});
})

app.get("/results",function(req,res){
    search = req.query.search; 
    let skipit = req.query.page-1;
    //if(search){};
    toSearch = search;
    //db.movies.find({Title:{$regex:"Balls",$options:"i"}})
    Movie.find({$or:[{Title:{$regex:toSearch,$options:"i"}},{Genre:{$regex:toSearch,$options:"i"}}]}).skip(skipit*10).limit(10).exec(function(err,result){
        if(err)
            {throw err};

        // console.log(skipit);
        res.format({
            "text/html":() =>{res.status(200).render("searchResults", {data: result, current:skipit+1 ,item:search});}  
    })
    })
})
 
app.get("/reviews/exampleReview",function(req, res){
	res.format({
		"text/html":() =>{res.status(200).render("exampleReview");}
	});
})

app.get("/contribute", function(req,res){
    if (req.session.loggedin){
        // console.log(req.session.user.Account);
        let bool = req.session.user.Account;
        if (bool) {
            res.format({
                "text/html":() =>{res.status(200).render("contribute", {accountType: bool});}
            });
        }
        else{
            res.format({
                "text/html":() =>{res.status(200).render("contribute", {accountType: bool});}
            });
        }
    }
    else{
        res.redirect("/login");
    }
})

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
        app.listen(3000);
        console.log("Server listening on port http://localhost:3000/");
});


// function extractData(){	
// 	movies={};
	 
// 	movieData.forEach(movie => {
// 		movies[movie.Title] = movie;
// 	});
// }
// app.listen(3000);
// console.log("Server listening at http://localhost:3000");

//To delete databases
// var databases = db.getMongo().getDBNames()
// for(var i in databases){
//     db = db.getMongo().getDB( databases[i] );
//     if(db.getName() == "admin" || db.getName() == "local"){
//         print("skipping db " + db.getName())
//         continue
//     }
//     print( "dropping db " + db.getName() );
//     db.dropDatabase();
// }