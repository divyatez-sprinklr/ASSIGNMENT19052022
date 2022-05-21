import data from "./data.js";

var selectedIndex=0;

const selectedItemImage = document.createElement("img");
const selectedItemTitleTextField = document.createElement("textarea");
const viewContainer = document.querySelector(".view-container");
const selectedItemDetailsContainer = document.querySelector('.edit-container');
selectedItemTitleTextField.setAttribute("id","nameField");



function isEllipsisActive(e) {
    return (e.offsetWidth < e.scrollWidth);
}

/**
 * Handle overflow using custom function
 * @param {var} index 
 */
function handleOverFlow(index){

    const selectionItemTitleContainer = document.getElementById(`selectionItemElementID${index}`);

    if(isEllipsisActive(selectionItemTitleContainer))
    {
        var itemTitle = data[index].title;
        var front="",back="";
        var itemLength = itemTitle.length;
        for(var i=0;i<itemLength/2;i++)
        {
            front = front + itemTitle[i];
            back = itemTitle[itemLength-i-1] + back;
            selectionItemTitleContainer.innerText = front + "1111111" +back;
            if(isEllipsisActive(selectionItemTitleContainer)){
                selectionItemTitleContainer.innerText = front + "..." +back;
                break;
            }

                
        }
    }
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
    document.getElementById(`selectedItem${previousIndex}`).style.backgroundColor = 'transparent';
    document.getElementById(`selectedItem${previousIndex}`).style.color = 'black';

    document.getElementById(`selectedItem${newIndex}`).style.backgroundColor = '#0453c8';
    document.getElementById(`selectedItem${newIndex}`).style.color = 'white';
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
       
        newItem.setAttribute("id",`selectedItem${index}`);
        newItem.onclick = () => toggleItemSelection(index);
        selectionItem.appendChild(newItem);
    });

    //Handle Overflow for each element
    for(var i=0;i<data.length;i++)
        handleOverFlow(i);

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

};
}


/**
 * This is to handle keyup and dekdown
 */
document.addEventListener("keydown", function(event) {
    if(event.keyCode==38){
        if(selectedIndex==0) toggleItemSelection(data.length-1);
        else toggleItemSelection(selectedIndex-1);
    }
    else if(event.keyCode==40){
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
    handleOverFlow(index);
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
    this.style.height = "auto";
    this.style.height = (this.scrollHeight) + "px";
}

function main(){

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

    
}

main();
