const fileName = "./dataset/movie-data-2500.json";
const mongoose = require("mongoose");
//const Schema = mongoose.Schema;

/*let movieSchema = Schema({
	title: {type: String, required: true},
  year: {type: String},
  runtime: {type: String},
  genre: [String],
  director: [{type: Schema.Types.ObjectId, ref: 'Person'}],
  actor: [{type: Schema.Types.ObjectId, ref: 'Person'}],
  writer: [{type: Schema.Types.ObjectId, ref: 'Person'}],
  plot: [String]
});

let personSchema = Schema({
  name: String,
  director: [{type:Schema.Types.ObjectId, ref: 'Movie'}],
  actor: [{type:Schema.Types.ObjectId, ref: 'Movie'}],
  writer: [{type:Schema.Types.ObjectId, ref: 'Movie'}],
});*/
const Person = require("./models/personModel");
const Movie = require("./models/movieModel") ;
const User = require("./models/userModel");
//mongoose.model("Movie", movieSchema);

//mongoose.model("Person", personSchema);

//Array of all movie documents (no duplicates)
let allMovies = []; 
//Object to find people by name easier than using array (works since people names are assumed unique)
let people = {};
//Array of all people documents (no duplicates)
//(this is only used so we don't have to iterate over the people object later)
let allPeople = [];
let allUsers=[];
//Takes a person name, movie document, and position ('actor', 'director', or 'writer' - matches the schema fields)
//Creates a new person if one with that name doesn't exist already
//Updates the person document to have the given movie's ID
//Updates the given movie document to have the person's ID
//The field that is updated in either document is the one indicated by 'position'
//This relies on the fact that the fields use the same name in both document types (e.g., Movie.actor and Person.actor)
function addPersonToMovie(personName, movie, position){
	//console.log(movie);
  //If our people object does not contain this name (i.e., this is a new person)
  if(!people.hasOwnProperty(personName)){
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
    //Add new Person document to our array of all people
    allPeople.push(newPerson);
    //Update the people object (name -> person document)
    people[newPerson.name] = newPerson;
  }
  
  //At this point, we know the movie and person are defined documents
  //Retrieve the current person using their name, update the movie and person
  let curPerson = people[personName];
  curPerson[position].push(movie._id);
  movie[position].push(curPerson._id);
}

//Read the JSON data provided in the given file
//This is an array of objects representing movies

let data = require(fileName);
data.forEach(movie=>{

  let newMovie = new Movie();
  newMovie._id = mongoose.Types.ObjectId();
  newMovie.Title = movie.Title;
  newMovie.Year = movie.Year;
  newMovie.Runtime = movie.Runtime;
  newMovie.Genre = movie.Genre;
  newMovie.Plot = movie.Plot;
  newMovie.Rated = movie.Rated;
  //console.log(movie);
	/*
  movie is something like:
    {
      "Title":"The Ballad of Cable Hogue",
      "Year":"1970",
      "Rated":"R",
      "Released":"18 Mar 1970",
      "Runtime":"121 min",
      "Genre":["Comedy","Drama","Romance","Western"],
      "Director":["Sam Peckinpah"],
      "Writer":["John Crawford","Edmund Penney"],
      "Actors":["Jason Robards","Stella Stevens","David Warner","Strother Martin"],
      "Plot":"A hobo accidentally stumbles onto a water spring, and creates a profitable way station in the middle of the desert.",
      "Awards":"1 win & 1 nomination.",
      "Poster":"https://m.media-amazon.com/images/M/MV5BMTQwMjkwNjE0Ml5BMl5BanBnXkFtZTgwOTU5ODIyMTE@._V1_SX300.jpg"
    }
  */
  
    /* ****** CHANGE MOVIE PLOT AWARDS PHOTO ********* */

  //Create a new movie document using the Mongoose model
  //Copy over the required basic movie data
  
 
  //For each actor in this movies Actor array, call the addPersonToMovie function
  //This function will create a new person if one with the given name doesn't exist
  //It will also update that person document and movie document
  
  movie.Actors.forEach(actorName => {
    addPersonToMovie(actorName, newMovie, "Actor");
  })
  //Repeat for directors
  movie.Director.forEach(directorName => {
    addPersonToMovie(directorName, newMovie, "Director");
  })
  
  //Repeast for writers
  movie.Writer.forEach(directorName => {
    addPersonToMovie(directorName, newMovie, "Writer");
  })

  //Add the movie to our array of all movies (these are added to the database once we are finished)
  allMovies.push(newMovie);
})


let userData = require("./dataset/users.json");
userData.forEach(user=>{
	let newUser = new User();
	newUser._id = mongoose.Types.ObjectId();
	newUser.Username = user.username;
	newUser.Password = user.password;
	newUser.Name = user.name;
	newUser.Account = user.account;
    newUser.pFollowing =[];
    newUser.uFollowing =[];
    newUser.watchList=[];
    newUser.recommend=[];

    let curPerson = people["Akshay Kumar"];

    newUser["pFollowing"].push(curPerson._id);
    if(newUser.Name == "Covid")
    {
      newUser["uFollowing"].push(allUsers[0]);
      newUser["watchList"].push(allMovies[2]);
    }
    allUsers.push(newUser);
})	
	
/*
Up until this point, everything we have done is synchronous. This makes
it easier to coordinate as you don't have to worry about callbacks, etc..
At this point, we have a bunch of movie and people Mongoose documents.
These documents have interlinking IDs.
You could also add users, reviews, etc. to the data in a similar way.
*/
mongoose.connect('mongodb://localhost/movieDatabase', {useNewUrlParser: true});
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  //We are connected. Drop the database first so we start fresh each time.
  mongoose.connection.db.dropDatabase(function(err, result){

    //Add all of the movie documents to the database
    Movie.insertMany(allMovies, function(err, result){
  	  if(err){
  		  console.log(err);
  		  return;
  	  }
  	  
      //Add all of the people documents to the database
      Person.insertMany(allPeople, function(err, result){
    	  if(err){
    		  console.log(err);
    		  return;
    	  }
        
		  User.insertMany(allUsers,function(err,result){
        if(err){
        console.log(err);
        return;
        }
        console.log("FINISHED");
        mongoose.connection.close(0);
      })
        //Once all movies/people have been added, query for movie Toy Story and person Tom Hanks
	
      });
    });
  });
});