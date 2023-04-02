var todoInput = document.querySelector("#todo-input");
var addTodoBtn = document.querySelector(".btn.btn-success");
var todoForm = document.querySelector(".card-body")
var todoFilter = document.querySelector("#todo-filter");
var todoList = document.querySelector("#todo-list");
var deleteAllTodos = document.querySelector(".btn.btn-danger");

var todosData = [];

addTodoBtn.addEventListener("click", addTodo);
todoList.addEventListener("click", removeTodo)
deleteAllTodos.addEventListener("click", deleteAllTodo)
todoFilter.addEventListener("keyup", searchTodo)


function showAlert(type, message) {

    var divEl = document.createElement("div");
    divEl.className = `alert ${type} my-3`
    divEl.textContent = `${message}`
    divEl.role = "alert"
    todoForm.appendChild(divEl)

    setTimeout(() => {
        divEl.remove()
    }, 2000);
}

function addTodo() {

    var value = todoInput.value.toLowerCase().trim()

    if (value) {
        addTodoToUI(value)
        showAlert("alert-success", "ToDo Added with Successful")
    } else {
        showAlert("alert-danger", "Please, Enter the valid value...")
    }

}

function searchTodo(e) {

    var filterTodos = e.target.value.toLowerCase();
    var lists = document.querySelectorAll(".list-group-item");

    lists.forEach(list => {
        var filterList = list.textContent.toLowerCase()

        if (filterList.indexOf(filterTodos) === -1) {
            list.style = "display: none !important"
        } else {
            list.style = "display: block"
        }
    })

}


function deleteAllTodo() {


    if (confirm("Attention! You will delete all of data...")) {
        while (todoList.firstChild != null) (
            todoList.removeChild(todoList.firstChild)
        )
        showAlert("alert-success", "Deleted All of The Todos Successfully...")
    }

    todosData.splice(0, todosData.length)
}

function removeTodo(e) {
    var closeBtn = e.target.className;


    if (closeBtn === "fa-solid fa-square-xmark fs-4 text-primary") {
        e.target.parentNode.remove();
        var textInfo = e.target.parentNode.textContent;

        todosData.map((_, index) => {
            if (todosData[index] === textInfo) {
                todosData.splice(index, 1)
            }
        })
        showAlert("alert-success", "Delete Successfully...")
    }


}

function addTodoToUI(newValue) {

    /* <ul class="list-group mb-2">
    <li class="list-group-item d-flex justify-content-between">A second item
        <i class="fa-solid fa-square-xmark fs-4 text-primary" style="cursor:pointer"></i>
    </li>
</ul> */

    var ulEl = document.createElement("ul")
    ulEl.className = "list-group mb-2"
    var liEl = document.createElement("li");
    liEl.className = "list-group-item d-flex justify-content-between"
    liEl.textContent = `${newValue}`
    var iEl = document.createElement("i")
    iEl.className = "fa-solid fa-square-xmark fs-4 text-primary"
    iEl.style = "cursor:pointer"

    liEl.appendChild(iEl)
    ulEl.appendChild(liEl)
    todoList.appendChild(ulEl)
    console.log(todoList);

    todosData.push(todoInput.value)
    todoInput.value = ""

}