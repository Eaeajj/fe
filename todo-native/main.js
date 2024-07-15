import "./style.css";
import { themeCheckbox } from "./theme.js";
/**
  1. Получить информацию из урла https://jsonplaceholder.typicode.com/todos
  2. Отрисовать следующие данные:
    - чекбокс состояния
    - текст задания
  3. Стилизовать полученный результат
  4. При выполнении задания текст должен быть зачёркнутым
  5. Добавить возможность фильтровать задания по выполенным/невыполненным
 */

const appContainer = document.getElementById("app");
appContainer.appendChild(themeCheckbox);
const stateTodos = [];
const nodes = [];
// const dependentState = [];

const noFilterButton = document.createElement("button");
noFilterButton.innerText = "no filter";

const completedButton = document.createElement("button");
completedButton.innerText = "completed";

const uncompletedButton = document.createElement("button");
uncompletedButton.innerText = "uncompelted";

appContainer.appendChild(noFilterButton);
appContainer.appendChild(completedButton);
appContainer.appendChild(uncompletedButton);

const filters = {};
noFilterButton.addEventListener("click", () => {
  nodes.forEach((node) => {
    filters.completed = null;
    node.setShow(true);
  });
});

completedButton.addEventListener("click", () => {
  nodes.forEach((node) => {
    filters.completed = true;
    node.setShow(node.model.completed === filters.completed);
  });
});

uncompletedButton.addEventListener("click", () => {
  nodes.forEach((node) => {
    filters.completed = false;
    node.setShow(node.model.completed === filters.completed);
  });
});

const checkboxContainer = document.createElement("div");
checkboxContainer.className = "checkboxContainer";
appContainer.appendChild(checkboxContainer);

// model: {id, title, completed}
const createCheckboxNode = ({ model, onClick }) => {
  const label = document.createElement("label");
  label.className = "label";
  label.htmlFor = model.id;
  label.textContent = model.title;
  label.ariaChecked = model.completed.toString();

  const input = document.createElement("input");
  input.type = "checkbox";
  input.id = model.id;
  input.addEventListener("click", onClick);
  input.checked = model.completed;
  label.appendChild(input);

  return {
    model,
    el: label,
    setCompleted(bool) {
      model.completed = bool;
      label.ariaChecked = bool.toString();
    },
    setShow(bool) {
      label.style.display = bool ? "flex" : "none";
    },
    cleanUp() {
      input.removeEventListener("click", onClick);
    },
    remove() {
      this.cleanUp();
      label.remove();
    },
    // ...
  };
};

const getTodos = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const todos = await res.json();

  return todos;
};

const setup = async () => {
  const stateTodos = await getTodos();
  renderTodos(stateTodos);
};

const renderTodos = async (todos) => {
  todos.forEach((todo) => {
    const customCheckbox = createCheckboxNode({
      model: todo, // here is binding data via referece. Bad practice i think
      onClick: () => {
        customCheckbox.setCompleted(!todo.completed);
        filters.completed != null && customCheckbox.setShow();
      },
    });

    checkboxContainer.appendChild(customCheckbox.el);
    nodes.push(customCheckbox);
  });
};

setup();
