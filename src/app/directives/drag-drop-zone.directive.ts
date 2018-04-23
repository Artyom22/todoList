import { Directive, HostListener, Input } from '@angular/core';
import { TodoService } from '../services/todo.service';

@Directive({
  selector: '[appDragDropZone]'
})
export class DragDropZoneDirective {

  constructor(private todoService: TodoService) { }

  @Input() appDragDropZone: number;

  @HostListener('dragenter', ['$event'])
  @HostListener('dragover', ['$event'])
  onDragOver(event: Event): void {
    event.preventDefault();
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent): void {
    const dragedElIndex = +event.dataTransfer.getData('text');
    const dragedEl = this.todoService.todo[dragedElIndex];

    this.todoService.todo.splice(dragedElIndex, 1);

    this.todoService.todo.splice(+(<Node>event.target).parentElement.getAttribute('id'), 0,
      dragedEl);
    this.todoService.sendList(this.todoService.todo);
  }
}
