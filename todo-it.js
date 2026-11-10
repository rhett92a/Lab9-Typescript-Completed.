"use strict";
console.log("TodoIt");
// Create an empty array to store todo items
var todoList = [];
console.log("Current todo list: ", todoList);
// Get the input field from the HTML page
var todoInput = document.getElementById('todoInput');
// Get the div that displays the todo list
var todoListDiv = document.getElementById('todoListContainer');
// Add a new todo item
function addTodo() {
    // Check if the input field exists
    if (todoInput == null) {
        console.error('The todo input is missing from the page!');
        return;
    }
    // Get the value from the input
    var newTodo = todoInput.value;
    // Verify that there is text
    if ('' !== newTodo.trim()) {
        console.log('Adding todo: ', newTodo);
        // Add the new item to the list
        todoList.push(newTodo);
        console.log('New todo list: ', todoList);
        // Clear the input
        todoInput.value = '';
        // Keep the list sorted
        todoList.sort();
        // Update the list displayed on the webpage
        updateTodoList();
        // Apply the todo list filter
        filterTodoList();
    }
}
// Display the current todo list on the webpage
function updateTodoList() {
    console.log("Updating the rendered todo list");
    // Clear the previous list
    todoListDiv.innerHTML = '';
    todoListDiv.textContent = '';
    // Create an unordered list
    var ul = document.createElement('ul');
    ul.setAttribute('id', 'todoList');
    todoListDiv.appendChild(ul);
    // Create a list item for each todo
    todoList.forEach(function (item) {
        var li = document.createElement('li');
        li.setAttribute('class', 'todo-list-item');
        // Create a clickable link for the task
        var link = document.createElement('a');
        link.href = '#';
        link.textContent = item;
        // Remove the task when clicked
        link.addEventListener('click', function (event) {
            event.preventDefault();
            removeTodoListItem(item);
        });
        li.appendChild(link);
        ul.appendChild(li);
    });
}
// Filter the displayed todo list
function filterTodoList() {
    console.log("Filtering the rendered todo list");
    var todoListHtml = document.getElementById('todoList');
    if (todoListHtml === null) {
        console.log("Nothing to filter");
        return;
    }
    var todoListFilter = document.getElementById('todoFilter');
    var todoListFilterText = todoListFilter.value.toUpperCase();
    todoListHtml.childNodes.forEach(function (item) {
        var itemText = item.textContent;
        if (itemText !== null) {
            itemText = itemText.toUpperCase();
            if (itemText.startsWith(todoListFilterText)) {
                item.style.display = "list-item";
            }
            else {
                item.style.display = "none";
            }
        }
    });
}
// Remove a todo item from the list
function removeTodoListItem(itemToRemove) {
    console.log("item to remove: ", itemToRemove);
    // Create a new array without the selected item
    todoList = todoList.filter(function (value, _index, _array) {
        if (value === itemToRemove) {
            return false;
        }
        return true;
    });
    // Update the todo list
    updateTodoList();
    // Apply the todo list filter
    filterTodoList();
}
