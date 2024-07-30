// Declaração do array de tarefas. Cada tarefa será um objeto com as propriedades 'text' e 'done'.
let tasks = [
    { text: "Lorem ipsum", done: false },
    { text: "Lorem ipsum dolor sit amet", done: false },
    { text: "Lorem ipsum dolor sit amet", done: false }
];
    
/**
 * Função para renderizar a lista de tarefas na tela.
 * Limpa a lista atual e adiciona as tarefas do array 'tasks'.
 */
function renderTasks() {
    // Seleciona o elemento com a classe 'task-list', onde as tarefas serão exibidas.
    const taskList = document.querySelector('.task-list');
    taskList.innerHTML = ''; // Limpa o conteúdo atual da lista de tarefas.

    let contador = 0; // Contador para tarefas que não estão concluídas.

    // Conta o número de tarefas que não estão concluídas.
    tasks.forEach((task) => {
        if (task.done == false) {
            contador++;
        }
    });

    // Se não houver tarefas em andamento, exibe uma mensagem informando isso.
    if (contador == 0) {
        const message = document.createElement('p');
        message.textContent = "Nenhuma tarefa em andamento encontrada"; // Mensagem exibida quando não há tarefas pendentes.
        taskList.appendChild(message); // Adiciona a mensagem ao elemento da lista de tarefas.
        return; // Sai da função se não houver tarefas em andamento.
    }

    // Para cada tarefa no array 'tasks', cria os elementos HTML correspondentes.
    tasks.forEach((task, index) => {
        const taskDiv = document.createElement('div');
        taskDiv.classList.add('task');
        if (task.done) taskDiv.classList.add('done'); // Adiciona a classe 'done' se a tarefa estiver marcada como concluída.

        const taskP = document.createElement('p');
        taskP.textContent = task.text; // Define o texto da tarefa.
        taskDiv.appendChild(taskP);

        const iconsDiv = document.createElement('div');
        iconsDiv.classList.add('icons');

        // Cria o ícone para marcar a tarefa como concluída.
        const doneDiv = document.createElement('div');
        doneDiv.classList.add('icon', 'done');
        doneDiv.addEventListener('click', () => toggleDone(index)); // Adiciona o evento de clique para marcar/desmarcar a tarefa.
        iconsDiv.appendChild(doneDiv);

        // Cria o ícone para editar a tarefa.
        const editDiv = document.createElement('div');
        editDiv.classList.add('icon', 'edit');
        editDiv.addEventListener('click', () => editTask(index)); // Adiciona o evento de clique para editar a tarefa.
        iconsDiv.appendChild(editDiv);

        // Cria o ícone para deletar a tarefa.
        const deleteDiv = document.createElement('div');
        deleteDiv.classList.add('icon', 'delete');
        deleteDiv.addEventListener('click', () => deleteTask(index)); // Adiciona o evento de clique para deletar a tarefa.
        iconsDiv.appendChild(deleteDiv);

        // Adiciona os ícones ao div da tarefa e o div da tarefa ao elemento de lista de tarefas.
        taskDiv.appendChild(iconsDiv);
        taskList.appendChild(taskDiv);
    });
}

/**
 * Função para adicionar uma nova tarefa.
 * Pede ao usuário para digitar a tarefa e adiciona ao array 'tasks'.
 */
function addTask() {
    const taskText = prompt('Digite a tarefa:'); // Pede ao usuário para digitar o texto da tarefa.
    if (taskText) {
        tasks.push({ text: taskText, done: false }); // Adiciona a nova tarefa ao array 'tasks'.
        renderTasks(); // Atualiza a lista de tarefas exibida.
    }
}

/**
 * Função para marcar ou desmarcar uma tarefa como concluída.
 * @param {number} index - Índice da tarefa no array 'tasks'.
 */
function toggleDone(index) {
    tasks[index].done = !tasks[index].done; // Inverte o estado de conclusão da tarefa.
    renderTasks(); // Atualiza a lista de tarefas exibida.
}

/**
 * Função para editar uma tarefa existente.
 * @param {number} index - Índice da tarefa no array 'tasks'.
 */
function editTask(index) {
    const newTaskText = prompt('Editar tarefa:', tasks[index].text); // Pede ao usuário para digitar o novo texto da tarefa.
    if (newTaskText !== null) {
        tasks[index].text = newTaskText; // Atualiza o texto da tarefa.
        renderTasks(); // Atualiza a lista de tarefas exibida.
    }
}

/**
 * Função para deletar uma tarefa.
 * @param {number} index - Índice da tarefa no array 'tasks'.
 */
function deleteTask(index) {
    tasks.splice(index, 1); // Remove a tarefa do array 'tasks'.
    renderTasks(); // Atualiza a lista de tarefas exibida.
}

// Adiciona o evento de clique ao botão de adicionar tarefa.
document.querySelector('.add-task').addEventListener('click', addTask);

// Renderiza a lista de tarefas inicialmente.
renderTasks();