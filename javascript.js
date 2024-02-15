const search = document.querySelector('.search input')
const todosUl = document.querySelector('.underserchbox ul')
const checkAllbutton = document.querySelector('.search button')
const countOutput = document.querySelector('footer .item1')
const Clearcompleted = document.querySelector('footer .item5 button')
const renderSetting = {
    filter: 'all'

}
let todos = [
]
function renderTodo(value) {
    const li = document.createElement('li')
    const spanName = document.createElement('span')
    spanName.innerText = value.title
    spanName.classList.add('name')
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.checked = value.checked
    checkbox.classList.add('checkbox-round')
    checkbox.addEventListener('click', function (e) {
        value.checked = e.target.checked
        renderTodos()

    })
    const spanDelete = document.createElement('button')
    spanDelete.innerHTML = '<i class="fa fa-close" style="font-size:36px; color: red;"></i>'
    spanDelete.classList.add('delete')
    spanDelete.addEventListener('click', function (e) {
        e.preventDefault()
        const index = todos.findIndex(function (todo) {
            return todo.title == value.title
        })
        todos.splice(index, 1)
        renderTodos()
    })
    li.appendChild(checkbox)
    li.appendChild(spanName)
    li.appendChild(spanDelete)
    return li
}
function renderTodos() {
    todosUl.innerHTML = ''
    for (let todo of todos) {
        if (renderSetting.filter == 'all') {
            const li = renderTodo(todo)
            todosUl.appendChild(li)
        } else if (renderSetting.filter == 'active') {
            if (todo.checked == false) {
                const li = renderTodo(todo)
                todosUl.appendChild(li)
            }
        } else {
            if (todo.checked == true) {
                const li = renderTodo(todo)
                todosUl.appendChild(li)

            }
        }
    }
    const todosCount = todos.filter(function (todo) {
        return todo.checked == false
    }).length
    countOutput.innerText = todosCount + 'item left'
    for (let button of document.querySelectorAll('.item-display button')) {
        button.classList.remove('active')
    }
    const activeFilter = document.querySelector('.item-display button[data-value=' + renderSetting.filter + ']')
    activeFilter.classList.add('active')
}
renderTodos()
search.addEventListener('keydown', function (e) {
    if (e.key == 'Enter') {
        e.preventDefault()
        const value = e.target.value
        const todo = {
            title: value,
            checked: false
        };
        todos.push(todo)
        renderTodos()

        e.target.value = ''
        document.querySelector('.underserchbox').style.display = 'block';
        document.querySelector('footer').style.display = 'block';
    }

})
checkAllbutton.addEventListener('click', function (e) {
    e.preventDefault()
    for (let todo of todos) {
        todo.checked = true
    }
    renderTodos()
})
Clearcompleted.addEventListener('click', function (e) {
    e.preventDefault()
    const unchechedtodos = todos.filter(function (todo) {
        return todo.checked == false
    })
    todos = unchechedtodos
    renderTodos()


})

for (let button of document.querySelectorAll('.item-display button')) {
    button.addEventListener('click', function (e) {
        e.preventDefault()
        const filter = e.target.dataset.value
        renderSetting.filter = filter
        renderTodos()
    })
}








