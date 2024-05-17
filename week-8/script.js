// IEFE
(()=> {
    // state variable
    let toDoListArray = [];
    // ui variable
    const form = document.querySelector(".form");
    const input = document.querySelector(".form__input");
    const ul = document.querySelector(".toDoList");

    // event listeners
    form.addEventListener("submit", (e)=>{
        // prevent default behaviour - page reload
        e.preventDefault();
        // give item a unique id
        let itemId = String(Date.now());
        // assign or get input vlue
        let toDoItem =  input.value;
        // pass id and item into function
        addItemToDOM(itemId, toDoItem);
        addItemToArray(itemId, toDoItem);
        // clear the input box (this is the default behavior that we remove)
        input.value = "";
    });

    ul.addEventListener("click", (e)=> {
        let id = e.target.getAttribute("data-id");
        if(!id) return; // user clicked into something else
        // pass id through to function
        removeItemFromDOM(id);
        removeItemFromArray(id);        
    });

    // functions

    function addItemToDOM(itemId, toDoItem){
        // create an id
        const li = document.createElement("li");
        li.setAttribute("data-id", itemId);
        // add toDoList item to li
        li.innerText=toDoItem;
        // add li to the DOM
        ul.appendChild(li);
    }

    function addItemToArray(itemId, toDoItem){
        // add item to array as an object with an id so we can find and delete it later
        toDoListArray.push({ itemId, toDoItem });
        console.log(toDoListArray);
    }

    function removeItemFromDOM(id){
        // get the list item by data id
        var li = document.querySelector('[data-id="'+ id+'"]');
        // remove list item
        ul.removeChild(li);
    }

    function removeItemFromArray(id){
        // create a new toDoListArray with all li's that don't match the ID
        toDoListArray = toDoListArray.filter((item)=> item.itemId !== id);
        console.log(toDoListArray);
    }
})();