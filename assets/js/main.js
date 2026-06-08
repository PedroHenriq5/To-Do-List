  function task() {
    const btnPlus = document.querySelector(".btnPlus");
    const addList = document.querySelector(".addList");
    const sendTask = document.querySelector(".sendTask");

    const storage = localStorage;

    // Pega as tarefas do storage e garante que seja um array
    let tasks = JSON.parse(storage.getItem("tasks")) || [];
    if (!Array.isArray(tasks)) tasks = [];


    // Função para criar a tarefa na tela
    function criarTask(task) {
      const li = document.createElement("li");
      li.classList.add("Task");
      
      if (task.concluded) {
        li.classList.add("Task", "finished");
      }

      const span = document.createElement("span");
      span.textContent = task.text;

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

        tasks = tasks.filter((t) => t.id !== task.id);
        storage.setItem("tasks", JSON.stringify(tasks));
      });

      //Evento para concluir tarefa
      taskSolved.addEventListener("click", () => {

        task.concluded = !task.concluded;

        if (task.concluded) {
          li.classList.add("finished");
        } else {
          li.classList.remove("finished");
        }
        storage.setItem("tasks", JSON.stringify(tasks));
      });
    }

    // Carrega as tarefas existentes
    tasks.forEach((task) => criarTask(task));

    // Evento do botão de adicionar
    btnPlus.addEventListener("click", (event) => {
      event.preventDefault();

      const text = sendTask.value.trim();

      if (text === "") {
        alert("Digite uma tarefa!");
        return;
      }

      const task = {
        text: text,
        concluded: false,
        id: Date.now(),
      };

      criarTask(task);

      tasks.push(task);
      storage.setItem("tasks", JSON.stringify(tasks));

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
