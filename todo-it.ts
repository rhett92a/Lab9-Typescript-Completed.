
console.log("TodoIt");

// Create an empty array to store todo items
let todoList: string[] = [];

console.log("Current todo list: ", todoList);

// Get the input field from the HTML page
const todoInput: HTMLInputElement =
    document.getElementById('todoInput') as HTMLInputElement;

// Get the div that displays the todo list
const todoListDiv: HTMLDivElement =
    document.getElementById('todoListContainer') as HTMLDivElement;

// Add a new todo item
function addTodo(): void {
    // Check if the input field exists
    if (todoInput == null) {
        console.error('The todo input is missing from the page!');
        return;
    }

    // Get the value from the input
    const newTodo: string = todoInput.value;

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
function updateTodoList(): void {
    console.log("Updating the rendered todo list");

    // Clear the previous list
    todoListDiv.innerHTML = '';
    todoListDiv.textContent = '';

    // Create an unordered list
    const ul = document.createElement('ul');
    ul.setAttribute('id', 'todoList');
    todoListDiv.appendChild(ul);

    // Create a list item for each todo
    todoList.forEach(item => {
        const li = document.createElement('li');
        li.setAttribute('class', 'todo-list-item');

        // Create a clickable link for the task
        const link = document.createElement('a');
        link.href = '#';
        link.textContent = item;

        // Remove the task when clicked
        link.addEventListener('click', (event) => {
            event.preventDefault();
            removeTodoListItem(item);
        });

        li.appendChild(link);
        ul.appendChild(li);
    });
}

// Filter the displayed todo list
function filterTodoList(): void {
    console.log("Filtering the rendered todo list");

    const todoListHtml: HTMLUListElement =
        document.getElementById('todoList') as HTMLUListElement;

    if (todoListHtml === null) {
        console.log("Nothing to filter");
        return;
    }

    const todoListFilter =
        document.getElementById('todoFilter') as HTMLInputElement;

    const todoListFilterText = todoListFilter.value.toUpperCase();

    todoListHtml.childNodes.forEach((item) => {
        let itemText: string | null = item.textContent;

        if (itemText !== null) {
            itemText = itemText.toUpperCase();

            if (itemText.startsWith(todoListFilterText)) {
                (item as HTMLLIElement).style.display = "list-item";
            } else {
                (item as HTMLLIElement).style.display = "none";
            }
        }
    });
}

// Remove a todo item from the list
function removeTodoListItem(itemToRemove: string): void {
    console.log("item to remove: ", itemToRemove);

    // Create a new array without the selected item
    todoList = todoList.filter((value: string, _index, _array) => {
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
