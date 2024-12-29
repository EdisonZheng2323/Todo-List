class todo {
  constructor(title, description, dueDate, priority){
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
  }

  get title(){
    return this._title;
  }

  set title(newTitle){
    this._title = newTitle;
  }

  get description(){
    return this._description;
  }
  
  set description(description){
    this._description = description;
  }

  get dueDate(){
    return this._dueDate;
  }

  set dueDate(dueDate){
    this._dueDate = dueDate;
  }

  get priority(){
    return this._priority;
  }

  set priority(priority){
    this._priority = priority;
  }
}

export default todo;