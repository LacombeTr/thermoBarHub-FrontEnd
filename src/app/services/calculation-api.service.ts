import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { calculationParameters } from "../models";

@Injectable({
  providedIn: 'root',
})

export class postParameters {
  private apiURL = 'http://127.0.0.1:8000/api/calculate';

  constructor(private http: HttpClient) {}

  createInputCalc(item: calculationParameters): Observable<calculationParameters> {
    return this.http.post<calculationParameters>(this.apiURL, item);
  }
}
