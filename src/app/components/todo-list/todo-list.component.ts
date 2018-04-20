import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todoList: Todo[];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.todo$.subscribe((data: Todo[]) => {
      this.todoList = data;
    });
  }

  removeTodo(i: number): void {
    this.todoService.removeTodo(i);
  }

  check(i: number): void {
    this.todoService.check(i);
  }

}
