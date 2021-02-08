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
        checkB.value = input.value;
        addElement.appendChild(checkB);

        let node = document.createTextNode(checkB.value);
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
    let listAdd = document.getElementById("list");
    let para = listAdd.getElementsByTagName("p");
    let lol = document.getElementById("sorted_list");
    console.log(para);
    console.log("Type^ \n");
    // Array.from(para).forEach(function(item){
    //     let txt = item.textContent;
    //     console.log(txt);
    // })
    let arr1 = Array.from(para);
    let arr2 = [];
    ln = arr1.length;
    for (let i = 0; i < ln; i++){
        let temp_min = arr1[0];
        for (let x = 0; x < arr1.length; x++) {
            if(temp_min.textContent.toLowerCase() > arr1[x].textContent.toLowerCase()){
                temp_min = arr1[x];
                console.log('test');
            }   
        }
        arr2.push(temp_min);
        for (let index = 0; index < arr1.length; index++) {
            if (temp_min.textContent.toLowerCase() === arr1[index].textContent.toLowerCase()) {
                arr1.splice(index, 1);
            }
        }
    }
    for(let j = 0; j < arr2.length; j++){
        lol.appendChild(arr2[j]);
        // listAdd.removeChild(arr2[j]);
    }
    // console.log(arr2);
    // for (let i = 0; i < arrrr.length; i++){
    //     console.log(arrrr[i].textContent);
    // }
}  