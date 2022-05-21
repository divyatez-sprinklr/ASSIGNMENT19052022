import data from "./data.js";

var selectedIndex=0;

const element = document.createElement("img");
const editNameInput = document.createElement("textarea");
const mainContainer = document.querySelector(".selection-container"); 
const viewContainer = document.querySelector(".view-container");
const editContainer = document.querySelector('.edit-container');
editNameInput.setAttribute("id","nameField");



function isEllipsisActive(e) {
    return (e.offsetWidth < e.scrollWidth);
}


function handleOverFlow(index){

    const selectionItemTitleContainer = document.getElementById(`selectionItemElementID${index}`);
    if(isEllipsisActive(selectionItemTitleContainer))
    {
        var name = data[index].title;
        var front="",back="";
        var len = name.length;
        for(var i=0;i<len/2;i++)
        {
            front = front + name[i];
            back = name[len-i-1] + back;
            selectionItemTitleContainer.innerText = front + "1111111" +back;
            if(isEllipsisActive(selectionItemTitleContainer)){
                selectionItemTitleContainer.innerText = front + "..." +back;
                break;
            }

                
        }
    }
}




function createElementHTML(index,title,previewImage)
{
    return `<div class="selection-item-element">
    <img class="selection-item-element-image" src="${previewImage}" alt="" >
    </div>
    <div class="selection-item-element sampleDiv" id="selectionItemElementID${index}">
        ${title}
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
}


function addInitalElements(){
    const selectionItem = document.getElementById("selection-container");
    selectionItem.innerHTML = "";
    
    data.map((item, index) => {
        
        let newItem = document.createElement("div");
    
        newItem.classList.add('selection-item');
        newItem.innerHTML = createElementHTML(index,item.title,item.previewImage);
       
        newItem.setAttribute("id",`selectedItem${index}`);
        newItem.onclick = () => toggleSelected(index);
        selectionItem.appendChild(newItem);
    });

    for(var i=0;i<data.length;i++)
        handleOverFlow(i);

    editNameInput.style.display="block";
    editNameInput.setAttribute("type","text");
    editNameInput.oninput=(event) =>{'this.style.height = "";this.style.height = this.scrollHeight + "px"'};
    editNameInput.style.overflow = `hidden`;
    editNameInput.style.resize = `none`;
    
    editNameInput.onkeypress = (event)=> {
        if(event.keyCode==13){onPressEnter();}
        else{handleEditName(selectedIndex);}
    };
    
    viewContainer.prepend(element);
    
    editContainer.append(editNameInput);
    editContainer.style.borderColor ="transparent";
    editContainer.onclick = ()=> {editNameInput.focus();

};
}

document.addEventListener("keydown", function(event) {
    if(event.keyCode==38){
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
   
    document.getElementById(`selectionItemElementID${index}`).innerText = editNameInput.value;
    data[index].title = editNameInput.value;
    handleOverFlow(index);
}

function onPressEnter(){
    handleEditName(selectedIndex);
    document.activeElement.blur();
    editContainer.style.borderColor ="transparent";
}


function resizeInput() {
    this.style.width = this.value.length + "ch";
    this.style.height = "auto";
    this.style.height = (this.scrollHeight) + "px";
}

function main(){
    selectedIndex=0;
    addInitalElements();
    toggleSelected(0);
    editNameInput.addEventListener('input', resizeInput);
    
    editNameInput.addEventListener('focus', ()=>{
    editContainer.style.borderColor ="#0453c8";
    }); 

    document.getElementById('nameField').addEventListener('input', function(event){
        handleEditName(selectedIndex);
    });

    
}

main();
