import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger} from '@angular/animations';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations:[
    trigger('todos',[
      transition('* => *',[
        query(':enter',style({opacity:0}),{optional:true}),

        query(':enter',stagger('300ms',[
          animate('.6s ease-in',keyframes([
            style({opacity:0,transform:'translateY(-75%)',offset:0}),
            style({opacity:0.5,transform:'translateY(35px)',offset:.3}),
            style({opacity:1,transform:'translateY(0)',offset:1}),
          ]))]),{optional:true}),

        query(':leave',stagger('300ms',[
            animate('.6s ease-in',keyframes([
              style({opacity:1,transform:'translateY(0)',offset:0}),
              style({opacity:0.5,transform:'translateY(35px)',offset:.3}),
              style({opacity:0,transform:'translateY(-75%)',offset:1}),
            ]))]),{optional:true})
      ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  todoCount:number;
  btnText:string = 'Add An Item';
  todoText:string = 'Test todo1 from component';
  todos = [];
  
  constructor(private _data: DataService) { }

  ngOnInit() {
    this._data.todo.subscribe(res => this.todos = res);
    this.todoCount = this.todos.length;
    this._data.changeTodo(this.todos);
  }

  addToDo(){
    this.todos.push(this.todoText);
    this.todoText='';
    this.todoCount = this.todos.length;
    this._data.changeTodo(this.todos);
  }

  removeTodo(i){
    this.todos.splice(i,1);
    this.todoCount = this.todos.length;
    this._data.changeTodo(this.todos);
  }
}
