document.getElementById("submit").addEventListener("click", getNames);

let req = null;

function getNames(){
    let name = document.getElementById("name").value;
    let url = 'http://localhost:3000/cards?name=$' + name;
    req = new XMLHttpRequest();
    req.onreadystatechange = function() {
        if(this.readyState==4 && this.status==200){
            console.log("Done!");
            window.location.href=url;

        }
    }

    

    req.open("GET",url, true);
    req.send();
}