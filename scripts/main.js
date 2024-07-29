let tasks = [ ];

function renderTasks() {
    const taskList = document.querySelector('.task-list');
    taskList.innerHTML = '';

    if(tasks.length == 0) {
        const message = document.createElement('p');
        message.textContent = "Nenhuma tarefa encontrada";
        taskList.appendChild(message)
        return;
    }

    tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        if (task.done) taskDiv.classList.add('done');

        const taskP = document.createElement('p');
        taskP.textContent = task.text;
        taskDiv.appendChild(taskP);

        const iconsDiv = document.createElement('div');
        iconsDiv.classList.add('icons');

        const doneDiv = document.createElement('div');
        doneDiv.classList.add('icon', 'done');
        doneDiv.addEventListener('click', () => toggleDone(index));
        iconsDiv.appendChild(doneDiv);

        const editDiv = document.createElement('div');
        editDiv.classList.add('icon', 'edit');
        editDiv.addEventListener('click', () => editTask(index));
        iconsDiv.appendChild(editDiv);

        const deleteDiv = document.createElement('div');
        deleteDiv.classList.add('icon', 'delete');
        deleteDiv.addEventListener('click', () => deleteTask(index));
        iconsDiv.appendChild(deleteDiv);

        taskDiv.appendChild(iconsDiv);
        taskList.appendChild(taskDiv);
    });
}

function addTask() {
    const taskText = prompt('Digite a tarefa:');
    if (taskText) {
        tasks.push({ text: taskText, done: false });
        renderTasks();
    }
}

function toggleDone(index) {
    tasks[index].done = !tasks[index].done;
    renderTasks();
}

function editTask(index) {
    const newTaskText = prompt('Editar tarefa:', tasks[index].text);
    if (newTaskText !== null) {
        tasks[index].text = newTaskText;
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

document.querySelector('.add-task').addEventListener('click', addTask);

renderTasks();
