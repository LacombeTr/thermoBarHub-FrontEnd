import { Component, OnInit } from '@angular/core';

import { equationList, equationStruct } from '../../data/equations';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as XLSX from 'xlsx';

import {
  CalculationAPIService,
  InputCalc,
} from '../../services/calculation-api.service';

@Component({
  selector: 'app-submit-compos',
  templateUrl: './submit-compos.component.html',
})
export class SubmitComposComponent implements OnInit {
  iterative: boolean = false;
  useSpreadSheet: boolean = false;
  system: string = '';
  choosenEquations: string[] = [];
  dataString!: string;
  equations: equationStruct[] = equationList;
  eqListPT: any;
  eqListP: any;
  eqListT: any;
  equationP: string | null = null;
  equationT: string | null = null;
  h2o!: number;
  phases!: string[];
  pressure!: number;
  pDisabled: boolean = true;
  tDisabled: boolean = true;
  h2oDisabled: boolean = true;
  pDependant: boolean = false;
  tDependant: boolean = false;
  h2oDependant: boolean = false;
  inputCompo: any;
  temperature!: number;
  selectedFile!: File;
  submitCompo!: FormGroup<any>;
  dataColumns: string[] = [];
  dataList: any[] = [];

  inputCalc!: InputCalc;
  response: InputCalc | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private calculationAPIService: CalculationAPIService
  ) {}

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  ngOnInit() {
    this.submitCompo = this.formBuilder.group({
      iterative: [false, Validators.required],
      system: '',
      phases: [''],
      equation: [['']],
      pressure: 0,
      temperature: 0,
      data: '',
    });
  }

  selectPhases(event: Event) {
    let target = event.target as HTMLSelectElement;
    this.system = target.value;

    this.eqListPT = this.equations.filter((equation) =>
      equation.phases.includes(target.value)
    );

    this.eqListT = this.equations.filter(
      (equation) =>
        equation.phases.includes(target.value) &&
        equation.pDependant === true &&
        equation.tDependant === false
    );

    this.eqListP = this.equations.filter(
      (equation) =>
        equation.phases.includes(target.value) &&
        equation.tDependant === true &&
        equation.pDependant === false
    );
  }

  isIterative(event: Event) {
    this.pressure = NaN;
    this.temperature = NaN;
    this.h2o = NaN;

    this.pDisabled = true;
    this.tDisabled = true;
    this.h2oDisabled = true;

    let targetElem = event.target as HTMLInputElement;
    let checked = targetElem.checked;
    if (!checked) {
      this.iterative = false;
    } else {
      this.iterative = true;
    }
  }

  selectEquation(event: any) {
    this.pressure = NaN;
    this.temperature = NaN;
    this.h2o = NaN;

    let target = event.target as HTMLSelectElement;

    let selectedEquation = this.equations.find((equation) =>
      equation.equationNumber.includes(target.value)
    );

    this.phases = selectedEquation!.phases;

    if (selectedEquation?.equationNumber.charAt(0) === 'P') {
      this.equationP = selectedEquation?.equationNumber;
    } else if (selectedEquation?.equationNumber.charAt(0) === 'T') {
      this.equationT = selectedEquation?.equationNumber;
    }

    if (this.iterative === false) {
      if (selectedEquation!.pDependant === false) {
        this.pDisabled = true;
      } else {
        this.pDisabled = false;

        if (this.pDependant === false) {
          this.pDependant = true;
        }
      }

      if (selectedEquation!.tDependant === false) {
        this.tDisabled = true;
      } else {
        this.tDisabled = false;

        if (this.tDependant === false) {
          this.tDependant = true;
        }
      }

      if (selectedEquation!.h2oDependant === false) {
        this.h2oDisabled = true;
      } else {
        this.h2oDisabled = false;

        if (this.h2oDependant === false) {
          this.h2oDependant = true;
        }
      }
    } else {
      this.pDisabled = true;
      this.tDisabled = true;
    }
  }

  getTemperature(event: Event) {
    let targetElem = event.target as HTMLInputElement;
    this.temperature = +targetElem.value;
  }

  getPressure(event: Event) {
    let targetElem = event.target as HTMLInputElement;
    this.pressure = +targetElem.value;
  }

  getH2O(event: Event) {
    let targetElem = event.target as HTMLInputElement;
    this.h2o = +targetElem.value;
  }

  prepareXslx(ev: any) {
    let workBook: any = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = () => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial: any, name: string) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});

      this.rounder(jsonData);
      this.dataString = JSON.stringify(jsonData);

      this.dataColumns = Object.keys(jsonData[Object.keys(jsonData)[0]][0]);
      this.dataList = jsonData[Object.keys(jsonData)[0]];
    };
    reader.readAsArrayBuffer(file);
  }

  rounder(data: any) {
    Object.keys(data).forEach((sheetName) => {
      data[sheetName].forEach((obj: any) => {
        for (let key in obj) {
          if (typeof obj[key] === 'number') {
            obj[key] = parseFloat(obj[key].toFixed(2));
          }
        }
      });
    });
  }

  submitCompos() {
    this.inputCalc = {
      iterative: this.iterative,
      system: this.system,
      phases: this.phases,
      equationP: this.equationP,
      equationT: this.equationT,
      pDependant: this.pDependant,
      tDependant: this.tDependant,
      h2oDependant: this.h2oDependant,
      pressure: this.pressure,
      temperature: this.temperature,
      h2o: this.h2o,
      data: this.dataString,
    };

    console.log(this.inputCalc);

    this.calculationAPIService.createInputCalc(this.inputCalc).subscribe(
      (data) => {
        this.response = data;
        console.log('Response from server:', this.response); // Ajout de console.log pour afficher la réponse
        this.dataList = [this.response.data];
      },
      (error) => {
        console.error('There was an error!', error);
      }
    );
  }
}
