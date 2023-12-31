import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProduitModel} from "../models/produit.model";
import {CommandeModel} from "../models/commande.model";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  host: string = "http://localhost:8082";

  constructor(private http:HttpClient) { }

  public getProduits():Observable<any>{
    return this.http.get<any>(this.host+"/findall-produits");
  }

  public getProduitsByName(name:string):Observable<Array<ProduitModel>>{
    return this.http.get<Array<ProduitModel>>(this.host+"/searchby-produitsname/"+name);
  }

  public saveProduits(dto:any):Observable<any>{
    const produitJson = JSON.stringify(dto);
    console.log(dto);
    return this.http.post<any>(this.host+"/save-produits",dto);
  }

  saveCommande(dto: CommandeModel) {
    console.log(dto);
    return this.http.post<any>(this.host+"/save-commande", dto);
  }
}
