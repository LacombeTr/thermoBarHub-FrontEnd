import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-collapsible',
  templateUrl: './collapsible.component.html',
})
export class CollapsibleComponent {
  @Input() cardTitle!: string;
  @Input() cardBody!: string;

  collapsible(event: Event) {
    const clickedTitle = event.currentTarget as HTMLElement;
    const iconState = clickedTitle.querySelector('.fa-solid');
    const bodyCard = clickedTitle?.nextElementSibling as HTMLElement;

    if (bodyCard.classList.contains('hidden')) {
      bodyCard.classList.remove('hidden');
      bodyCard.classList.add('flex');

      iconState!.classList.remove('fa-plus');
      iconState!.classList.add('fa-minus');
    } else {
      bodyCard.classList.remove('flex');
      bodyCard.classList.add('hidden');

      iconState!.classList.remove('fa-minus');
      iconState!.classList.add('fa-plus');
    }
  }
}
