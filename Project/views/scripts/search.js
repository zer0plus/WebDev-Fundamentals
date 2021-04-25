document.getElementById("searchBtn").addEventListener("click",submitResults)

function submitResults()
{
    let xhttp = new XMLHttpRequest();
    //console.log("REACHED HERE SOMEHOW");
    let search = document.getElementById("search").value;
    let page = 1;
    // let search = document.getElementById("search").value;
    // let genre = document.getElementById("genre").value;
    // let actor = document.getElementById("actor").value;
    // console.log(search);
    let url = "/results?search=" + search + "&page=" + page; // +"&genre="+genre+"&actor="+actor
    xhttp.onreadystatechange = function() {
        console.log("HELLO");
        window.location.href = url;
    }; 
 
    xhttp.open("GET", url, true);
    xhttp.send();
}