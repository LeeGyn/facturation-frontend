import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProduitsComponent} from "./produits/produits.component";
import {CommandesComponent} from "./commandes/commandes.component";
import {NewProduitComponent} from "./new-produit/new-produit.component";

const routes: Routes = [
  {path:'home', component:ProduitsComponent},
  {path:'produits', component:ProduitsComponent},
  {path:'commandes', component:CommandesComponent},
  {path:'newproduit', component:NewProduitComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
