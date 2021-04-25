document.getElementById("loginBtn").addEventListener("click", loginCheck);


function loginCheck() {
    let xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
        //If the response is available and was successful
		console.log(this.readyState);
        if (this.status != 200) {
            let items  = xhttp.response;

        }
    };
    xhttp.open("POST", "http://127.0.0.1:3000/login", true);
    //'Just gonna send it.' - Larry Enticer
    xhttp.send();
}