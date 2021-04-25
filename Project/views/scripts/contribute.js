document.getElementById("contMovieBtn").addEventListener("click", contribute)

function contribute() {
    console.log("REACHED HERE SOMEHOW");
    let xhttp = new XMLHttpRequest();
    let title = document.getElementById("title").value;
    let runTime = document.getElementById("runtime").value;
    let year = document.getElementById("relYear").value;
    let writer = document.getElementById("Writer").value;
    let director = document.getElementById("Director").value;
    let actor = document.getElementById("Actor").value;
    let genre = document.getElementById("genre").value;
    
    let url = "/contribute?title=" + title + "&runtime=" + runTime + "&year=" + year + "&writer=" + writer + "&director=" + director + "&actor=" + actor + "&genre=" + genre
    // xhttp.onreadystatechange = function() {
    //     console.log("HELLO");
    //     window.location.href = url;
    // }; 
    xhttp.open("PUT", url, true);
    xhttp.send();
}