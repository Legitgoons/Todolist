const todoInputElement = document.querySelector('.todo-input');
const todoEnterBtn = document.querySelector('.enter');
const todoList = document.querySelector('.todo-list');
const leftItem = document.querySelector('.left-items');

let todos = []; // todo를 모아놓은 객체 배열 {id, content, isCompleted}
let id = 1; // todo 객체의 id가 될 숫자


const createTodo = () => {

    todoInputElement.addEventListener('keypress', (e)=>{
        if(e.key == 'Enter'){
            pushTodo(e.target.value);
        }
    });
    // todoInputElement의 "keypress"를 이벤트리스너로 등록한다.
        // todoInputElement에 키보드 'enter'가 입력되었을 때
        // todoInputElement의 내용을 가져와 
        // pushTodo(todoInputElement의 내용)한다. -> pushTodo() 함수는 바로 밑에 있습니다.
    todoEnterBtn.addEventListener('click', (e)=>{
        pushTodo(todoInputElement.value);
    });
    // todoEnterBtn의 'click'을 이벤트 리스너로 등록한다.
        // todoInputElement의 내용을 가져와 
        // pushTodo(todoInputElement의 내용)한다. 

    todoInputElement = ''; // todoInputElement의 내용을 없앤다
};

const pushTodo = (content) => {
    if (content != ''){
        const newId = id++;

        const newTodos = [...todos, {
            id : newId,
            content : content,
            isCompleted : false// 얘는 토글로
        }];
        // newTodos에 기존 todos와 매개변수로 받아온 content를 객체로 만들어 넣는다.

        todos = newTodos;

        paintTodos();
    }
    else {
        alert("일정을 기입해주세요.");
    }

};

const completeTodo = (todoId) => {
    // newTodo에 현재 todos을 가져와서 map(삼항연산자)을 돌린다. -> (삼항연산자) todo.id랑 todoId가 같으면 isCompleted를 not(!) 처리한다
    // newTodos를 todos로 한다

    paintTodos();
    
};

const deleteTodo = (todoId) => {
    // newTOdos에 현재 todos를 가져와 filter(조건)를 돌린다 -> todo.id랑 todoId가 같지 않은 것만 가져온다
    // newTodos를 todos로 한다

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


const paintTodos = () => {
    todoList.innerHTML = null; // todoList안의 html 초기화
    todos.forEach(todo => paint(todo)); // todos를 paint에 넣음
};

const paint = (todo) => { // todo 할 걸 입력받아서 보이게 한다

    const liElement = document.createElement('li');
    liElement.classList.add('todo-item'); 

    const inputElement = document.createElement('input');
    inputElement.classList.add('edit-input'); 

    const checkBtn = document.createElement('button');
    checkBtn.classList.add('checkbox');
    checkBtn.innerHTML = '✔︎';
        // checkBtn에 이벤트 리스너로 'click'을 감지한다. 실행할 함수는 completeTodo

    const content = document.createElement('div');
    content.classList.add('content');
    content.innerHTML = todo.content;
    content.addEventListener('dblclick', (e)=> updateTodo(e, todo.id));


    const delBtn = document.createElement('button');
    delBtn.classList.add('delBtn'); 
    delBtn.innerHTML = '✕';
    // delBtn에 이벤트 리스너로 'click'을 감지한다. 실행할 함수는 deleteTodo


    liElement.appendChild(checkBtn); // li에 check을 자녀로 붙이기
    liElement.appendChild(inputElement);
    liElement.appendChild(content);
    liElement.appendChild(delBtn);

    todoList.appendChild(liElement);    
};

createTodo();