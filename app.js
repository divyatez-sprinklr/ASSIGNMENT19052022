import data from "./data.js";

var selectedIndex,selectedItem,selectedItemLink;

const element = document.createElement("img");
const editNameInput = document.createElement("input");
const mainContainer = document.querySelector(".selection-container"); 
const viewImageName = document.createElement("p"); 


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
    viewImageName.style.display="block";
    editNameInput.style.display="none";
    var editedItem = document.getElementById(`selectedItem${selectedIndex}`);
    console.log(editedItem);
    
    //createElementHTML(editNameInput.value ,data[selectedIndex]);
    data[selectedIndex].title = editNameInput.value;
    viewImageName.innerText = data[selectedIndex].title;
    editedItem.innerHTML = `<div class="selection-item-element">
    <img class="selection-item-element-image" src="${data[selectedIndex].previewImage}" alt="" >
</div>
<div class="selection-item-element">
    <p>${cropTitle(data[selectedIndex].title)}</p>
</div>`;
    //console.log("Edit closed"); 
 }

function handleViewName(){
    viewImageName.style.display="none";
    editNameInput.style.display="block";
    editNameInput.value = data[selectedIndex].title;
}

function main(){
    addInitalElements();
    selectedIndex=0;
    document.getElementById(`selectedItem${selectedIndex}`).style.backgroundColor = '#0453c8';
    const viewContainer = document.querySelector(".view-container");
    element.setAttribute("src", data[0].previewImage);
    viewImageName.innerText = data[0].title;
    editNameInput.value = data[0].title;

    viewImageName.onclick = ()=> handleViewName();

    editNameInput.onkeypress = (event)=> {
        if(event.keyCode==13){handleEditName();}
    };
    
    editNameInput.style.display="none";
    
    viewContainer.append(element);
    viewContainer.append(viewImageName);
    viewContainer.append(editNameInput);


    

}
main();
