const Todo = require(`./todo`);

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }
  size(){
    return this.todos.length;
  }
  first(){
    return this.todos[0];
  }
  last(){
    return this.todos[this.size()-1];
  }
  add(todoObj){
    if (!(todoObj instanceof Todo)){
      throw new TypeError("argument is not a Todo Object");
    }
    this.todos.push(todoObj);
  }
  pop(){
    return this.todos.pop();
  }
  shift(){
    return this.todos.shift();
  }
  _validateIndex(index){
    if(!(this.todos[index])){throw new ReferenceError(`invalid index ${index}`)}
  }
  itemAt(index){
    this._validateIndex(index);
    return this.todos[index];
  }
  removeAt(index){
    this._validateIndex(index);
    this.todos.splice(index,1);
  }
  markDoneAt(index){
    this._validateIndex(index);
    this.todos[index].markDone();
  }
  markUndoneAt(index){
    this._validateIndex(index);
    this.todos[index].markUndone();
  }
  isDone(){
    return this.todos.every((ele)=>ele.done);
  }
  forEach(callback,self) {
    for (let index = 0; index < this.size(); index += 1) {
      callback.call(self,this.itemAt(index),index,this.todos);
    }
  }
  filter(callback,self){
    let tempObj = new TodoList(this.title);
    for (let index = 0; index < this.size(); index += 1) {
      if(callback.call(self,this.todos[index],index,this.todos)){
        tempObj.add(this.todos[index]);
      }
    }
    return tempObj
  }
  findByTitle(title){
    return this.filter((ele)=>ele.getTitle() === title).first();
  }
  allDone(){
    return this.filter(ele=>ele.isDone())
  } 
  allNotDone(){
    return this.filter(ele=>!ele.isDone())
  }
  markDone(title){
    try{
      this.findByTitle(title).markDone();

    }
    catch{}
  }
  markAllDone(){
    this.allNotDone().forEach(ele=>ele.markDone());
  }
  markAllUndone(){
    this.allDone().forEach(ele=>ele.markUndone())
  }
  toArray(){
    return this.todos.slice();
  }
  toString() {
    let title = `---- ${this.title} ----`;
    let list = this.todos.map(todo => todo.toString()).join("\n");
    return `${title}\n${list}`;
  }
}

module.exports = TodoList;