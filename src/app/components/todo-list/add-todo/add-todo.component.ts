import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../../services/todo.service';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.scss']
})
export class AddTodoComponent implements OnInit {

  text: string;
  done = false;

  constructor(private todoService: TodoService) { }

  ngOnInit() {}

  addTodo(): void {
    const data = {
        text: this.text,
        done: this.done,
    };

    this.todoService.addTodo(data);
  }

}
