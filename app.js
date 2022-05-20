import data from "./data.js";

console.log(data);

var selected = 0;

const viewContainer = document.querySelector(".view-container");
// let element = document.createElement("img");
let element = document.getElementById('view-img');
console.log("this is "+element);
element.setAttribute("src", data[0].previewImage);
element.setAttribute("height", "auto");
element.setAttribute("width", "auto");

viewContainer.append(element);

const mainContainer = document.querySelector(".selection-container"); 

console.log(mainContainer);

function cropTitle(name){
    if(name.length>12)
    {
        var tmp = name.substr(0,5) +"..."+name.substr(name.length-5,5);

        return tmp;
    }
    else
        return name;
}
console.log(cropTitle("hellohellohello"));

for(var i=0;i<data.length;i++)
{
    let backpackArticle = document.createElement("div");
    backpackArticle.classList.add("selection-item");
    //backpackArticle.setAttribute("id", backpack.id);
  
    backpackArticle.innerHTML = `<div class="selection-item">
    <img src="${data[i].previewImage}" alt="" width="50" height="50">
    <p class="selection-item-text">${cropTitle(data[i].title)}</p>
    </div>`;
    mainContainer.append(backpackArticle);
}
console.log(mainContainer);