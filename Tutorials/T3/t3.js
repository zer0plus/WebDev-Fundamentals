document.getElementById("add_reviewBtn").addEventListener("click", add_review);

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