const inputElement1 = document.getElementById('input')
const ulElement = document.getElementById('list')
const actionPanel1 = document.getElementById('actionPanel1')
const actionPanel2 = document.getElementById('actionPanel2')


let todoList = []
// upgradeView()
actionPanel2.style.display = 'none'

inputElement1.addEventListener('keydown', Event => {
    if (Event.key  === 'Enter'){
        todoList.unshift({
            content: inputElement1.value,
            Done: false,
            Remove: false,
            selected: false
        })
        inputElement1.value = ''

        upgradeView()
    }
})


function upgradeView(){
    ulElement.innerHTML = ''

    for(let index = 0; index<todoList.length; index++) {
        const todoItem = todoList [index]

        const liElement = document.createElement('li')
        ulElement.append(liElement)
        liElement.className = 'list-group-item'

        const divElement = document.createElement('div')
        liElement.append(divElement)
        divElement.className = 'form group form-check'

        const inputCheckboxElement = document.createElement('input')
        divElement.append(inputCheckboxElement)
        inputCheckboxElement.className = 'form-check-input'
        inputCheckboxElement.type = 'checkbox'
        inputCheckboxElement.id = 'todoItem' + index
        inputCheckboxElement.checked = todoItem.selected

        const labelElement = document.createElement('label')
        labelElement.className = 'form-check-label'
        if(todoItem.Done){
            labelElement.className += ' todoDone'
        }
        labelElement.setAttribute('for', 'todoItem' + index)
        labelElement.innerText = todoItem.content
        divElement.append(labelElement)

        if(!todoItem.Done){
            const buttonPrimaryElement = document.createElement('button')
            divElement.append(buttonPrimaryElement)
            buttonPrimaryElement.type = 'button'
            buttonPrimaryElement.className = 'btn btn-outline-primary'
            buttonPrimaryElement.innerText = 'Done'
            buttonPrimaryElement.style = 'float: right'

            buttonPrimaryElement.addEventListener('click', ()=>{
                todoItem.Done = !todoItem.Done
                upgradeView()
            })
        }else{
            const buttonDangerElement = document.createElement('button')
            divElement.append(buttonDangerElement)
            buttonDangerElement.type = 'button'
            buttonDangerElement.className = 'btn btn-outline-danger'
            buttonDangerElement.innerText = 'Remove'
            buttonDangerElement.style = 'float: right'

        buttonDangerElement.addEventListener('click', ()=>{
        todoList = todoList.filter(
            currentTodoItem => currentTodoItem !==todoItem
            )
            upgradeView()
        })
    }
    inputCheckboxElement.addEventListener('change', ()=>{
    todoItem.selected = inputCheckboxElement.checked
    })
    }
    const someSelected = todoList.some(todoItem => todoItem.selected)
    if(someSelected){
        actionPanel1.style.display = 'none'
        actionPanel2.style.display = 'block'
    }else{
        actionPanel1.style.display = 'flex'
        actionPanel2.style.display = 'none'
    }
}






document.getElementById('doneAction').addEventListener('click', ()=>{
    for(const todoItem of todoList){
        if(todoItem.selected){
            todoItem.Done = true
            todoItem.selected = false
        }
    }
    upgradeView()
})
document.getElementById('restoreAction').addEventListener('click', ()=>{
    for(const todoItem of todoList){
        if(todoItem.selected){
            todoItem.Done = false
            todoItem.selected = false
        }
    }
    upgradeView()
})
document.getElementById('removeAction').addEventListener('click', ()=>{
    todoList = todoList.filter(todoItem=>!todoItem.selected)

    upgradeView()
})

document.getElementById('test').addEventListener('click', ()=>{
    for(const todoItem of todoList){
        todoItem.selected = true
    }
    upgradeView()
})