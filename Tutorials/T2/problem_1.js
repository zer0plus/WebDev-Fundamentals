document.getElementById("addBtn").addEventListener("click", addToList);
document.getElementById("remBtn").addEventListener("click", removeFromList);
document.getElementById("highlight").addEventListener("click", highlightItems);
document.getElementById("sortBtn").addEventListener("click", sortItems);

function addToList(){
    let addElement = document.createElement("p");
    let checkB = document.createElement("input");
    let input = document.getElementById("task_input");
    
    if(input.value.length > 0 && input.value.trim().length>0){
        checkB.type="checkbox";
        checkB.name = "tick";
        addElement.appendChild(checkB);

        let node = document.createTextNode(input.value);
        input.value = '';
        addElement.appendChild(node);

        let listAdd = document.getElementById("list");
        listAdd.appendChild(addElement);
    }
    else{
        input.value='';
        alert("Nothing Entered");
    }
};

function removeFromList(){
    let listAdd = document.getElementById("list");
    let para = listAdd.getElementsByTagName("p");
    let checklist = listAdd.getElementsByTagName("input");
    
    let i=0;
    for(i; i < para.length ;i++){
        if(checklist[i].checked){
            listAdd.removeChild(para[i]);
            i--;
        }
    }
    //let addElement = document.createElement("p");
    //let node = document.createTextNode(checklist.length);
    //addElement.appendChild(node);
    //listAdd.appendChild(addElement);
}

function highlightItems(){
    let listAdd = document.getElementById("list");
    let para = listAdd.getElementsByTagName("p");
    let checklist = listAdd.getElementsByTagName("input");
    
    let i=0;
    for(i; i < para.length ;i++){
        if(checklist[i].checked){
            if(para[i].style.color=="white"){
                para[i].style.color="black";
                para[i].style.backgroundColor = "white";
                // checklist[i].checked = false;
            }
            else{
                para[i].style.color="white";
                para[i].style.backgroundColor = "grey";
                // checklist[i].checked = false;
            }
        }
    }
}

function sortItems(){
    
}