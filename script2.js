document.addEventListener("DOMContentLoaded", () => {
  const todoInput = document.getElementById("todo-input");
  const addBtn = document.getElementById("add-task-btn");
  const todoList = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks"));
  if (!Array.isArray(tasks)) {
    tasks = [];
  }

  tasks.forEach((task) => renderTask(task));

  todoInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const todoText = todoInput.value.trim();
      if (todoText === "") return;

      const newTask = {
        id: Date.now(),
        text: todoText,
        completed: false,
      };

      tasks.push(newTask);
      saveTask();
      renderTask(newTask);
      todoInput.value = "";
      console.log(newTask);
    }
  });

  addBtn.addEventListener("click", () => {
    const todoText = todoInput.value.trim();
    if (todoText === "") return;

    const newTask = {
      id: Date.now(),
      text: todoText,
      completed: false,
    };

    tasks.push(newTask);
    saveTask();
    renderTask(newTask);
    todoInput.value = "";
    console.log(newTask);
  });

  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-item", task.id);
    li.innerHTML = `
    <span>${task.text}</span>
    <button>delete</button>`;
    todoList.appendChild(li);
    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTask();
    });
    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id != task.id);
      li.remove();
      saveTask();
    });
  }

  function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
