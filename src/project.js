class project {
  constructor(name, todo, event){
    this.name = name;
    this.todo = todo;
    this.event = event;
  }

  get name(){
    return this._name;
  }

  set name(name){
    this._name = name;
  }

  get todo(){
    return this._todo;
  }

  set todo(todo){
    this._todo = todo;
  }

  get event(){
    return this._event;
  }

  set event(event){
    this._event = event;
  }
}

export default project;