const todoInputElement = document.querySelector('.todo-input');
const todoEnterBtn = document.querySelector('.enter');
const todoList = document.querySelector('.todo-list');
const leftItem = document.querySelector('.left-items');

let todos = []; // todo를 모아놓은 객체 배열 {id, content, isCompleted}
let id = 0; // todo 객체의 id가 될 숫자
let isCompleted = false;

const setTodos = (newTodos) => todos = newTodos;

const createTodo = () => {

    todoInputElement.addEventListener('keypress', (e)=>{
        if(e.key == 'Enter'){
            pushTodo(e.target.value);
            todoInputElement.value = "";
        }
    });

    todoEnterBtn.addEventListener('click', ()=>{
        pushTodo(todoInputElement.value);
        todoInputElement.value = "";
    });

};


const pushTodo = (content) => {
    if (content != ''){
        const newId = id++;

        const newTodos = [...todos, {
            id : newId,
            content : content,
            isCompleted : false
        }];

        setTodos(newTodos);
        paintTodos();
    }
    else {
        alert("할 일을 입력해주세요.");
    }

};

const completeTodo = (todoId) => {
    const newTodos = todos.map(todos => (todos.id == todoId) ? {...todos,  isCompleted: !todos.isCompleted} : todos);
    todos = newTodos;

    paintTodos();
    
};

const deleteTodo = (todoId) => {
    const newTodos = todos.filter(todos => todos.id != todoId);
    todos = newTodos;

    paintTodos();

};

const updateTodo = (e, todoId) =>{
    const inputElement = e.target.parentNode.children[1];
    inputElement.classList.add('visible');

    let content = e.target.innerHTML;

    inputElement.value = content;
    
    inputElement.addEventListener('keypress', (e)=>{
        if(e.key == 'Enter'){
            content = inputElement.value;
            const newTodos = todos.map(todo => (todoId === todo.id ? {... todo, content} : todo ));
            todos = newTodos;
            inputElement.classList.remove('visible');
            // console.log(todos);
            paintTodos();
        }
    });
};


const setLeftItem = () => {
    const leftTodos = todos.filter(todos => todos.isCompleted == false);
    leftItem.innerHTML = `오늘 할 일이 ${leftTodos.length}개 남아있습니다.`;
    
}


const paintTodos = () => {
    todoList.innerHTML = null; // todoList안의 html 초기화
    todos.forEach(todos => paint(todos)); // todos를 paint에 넣음
};

const paint = (todos) => { 

    const liElement = document.createElement('li');
    liElement.classList.add('todo-item'); 

    // const inputElement = document.createElement('input');
    // inputElement.classList.add('edit-input'); 

    const checkBtn = document.createElement('button');
    checkBtn.classList.add('checkbox');
    checkBtn.innerHTML = '✔︎';
    checkBtn.addEventListener('click', () => completeTodo(todos.id));

    if(todos.isCompleted){
        liElement.classList.add('checked');
    }

    const content = document.createElement('div');
    content.classList.add('content');
    content.innerHTML = todos.content;
    content.addEventListener('dblclick', (e)=> updateTodo(e, todos.id));


    const delBtn = document.createElement('button');
    delBtn.classList.add('delBtn'); 
    delBtn.innerHTML = '✕';
    delBtn.addEventListener('click', () => deleteTodo(todos.id));

    liElement.appendChild(checkBtn); 
    // liElement.appendChild(inputElement);
    liElement.appendChild(content);
    liElement.appendChild(delBtn);

    todoList.appendChild(liElement);

    setLeftItem();
};


createTodo();