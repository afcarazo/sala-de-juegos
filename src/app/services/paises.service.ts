import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  constructor(private httpClient:HttpClient) { }

  traerUnPais(nombre:string)
  {
    return this.httpClient.get('https://restcountries.com/v2/name/'+nombre);
  }

  traerPaises()
  {
    return this.httpClient.get('https://restcountries.com/v2/alpha?codes=AR,CO,BR,ES,CL,PER');
  }
}
