import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommandeService {

  host: string = "http://localhost:8082";

  constructor(private http:HttpClient) { }

  public getCommandes():Observable<any>{
    return this.http.get<any>(this.host+"/findall-commandes");
  }
}
