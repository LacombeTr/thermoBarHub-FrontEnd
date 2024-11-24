import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-input-fields',
  template: `
            <div class="flex items-center w-full">
              <label class="w-12 mr-5 my-1 text-neutral-800" [for]="labelInput">{{labelInput | elementDressing}}</label>
              <input class="h-7 w-32 px-2 outline-none my-1 border-[1px] rounded-sm focus-within:border-amber-600 hover:border-amber-600 bg-neutral-100 focus:ring-transparent" type="number" [id]="labelInput" [placeholder]="units">
            </div>`,
})

export class InputFieldsComponent {
  @Input() labelInput: string = '';
  @Input() units: string = '';
}
