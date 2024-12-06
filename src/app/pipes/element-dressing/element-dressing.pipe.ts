import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'elementDressing'
})
export class ElementDressingPipe implements PipeTransform {

  transform(elementName: string){

    const subscriptMap: { [key: string]: string } = {
      '0': '₀',
      '1': '₁',
      '2': '₂',
      '3': '₃',
      '4': '₄',
      '5': '₅',
      '6': '₆',
      '7': '₇',
      '8': '₈',
      '9': '₉'
    };

    return elementName.split('').map(char => subscriptMap[char] || char).join('');
  }

}
