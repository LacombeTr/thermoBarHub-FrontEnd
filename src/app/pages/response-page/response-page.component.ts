import {Component, OnInit} from '@angular/core';
import {objectKeys, roundDictValues} from "../../utils/utils";
import {excelData} from "../../models";
import {NgForOf, NgStyle} from "@angular/common";
import {data} from "autoprefixer";
import {DataVisualiserComponent} from "../../UI/data-visualiser/data-visualiser.component";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  selector: 'app-response-page',
  standalone: true,
  imports: [
    NgStyle,
    NgForOf,
    DataVisualiserComponent,
    TranslatePipe
  ],
  templateUrl: './response-page.component.html',
  styleUrl: './response-page.component.scss'
})

export class ResponsePageComponent implements OnInit {
  calculatedData!: excelData[];
  dataColumns!: string[];
  dataList!: any[];

  ngOnInit() {
    this.calculatedData = JSON.parse(history.state.calculationResponse.data);

    this.dataColumns = Object.keys(this.calculatedData[0]);
    this.dataList = this.calculatedData

    console.log(objectKeys(this.dataList));
    console.log(typeof this.dataList);
  }

  protected readonly data = data;
}
