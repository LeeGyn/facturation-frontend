import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProduitService} from "../services/produit.service";
import {catchError, Observable, throwError} from "rxjs";
import {ProduitModel} from "../models/produit.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {DomSanitizer, SafeUrl} from "@angular/platform-browser";
import {CommandeModel} from "../models/commande.model";


@Component({
  selector: 'app-produits',
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {

  produits!:any;
  errorsMessage!: string;
  searchFormGroup! : FormGroup;
  selectedProducts: any[] = [];
  commandes!:CommandeModel;
  // Ajoutez une propriété pour suivre l'état d'affichage des détails
  showDetails: boolean = false;
  constructor(private produitService:ProduitService, private fb:FormBuilder, private sanitizer: DomSanitizer) {

  }
  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
    });
    this.produitService.getProduits().subscribe({
      next: (data) => {
        console.log(data.datas)
        this.produits = data.datas;
      },
      error: (err) => {
        console.log(err);
      }
    });
    /*this.produits = this.produitService.getProduits().pipe(
      catchError(err =>{
        this.errorsMessage = err.message;
        return throwError(err);
      })
    );*/
  }

  onSearchProduit() {
    let kw = this.searchFormGroup?.value.keyword;
    this.produits = this.produitService.getProduitsByName(kw).pipe(
      catchError(err =>{
        this.errorsMessage = err.message;
        return throwError(err);
      })
    );
  }

  base64Encode(data: Uint8Array): string {
    const binaryString = String.fromCharCode(...Array.from(data));
    return btoa(binaryString);
  }


  getSafeImageSrc(photo: Uint8Array): SafeUrl {
    console.log('Length of image data:', photo.length);
    const base64Image = this.base64Encode(photo);
    const imageUrl = `data:image/png;base64,${base64Image}`;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  addToCart(product: any): void {
    //this.commandes.requestLigneCommandeDTOS.push(product);
    this.selectedProducts.push(product);
    // Vous pouvez également ajouter d'autres logiques ici, par exemple, mise à jour du total du panier, etc.
  }

  calculateTotalPrice(): number {
    return this.selectedProducts.reduce((total, product) => total + product.prix, 0);
  }

  // Ajoutez la fonction createOrder pour gérer l'enregistrement du panier
  createOrder(): void {
    if (!this.commandes) {
      this.commandes = {
        code: '', // Initialisez avec des valeurs par défaut
        prix: 0,
        quantite: 0,
        requestLigneCommandeDTOS: [],
      };
    }

    if (!this.commandes.requestLigneCommandeDTOS) {
      this.commandes.requestLigneCommandeDTOS = [];
    }

    this.commandes.requestLigneCommandeDTOS.push(...this.selectedProducts);
    this.produitService.saveCommande(this.commandes).subscribe({
      next: (data) => {
        alert("Commande payée avec succès");
        this.selectedProducts = [];
      },
      error: (err) => {
        console.log(err);
      }
    });

  }

  // Ajoutez une fonction pour obtenir les détails d'un produit
  getProductDetails(product: any): string {
    // Implémentez la logique pour formater les détails du produit selon vos besoins
    return `Code: ${product.code}, Designation: ${product.designation}, Prix: ${product.prix}, Quantité: ${product.quantite}`;
  }

// Ajoutez une fonction pour obtenir les détails du panier
  getCartDetails(): string {
    let cartDetails = '';
    for (const product of this.selectedProducts) {
      cartDetails += this.getProductDetails(product) + '\n';
    }
    return cartDetails;
  }

  // Ajoutez une fonction pour afficher les détails
  showOrderDetails() {
    this.showDetails = true;
  }
  deleteProduct(product: any) {
    // Supprimer le produit de la liste selectedProducts
    const index = this.selectedProducts.indexOf(product);
    if (index !== -1) {
      this.selectedProducts.splice(index, 1);
    }
  }
}
