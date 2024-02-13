import { Injectable } from '@angular/core';
import { Country } from './country';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { json } from 'body-parser';

@Injectable({
  providedIn: 'root'
})
export class CountryService{

  constructor(private httpclient: HttpClient) { }


  getCountries(): Observable<Country[]>{
    return this.httpclient.get<Country[]>("api/countries", {responseType: "json"})
  }

}
