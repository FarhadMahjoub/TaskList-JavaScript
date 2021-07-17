const form= document.getElementById("task-form");
const taskInput = document.getElementById("input-task");
const addBtn = document.getElementById("btn-add");
const tasklist = document.getElementById("task-list");
const deleteBtn = document.getElementById("delete-task");
const filter = document.getElementById("filter-task");

loadEventListner();


function loadEventListner(){

    document.addEventListener('DOMContentLoaded' , getTask);
    form.addEventListener('submit' , addTask);
    tasklist.addEventListener('click' , removeTask);
    filter.addEventListener('keyup' , filterTask);

}

function getTask(){

    let tasks;
    if(localStorage.getItem('tasks' === null)){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task){

        const li = document.createElement('li');
        li.className = 'list flex items-center justify-between mt-2 mb-2';

        const h6 = document.createElement('h6');
        h6.className = 'font-semibold';
        h6.appendChild(document.createTextNode(task));

        const i = document.createElement('i');
        i.className='fas fa-times text-red-600 cursor-pointer delete';
        li.appendChild(h6);
        li.appendChild(i);

        tasklist.appendChild(li);

    });

}


function addTask(e){

    if(taskInput.value === '')
    {
        alert('Write Task On TaskInput...');
    }
    else
    {
        //Create Element
        const li = document.createElement('li');
        li.className = 'list flex items-center justify-between mt-2 mb-2';

        const h6 = document.createElement('h6');
        h6.className = 'font-semibold';
        h6.appendChild(document.createTextNode(taskInput.value));

        const i = document.createElement('i');
        i.className='fas fa-times text-red-600 cursor-pointer delete';
        li.appendChild(h6);
        li.appendChild(i);

        tasklist.appendChild(li);

        //add to storage
        storeTaskInLocalStorage(taskInput.value);

        taskInput.value ='';
        e.preventDefault();

    }

}


//add to storage createTextNode
function storeTaskInLocalStorage(task){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// GetTasks

function removeTask(e){

    if(e.target.classList.contains('delete'))
    {
        if(confirm('Are you sure you want to Delete Task ?'))
        {
            e.target.parentElement.remove();
            removeTaskFromLocalStorage(e.target.parentElement);
        }
    }

}
function removeTaskFromLocalStorage(removeTask){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task , index){
        if(removeTask.textContent === task){
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

deleteBtn.addEventListener('click', function(){
    tasklist.innerHTML='';
    clearAllFromStorage();
})
function clearAllFromStorage(){
    localStorage.clear();
}

function filterTask(e){
    const text = e.target.value.toLowerCase();
    //console.log(text);

   document.querySelectorAll('.list').forEach(function(task){

    const item = task.textContent;

    if(item.toLowerCase().indexOf(text) != -1){
        task.classList.add('block');
    }
    else{
        task.classList.remove('block');
        task.style.display = 'none';
    }
    

   


   })



}
