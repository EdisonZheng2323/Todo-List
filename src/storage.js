function saveProjectsToLocalStorage(projectArray) {
  localStorage.setItem("projects", JSON.stringify(projectArray));
}

function saveCurrentProjectToLocalStorage(project){
  localStorage.setItem("currentProject", JSON.stringify(project));
}

function getCurrentProject(){
  return JSON.parse(localStorage.getItem("currentProject"));
}

function getItem(name){
  return JSON.parse(localStorage.getItem(name));
}
function loadProjectsFromLocalStorage() {
  const storedProjects = localStorage.getItem("projects");
  if (storedProjects) {
    return JSON.parse(storedProjects);
  }
  else {
    return undefined;
  }
}

export {saveProjectsToLocalStorage, loadProjectsFromLocalStorage, getItem, saveCurrentProjectToLocalStorage, getCurrentProject};