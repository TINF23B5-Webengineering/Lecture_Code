async function getTodos() {
  return await (await fetch("/todos")).json();
}

async function completeToDo(id) {
  await fetch(`/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ isCompleted: true }),
  });
}

function displayTodos(todos) {
  const container = document.getElementById("container");
  const list = document.createElement("ul");
  container.appendChild(list);

  for (const todo of todos) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `${todo.isCompleted} <b>${todo.title}</b> <i>${todo.dueDate}</i>`;
    list.appendChild(listItem);
    listItem.addEventListener("click", () => {
      completeToDo(todo.id);
    });
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const todos = await getTodos();
  displayTodos(todos);
});
