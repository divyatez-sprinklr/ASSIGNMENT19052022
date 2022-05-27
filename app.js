import data from "./data.js";

var selectedIndex=0;
var overflowVariable;
const selectedItemImage = document.createElement("img");
const selectedItemTitleTextField = document.createElement("textarea");
const viewContainer = document.querySelector(".view-container");
const selectedItemDetailsContainer = document.querySelector('.edit-container');
const mainContainer = document.querySelector('.main-container');

const selectionContainer = document.getElementById('selection-container');
selectedItemTitleTextField.setAttribute("id","nameField");



function isEllipsisActive(e) {
    return (e.offsetWidth < e.scrollWidth);
}

/**
 * Handle overflow using custom function
 * @param {var} index 
 */
function handleTextOverflow(index){

    const selectionItemTitleContainer = document.getElementById(`selectionItemElementID${index}`);

    // if(isEllipsisActive(selectionItemTitleContainer))
    // {
        var itemTitle = data[index].title;
        var front="",back="";
        var itemLength = itemTitle.length;
        var flag = true;
        for(var i=0;i<itemLength/2;i++)
        {
            front = front + itemTitle[i];
            back = itemTitle[itemLength-i-1] + back;
            selectionItemTitleContainer.innerText = front + "1111111" +back;
            if(isEllipsisActive(selectionItemTitleContainer)){
                selectionItemTitleContainer.innerText = front + "..." +back;
                flag = false;
                break;
            }
                
        }
        if(flag)
        {
            selectionItemTitleContainer.innerText = data[index].title;
        }
    //}
}



/**
 * Create Items for selection
 * 
 * @param {var} index 
 * @param {var} title 
 * @param {var} previewImage 
 * @returns 
 */
function createElementHTML(index,title,previewImage)
{
    return `<div class="selection-item-element">
                <img class="selection-item-element-image" src="${previewImage}" alt="" >
            </div>
            <div class="selection-item-element sampleDiv" id="selectionItemElementID${index}">
                ${title}
            </div>`;
}

/**
 * Update selected index image 
 * @param {var} newIndex 
 */
function handleViewImage(newIndex){
    selectedItemImage.setAttribute("src", data[newIndex].previewImage);
    selectedItemTitleTextField.value = data[newIndex].title;
    selectedItemTitleTextField.style.width = `${data[newIndex].title.length}ch`;
    
}

/**
 * Unselect previous index
 * Select new index
 * @param {var} previousIndex 
 * @param {var} newIndex 
 */
function handleActiveItem(previousIndex,newIndex)
{
    document.getElementById(`selectionItem${previousIndex}`).style.backgroundColor = 'transparent';
    document.getElementById(`selectionItem${previousIndex}`).style.color = 'black';

    document.getElementById(`selectionItem${newIndex}`).style.backgroundColor = '#0453c8';
    document.getElementById(`selectionItem${newIndex}`).style.color = 'white';
    selectedItemImage.setAttribute("src", data[newIndex].previewImage);
}

/**
 * 
 * @param {var} index 
 */
function toggleItemSelection(index){

    handleActiveItem(selectedIndex,index);
    handleViewImage(index);
    selectedIndex = index;
}

/**
 * This is Initial Elements
 * create items
 * Handle overflow
 * 
 */
function createInitialElements(){

    const selectionItem = document.getElementById("selection-container");
    selectionItem.innerHTML = "";
    
    //Create Elements
    data.map((item, index) => {
        
        let newItem = document.createElement("div");
    
        newItem.classList.add('selection-item');
        newItem.innerHTML = createElementHTML(index,item.title,item.previewImage);
       
        newItem.setAttribute("id",`selectionItem${index}`);
        newItem.onclick = () => toggleItemSelection(index);
        selectionItem.appendChild(newItem);
    });

    //Handle Overflow for each element
    for(var i=0;i<data.length;i++)
        handleTextOverflow(i);

    //Enable Attributes for titleTextfield
    selectedItemTitleTextField.style.display="block";
    selectedItemTitleTextField.setAttribute("type","text");
    selectedItemTitleTextField.oninput=(event) =>{'this.style.height = "";this.style.height = this.scrollHeight + "px"'};
    selectedItemTitleTextField.style.overflow = `hidden`;
    selectedItemTitleTextField.style.resize = `none`;

    //Handle keypress for titleTestfield
    selectedItemTitleTextField.onkeypress = (event)=> {
        if(event.keyCode==13){onPressEnter();}
        else{handleEditedTitle(selectedIndex);}
    };
    
    //Append Image Container
    viewContainer.prepend(selectedItemImage);
    
    //Append Title
    selectedItemDetailsContainer.append(selectedItemTitleTextField);
    selectedItemDetailsContainer.style.borderColor ="transparent";
    selectedItemDetailsContainer.onclick = ()=> {selectedItemTitleTextField.focus();
    handleResponsive();
};
}


/**
 * This is to handle keyup and dekdown
 */
document.addEventListener("keydown", function(event) {
    if(event.keyCode==38){
        event.preventDefault();
        if(selectedIndex==0) toggleItemSelection(data.length-1);
        else toggleItemSelection(selectedIndex-1);
    }
    else if(event.keyCode==40){
        event.preventDefault();
        if(selectedIndex==data.length-1) toggleItemSelection(0);
        else toggleItemSelection(selectedIndex+1);
    }   
});


function handleEditedTitle(index)
{
    /** 
     * Update changed title to data.
     * Check overflow condition and update accordingly.
    */
    document.getElementById(`selectionItemElementID${index}`).innerText = selectedItemTitleTextField.value;
    data[index].title = selectedItemTitleTextField.value;
    handleTextOverflow(index);
}

function onPressEnter(){
    /*
        Input , on pressing enter
        1) Handle Edited tile. Not necessary , just for exceptions
        2) Remove focus from textarea
        3) Remove border from container
    */
    handleEditedTitle(selectedIndex);
    document.activeElement.blur();
    selectedItemDetailsContainer.style.borderColor ="transparent";
}


function handleResizeInput() {
    /*
        While typing, the input width and height gets changed.
    */ 
    this.style.width = this.value.length + "ch";
    // if(overflowVariable==false){
    //     this.style.height = "auto";
    //     this.style.height = (this.scrollHeight) + "px";
    // }
}

function handleResponsiveOverflow()
{
    overflowVariable = true;
    //mainContainer.setAttribute("style","flex-direction :'column-reverse';");
    mainContainer.style.flexDirection = 'column-reverse';
    viewContainer.style.width = "100%";
    viewContainer.style.height =  "60vh";
    viewContainer.style.justifyContent = "center";
    selectionContainer.style.display="flex";
    selectionContainer.style.flexDirection="column";

    //viewContainer.style = {width:}


    selectedItemImage.style.objectFit = "contain";
    selectedItemImage.style.height = "80%";
    selectedItemTitleTextField.style.overflow="scroll";
    const selectionItem= document.querySelectorAll('.selection-item');
    // selectionContainer.style.width = "100%";
    selectionContainer.style.justifyContent="center";
    selectionContainer.style.alignItems="center";
    
    for(var i=0;i<selectionItem.length;i++){
        selectionItem[i].style.width ="90%";
        selectionItem[i].style.justifyContent="center";
    }
}

function handleResponsiveUnderflow()
{
    overflowVariable = false;
    viewContainer.style.width = "540px";
    viewContainer.style.height = "80vh";
    selectedItemImage.style.objectFit = "cover";
    selectedItemImage.style.height = "80vh";
    mainContainer.style.flexDirection = 'row';

  
    selectedItemTitleTextField.style.overflow="scroll";
    selectionContainer.style.display="inline";
}

function handleResponsive(event) {
    console.log(window.innerHeight + " "+ window.innerWidth);
    if(window.innerWidth<900)
    {
        handleResponsiveOverflow();  
    }
    else 
    {
        handleResponsiveUnderflow();
    }
    for(var i=0;i<data.length;i++)
        handleTextOverflow(i);
}

function main(){

    overflowVariable = false;
    selectedIndex=0;
    createInitialElements();
    toggleItemSelection(0);
    


    selectedItemTitleTextField.addEventListener('input', handleResizeInput);
    selectedItemTitleTextField.addEventListener('focus', ()=>{
        selectedItemDetailsContainer.style.borderColor ="#0453c8";
    }); 

    document.getElementById('nameField').addEventListener('input', function(event){
        handleEditedTitle(selectedIndex);
    });

    window.addEventListener('resize', handleResponsive , true);
    handleResponsive();
    
 }

main();
