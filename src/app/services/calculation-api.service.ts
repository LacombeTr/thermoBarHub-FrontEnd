import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface InputCalc {
  iterative: boolean;
  system: string;
  phases: string[];
  equationP: string | null;
  equationT: string | null;
  pDependant: boolean;
  tDependant: boolean;
  h2oDependant: boolean;
  pressure: number;
  temperature: number;
  h2o: number;
  data: string;

  // laValeur: number;
  // leRien: string;
}

@Injectable({
  providedIn: 'root',
})
export class CalculationAPIService {
  private apiURL = 'http://127.0.0.1:8000/api/calculate';

  constructor(private http: HttpClient) {}

  createInputCalc(item: InputCalc): Observable<InputCalc> {
    return this.http.post<InputCalc>(this.apiURL, item);
  }
}
