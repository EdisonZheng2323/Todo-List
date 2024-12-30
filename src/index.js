import "./styles.css"
import todo from './todo.js';
import { saveProjectsToLocalStorage, loadProjectsFromLocalStorage, getItem, saveCurrentProjectToLocalStorage, getCurrentProject } from "./storage.js";
import project from './project.js';
import projectArray from './projectArray.js';
j

function addProject(){
  const add = document.querySelector(".add");
  const dialog = document.querySelector(".dialog");
  const projects = document.querySelector(".projects");
  const sidebar = document.querySelector(".sidebar");
  const form = document.querySelector(".form");
  add.addEventListener("click", () => {
    form.reset();
    dialog.removeAttribute("hidden");
    dialog.showModal();
  });
  const close = document.querySelector(".close");
  close.addEventListener("click", () => {
    dialog.close();
  });
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = data.get("project_name");
    const newProject = new project(name, []);
    if(loadProjectsFromLocalStorage() === undefined){
      const projectArray = [];
      projectArray.push(newProject);
      saveProjectsToLocalStorage(projectArray);
    }
    else {
      const projectArray = loadProjectsFromLocalStorage();
      projectArray.push(newProject);
      saveProjectsToLocalStorage(projectArray);
    }
    const projectButton = displayProject(newProject);
    const taskButton = addTaskButtonToProjectWhenOpened(projectButton);
    addTaskDialog(taskButton);
    selectProjectWhenOpened(projectButton, newProject);
    displayTasks(taskButton, projectButton);
    dialog.close();
  });
}

function displayProject(project){
  const addProject = document.querySelector(".add");
  const sidebar = document.querySelector(".sidebar");
  const newProject = document.createElement("button");
  newProject.textContent = `${project._name}`;
  sidebar.insertBefore(newProject, addProject);
  return newProject;
}

function createAddTaskButton() {
  const addTask = document.createElement("button");
  addTask.classList.add("addTaskButton");
  addTask.textContent = "Add Task";
  return addTask;
}

function displayAllProjectOnLoad(){
  window.addEventListener("load", () => {
    const projectArray = loadProjectsFromLocalStorage();
    const mainContent = document.querySelector(".main-content");
    if(projectArray !== undefined){
      projectArray.forEach((project) => {
        const projectButton = displayProject(project);
        const taskButton = addTaskButtonToProjectWhenOpened(projectButton);
        selectProjectWhenOpened(projectButton, project);
        addTaskDialog(taskButton, projectButton);
        displayTasks(taskButton, projectButton);
      })
    }
  });
}

function addTaskButtonToProjectWhenOpened(projectButton){
  const taskButton = createAddTaskButton();
  const mainContent = document.querySelector(".main-content");
  projectButton.addEventListener("click", () => {
    if(!mainContent.firstElementChild){
      mainContent.appendChild(taskButton);
    }
  })
  return taskButton;
}

function selectProjectWhenOpened(projectButton, project){
  projectButton.addEventListener("click", () => {
    console.log(project);
    const projectArray = loadProjectsFromLocalStorage();
    const updatedProject = projectArray.find(
      (proj) => proj._name === project._name
    );

    if (updatedProject) {
      saveCurrentProjectToLocalStorage(updatedProject);
      console.log(updatedProject);
    }
  });
  
}

function addTaskDialog(taskButton, projectButton){
  const dialog = document.querySelector(".dialog2");
  const form = document.querySelector(".taskForm");
  taskButton.addEventListener("click", () => {
    form.reset();
    dialog.removeAttribute("hidden");
    dialog.showModal();
  })
  form.addEventListener("submit", (event) => {
    console.log(taskButton);
    event.preventDefault();
    const data = new FormData(form);
    const title = data.get("task_title");
    const description = data.get("task_description");
    const dueDate = data.get("task_dueDate");
    const priority = data.get("task_priority");
    const newTask = new todo(title, description, dueDate, priority);
    const currentProject = getCurrentProject();
    const taskExists = currentProject._todo.find(task => 
      task._title == newTask._title && 
      task._description == newTask._description && 
      task._dueDate == newTask._dueDate && 
      task._priority == newTask._priority
    );
    if(!taskExists){
      currentProject._todo.push(newTask);
    }
    const projectArray = loadProjectsFromLocalStorage();
    const index = projectArray.findIndex(project2 => project2._name === currentProject._name);
    console.log(index);
    projectArray[index] = currentProject;
    saveProjectsToLocalStorage(projectArray);
    saveCurrentProjectToLocalStorage(currentProject);
    dialog.close();
    clearTasksExceptAddTask();
    if(currentProject._todo != undefined){
      currentProject._todo.forEach((task) => {
        const mainContent = document.querySelector(".main-content");
        const newTask = document.createElement("div");
        newTask.classList.add("newTask");
        const left = document.createElement("div");
        const right = document.createElement("div");
        left.classList.add("left");
        right.classList.add("right");
        const title = document.createElement("div");
        title.classList.add("title");
        const dueDate = document.createElement("div");
        dueDate.classList.add("dueDate");
        title.textContent = `Title: ${task._title}`;
        dueDate.textContent = `Due Date: ${task._dueDate}`;
        left.appendChild(title);
        left.appendChild(dueDate);
        const expandButton = document.createElement("button");
        const deleteButton = document.createElement("button");
        const editButton = document.createElement("button");
        expandButton.textContent = "Expand";
        deleteButton.textContent = "Delete";
        editButton.textContent = "Edit";
        expandButton.classList.add("expand");
        deleteButton.classList.add("delete");
        editButton.classList.add("edit");

        right.appendChild(expandButton);
        right.appendChild(deleteButton);
        right.appendChild(editButton);
        newTask.appendChild(left);
        newTask.appendChild(right);
        mainContent.appendChild(newTask);  
      });
    }
    return newTask;
  })
}

function clearTasksExceptAddTask() {
  const mainContent = document.querySelector(".main-content");

  Array.from(mainContent.children).forEach((child) => {
    if (child.className !== "addTaskButton") {
      mainContent.removeChild(child);
    }
  });
}
function displayTasks(taskButton, projectButton){
  projectButton.addEventListener("click", () => {
    console.log(taskButton);
    clearTasksExceptAddTask();
    const currentProject = getCurrentProject();
    if(currentProject._todo != undefined){
      currentProject._todo.forEach((task) => {
        const mainContent = document.querySelector(".main-content");
        const newTask = document.createElement("div");
        newTask.classList.add("newTask");
        const left = document.createElement("div");
        const right = document.createElement("div");
        left.classList.add("left");
        right.classList.add("right");
        const title = document.createElement("div");
        title.classList.add("title");
        const dueDate = document.createElement("div");
        dueDate.classList.add("dueDate");
        title.textContent = `Title: ${task._title}`;
        dueDate.textContent = `Due Date: ${task._dueDate}`;
        left.appendChild(title);
        left.appendChild(dueDate);
        const expandButton = document.createElement("button");
        const deleteButton = document.createElement("button");
        const editButton = document.createElement("button");
        expandButton.textContent = "Expand";
        deleteButton.textContent = "Delete";
        editButton.textContent = "Edit";
        expandButton.classList.add("expand");
        deleteButton.classList.add("delete");
        editButton.classList.add("edit");

        right.appendChild(expandButton);
        right.appendChild(deleteButton);
        right.appendChild(editButton);
        newTask.appendChild(left);
        newTask.appendChild(right);
        mainContent.appendChild(newTask);  
      });
    }
  });
}

function displayHomePage(){
    const projectArray = loadProjectsFromLocalStorage();
    if(projectArray != undefined){
      projectArray.forEach((project) => {
        if(project._todo != undefined){
          project._todo.forEach((todo) => {
            const mainContent = document.querySelector(".main-content");
        const newTask = document.createElement("div");
        newTask.classList.add("newTask");
        const left = document.createElement("div");
        const right = document.createElement("div");
        left.classList.add("left");
        right.classList.add("right");
        const title = document.createElement("div");
        title.classList.add("title");
        const dueDate = document.createElement("div");
        dueDate.classList.add("dueDate");
        title.textContent = `Title: ${todo._title}`;
        dueDate.textContent = `Due Date: ${todo._dueDate}`;
        left.appendChild(title);
        left.appendChild(dueDate);
        const expandButton = document.createElement("button");
        const deleteButton = document.createElement("button");
        const editButton = document.createElement("button");
        expandButton.textContent = "Expand";
        deleteButton.textContent = "Delete";
        editButton.textContent = "Edit";
        expandButton.classList.add("expand");
        deleteButton.classList.add("delete");
        editButton.classList.add("edit");

        right.appendChild(expandButton);
        right.appendChild(deleteButton);
        right.appendChild(editButton);
        newTask.appendChild(left);
        newTask.appendChild(right);
        mainContent.appendChild(newTask);  
          });
        }
      })
    }
  }

  function clickHomePage(){
    const home = document.querySelector(".home");
    home.addEventListener("click", () => {
      clearTasksExceptAddTask();
      displayHomePage();
    })
  }
function displayNewTask(currentProject){
  const mainContent = document.querySelector(".main-content");
  const lastTodo = currentProject[currentProject.length - 1];
  const taskExists = mainContent.childNodes.find(task => 
    task._title == newTask._title && 
    task._description == newTask._description && 
    task._dueDate == newTask._dueDate && 
    task._priority == newTask._priority
  );
  const newTask = document.createElement("div");
  newTask.classList.add("newTask");
  const left = document.createElement("div");
  const right = document.createElement("div");
  left.classList.add("left");
  right.classList.add("right");
  const title = document.createElement("div");
  title.classList.add("title");
  const dueDate = document.createElement("div");
  dueDate.classList.add("dueDate");
  title.textContent = `Title: ${currentProject._todo._title}`;
  dueDate.textContent = `Due Date: ${currentProject._todo._dueDate}`;
  left.appendChild(title);
  left.appendChild(dueDate);
  const expandButton = document.createElement("button");
  const deleteButton = document.createElement("button");
  const editButton = document.createElement("button");
  expandButton.textContent = "Expand";
  deleteButton.textContent = "Delete";
  editButton.textContent = "Edit";
  expandButton.classList.add("expand");
  deleteButton.classList.add("delete");
  editButton.classList.add("edit");

  right.appendChild(expandButton);
  right.appendChild(deleteButton);
  right.appendChild(editButton);
  newTask.appendChild(left);
  newTask.appendChild(right);
  mainContent.appendChild(newTask);  
}

displayAllProjectOnLoad();
addProject();
