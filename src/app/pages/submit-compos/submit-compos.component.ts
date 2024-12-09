import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import * as XLSX from 'xlsx';

import { postParameters} from '../../services/calculation-api.service';
import {equationList, equationStruct} from '../../data/equations';
import { excelData, calculationParameters } from "../../models";
import {roundDictValues} from "../../utils/utils";

@Component({
  selector: 'app-submit-compos',
  templateUrl: './submit-compos.component.html',
})

export class SubmitComposComponent implements OnInit {

  // Arguments of the request sent for the calculations
  iterative: boolean = false;
  system: string = '';
  phases!: string[];
  equationP: string | null = null;
  equationT: string | null = null;
  pDependant: boolean = false;
  tDependant: boolean = false;
  h2oDependant: boolean = false;
  pressure!: number;
  temperature!: number;
  h2o!: number;
  excelData!: excelData[];

  /**
   * @param equations whole list of available equations
   * @param eqListPT equations requiring iterations between P and T
   * @param eqListP equations requiring only P
   * @param eqListT equations requiring only T
   */
  equations: equationStruct[] = equationList;
  eqListPT: any;
  eqListP: any;
  eqListT: any;

  /**
   * Fields state from step2
   */
  pDisabled: boolean = true;
  tDisabled: boolean = true;
  h2oDisabled: boolean = true;

  submitCompo!: FormGroup<any>;

  dataList: any[] = [];
  dataColumns: string[] = [];

  inputCalc!: calculationParameters;
  response: calculationParameters | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private postParameters: postParameters,
    private http: HttpClient, private router: Router
  ) {}

  protected roundDictValues = roundDictValues;

  protected objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  ngOnInit() {

    /**
     * Initialize the submitCompo object
     */
    this.submitCompo = this.formBuilder.group({
      iterative: [false, Validators.required],
      system: '',
      phases: [''],
      equation: [['']],
      pressure: 0,
      temperature: 0,
      data: null,
    });
  }

  /**
   * Function to select which phase will be selected
   * @param event
   */
  selectPhases(event: Event) {
    let target = event.target as HTMLSelectElement;
    this.system = target.value;

    this.eqListPT = this.equations.filter((equation) =>
      equation.phases.includes(target.value)
    );

    this.eqListT = this.equations.filter(
      (equation) =>
        equation.phases.includes(target.value) && equation.pDependant && !equation.tDependant
    );

    this.eqListP = this.equations.filter(
      (equation) =>
        equation.phases.includes(target.value) && equation.tDependant && !equation.pDependant
    );
  }

  /**
   * Check if the selected equation set require iterative calculations, if yes disable P, T and H2O fields
   * @param event
   */
  isIterative(event: Event) {
    this.pressure = NaN;
    this.temperature = NaN;
    this.h2o = NaN;

    this.pDisabled = true;
    this.tDisabled = true;
    this.h2oDisabled = true;

    let targetElem = event.target as HTMLInputElement;
    this.iterative = targetElem.checked;
  }

  selectEquation(event: any) {

    this.resetFields();

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

    if (!this.iterative) {
      if (!selectedEquation!.pDependant) {
        this.pDisabled = true;
      } else {
        this.pDisabled = false;

        if (!this.pDependant) {
          this.pDependant = true;
        }
      }

      if (!selectedEquation!.tDependant) {
        this.tDisabled = true;
      } else {
        this.tDisabled = false;

        if (!this.tDependant) {
          this.tDependant = true;
        }
      }

      if (!selectedEquation!.h2oDependant) {
        this.h2oDisabled = true;
      } else {
        this.h2oDisabled = false;

        if (!this.h2oDependant) {
          this.h2oDependant = true;
        }
      }
    } else {
      this.pDisabled = true;
      this.tDisabled = true;
    }
  }

  resetFields(){
    let temperatureField = document.getElementById("temperature") as HTMLInputElement;
    let pressureField = document.getElementById("pressure") as HTMLInputElement;
    let H2OField = document.getElementById("h2o") as HTMLInputElement;

    temperatureField!.value = '';
    pressureField!.value = '';
    H2OField!.value = '';

    temperatureField!.disabled;
    pressureField!.disabled;
    H2OField!.disabled;


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

  prepareXslx(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const file = XLSX.read(e.target.result, { type: 'binary' });
      const firstSheet = file.SheetNames[0];
      const worksheet = file.Sheets[firstSheet];
      this.excelData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      this.dataColumns = Object.keys(this.excelData[0]);
      this.dataList = this.excelData;
      console.log(this.dataColumns);
    };
    reader.readAsArrayBuffer(file);
  }

  postCompos() {
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
      data: this.excelData,
    };

    console.log(typeof this.inputCalc.data);

    console.log(this.inputCalc);

    this.postParameters.createInputCalc(this.inputCalc).subscribe(
      {
        next: (data) =>
              {
                this.response = data;
                console.log('Response from server:', this.response);

                this.router.navigate(['/']);
              },

        error: (error) => console.error('There was an error!', error),

        complete: () => console.info('complete')
      }
    );
  }
}
