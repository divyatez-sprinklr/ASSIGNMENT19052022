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
        newItem.onclick = () =>{ 
            document.getElementById(`selectedItem${selectedIndex}`).style.backgroundColor = 'transparent';
            editImg(index)
            selectedItem = newItem;
            document.getElementById(`selectedItem${selectedIndex}`).style.backgroundColor = '#0453c8';
            console.log("Clicked"+index);
        };

        console.log(newItem);
        selectionItem.appendChild(newItem);
  });
}

// for(var i=0;i<data.length;i++)
// {
//     let backpackArticle = document.createElement("div");
//     backpackArticle.classList.add("selection-item");
//     //backpackArticle.setAttribute("id", backpack.id);
  
//     backpackArticle.innerHTML = `<div class="selection-item">
//     <img src="${data[i].previewImage}" alt="" width="50" height="50">
//     <p class="selection-item-text">${cropTitle(data[i].title)}</p>
//     </div>`;
//     mainContainer.append(backpackArticle);
//     //backpackArticle.addEventListener("click",editImg(i));
// }
// console.log(mainContainer);
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
