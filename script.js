const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let todos = JSON.parse(localStorage.getItem('todos')) || []

function renderTodo(todo) {
	return `
    <li class="list-group-item">
      <input 
        type="checkbox" 
        class="form-check-input me-2" 
        id="${todo.id}" 
        ${todo.completed ? 'checked' : ''} 
        onChange="checkTodo(${todo.id})"
      />
      <label for="${todo.id}">
        <span class="${todo.completed ? 'text-success text-decoration-line-through' : ''}">
          ${todo.text}
        </span>
      </label>
      <button 
        class="btn btn-danger btn-sm float-end" 
        onClick="deleteTodo(${todo.id})"
      >
        delete
      </button>
    </li>
  `
}

function render() {
	const html = todos.map(todo => renderTodo(todo)).join('')
	list.innerHTML = html
	updateCounter()
	saveToLocalStorage()
}

function updateCounter() {
	const totalCount = todos.length
	const uncheckedCount = todos.filter(todo => !todo.completed).length

	itemCountSpan.textContent = totalCount
	uncheckedCountSpan.textContent = uncheckedCount
}

function newTodo() {
	const title = prompt('Введіть назву справи:')

	if (title && title.trim() !== '') {
		const todo = {
			id: Date.now(),
			text: title,
			completed: false
		}

		todos.push(todo)
		render()
	}
}

function deleteTodo(id) {
	todos = todos.filter(todo => todo.id !== id)
	render()
}

function checkTodo(id) {
	todos = todos.map(todo => {
		if (todo.id === id) {
			return { ...todo, completed: !todo.completed }
		}
		return todo
	})
	render()
}

function saveToLocalStorage() {
	localStorage.setItem('todos', JSON.stringify(todos))
}

render()
