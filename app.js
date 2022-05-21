import data from "./data.js";

var selectedIndex;

const element = document.createElement("img");
const editNameInput = document.createElement("textarea");
const mainContainer = document.querySelector(".selection-container"); 
const viewContainer = document.querySelector(".view-container");
const editContainer = document.getElementById('edit-container');

function cropTitle(name){
    if(name.length>30)
    {
        var tmp = name.substr(0,15) +"..."+name.substr(name.length-15,15);
        return tmp;
    }
    else
        return name;
}




function createElementHTML(title,previewImage)
{
    return `<div class="selection-item-element">
    <img class="selection-item-element-image" src="${previewImage}" alt="" >
</div>
<div class="selection-item-element">
    <p>${cropTitle(title)}</p>
</div>`;
}

function handleViewImage(newIndex){
    element.setAttribute("src", data[newIndex].previewImage);
    editNameInput.value = data[newIndex].title;
    editNameInput.style.width = `${data[newIndex].title.length}ch`;
    
}

function handleActiveItem(previousIndex,newIndex)
{
    document.getElementById(`selectedItem${previousIndex}`).style.backgroundColor = 'transparent';
    document.getElementById(`selectedItem${previousIndex}`).style.color = 'black';
    document.getElementById(`selectedItem${newIndex}`).style.backgroundColor = '#0453c8';
    document.getElementById(`selectedItem${newIndex}`).style.color = 'white';
    element.setAttribute("src", data[newIndex].previewImage);
}


function toggleSelected(index){

    handleActiveItem(selectedIndex,index);
    handleViewImage(index);
    selectedIndex = index;
    console.log("Clicked"+index);
}


function addInitalElements(){
    const selectionItem = document.getElementById("selection-container");
    selectionItem.innerHTML = "";
    
    data.map((item, index) => {
        
        let newItem = document.createElement("div");
    
        newItem.classList.add('selection-item');
        newItem.innerHTML = createElementHTML(item.title,item.previewImage);
        newItem.setAttribute("id",`selectedItem${index}`);
        newItem.onclick = () => toggleSelected(index);
        selectionItem.appendChild(newItem);
    });

    editNameInput.style.display="block";
    editNameInput.setAttribute("type","text");
    editNameInput.oninput=(event) =>{'this.style.height = "";this.style.height = this.scrollHeight + "px"'};
    editNameInput.style.overflow = `hidden`;
    editNameInput.style.resize = `none`;
    

    editNameInput.onkeypress = (event)=> {
        if(event.keyCode==13){handleEditName(selectedIndex);}
    };
    viewContainer.prepend(element);
    viewContainer.append(editNameInput);
}

document.addEventListener("keydown", function(event) {
    if(event.keyCode==38){
        console.log("Up key");
        if(selectedIndex==0) toggleSelected(data.length-1);
        else toggleSelected(selectedIndex-1);
    }
    else if(event.keyCode==40){
        if(selectedIndex==data.length-1) toggleSelected(0);
        else toggleSelected(selectedIndex+1);
    }   
});


 function handleEditName(index)
 {
    
    var editedItem = document.getElementById(`selectedItem${index}`);
    
    data[index].title = editNameInput.value;
    editedItem.innerHTML = createElementHTML(data[index].title,data[index].previewImage);

    document.activeElement.blur();
 }


function resizeInput() {
    this.style.width = this.value.length + "ch";
    this.style.height = "auto";
    this.style.height = (this.scrollHeight) + "px";
}
  
editNameInput.addEventListener('input', resizeInput); 
 
function main(){
    selectedIndex=0;
    addInitalElements();
    toggleSelected(0);
}
main();
