import {Component, Input} from '@angular/core';
import {objectKeys, roundDictValues} from "../../utils/utils";
import {NgForOf, NgStyle} from "@angular/common";

@Component({
  selector: 'app-data-visualiser',
  standalone: true,
  imports: [
    NgForOf,
    NgStyle
  ],
  templateUrl: './data-visualiser.component.html',
  styleUrl: './data-visualiser.component.scss'
})
export class DataVisualiserComponent {
  @Input() dataColumns!: string[];
  @Input() dataList!: any[];

  protected readonly objectKeys = objectKeys;
  protected readonly roundDictValues = roundDictValues;
}
