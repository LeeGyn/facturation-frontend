import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ProduitModel} from "../models/produit.model";
import {ProduitService} from "../services/produit.service";

@Component({
  selector: 'app-new-produit',
  templateUrl: './new-produit.component.html',
  styleUrls: ['./new-produit.component.css']
})
export class NewProduitComponent implements OnInit{

  newProduitFormGroup!:FormGroup;
  constructor(private fb : FormBuilder, private produitService:ProduitService) {
  }
  ngOnInit(): void {
    this.newProduitFormGroup = this.fb.group({
      designation : this.fb.control(null),
      quantite : this.fb.control(null),
      prix : this.fb.control(null),
      photo : this.fb.control(null),
      deleted : this.fb.control(null),
      active : this.fb.control(null),
      archived : this.fb.control(null),
      publics : this.fb.control(null),
      disabled : this.fb.control(null),
      createdAt : this.fb.control(null),
    });
  }

  onSaveProduit() {
    let produit: ProduitModel = this.newProduitFormGroup.value;
    console.log(produit);
    this.produitService.saveProduits(produit).subscribe({
      next: (data) => {
        alert("Produit enregistré avec succès");
        this.newProduitFormGroup.reset();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];

    if (file) {
      this.encodeFileToBase64(file);
    }
  }
  encodeFileToBase64(file: File): void {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      const base64String = e.target.result.split(',')[1]; // Extract base64 content
      this.newProduitFormGroup.patchValue({
        photo: base64String // Update the form value
      });
    };

    reader.readAsDataURL(file);
  }
}
