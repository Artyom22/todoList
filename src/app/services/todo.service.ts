import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/mergeMap';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class TodoService {
  groupId$: Observable<any>;
  userId$: Observable<any>;
  todo: Todo[] = [];
  todo$ = new Subject();

  constructor(private http: HttpClient) {
    this.groupId$ = this.getGroupId().share();
    this.userId$ = this.getUserId().share();
    this.getTodoList().subscribe((todoList) => {
      Object.keys(todoList).map((item) => {
        this.todo.push({ done: todoList[item].done, text: todoList[item].text});
      });
      this.todo$.next(this.todo);
    });
  }

  getGroupId(): Observable<any> {
    return this.http.get('https://avetiq-test.firebaseapp.com/group/artyom_amiryan');
  }

  getUserId(): Observable<any> {
    return this.http.get('https://avetiq-test.firebaseapp.com/user/artyom_amiryan');
  }

  getTodoList(): Observable<any> {
    return this.groupId$.mergeMap(group => {
      return this.userId$.mergeMap(user => {
        return this.http.get('https://avetiq-test.firebaseapp.com/todos/' +
          'group/' + group.groupId + '/user/' + user.userId);
      });
    });
  }

  addTodo(data: Todo): void {
    this.todo.push(data);
    this.sendList(this.todo);
  }

  removeTodo(i: number): void {
    this.todo.splice(i, 1);
    this.sendList(this.todo);
  }

  editTodo(data: Todo, i: number): void {
    this.todo[i] = data;
    this.sendList(this.todo);
  }

  check(i: number): void {
    this.todo[i].done = !this.todo[i].done;
    this.sendList(this.todo);
  }

  sendList(data: Todo[]): void {
    this.groupId$.mergeMap(group => {
      return this.userId$.mergeMap(user => {

        this.todo$.next(data);

        return this.http.put('https://avetiq-test.firebaseapp.com/todos/' +
          'group/' + group.groupId + '/user/' + user.userId, data);
      });
    }).subscribe();
  }
}
