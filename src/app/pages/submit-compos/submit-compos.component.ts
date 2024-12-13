import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

import { postParameters} from '../../services/calculation-api.service';
import {equationList, equationStruct} from '../../data/equations';
import { excelData, calculationParameters } from "../../models";
import {prepareXslx, roundDictValues} from "../../utils/utils";

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

  /**
   * Allow to select the equation(s) for calculation
   * @param event
   */
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

  /**
   * Reset P, T and H2O field when changing the equation
   */
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

  /**
   * Get the temperature from the input and set the value of the "temperature" variable
   * @param event
   */
  getTemperature(event: Event) {
    let targetElem = event.target as HTMLInputElement;
    this.temperature = +targetElem.value;
  }

  /**
   * Get the pressure from the input and set the value of the "pressure" variable
   * @param event
   */
  getPressure(event: Event) {
    let targetElem = event.target as HTMLInputElement;
    this.pressure = +targetElem.value;
  }

  /**
   * Get the H2O content from the input and set the value of the "H2O" variable
   * @param event
   */
  getH2O(event: Event) {
    let targetElem = event.target as HTMLInputElement;
    this.h2o = +targetElem.value;
  }

  /**
   * Used to call the async function prepareXslx from "utils" used to convert
   * the uploaded Excel file to an array of dictionary
   * @param event
   */
  handleFileChange(event: any): void {
    prepareXslx(event)
      .then((result) => {
        this.excelData = result.excelData;
        this.dataColumns = result.dataColumns;
        this.dataList = this.excelData;
      })
      .catch((error) => {
        console.error('Error reading Excel file:', error);
      });
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

    this.postParameters.createInputCalc(this.inputCalc).subscribe(
      {
        next: (data) =>
              {
                this.router.navigate(['/thermobarometry-response'],
                  {
                    state: {
                      calculationResponse: data
                    }
                  }
                )
              },

        error: (error) => console.error('There was an error!', error),

        complete: () => console.info('complete')
      }
    );
  }
}
