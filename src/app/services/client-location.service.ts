import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientLocation } from '../models/client-location';
import { json } from 'body-parser';

@Injectable({
  providedIn: 'root'
})
export class ClientLocationService {
  urlPrefix: string = "http://localhost:9090"; 

  constructor(private httpClient: HttpClient) { }

  getClientLocation(): Observable<ClientLocation[]>{
    return this.httpClient.get<ClientLocation[]>(this.urlPrefix + "/api/clientlocations", { responseType: "json" });

  }
  getClientLocationtByClientLocationID(ClientLocationID: number): Observable<ClientLocation> {
    return this.httpClient.get<ClientLocation>(this.urlPrefix + "/api/clientlocations/searchbyclientlocationid/" + ClientLocationID, { responseType: "json" });
  }

  insertClientLocation(newClientLocation: ClientLocation): Observable<ClientLocation> {
    return this.httpClient.post<ClientLocation>(this.urlPrefix + "/api/clientlocations", newClientLocation, { responseType: "json" });
  }

  updateClientLocation(existingClientLocation: ClientLocation): Observable<ClientLocation> {
    return this.httpClient.put<ClientLocation>(this.urlPrefix + "/api/clientlocations", existingClientLocation, { responseType: "json" });
  }

  deleteClientLocation(ClientLocationID: number): Observable<string> {
    return this.httpClient.delete<string>(this.urlPrefix + "/api/clientlocations?ClientLocationID=" + ClientLocationID);
  }
}

