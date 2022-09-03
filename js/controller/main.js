import ToDoList from "../model/ToDoLists.js";

let toDo = [];
let toComplete = [];
function getELE(id) {
    return document.getElementById(id);
}

let addTask = () => {
    let taskValue = getELE("newTask").value;
    let dataValue = getELE("date-task").value;
    let task = new ToDoList(taskValue, dataValue)
    if (taskValue == false || dataValue == false) {
        alert("Nhập Task Đi Mới Thêm Được Chứ")
    } else {
        toDo.push(task)
        setLocalStorage();
        getLocalStorage();
        getELE("newTask").value = "";
    }
}
getELE("addItem").onclick = addTask;

let renderTask = () => {
    let content = ""
    toDo.map((task, index) => {
        content += `
            <li>   
                 <p>${task.title}</p>
                 <div class="buttons">
                    <div class=" op" id="date-task">
                        <p class="date">${task.date}</p>
                    </div>
              
                    <button class="remove none " id="date"  onclick="showInputDate('${index}')">
                        <i class="fas fa-calendar-plus"></i>
                     </button>
                    <button class="remove" onclick="deleteTask('${index}')">
                        <i class="far fa-trash-alt"></i>
                    </button>
                    <button class="complete" onclick="pushComplete('${index}')">
                        <i class="fa fa-check-circle"></i>
                    </button>
                 </div> 
            </li>`
    })
    getELE("todo").innerHTML = content;
}

let deleteTask = (index) => {
    toDo.splice(index, 1);
    setLocalStorage()
    getLocalStorage()
}
window.deleteTask = deleteTask;

let pushComplete = (index) => {
    toComplete.push(toDo[index])
    toDo.splice(index, 1);
    setLocalStorage()
    getLocalStorage()
}
window.pushComplete = pushComplete;

let renderComplete = () => {
    let content = ""
    toComplete.map((complete, index) => {
        content += `
            <li>
                 <span>${complete.title}</span>
                <div class="buttons">
                    <button class="complete" onclick="deleteComplete('${index}')">
                        <i class="far fa-trash-alt"></i>
                    </button>
                    <button class="complete" onclick="prompt('Bạn Đã Làm Xong')">
                        <i class="fa fa-check-circle"></i>
                    </button>
                 </div> 
            </li> `
    })
    getELE("completed").innerHTML = content;
}

let sortUpTask = () => {
    toDo.sort(function (a, b) {
        if (a.title < b.title)
            return -1;
        if (a.title > b.title)
            return 1;
        return 0;
    });
    renderTask()
    toComplete.sort(function (a, b) {
        if (a.title < b.title)
            return -1;
        if (a.title > b.title)
            return 1;
        return 0;
    });
    renderComplete();
}
getELE("two").onclick = sortUpTask;

let sortTask = () => {
    toDo.sort(function (a, b) {
        if (a.title > b.title)
            return -1;
        if (a.title < b.title)
            return 1;
        return 0;
    });
    renderTask()
    toComplete.sort(function (a, b) {
        if (a.title > b.title)
            return -1;
        if (a.title < b.title)
            return 1;
        return 0;
    });
    renderComplete();
}
getELE("three").onclick = sortTask;

let checkTaskComplete = () => {
    getELE("todo").classList.toggle("none");
}
getELE("one").onclick = checkTaskComplete


let deleteComplete = (index) => {
    toComplete.splice(index, 1);
    setLocalStorage()
    getLocalStorage()
}
window.deleteComplete = deleteComplete;

let addDateTask = () => {
    let ad = document.querySelectorAll(".op")
    for (let index = 0; index < ad.length; index++) {
        ad[index].classList.toggle("block");
    }
}
getELE("all").onclick = addDateTask;

let setLocalStorage = () => {
    localStorage.setItem("TASK", JSON.stringify(toDo))
    localStorage.setItem("COMPLETE", JSON.stringify(toComplete));
}

let getLocalStorage = () => {
    if (localStorage.getItem("TASK") != undefined) {
        toDo = JSON.parse(localStorage.getItem("TASK"));
    }
    renderTask()
    if (localStorage.getItem("COMPLETE") != undefined) {
        toComplete = JSON.parse(localStorage.getItem("COMPLETE"));
    }
    renderComplete()
}
getLocalStorage();