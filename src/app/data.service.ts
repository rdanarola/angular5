import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DataService {

  private todos = new BehaviorSubject<any>(['my todo1','my todo2','my todo3','my todo4','my todo5']);
  todo = this.todos.asObservable();

  constructor() { }

  changeTodo(todo){
    this.todos.next(todo);
  }

}
