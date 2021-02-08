document.getElementById("addBtn").addEventListener("click", addToList);
document.getElementById("remBtn").addEventListener("click", removeFromList);
document.getElementById("highlight").addEventListener("click", highlightItems);
document.getElementById("sortBtn").addEventListener("click",sortList);

function addToList(){
    let addElement = document.createElement("li");
    let checkB = document.createElement("input");
    let input = document.getElementById("task_input");
    
    if(input.value.length > 0 && input.value.trim().length>0){
        checkB.type="checkbox";
        checkB.name = "tick";
        checkB.value = input.value;
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
    let para = listAdd.getElementsByTagName("li");
    let checklist = listAdd.getElementsByTagName("input");
    
    let i=0;
    for(i; i < para.length ;i++){
        if(checklist[i].checked){
            listAdd.removeChild(para[i]);
            i--;
        }
    }		
};

function highlightItems(){
    let listAdd = document.getElementById("list");
    let para = listAdd.getElementsByTagName("li");
    let checklist = listAdd.getElementsByTagName("input");
    
    let i=0;
    for(i; i < para.length ;i++){
        if(checklist[i].checked){
            if(para[i].style.color=="red"){
                para[i].style.color="black";
            }
            else{
                para[i].style.color="red";
            }
        }
    }
};

function sortList(){
    let list;
    let i;
    let need_switch;
    let change;
    let items;

    alist = document.getElementById("list");
    need_switch = true;
    while (need_switch){
        need_switch = false;
        items = alist.getElementsByTagName("LI");
        for (i = 0; i < (items.length - 1); i++){                    
            need_switch = false;
            if (items[i].innerHTML.toLowerCase() > items[i + 1].innerHTML.toLowerCase()) {
                change = true;
                break;
            }
        }
        if (change){    
            items[i].parentNode.insertBefore(items[i + 1], items[i]);
            need_switch = true;
        }
    }
}