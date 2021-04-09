const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// icons

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

//showing variables
let LIST, id;

// get item from local storage
let data = localStorage.getItem("TODO");

//check if data is empty
if(data){
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}else {
    LIST = [];
    id = 0;
}
//load items to display

function loadList(array){
    array.forEach(function(item){
    addToDo(item.name, item.id, item.done, item.trash)
});
}
// clear local storage
clear.addEventListener("click", function(){
    localStorage.clear();
    location.reload();
});

//To display date

const options = {weekday:"long", month:"short", day:"numeric"};
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

//todo function

function addToDo(toDo, id, done, trash){

    if (trash){return; }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";

    const item = `
                    <li class="item">   
                        <i class="fa ${DONE} co" job="complete" id= "${id}"></i>
                        <p class= "text ${LINE}"> ${toDo}</p>
                        <i class= "fa fa-trash-o de" job= "delete" id= "${id}"></i>
                    </li>
                `;
    const position = "beforeend";

    list.insertAdjacentHTML(position, item);
}

//to add an item to todo

document.addEventListener("keyup",function(event){
    if (event.keyCode == 13){
        const toDo = input.value;

        //if the input bar is not empty

        if(toDo){
            addToDo(toDo, id, false, false);
            LIST.push({
                name : toDo,
                id : id,
                done : false,
                trash : false

            });
            //add item to localstorage
            localStorage.setItem("TODO", JSON.stringify(LIST));
            id++;
        }
        input.value = "";
    }
})

//complete todo

function completeToDo(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do

function removeToDo(element){
    element.parentNode.parentNode.removeChild(element.parentNode);

    LIST[element.id].trash = true;
}
//targetting items

list.addEventListener("click", function(event){
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if(elementJob == "complete"){
        completeToDo(element);

    }else if(elementJob == "delete"){
        removeToDo(element);
    }
    //add item to localstorage
    localStorage.setItem("TODO", JSON.stringify(LIST));
});
