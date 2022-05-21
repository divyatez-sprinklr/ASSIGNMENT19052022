import data from "./data.js";

var selectedIndex,selectedItem,selectedItemLink;

const element = document.createElement("img");
const editNameInput = document.createElement("input");
const viewImageName = document.createElement("p"); 
const mainContainer = document.querySelector(".selection-container"); 

const editContainer = document.getElementById('edit-container');
var toggle;

function cropTitle(name){
    if(name.length>30)
    {
        var tmp = name.substr(0,15) +"..."+name.substr(name.length-15,15);

        return tmp;
    }
    else
        return name;
}

function editImg(newSelected){
    selectedIndex = newSelected;
    element.setAttribute("src", data[selectedIndex].previewImage);
    viewImageName.innerText = data[selectedIndex].title;
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

function createElementHTML2(title,previewImage)
{
    return `div class="selection-item-element">
    <img class="selection-item-element-image" src="${previewImage}" alt="" >
</div>
<div class="selection-item-element">
    <p>${cropTitle(title)}</p>
</div>`;
}


function setSelected(index, item , link)
{
    [selectedIndex,selectedItem,selectedItemLink] = [index, item, link];
}

function toggleSelected(index){
    document.getElementById(`selectedItem${selectedIndex}`).style.backgroundColor = 'transparent';
    editImg(index)
    document.getElementById(`selectedItem${selectedIndex}`).style.backgroundColor = '#0453c8';
    console.log("Clicked"+index);
}

function addInitalElements(){
    const selectionItem = document.getElementById("selection-container");
    selectionItem.innerHTML = "";
    
    data.map((item, index) => {
        
        let newItem = document.createElement("div");
        if(index==0)
        {
            setSelected(index,newItem,item.previewImage);   
        }

        newItem.classList.add('selection-item');
        newItem.innerHTML = createElementHTML(item.title,item.previewImage);
        newItem.setAttribute("id",`selectedItem${index}`);
        newItem.onclick = () => toggleSelected(index);
        selectionItem.appendChild(newItem);
  });
}

document.addEventListener("keydown", function(event) {
    if(event.keyCode==38){
        console.log("Up key");
        if(selectedIndex==0)
        {
            toggleSelected(data.length-1);
        }
        else
            toggleSelected(selectedIndex-1);
    }
    else if(event.keyCode==40){
        if(selectedIndex==data.length-1)
        {
            toggleSelected(0);
        }
        else
            toggleSelected(selectedIndex+1);
    }   
});


 function handleEditName()
 {
    
    var editedItem = document.getElementById(`selectedItem${selectedIndex}`);
    console.log(editedItem);
    
    data[selectedIndex].title = editNameInput.value;
    viewImageName.innerText = data[selectedIndex].title;
    editedItem.innerHTML = `<div class="selection-item-element">
    <img class="selection-item-element-image" src="${data[selectedIndex].previewImage}" alt="" >
</div>
<div class="selection-item-element">
    <p>${cropTitle(data[selectedIndex].title)}</p>
</div>`;
    editContainer.removeChild(editContainer.children[1]);
    editContainer.prepend(viewImageName);
    //editContainer.innerHTML = viewImageName;
    //console.log("Edit closed"); 
    toggle = false;
 }

function handleViewName(){
    editContainer.removeChild(editContainer.children[1]);
    editContainer.prepend(editNameInput);
    console.log(editNameInput);
    editNameInput.value = data[selectedIndex].title;
    toggle = true;
}

function main(){
    addInitalElements();

    selectedIndex=0;
    toggle = false;
    document.getElementById(`selectedItem${selectedIndex}`).style.backgroundColor = '#0453c8';
    const viewContainer = document.querySelector(".view-container");
    element.setAttribute("src", data[0].previewImage);
    viewImageName.style.display="block";
    editNameInput.style.display="block";
    console.log(editContainer);
    
    editContainer.innerHTML = `<p>${data[0].title}</p>`;
    
    //viewImageName.innerText = data[0].title;
    //editNameInput.value = data[0].title;

    editContainer.onclick = ()=> handleViewName();

    editContainer.onkeypress = (event)=> {
        if(event.keyCode==13&&toggle){handleEditName();}
    };
    
   // editNameInput.style.display="none";
    
    viewContainer.prepend(element);
    // viewContainer.append(viewImageName);
    // viewContainer.append(editNameInput);

}
main();
