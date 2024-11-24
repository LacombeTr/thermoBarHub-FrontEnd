import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-solid-form',
  templateUrl: './solid-form.component.html',
})
export class SolidFormComponent {
  @Input() elementArray: string[] = [];
  @Input() componentTitle: string = '';
}