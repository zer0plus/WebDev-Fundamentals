

const http = require('http');
const fs = require("fs");

let item_lists = { items:[
	{name:"shower", light: false, checked:false}, 
	{name:"brekky", light: false, checked:false}
]};

//Create a server, giving it the handler function
//Request represents the incoming request object
//Response represents the outgoing response object
//Remember, you can break this apart to make it look cleaner
const server = http.createServer(function (request, response) {
	console.log("------------New Request-------------")
	console.log("URL: " + request.url);
	console.log("Method: " + request.method);

	let temp = item_lists;
	//item_lists = [
	//	{name:"shower", light: false, checked:false}, 
	//	{name:"brekky", light: false, checked:false}
	//];

	if(request.method === "GET"){
		if(request.url === "/" || request.url === "/todo.html"){
			//read the todo.html file and send it back
			fs.readFile("todo.html", function(err, data){
				if(err){
					response.statusCode = 500;
					response.write("Server error.");
					response.end();
					return;
				}
				response.statusCode = 200;
				response.setHeader("Content-Type", "text/html");
				response.write(data);
				response.end();
			});
		}else if(request.url === "/todo.js"){
			//read todo.js file and send it back
			fs.readFile("todo.js", function(err, data){
				if(err){
					response.statusCode = 500;
					response.write("Server error.");
					response.end();
					return;
				}
				response.statusCode = 200;
				
				response.setHeader("Content-Type", "application/javascript");
				response.write(data);
				response.end();
			});
		//Add any more 'routes' and their handling code here
		//e.g., GET requests for "/list", POST request to "/list"
		}
		else if (request.url === "/list") {
			response.statusCode = 200;
			response.setHeader("Content-Type", "application/json");
			item_lists= JSON.stringify(item_lists.items);
			console.log(item_lists);
			response.write(item_lists); 
			response.end();
		}
		else{
			response.statusCode = 404; 
			response.write("Unknwn resource.");
			response.end();
		}
	}else if(request.method === "POST"){
		//any handling in here
		if(request.url === "/list")
		{
			let body = "";
			request.on('data', (chunk) => {
			body += chunk;
			})
			request.on('end', () => {
			console.log("body: " + body);
			temp.items.push(JSON.parse(body));
			//addToList(JSON.parse(body));
			//console.log("Name: " + JSON.parse(body).name);
			//console.log("Tired: " + body.checked);
			//Send the body information back, just for fun
			response.statusCode = 200;
			//console.log(item_lists[item_lists.length-1]);
			//response.write(body);
			response.end();
		}
		)}
		else{	response.statusCode = 404;
				response.write("Unknwn resource.");
				response.end();
			}
		
		//response.statusCode = 404;
	//	response.write("Unknwn resource.");
		//response.end();
	}
	else if(request.method === "PUT")
	{
		if(request.url === "/list")
		{
			let body = "";
			request.on('data', (chunk) => {
			body += chunk;
			})
			request.on('end', () => {
			console.log("body: " + body);
			temp.items = JSON.parse(body);	
			response.statusCode = 200;
		
			response.end();
		}
		)}
		else
		{	
				response.statusCode = 404;
				response.write("Unknwn resource.");
				response.end();
		}
	}
	item_lists = temp;
});

/*function addToList(add)
{
	console.log("********************HERE*****************")
	item_lists.items.push(add);
}*/
//Server listens on port 3000
server.listen(3000);
console.log('Server running at http://127.0.0.1:3000/');