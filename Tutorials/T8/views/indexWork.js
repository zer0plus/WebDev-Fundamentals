document.getElementById("refresh").addEventListener("click", sendParam);

function sendParam(){
    let Cvalue = document.getElementById("class").value;
    let Rvalue = document.getElementById("rarity").value;
    let Avalue = document.getElementById("artist").value;
    let Nvalue = document.getElementById("name").value;
    let minAvalue = document.getElementById("minattack").value;
    let maxAvalue = document.getElementById("maxattack").value;
    let minHvalue = document.getElementById("minhealth").value;
    let maxHvalue = document.getElementById("maxhealth").value;

    console.log(Cvalue);
    console.log(Rvalue);
    let url = "http://localhost:3000/cardList?class=" + Cvalue+ "&rarity=" + Rvalue + "&artist=" + Avalue + "&name=" + Nvalue + "&minattack=" 
    + minAvalue + "&maxattack=" + maxAvalue + "&minhealth=" + minHvalue + "&maxhealth=" + maxHvalue;
    console.log(url);
    let xhttp = new XMLHttpRequest();
    window.location.href = url;
    xhttp.open("Get", url, true);
    // xhttp.send();
}