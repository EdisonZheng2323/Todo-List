import "./styles.css"
import todo from './todo.js';

let projectArray = [];

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
  const addProject = document.querySelector(".addProject");
  addProject.addEventListener("click", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = data.get("project_name");
    const project = {
      text: name,
      todo: []
    };
    projectArray.push(project);
    localStorage.setItem("projects", JSON.stringify(projectArray));
    const newProject = document.createElement("button");
    newProject.classList.add("project");
    newProject.textContent = `${name}`;
    sidebar.insertBefore(newProject, add);
    dialog.close();
  });
}

function addTaskProject(addTask) {
  const dialog = document.querySelector(".dialog2");
  addTask.addEventListener("click", () => {
      dialog.removeAttribute("hidden");
      dialog.showModal();
    });
  const addTaskButton = document.querySelector(".addTask");
  addTaskButton.addEventListener("click", )
  }


function displayProjects(){
  window.addEventListener("load", () => {
    const parsedArray = JSON.parse(localStorage.getItem("projects"));
    const sidebar = document.querySelector(".sidebar");
    const add = document.querySelector(".add");
    parsedArray.forEach((object) => {
      const newProject = document.createElement("button");
      newProject.classList.add("project");
      newProject.textContent = `${object.text}`;
      newProject.addEventListener("click", () => {
        const mainContent = document.querySelector(".main-content");
        mainContent.innerHTML = "";
        const addTask = document.createElement("button");
        addTask.classList.add("addTaskButton");
        addTask.textContent = "Add Task";
        addTaskProject(addTask);
        mainContent.appendChild(addTask);
      });
      sidebar.insertBefore(newProject, add);
      });
      projectArray = parsedArray;
    });
  }

  function displayProjectPage(){
    
  }



displayProjects();
addProject();
displayProjectPage();


