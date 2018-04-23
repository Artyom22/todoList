import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDraggable]'
})
export class DraggableDirective {

  constructor() { }

  @Input() appDraggable: number;

  @HostBinding('draggable')
  draggable(): boolean {
    return true;
  }

  @HostListener('dragstart', ['$event'])
  onDragStart(event: DragEvent): void {
    event.dataTransfer.setData('text', this.appDraggable + '');
  }
}
