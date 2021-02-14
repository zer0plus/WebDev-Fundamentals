document.getElementById("add_reviewBtn").addEventListener("click", add_review);
document.getElementById("get_dataBtn").addEventListener("click", loadMovies);

let data_movies = [];

function add_review(){
    let usrName = document.getElementById("reviewee_name").value;
    let usrScore = (document.getElementById("reviewee_score").value);
    let usrReview = document.getElementById("reviewee_text").value;
    let output = document.getElementById("review_body");
    if(usrName == "" || usrReview == ""|| usrScore == ""){
        alert("ERROR: Please fill up all the fields to add a review")
    }
    usrScore = parseInt(usrScore);
    if(usrScore < 1 || usrScore > 10){
        alert("ERROR: Please enter a score between 1 - 10");
    }
    // Appends the inputed text into the HTML para
    output.setAttribute('style', 'white-space: pre');
    output.textContent += "\nName: " + usrName + "\n" + "Score: " + usrScore + "\n" + "Review: " + usrReview;
    // Clears previous input
    document.getElementById("reviewee_name").value = "";
    document.getElementById("reviewee_score").value = "";
    document.getElementById("reviewee_text").value = "";
}

function loadMovies(){
    document.getElementById("get_dataBtn")
    console.log("sadas");
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function(){
        console.log(this.readyState);
        if (this.readyState == 4 && this.status == 200) {
            let responseObj = JSON.parse(xhttp.responseText);
            data_movies = responseObj;
            console.log(data_movies);
            render();
        }
    }
    xhttp.open("GET", "http://www.omdbapi.com/?i=tt0167260&apikey=19e2e761", true);
    xhttp.send();
}

function render(){
    let titleTxt = document.getElementById("movie_name");
    let discTxt = document.getElementById("basic_disc");
    let stuff = "";
    // data_movies.forEach(data =>{
	// 	stuff += data.Title;
	// })
    titleTxt.textContent += data_movies.Title;
    discTxt.textContent += data_movies.Year + " | " + data_movies.Runtime;
    console.log(data_movies.Title);
}