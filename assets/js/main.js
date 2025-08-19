function task() {
  const btnPlus = document.querySelector(".btnPlus");
  const addList = document.querySelector(".addList");
  const sendTask = document.querySelector(".sendTask");

  const storage = localStorage;

  // Pega as tarefas do storage e garante que seja um array
  let tasksToDo = JSON.parse(storage.getItem("tasksToDo")) || [];
  if (!Array.isArray(tasksToDo)) tasksToDo = [];

  let tasksSolved = JSON.parse(storage.getItem("tasksSolved")) || [];
  if (!Array.isArray(tasksSolved)) tasksSolved = [];

  // Função para criar a tarefa na tela
  function criarTask(text) {
    const li = document.createElement("li");
    li.classList.add("Task");

    const span = document.createElement("span");
    span.textContent = text;

    const deleteTask = document.createElement("button");
    deleteTask.classList.add("deleteTask");
    deleteTask.innerHTML = '<i class="bi bi-archive-fill"></i>';

    const taskSolved = document.createElement("button");
    taskSolved.classList.add("taskSolved");
    taskSolved.innerHTML = '<i class="bi bi-clipboard2-check-fill"></i>';

    li.append(span, deleteTask, taskSolved);
    addList.appendChild(li);

    // Evento para remover tarefa
    deleteTask.addEventListener("click", () => {
      li.remove();

      tasksToDo = tasksToDo.filter((t) => t !== text);
      storage.setItem("tasksToDo", JSON.stringify(tasksToDo));

      tasksSolved = tasksSolved.filter((t) => t !== text);
      storage.setItem("tasksSolved", JSON.stringify(tasksSolved));
    });

    //Evento para concluir tarefa
    taskSolved.addEventListener("click", () => {
      li.classList.add("finished");

      tasksToDo = tasksToDo.filter((t) => t !== text);
      storage.setItem("tasksToDo", JSON.stringify(tasksToDo));

      tasksSolved.push(text);
      storage.setItem("tasksSolved", JSON.stringify(tasksSolved));
    });
  }

  // Carrega as tarefas existentes
  tasksToDo.forEach((text) => criarTask(text));

  // Evento do botão de adicionar
  btnPlus.addEventListener("click", (event) => {
    event.preventDefault();

    const text = sendTask.value.trim();

    if (text === "") {
      alert("Digite uma tarefa!");
      return;
    }

    criarTask(text);

    tasksToDo.push(text);
    storage.setItem("tasksToDo", JSON.stringify(tasksToDo));

    sendTask.value = "";
  });

  // Enter no input também adiciona
  sendTask.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      btnPlus.click();
    }
  });
}

task();
